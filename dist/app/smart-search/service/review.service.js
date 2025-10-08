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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewService = void 0;
const typedi_1 = require("typedi");
const screening_1 = require("../interface/screening");
const routing_controllers_1 = require("routing-controllers");
const date_fns_1 = require("date-fns");
let ReviewService = class ReviewService {
    constructor(reviewModel, smartModel) {
        this.reviewModel = reviewModel;
        this.smartModel = smartModel;
    }
    async create(data) {
        try {
            const findSearch = await this.smartModel.findById(data.screeningId);
            if (!findSearch) {
                throw new routing_controllers_1.NotFoundError("Search data is not found");
            }
            return this.reviewModel.create(data);
        }
        catch (error) {
            throw error;
        }
    }
    async assignReview(data) {
        try {
            const findReview = await this.reviewModel.findById(data._id);
            if (!findReview) {
                throw new routing_controllers_1.NotFoundError("The search not found");
            }
            return this.reviewModel.findOneAndUpdate(data._id, { reviewer: data.reviewer }, { new: true });
        }
        catch (error) {
            throw error;
        }
        return;
    }
    async positiveTrueAndNegativeFalseBarChart() {
        try {
            const lastYearDate = (0, date_fns_1.subYears)(new Date(), 1);
            const year = lastYearDate.getFullYear();
            const startDate = (0, date_fns_1.startOfYear)(lastYearDate);
            const endDate = (0, date_fns_1.endOfYear)(lastYearDate);
            const positiveResult = await this.reviewModel.aggregate([
                {
                    $match: {
                        massReviewStatus: screening_1.massStatus.true,
                        createdAt: { $gte: startDate, $lte: endDate },
                    },
                },
                {
                    $count: "positiveCount",
                },
            ]);
            const negativeResult = await this.reviewModel.aggregate([
                {
                    $match: {
                        massReviewStatus: screening_1.massStatus.false,
                        createdAt: { $gte: startDate, $lte: endDate },
                    },
                },
                {
                    $count: "negativeCount",
                },
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
                const positive = positiveResult.find((item) => item._id === index + 1);
                const negative = negativeResult.find((item) => item._id === index + 1);
                return {
                    label: `${monthLabels[index]} ${year}`,
                    positive: positive ? positive.positiveCount : 0,
                    negative: negative ? negative.negativeCount : 0,
                };
            });
            return chartData;
        }
        catch (error) {
            throw error;
        }
    }
};
exports.ReviewService = ReviewService;
exports.ReviewService = ReviewService = __decorate([
    (0, typedi_1.Service)(),
    __param(0, (0, typedi_1.Inject)("reviewModel")),
    __param(1, (0, typedi_1.Inject)("smartModel")),
    __metadata("design:paramtypes", [Object, Object])
], ReviewService);
//# sourceMappingURL=review.service.js.map