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
exports.EnrollService = void 0;
const helpers_1 = require("../../../global/helpers");
const mongoose_1 = __importDefault(require("mongoose"));
const typedi_1 = require("typedi");
const interface_1 = require("../../../app/user/interface");
const routing_controllers_1 = require("routing-controllers");
let EnrollService = class EnrollService {
    constructor(enrollModel, userModel) {
        this.enrollModel = enrollModel;
        this.userModel = userModel;
        this.recordScore = async (create) => {
            try {
                const { questionType, score, student, startAt, completedAt } = create;
                const updateResult = await this.enrollModel.updateOne({
                    student,
                    "response.questionType": questionType,
                }, {
                    $set: {
                        "response.$.score": score,
                        "response.$.startAt": startAt,
                        "response.$.completedAt": completedAt,
                    },
                });
                if (updateResult.matchedCount === 0) {
                    await this.enrollModel.updateOne({ student }, {
                        $push: {
                            response: {
                                score,
                                questionType,
                                startAt,
                                completedAt,
                            },
                        },
                    }, { upsert: true });
                }
                return { message: "Score recorded" };
            }
            catch (error) {
                if (error instanceof mongoose_1.default.Error) {
                    throw new routing_controllers_1.BadRequestError(`Invalid student ID: ${error.message}`);
                }
                if (error instanceof Error) {
                    throw new routing_controllers_1.BadRequestError(`error ${error.message}`);
                }
                throw error;
            }
        };
        this.facilitatorDashboardStat = async () => {
            try {
                const [tnes, tnsthcaq, aveScore, passRate] = await Promise.allSettled([
                    this.enrollModel.countDocuments(),
                    this.enrollModel.countDocuments({ "response.2": { $exists: true } }),
                    this.enrollModel.aggregate([
                        { $unwind: "$response" },
                        {
                            $group: {
                                _id: null,
                                totalScore: { $sum: "$response.score" },
                                totalEntries: { $sum: 1 },
                            },
                        },
                        {
                            $project: {
                                averageScorePercent: {
                                    $divide: ["$totalScore", "$totalEntries"],
                                },
                            },
                        },
                    ]),
                    this.enrollModel.aggregate([
                        {
                            $project: {
                                student: 1,
                                allPassed: {
                                    $not: {
                                        $gt: [
                                            {
                                                $size: {
                                                    $filter: {
                                                        input: "$response",
                                                        as: "r",
                                                        cond: { $lt: ["$$r.score", 80] },
                                                    },
                                                },
                                            },
                                            0,
                                        ],
                                    },
                                },
                            },
                        },
                        {
                            $group: {
                                _id: null,
                                totalStudents: { $sum: 1 },
                                passedStudents: {
                                    $sum: {
                                        $cond: [{ $eq: ["$allPassed", true] }, 1, 0],
                                    },
                                },
                            },
                        },
                        {
                            $project: {
                                passRate: {
                                    $multiply: [
                                        { $divide: ["$passedStudents", "$totalStudents"] },
                                        100,
                                    ],
                                },
                            },
                        },
                    ]),
                ]);
                const totalNumberOfEnrollStudent = tnes.status === "fulfilled" ? tnes.value : 0;
                const totalNumberOfCompletedStudent = tnsthcaq.status === "fulfilled" ? tnsthcaq.value : 0;
                const averageScore = aveScore.status === "fulfilled"
                    ? aveScore.value[0].averageScorePercent
                    : 0;
                const passRateInPercentage = passRate.status === "fulfilled" ? passRate.value[0].passRate : 0;
                return {
                    averageScore,
                    totalStudent: totalNumberOfEnrollStudent,
                    totalComplete: totalNumberOfCompletedStudent,
                    passRate: passRateInPercentage,
                };
            }
            catch (error) {
                throw error;
            }
        };
        this.studentTracker = async (query) => {
            const { student, ...rest } = query;
            try {
                const stages = [
                    {
                        $lookup: {
                            from: "users",
                            localField: "student",
                            foreignField: "_id",
                            as: "studentDetails",
                        },
                    },
                    { $unwind: "$studentDetails" },
                    {
                        $addFields: {
                            "studentDetails.password": "$$REMOVE",
                        },
                    },
                    {
                        $addFields: {
                            completedCount: {
                                $size: "$response",
                            },
                            averageScore: {
                                $cond: [
                                    { $gt: [{ $size: "$response" }, 0] },
                                    { $avg: "$response.score" },
                                    0,
                                ],
                            },
                            totalPossibleQuizzes: 3,
                        },
                    },
                ];
                const projection = {
                    studentDetails: 1,
                    completedQuizzes: {
                        $concat: [
                            { $toString: "$completedCount" },
                            "/",
                            { $toString: "$totalPossibleQuizzes" },
                        ],
                    },
                    averageScore: { $round: ["$averageScore", 1] },
                    attempts: {
                        $map: {
                            input: "$response",
                            as: "resp",
                            in: {
                                questionType: "$$resp.questionType",
                                score: "$$resp.score",
                                durationMinutes: {
                                    $round: [
                                        {
                                            $divide: [
                                                {
                                                    $subtract: ["$$resp.completedAt", "$$resp.startAt"],
                                                },
                                                60000,
                                            ],
                                        },
                                        1,
                                    ],
                                },
                            },
                        },
                    },
                };
                return (0, helpers_1.findManyAggregateWrapper)(this.enrollModel, stages, rest, projection);
            }
            catch (error) {
                throw error;
            }
        };
        this.quizPerformance = async () => {
            try {
                const totalStudents = await this.userModel.countDocuments({
                    role: interface_1.Role.student,
                });
                if (totalStudents === 0)
                    return [];
                const quizStats = await this.enrollModel.aggregate([
                    { $match: { "response.0": { $exists: true } } },
                    { $unwind: "$response" },
                    { $match: { "response.questionType": { $ne: null } } },
                    {
                        $group: {
                            _id: {
                                questionType: "$response.questionType",
                                student: "$student",
                            },
                        },
                    },
                    {
                        $group: {
                            _id: "$_id.questionType",
                            studentsParticipated: { $sum: 1 },
                        },
                    },
                    {
                        $project: {
                            _id: 0,
                            questionType: "$_id",
                            studentsParticipated: 1,
                            participationRate: {
                                $cond: [
                                    { $gt: [totalStudents, 0] },
                                    {
                                        $round: [
                                            {
                                                $multiply: [
                                                    { $divide: ["$studentsParticipated", totalStudents] },
                                                    100,
                                                ],
                                            },
                                            1,
                                        ],
                                    },
                                    0,
                                ],
                            },
                        },
                    },
                    { $sort: { questionType: 1 } },
                ]);
                return quizStats;
            }
            catch (error) {
                throw error;
            }
        };
        this.timePerformance = async () => {
            try {
                const [timeStats, commonScore] = await Promise.allSettled([
                    this.enrollModel.aggregate([
                        { $unwind: "$response" },
                        {
                            $match: {
                                "response.startAt": { $exists: true },
                                "response.completedAt": { $exists: true },
                                $expr: { $gt: ["$response.completedAt", "$response.startAt"] },
                            },
                        },
                        {
                            $addFields: {
                                timeTakenMinutes: {
                                    $divide: [
                                        { $subtract: ["$response.completedAt", "$response.startAt"] },
                                        60000,
                                    ],
                                },
                            },
                        },
                        {
                            $group: {
                                _id: null,
                                averageTime: { $avg: "$timeTakenMinutes" },
                                fastestTime: { $min: "$timeTakenMinutes" },
                                count: { $sum: 1 },
                            },
                        },
                        {
                            $project: {
                                _id: 0,
                                averageCompletionTime: {
                                    $cond: [
                                        { $gt: ["$count", 0] },
                                        {
                                            $concat: [
                                                { $toString: { $round: ["$averageTime", 0] } },
                                                " minutes",
                                            ],
                                        },
                                        "No valid responses",
                                    ],
                                },
                                fastestCompletionTime: {
                                    $cond: [
                                        { $gt: ["$count", 0] },
                                        {
                                            $concat: [
                                                { $toString: { $round: ["$fastestTime", 0] } },
                                                " minutes",
                                            ],
                                        },
                                        "No valid responses",
                                    ],
                                },
                                isSameValue: {
                                    $eq: ["$averageTime", "$fastestTime"],
                                },
                            },
                        },
                    ]),
                    this.enrollModel.aggregate([
                        { $unwind: "$response" },
                        {
                            $addFields: {
                                scoreRange: {
                                    $concat: [
                                        {
                                            $toString: {
                                                $multiply: [
                                                    { $floor: { $divide: ["$response.score", 10] } },
                                                    10,
                                                ],
                                            },
                                        },
                                        "-",
                                        {
                                            $toString: {
                                                $add: [
                                                    {
                                                        $multiply: [
                                                            { $floor: { $divide: ["$response.score", 10] } },
                                                            10,
                                                        ],
                                                    },
                                                    10,
                                                ],
                                            },
                                        },
                                        "%",
                                    ],
                                },
                            },
                        },
                        {
                            $group: {
                                _id: "$scoreRange",
                                count: { $sum: 1 },
                            },
                        },
                        { $sort: { count: -1 } },
                        {
                            $limit: 1,
                        },
                        {
                            $project: {
                                _id: 0,
                                mostCommonScoreRange: "$_id",
                            },
                        },
                    ]),
                ]);
                const TimeStats = timeStats.status === "fulfilled"
                    ? timeStats.value[0]
                    : {
                        averageCompletionTime: "0 minutes",
                        fastestCompletionTime: "0 minutes",
                    };
                console.log(TimeStats);
                const CommonScore = commonScore.status === "fulfilled"
                    ? commonScore.value[0].mostCommonScoreRange
                    : "0-0%";
                return { timeStats: TimeStats, commonScore: CommonScore };
            }
            catch (error) {
                throw error;
            }
        };
    }
};
exports.EnrollService = EnrollService;
exports.EnrollService = EnrollService = __decorate([
    (0, typedi_1.Service)(),
    __param(0, (0, typedi_1.Inject)("enrollModel")),
    __param(1, (0, typedi_1.Inject)("userModel")),
    __metadata("design:paramtypes", [Object, Object])
], EnrollService);
//# sourceMappingURL=enroll.service.js.map