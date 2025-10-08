"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmartSearchService = void 0;
const interface_1 = require("../../../app/kyc-training-portal/interface");
const helpers_1 = require("../../../global/helpers");
const api_operation_1 = require("../../../global/services/api-operation");
const utils_1 = require("../../../global/utils");
const cache_1 = __importDefault(require("../../../global/utils/cache"));
const csv_parser_1 = __importDefault(require("csv-parser"));
const date_fns_1 = require("date-fns");
const mongoose_1 = require("mongoose");
const routing_controllers_1 = require("routing-controllers");
const stream_1 = require("stream");
const typedi_1 = require("typedi");
const datasource_1 = require("../datasource");
const schema_1 = require("../dto/schema");
const screening_1 = require("../interface/screening");
let SmartSearchService = class SmartSearchService {
    constructor(smartModel, reviewModel, screeningModel, analysis, watchList, timeout, retry) {
        this.smartModel = smartModel;
        this.reviewModel = reviewModel;
        this.screeningModel = screeningModel;
        this.analysis = analysis;
        this.watchList = watchList;
        this.timeout = timeout;
        this.retry = retry;
    }
    async create(body) {
        const executionStart = performance.now();
        const API_TIMEOUT = 10000;
        try {
            const { fullName, entityType } = body;
            const cacheKey = utils_1.AppCache.generateKey(this.joinFileName(fullName), {
                entityType,
            });
            const cached = cache_1.default.get(cacheKey);
            if (cached) {
                this.recordScreening(cached);
                return cached;
            }
            const wikipediaData = await this.searchWikipedia(fullName, API_TIMEOUT);
            if (!wikipediaData?.length)
                return [];
            const batchSize = 5;
            const processArray = wikipediaData.length;
            const delay = 3000;
            const allResults = [];
            for (let i = 0; i < processArray; i += batchSize) {
                const batch = wikipediaData.slice(i, i + batchSize);
                const processingPromises = await this.processWikiResult(batch, API_TIMEOUT, body, executionStart);
                const results = await Promise.all(processingPromises);
                const successfulResponses = results.filter(Boolean);
                allResults.push(...successfulResponses);
                if (successfulResponses.length > 0) {
                    await this.retry.withRetry(() => this.smartModel.bulkWrite(successfulResponses.map((doc) => ({
                        updateOne: {
                            filter: { fullName: doc.fullName },
                            update: { $set: doc },
                            upsert: true,
                        },
                    }))), {
                        retries: 3,
                    });
                }
                if (i + batchSize < processArray) {
                    console.log(`waiting for ${delay}s before continue`);
                    await this.sleep(delay);
                }
            }
            cache_1.default.set(cacheKey, allResults);
            this.recordScreening(allResults);
            return allResults;
        }
        catch (error) {
            throw error;
        }
    }
    async batchScreening(file) {
        const process = await this.processCSV(file.buffer);
        for (const [index, row] of process.data.entries()) {
            try {
                schema_1.CSVRowSchema.parse(row);
            }
            catch (e) {
                throw new routing_controllers_1.ForbiddenError(`Row ${index + 1} validation failed: ${e instanceof Error ? e.message : "Invalid data"}`);
            }
        }
        const results = await Promise.allSettled(process.data.map((row) => this.create(row)));
        const data = results.map((result, index) => {
            if (result.status === "rejected") {
                console.error(`Row ${index + 1} failed:`, result.reason);
                return {
                    error: `Processing failed for row ${index + 1}`,
                    details: result.reason instanceof Error
                        ? result.reason.message
                        : "Unknown error",
                };
            }
            return result.value;
        });
        return {
            data,
            headers: process.headers,
            metadata: process.metadata,
            successCount: results.filter((r) => r.status === "fulfilled").length,
            errorCount: results.filter((r) => r.status === "rejected").length,
        };
    }
    async findAll(query) {
        return (0, helpers_1.findManyWrapper)(this.smartModel, this.findManyFilter(query), query);
    }
    async findOne(query) {
        try {
            const { options, filter } = this.findOneFilter(query);
            return (0, helpers_1.findOneWrapper)(this.smartModel.findOne(filter), options, "Smart Screening");
        }
        catch (error) {
            throw error;
        }
    }
    async riskDistribution() {
        const [low, high, medium] = await Promise.allSettled([
            this.smartModel.countDocuments({ riskLevel: interface_1.riskLevel.low }),
            this.smartModel.countDocuments({ riskLevel: interface_1.riskLevel.high }),
            this.smartModel.countDocuments({ riskLevel: interface_1.riskLevel.medium }),
        ]);
        const Low = low.status === "fulfilled" ? low.value : 0;
        const High = high.status === "fulfilled" ? high.value : 0;
        const Medium = medium.status === "fulfilled" ? medium.value : 0;
        return {
            Low,
            High,
            Medium,
        };
    }
    async monthlyScreeningActivity() {
        const currentYear = new Date().getFullYear();
        const startDate = (0, date_fns_1.startOfYear)(new Date());
        const endDate = (0, date_fns_1.endOfYear)(new Date());
        const screeningResult = await this.screeningModel.aggregate([
            { $match: { year: currentYear } },
            {
                $group: {
                    _id: "$month",
                    totalScreening: { $sum: "$total" },
                },
            },
            { $sort: { _id: 1 } },
        ]);
        const alertResult = await this.smartModel.aggregate([
            {
                $match: {
                    createdAt: { $gte: startDate, $lte: endDate },
                },
            },
            {
                $group: {
                    _id: { $month: "$createdAt" },
                    alert: { $sum: 1 },
                },
            },
            { $sort: { _id: 1 } },
        ]);
        const monthLabels = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
        ];
        const chartData = Array.from({ length: 12 }, (_, index) => {
            const screening = screeningResult.find((item) => item._id === index + 1);
            const alert = alertResult.find((item) => item._id === index + 1);
            return {
                label: monthLabels[index],
                totalScreening: screening ? screening.totalScreening : 0,
                alertGenerate: alert ? alert.alert : 0,
            };
        });
        return chartData;
    }
    async lastMonthlyScreeningActivity() {
        const lastYearDate = (0, date_fns_1.subYears)(new Date(), 1);
        const year = lastYearDate.getFullYear();
        const screeningResult = await this.screeningModel.aggregate([
            { $match: { year: year } },
            {
                $group: {
                    _id: "$month",
                    totalScreening: { $sum: "$total" },
                },
            },
            { $sort: { _id: 1 } },
        ]);
        const monthLabels = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
        ];
        const chartData = Array.from({ length: 12 }, (_, index) => {
            const screening = screeningResult.find((item) => item._id === index + 1);
            return {
                label: `${monthLabels[index]} ${year}`,
                totalScreening: screening ? screening.totalScreening : 0,
            };
        });
        return chartData;
    }
    async reportStats() {
        try {
            const lastYearDate = (0, date_fns_1.subYears)(new Date(), 1);
            const year = lastYearDate.getFullYear();
            const startDate = (0, date_fns_1.startOfYear)(lastYearDate);
            const endDate = (0, date_fns_1.endOfYear)(lastYearDate);
            const [screeningResult, alertResult, highAlertResult, responseTimeResult, positiveRate, totalReviews,] = await Promise.allSettled([
                this.screeningModel.aggregate([
                    { $match: { year } },
                    {
                        $group: {
                            _id: null,
                            totalScreening: { $sum: "$total" },
                        },
                    },
                ]),
                this.smartModel.aggregate([
                    {
                        $match: {
                            createdAt: { $gte: startDate, $lte: endDate },
                        },
                    },
                    {
                        $group: {
                            _id: null,
                            alert: { $sum: 1 },
                        },
                    },
                ]),
                this.smartModel.aggregate([
                    {
                        $match: {
                            riskLevel: interface_1.riskLevel.high,
                            createdAt: { $gte: startDate, $lte: endDate },
                        },
                    },
                    {
                        $group: {
                            _id: null,
                            highAlerts: { $sum: 1 },
                        },
                    },
                ]),
                this.smartModel.aggregate([
                    {
                        $match: {
                            createdAt: { $gte: startDate, $lte: endDate },
                            responseTime: { $ne: null },
                        },
                    },
                    {
                        $addFields: {
                            numericResponseTime: { $toDouble: "$responseTime" },
                        },
                    },
                    {
                        $group: {
                            _id: null,
                            averageResponseRate: { $avg: "$numericResponseTime" },
                        },
                    },
                ]),
                this.reviewModel.aggregate([
                    {
                        $match: {
                            massReviewStatus: screening_1.massStatus.true,
                            createdAt: { $gte: startDate, $lte: endDate },
                        },
                    },
                    {
                        $count: "positiveCount",
                    },
                ]),
                this.reviewModel.aggregate([
                    {
                        $match: {
                            createdAt: { $gte: startDate, $lte: endDate },
                        },
                    },
                    {
                        $count: "totalCount",
                    },
                ]),
            ]);
            const totalScreening = screeningResult.status === "fulfilled"
                ? screeningResult.value[0]?.totalScreening || 0
                : 0;
            const alerts = alertResult.status === "fulfilled"
                ? alertResult.value[0]?.alert || 0
                : 0;
            const highAlerts = highAlertResult.status === "fulfilled"
                ? highAlertResult.value[0]?.highAlerts || 0
                : 0;
            const avg = responseTimeResult.status === "fulfilled"
                ? responseTimeResult.value[0].averageResponseRate || 0
                : null;
            const positiveCount = positiveRate.status === "fulfilled"
                ? positiveRate.value[0]?.positiveCount || 0
                : 0;
            const totalCount = totalReviews.status === "fulfilled"
                ? totalReviews.value[0]?.totalCount || 0
                : 0;
            const positivePercentage = totalCount > 0 ? (positiveCount / totalCount) * 100 : 0;
            return {
                year,
                total: {
                    totalScreening,
                    alerts,
                },
                highAlerts,
                averageResponseRate: avg,
                positivePercentage,
            };
        }
        catch (error) {
            console.error("Error generating report stats:", error);
            throw error;
        }
    }
    async recordScreening(data) {
        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth() + 1;
        await Promise.allSettled(data.map((row) => this.screeningModel.updateOne({
            screeningId: new mongoose_1.Types.ObjectId(row._id),
            year,
            month,
            isUpdating: false,
        }, {
            $inc: { today: 1 },
        }, { upsert: true })));
    }
    findOneFilter(query) {
        const { lean, session, increaseView, populate, select, ...filter } = query;
        const options = {
            lean: true,
            session,
            select,
            populate,
        };
        return { options, filter };
    }
    findManyFilter(query) {
        const filter = {};
        if (query.search) {
            filter.$or = [];
            query.search.forEach((searchTerm) => {
                if (mongoose_1.Types.ObjectId.isValid(searchTerm)) {
                    filter.$or.push({ _id: new mongoose_1.Types.ObjectId(searchTerm) });
                }
                else {
                    const regx = new RegExp(searchTerm, "i");
                    filter.$or.push({ fullName: regx, riskLevel: regx });
                }
            });
        }
        if (query.responseTime) {
            filter["responseTime"] = { $in: query.responseTime };
        }
        if (query.riskLevel) {
            filter["riskLevel"] = { $in: query.riskLevel };
        }
        if (query.riskScore) {
            filter["riskScore"] = { $in: query.riskScore };
        }
        if (query.fullName) {
            filter["fullName"] = { $in: query.fullName };
        }
        return filter;
    }
    async processCSV(fileBuffer) {
        return new Promise((resolve, reject) => {
            const results = [];
            const headers = [];
            const bufferStream = new stream_1.Readable();
            bufferStream.push(fileBuffer);
            bufferStream.push(null);
            bufferStream
                .pipe((0, csv_parser_1.default)())
                .on("headers", (headerList) => {
                headers.push(...headerList);
            })
                .on("data", (row) => {
                results.push(this.transformRow(row));
            })
                .on("end", () => {
                resolve({
                    data: results,
                    headers,
                    metadata: { rowCount: results.length },
                });
            })
                .on("error", reject);
        });
    }
    transformRow(raw) {
        return {
            fullName: raw["Full Name"] ?? "",
            dateOfBirth: raw["Date Of Birth"] ?? "",
            entityType: raw["Type"],
            nationality: raw["Nationality"],
            additional: raw["Additional"],
            country: raw["Country"],
        };
    }
    joinFileName(name) {
        return name.replace(/\s+/g, "-").toLowerCase();
    }
    formatMatches(matches) {
        if (!matches)
            return [];
        if (typeof matches === "string") {
            try {
                return JSON.parse(matches);
            }
            catch {
                return [];
            }
        }
        if (Array.isArray(matches)) {
            return matches;
        }
        return [];
    }
    async processWikiResult(wikipediaData, API_TIMEOUT, body, executionStart) {
        return wikipediaData.map(async (data) => {
            const itemStart = performance.now();
            try {
                const [unMatches, pepMatches, nigerianMatches, newsArticles] = await Promise.allSettled([
                    this.timeout.withTimeout(this.watchList.searchUNSanctions(data.title), API_TIMEOUT),
                    this.timeout.withTimeout(this.watchList.searchPEPDatabase(data.title), API_TIMEOUT),
                    this.timeout.withTimeout(this.watchList.searchNigerianWatchlists(data.title), API_TIMEOUT),
                    this.timeout.withTimeout(this.watchList.searchNews(data.title), API_TIMEOUT),
                ]);
                const matches = [];
                const news = [];
                const handleSettledResult = (result, target) => {
                    if (result.status === "fulfilled" && result.value) {
                        target.push(...result.value);
                    }
                    else if (result.status === "rejected") {
                        console.warn("API call failed:", result.reason);
                    }
                };
                handleSettledResult(unMatches, matches);
                handleSettledResult(pepMatches, matches);
                handleSettledResult(nigerianMatches, matches);
                handleSettledResult(newsArticles, news);
                const [summary, aiAnalysis] = await Promise.allSettled([
                    news.length > 0
                        ? this.analysis.summarizeNewsArticles(news)
                        : Promise.resolve(null),
                    this.analysis.performAIAnalysis({
                        name: data.title,
                        watchlistMatches: matches,
                        newsArticles: news,
                        wikipediaData: data,
                        entityType: body.entityType || "Individual",
                        nationality: body.nationality,
                        dateOfBirth: body.dateOfBirth
                            ? String(body.dateOfBirth)
                            : undefined,
                    }),
                ]);
                const aiAnal = aiAnalysis.status === "fulfilled" ? aiAnalysis.value : null;
                const newsSummary = summary.status === "fulfilled" ? summary.value : null;
                const itemEnd = performance.now();
                return {
                    fullName: data.title,
                    matches,
                    newsArticles: news,
                    wikipediaData: data,
                    aiAnalysis: aiAnal,
                    newsSummary,
                    riskScore: aiAnal?.riskScore,
                    riskLevel: aiAnal?.riskLevel,
                    responseTime: +((itemEnd - itemStart) / 1000).toFixed(2),
                    searchTime: +((itemEnd - executionStart) / 1000).toFixed(2),
                };
            }
            catch (error) {
                console.error(`Error processing ${data.title}:`, error);
                return error;
            }
        });
    }
    async searchWikipedia(fullName, API_TIMEOUT) {
        let wikipediaData = await this.timeout.withTimeout(this.watchList.searchWikipediaDetails(fullName), API_TIMEOUT);
        if (!wikipediaData?.length) {
            const nameVariations = this.generateNameVariations(fullName);
            const variationSearches = nameVariations.map((variation) => this.timeout.withTimeout(this.watchList.searchWikipediaDetails(variation), API_TIMEOUT));
            const variationResults = await Promise.allSettled(variationSearches);
            wikipediaData = [];
            const seenTitles = new Set();
            variationResults.forEach((result) => {
                if (result.status === "fulfilled" && result.value) {
                    result.value.forEach((item) => {
                        if (!seenTitles.has(item.title)) {
                            seenTitles.add(item.title);
                            wikipediaData.push(item);
                        }
                    });
                }
            });
        }
        return wikipediaData;
    }
    generateNameVariations(fullName) {
        const parts = fullName.split(" ").filter((part) => part.length > 2);
        const variations = [];
        variations.push(...parts);
        if (parts.length > 1) {
            if (parts.length >= 2) {
                variations.push(`${parts[0]} ${parts[parts.length - 1]}`);
            }
            for (let i = 0; i < parts.length - 1; i++) {
                for (let j = i + 1; j < parts.length; j++) {
                    variations.push(`${parts[i]} ${parts[j]}`);
                }
            }
        }
        return [...new Set(variations)];
    }
    sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
};
exports.SmartSearchService = SmartSearchService;
exports.SmartSearchService = SmartSearchService = __decorate([
    (0, typedi_1.Service)(),
    __param(0, (0, typedi_1.Inject)("smartModel")),
    __param(1, (0, typedi_1.Inject)("reviewModel")),
    __param(2, (0, typedi_1.Inject)("screeningModel")),
    __metadata("design:paramtypes", [Object, Object, Object, datasource_1.AiAnalysis,
        datasource_1.WatchListAPI,
        api_operation_1.Timeout,
        api_operation_1.WithRetry])
], SmartSearchService);
//# sourceMappingURL=smart-search.service.js.map