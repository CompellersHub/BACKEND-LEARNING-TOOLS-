import { findManyAggregateWrapper } from "@/global/helpers";
import mongoose, { PipelineStage } from "mongoose";
import { Inject, Service } from "typedi";
import {
  dashboardResponse,
  enrollment,
  findManyEnrollment,
  quizPerformanceResponse,
  scoreAndTime,
} from "../interface";
import { EnrollModel } from "../model";
import { UserModel } from "@/app/user/model";
import { Role } from "@/app/user/interface";
import { BadRequestError } from "routing-controllers";

@Service()
export class EnrollService {
  constructor(
    @Inject("enrollModel") private readonly enrollModel: typeof EnrollModel,
    @Inject("userModel") private readonly userModel: typeof UserModel
  ) {}

  public recordScore = async (
    create: enrollment
  ): Promise<{ message: string }> => {
    try {
      const { questionType, score, student, startAt, completedAt } = create;

      // Try updating first
      const updateResult = await this.enrollModel.updateOne(
        {
          student,
          "response.questionType": questionType,
        },
        {
          $set: {
            "response.$.score": score,
            "response.$.startAt": startAt,
            "response.$.completedAt": completedAt,
          },
        }
      );

      if (updateResult.matchedCount === 0) {
        // The type doesn't exist — push a new entry
        await this.enrollModel.updateOne(
          { student },
          {
            $push: {
              response: {
                score,
                questionType,
                startAt,
                completedAt,
              },
            },
          },
          { upsert: true } // create doc if it doesn’t exist
        );
      }

      return { message: "Score recorded" };
    } catch (error) {
      if (error instanceof mongoose.Error) {
        throw new BadRequestError(`Invalid student ID: ${error.message}`);
      }

      if (error instanceof Error) {
        throw new BadRequestError(`error ${error.message}`);
      }
      throw error;
    }
  };

  public facilitatorDashboardStat = async (): Promise<dashboardResponse> => {
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

      const totalNumberOfEnrollStudent =
        tnes.status === "fulfilled" ? tnes.value : 0;
      const totalNumberOfCompletedStudent =
        tnsthcaq.status === "fulfilled" ? tnsthcaq.value : 0;
      const averageScore =
        aveScore.status === "fulfilled"
          ? aveScore.value[0].averageScorePercent
          : 0;
      const passRateInPercentage =
        passRate.status === "fulfilled" ? passRate.value[0].passRate : 0;

      return {
        averageScore,
        totalStudent: totalNumberOfEnrollStudent,
        totalComplete: totalNumberOfCompletedStudent,
        passRate: passRateInPercentage,
      };
    } catch (error) {
      throw error;
    }
  };

  public studentTracker = async (query: findManyEnrollment) => {
    const { student, ...rest } = query;
    try {
      const stages: PipelineStage.FacetPipelineStage[] = [
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
        // Calculate metrics from responses
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
        // _id: 1,
        // completedCount: 1,
        // averageScore: 1,
        // completedQuizzes: 1,
        // studentDetails: 1,
        // // "studentDetails.password": 0,
        // // "studentDetails.__v": 0,
      };

      return findManyAggregateWrapper(
        this.enrollModel,
        stages,
        rest,
        projection
      );
    } catch (error) {
      throw error;
    }
  };

  public quizPerformance = async (): Promise<quizPerformanceResponse[]> => {
    try {
      // First get total count of students (from User model)
      const totalStudents = await this.userModel.countDocuments({
        role: Role.student,
      });

      // If no students exist, return empty array
      if (totalStudents === 0) return [];

      // Then run aggregation on enrollments
      const quizStats = await this.enrollModel.aggregate([
        // Only include enrollments with responses
        { $match: { "response.0": { $exists: true } } },
        // Unwind the responses
        { $unwind: "$response" },
        // Filter out null/undefined questionTypes
        { $match: { "response.questionType": { $ne: null } } },
        // Group by questionType and student (unique combinations)
        {
          $group: {
            _id: {
              questionType: "$response.questionType",
              student: "$student",
            },
          },
        },
        // Now group by questionType to count students
        {
          $group: {
            _id: "$_id.questionType",
            studentsParticipated: { $sum: 1 },
          },
        },
        // Calculate participation rate
        {
          $project: {
            _id: 0,
            questionType: "$_id",
            studentsParticipated: 1,
            participationRate: {
              $cond: [
                // Check if denominator > 0
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
        // Sort by questionType
        { $sort: { questionType: 1 } },
      ]);

      return quizStats;
    } catch (error) {
      throw error;
    }
  };

  public timePerformance = async (): Promise<scoreAndTime> => {
    try {
      const [timeStats, commonScore] = await Promise.allSettled([
        this.enrollModel.aggregate([
          { $unwind: "$response" },
          {
            $match: {
              "response.startAt": { $exists: true },
              "response.completedAt": { $exists: true },
              // Optional: Ensure completedAt is after startAt
              $expr: { $gt: ["$response.completedAt", "$response.startAt"] },
            },
          },
          {
            $addFields: {
              timeTakenMinutes: {
                $divide: [
                  { $subtract: ["$response.completedAt", "$response.startAt"] },
                  60000, // milliseconds to minutes
                ],
              },
            },
          },
          {
            $group: {
              _id: null,
              averageTime: { $avg: "$timeTakenMinutes" },
              fastestTime: { $min: "$timeTakenMinutes" },
              count: { $sum: 1 }, // Add count to understand results
            },
          },
          {
            $project: {
              _id: 0,
              averageCompletionTime: {
                $cond: [
                  { $gt: ["$count", 0] }, // Only show if data exists
                  {
                    $concat: [
                      { $toString: { $round: ["$averageTime", 0] } },
                      " minutes",
                    ],
                  },
                  "No valid responses", // Fallback message
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
                // Explicitly show if values match
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

      const TimeStats =
        timeStats.status === "fulfilled"
          ? timeStats.value[0]
          : {
              averageCompletionTime: "0 minutes",
              fastestCompletionTime: "0 minutes",
            };

      console.log(TimeStats);
      const CommonScore =
        commonScore.status === "fulfilled"
          ? commonScore.value[0].mostCommonScoreRange
          : "0-0%";

      return { timeStats: TimeStats, commonScore: CommonScore };
    } catch (error) {
      throw error;
    }
  };
}
