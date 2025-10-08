import { riskLevel } from "@/app/kyc-training-portal/interface";
import { uploadFile } from "@/global/entities";
import { findManyWrapper, findOneWrapper } from "@/global/helpers";
import { Timeout, WithRetry } from "@/global/services/api-operation";
import { AppCache } from "@/global/utils";
import cache from "@/global/utils/cache";
import csv from "csv-parser";
import { endOfYear, startOfYear, subYears } from "date-fns";
import { FilterQuery, PaginateResult, Types } from "mongoose";
import { ForbiddenError } from "routing-controllers";
import { Readable } from "stream";
import { Inject, Service } from "typedi";
import { AiAnalysis, WatchListAPI } from "../datasource";
import { CSVRowSchema } from "../dto/schema";
import {
  CSVRow,
  FileProcessing,
  findManySmartSearch,
  findOneSmartSearch,
  ISmartSearch,
  matches,
  monthly,
  ProcessedRow,
  recentResponse,
} from "../interface";
import { massStatus } from "../interface/screening";
import { searchOnline, wikiResponse } from "../interface/smart.interface";
import {
  ReviewModel,
  ScreeningModel,
  SmartModel,
  SmartSearchDocument,
} from "../model";

@Service()
export class SmartSearchService {
  constructor(
    @Inject("smartModel") private readonly smartModel: typeof SmartModel,
    @Inject("reviewModel") private readonly reviewModel: typeof ReviewModel,
    @Inject("screeningModel")
    private readonly screeningModel: typeof ScreeningModel,
    private readonly analysis: AiAnalysis,
    private readonly watchList: WatchListAPI,
    private readonly timeout: Timeout,
    private readonly retry: WithRetry
  ) {}

  async create(body: searchOnline) {
    const executionStart = performance.now();
    const API_TIMEOUT = 10000;

    try {
      const { fullName, entityType } = body;

      // Cache check with proper TTL consideration
      const cacheKey = AppCache.generateKey(this.joinFileName(fullName), {
        entityType,
      });
      const cached: ISmartSearch[] = cache.get(cacheKey);
      if (cached) {
        this.recordScreening(cached);
        return cached;
      }

      // // Database lookup with projection for efficiency
      // const findDB: ISmartSearch[] = await this.smartModel
      //   .find({
      //     fullName: { $regex: fullName, $options: "i" },
      //   })
      //   .lean();

      // if (findDB?.length > 0) {
      //   cache.set(cacheKey, findDB);
      //   this.recordScreening(findDB);
      //   return findDB;
      // }

      // External data collection with timeout
      const wikipediaData = await this.searchWikipedia(fullName, API_TIMEOUT);
      if (!wikipediaData?.length) return [];

      const batchSize = 5;
      const processArray = wikipediaData.length;
      const delay = 3000;

      const allResults = [];

      for (let i = 0; i < processArray; i += batchSize) {
        const batch = wikipediaData.slice(i, i + batchSize);

        const processingPromises = await this.processWikiResult(
          batch,
          API_TIMEOUT,
          body,
          executionStart
        );

        // Process all items with progress tracking
        const results = await Promise.all(processingPromises);
        const successfulResponses = results.filter(Boolean);

        allResults.push(...successfulResponses);

        // Batch insert with retry
        if (successfulResponses.length > 0) {
          await this.retry.withRetry(
            () =>
              this.smartModel.bulkWrite(
                successfulResponses.map((doc: ISmartSearch) => ({
                  updateOne: {
                    filter: { fullName: doc.fullName },
                    update: { $set: doc },
                    upsert: true,
                  },
                }))
              ),
            {
              retries: 3,
            }
          );
        }

        // wait before next batch, unless it's the last one
        if (i + batchSize < processArray) {
          console.log(`waiting for ${delay}s before continue`);
          await this.sleep(delay);
        }
      }

      // Cache only successful responses
      cache.set(cacheKey, allResults);
      this.recordScreening(allResults);
      return allResults;
    } catch (error) {
      throw error;
    }
  }

  async batchScreening(file: uploadFile) {
    const process = await this.processCSV(file.buffer);

    // Validate all rows
    for (const [index, row] of process.data.entries()) {
      try {
        CSVRowSchema.parse(row);
      } catch (e: unknown) {
        throw new ForbiddenError(
          `Row ${index + 1} validation failed: ${
            e instanceof Error ? e.message : "Invalid data"
          }`
        );
      }
    }

    // Process all rows in parallel with proper error handling
    const results = await Promise.allSettled(
      process.data.map((row) => this.create(row))
    );

    // Process results and errors
    const data = results.map((result, index) => {
      if (result.status === "rejected") {
        console.error(`Row ${index + 1} failed:`, result.reason);
        return {
          error: `Processing failed for row ${index + 1}`,
          details:
            result.reason instanceof Error
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

  async findAll(
    query: findManySmartSearch
  ): Promise<PaginateResult<ISmartSearch>> {
    return findManyWrapper<ISmartSearch>(
      this.smartModel,
      this.findManyFilter(query),
      query
    );
  }

  async findOne(
    query: FilterQuery<SmartSearchDocument>
  ): Promise<ISmartSearch> {
    try {
      const { options, filter } = this.findOneFilter(query);
      return findOneWrapper(
        this.smartModel.findOne(filter),
        options,
        "Smart Screening"
      );
    } catch (error) {
      throw error;
    }
  }

  async riskDistribution(): Promise<recentResponse> {
    const [low, high, medium] = await Promise.allSettled([
      this.smartModel.countDocuments({ riskLevel: riskLevel.low }),
      this.smartModel.countDocuments({ riskLevel: riskLevel.high }),
      this.smartModel.countDocuments({ riskLevel: riskLevel.medium }),
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

  async monthlyScreeningActivity(): Promise<monthly[]> {
    const currentYear = new Date().getFullYear();
    const startDate = startOfYear(new Date());
    const endDate = endOfYear(new Date());

    // Get total screening count per month
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

    // Get alert count per month
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

    // Month labels
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

    // Combine both results
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

  async lastMonthlyScreeningActivity(): Promise<monthly[]> {
    const lastYearDate = subYears(new Date(), 1);
    const year = lastYearDate.getFullYear();

    // Get total screening count per month
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

    // Month labels
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

    // Combine both results
    const chartData = Array.from({ length: 12 }, (_, index) => {
      const screening = screeningResult.find((item) => item._id === index + 1);

      return {
        label: `${monthLabels[index]} ${year}`,
        totalScreening: screening ? screening.totalScreening : 0,
      };
    });

    return chartData;
  }

  // async dashboardStats(){
  //   const today = new Date();
  //   const [todayScreening, activeAlerts, hitRate, responseTime] = await Promise.allSettled([
  //     this.smartModel.countDocuments({createdAt: today, updatedAt: today}),
  //     this.smartModel.c

  //   ])
  // }
  //
  async reportStats() {
    try {
      const lastYearDate = subYears(new Date(), 1);
      const year = lastYearDate.getFullYear();

      const startDate = startOfYear(lastYearDate);
      const endDate = endOfYear(lastYearDate);

      const [
        screeningResult,
        alertResult,
        highAlertResult,
        responseTimeResult,
        positiveRate,
        totalReviews,
      ] = await Promise.allSettled([
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
              riskLevel: riskLevel.high,
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
              massReviewStatus: massStatus.true,
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

      const totalScreening =
        screeningResult.status === "fulfilled"
          ? screeningResult.value[0]?.totalScreening || 0
          : 0;

      const alerts =
        alertResult.status === "fulfilled"
          ? alertResult.value[0]?.alert || 0
          : 0;

      const highAlerts =
        highAlertResult.status === "fulfilled"
          ? highAlertResult.value[0]?.highAlerts || 0
          : 0;

      const avg =
        responseTimeResult.status === "fulfilled"
          ? responseTimeResult.value[0].averageResponseRate || 0
          : null;

      // Extract values safely
      const positiveCount =
        positiveRate.status === "fulfilled"
          ? positiveRate.value[0]?.positiveCount || 0
          : 0;

      const totalCount =
        totalReviews.status === "fulfilled"
          ? totalReviews.value[0]?.totalCount || 0
          : 0;

      // Compute percentage
      const positivePercentage =
        totalCount > 0 ? (positiveCount / totalCount) * 100 : 0;

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
    } catch (error) {
      console.error("Error generating report stats:", error);
      throw error;
    }
  }

  private async recordScreening(data: ISmartSearch[]) {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;

    await Promise.allSettled(
      data.map((row) =>
        this.screeningModel.updateOne(
          {
            screeningId: new Types.ObjectId(row._id),
            year,
            month,
            isUpdating: false,
          },
          {
            $inc: { today: 1 },
          },
          { upsert: true }
        )
      )
    );
  }

  private findOneFilter(query: findOneSmartSearch) {
    const { lean, session, increaseView, populate, select, ...filter } = query;
    const options = {
      lean: true,
      session,
      select,
      populate,
    };

    return { options, filter };
  }

  private findManyFilter(
    query: findManySmartSearch
  ): FilterQuery<SmartSearchDocument> {
    const filter: FilterQuery<SmartSearchDocument> = {};

    if (query.search) {
      filter.$or = [];
      query.search.forEach((searchTerm) => {
        if (Types.ObjectId.isValid(searchTerm)) {
          filter.$or.push({ _id: new Types.ObjectId(searchTerm) });
        } else {
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

  private async processCSV(
    fileBuffer: Buffer
  ): Promise<FileProcessing<ProcessedRow>> {
    return new Promise((resolve, reject) => {
      const results: ProcessedRow[] = [];
      const headers: string[] = [];

      const bufferStream = new Readable();
      bufferStream.push(fileBuffer);
      bufferStream.push(null);

      bufferStream
        .pipe(csv())
        .on("headers", (headerList: string[]) => {
          headers.push(...headerList);
        })
        .on("data", (row: CSVRow) => {
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

  private transformRow(raw: CSVRow): ProcessedRow {
    return {
      fullName: raw["Full Name"] ?? "",
      dateOfBirth: raw["Date Of Birth"] ?? "",
      entityType: raw["Type"],
      nationality: raw["Nationality"],
      additional: raw["Additional"],
      country: raw["Country"],
    };
  }

  private joinFileName(name: string): string {
    return name.replace(/\s+/g, "-").toLowerCase();
  }

  private formatMatches(matches: matches): matches[] {
    if (!matches) return [];

    if (typeof matches === "string") {
      try {
        return JSON.parse(matches);
      } catch {
        return [];
      }
    }

    if (Array.isArray(matches)) {
      return matches;
    }

    return [];
  }

  private async processWikiResult(
    wikipediaData: wikiResponse[],
    API_TIMEOUT: number,
    body: searchOnline,
    executionStart: number
  ) {
    return wikipediaData.map(async (data) => {
      const itemStart = performance.now();

      try {
        const [unMatches, pepMatches, nigerianMatches, newsArticles] =
          await Promise.allSettled([
            this.timeout.withTimeout(
              this.watchList.searchUNSanctions(data.title),
              API_TIMEOUT
            ),
            this.timeout.withTimeout(
              this.watchList.searchPEPDatabase(data.title),
              API_TIMEOUT
            ),
            this.timeout.withTimeout(
              this.watchList.searchNigerianWatchlists(data.title),
              API_TIMEOUT
            ),
            this.timeout.withTimeout(
              this.watchList.searchNews(data.title),
              API_TIMEOUT
            ),
          ]);

        const matches = [];
        const news = [];

        // Helper function with proper typing
        const handleSettledResult = <T>(
          result: PromiseSettledResult<T[]>,
          target: T[]
        ) => {
          if (result.status === "fulfilled" && result.value) {
            target.push(...result.value);
          } else if (result.status === "rejected") {
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

        const aiAnal =
          aiAnalysis.status === "fulfilled" ? aiAnalysis.value : null;
        const newsSummary =
          summary.status === "fulfilled" ? summary.value : null;
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
      } catch (error) {
        console.error(`Error processing ${data.title}:`, error);
        return error;
      }
    });
  }

  private async searchWikipedia(fullName: string, API_TIMEOUT: number) {
    let wikipediaData = await this.timeout.withTimeout(
      this.watchList.searchWikipediaDetails(fullName),
      API_TIMEOUT
    );

    // If no results, try different name variations
    if (!wikipediaData?.length) {
      const nameVariations = this.generateNameVariations(fullName);

      const variationSearches = nameVariations.map((variation) =>
        this.timeout.withTimeout(
          this.watchList.searchWikipediaDetails(variation),
          API_TIMEOUT
        )
      );

      const variationResults = await Promise.allSettled(variationSearches);

      // Combine all successful results
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

  // Helper function to generate name variations
  private generateNameVariations(fullName: string): string[] {
    const parts = fullName.split(" ").filter((part) => part.length > 2);
    const variations: string[] = [];

    // Add individual parts
    variations.push(...parts);

    // Add combinations of parts (for multi-part names)
    if (parts.length > 1) {
      // Try first name + last name
      if (parts.length >= 2) {
        variations.push(`${parts[0]} ${parts[parts.length - 1]}`);
      }

      // Try all combinations for longer names
      for (let i = 0; i < parts.length - 1; i++) {
        for (let j = i + 1; j < parts.length; j++) {
          variations.push(`${parts[i]} ${parts[j]}`);
        }
      }
    }

    return [...new Set(variations)]; // Remove duplicates
  }

  private sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
