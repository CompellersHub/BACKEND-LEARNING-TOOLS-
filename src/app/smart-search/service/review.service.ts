import { Inject, Service } from "typedi";
import { ReviewModel } from "../model/review.model";
import {
  assignReviewer,
  createReview,
  massStatus,
  reviewOnSearch,
} from "../interface/screening";
import { SmartModel } from "../model";
import { NotFoundError } from "routing-controllers";
import { endOfYear, startOfYear, subYears } from "date-fns";

@Service()
export class ReviewService {
  constructor(
    @Inject("reviewModel") private readonly reviewModel: typeof ReviewModel,
    @Inject("smartModel") private readonly smartModel: typeof SmartModel
  ) {}

  async create(data: createReview): Promise<reviewOnSearch> {
    try {
      const findSearch = await this.smartModel.findById(data.screeningId);
      if (!findSearch) {
        throw new NotFoundError("Search data is not found");
      }

      // TODO  Add user from the current user
      return this.reviewModel.create(data);
    } catch (error) {
      throw error;
    }
  }

  async assignReview(data: assignReviewer): Promise<reviewOnSearch> {
    try {
      const findReview = await this.reviewModel.findById(data._id);
      if (!findReview) {
        throw new NotFoundError("The search not found");
      }

      return this.reviewModel.findOneAndUpdate(
        data._id,
        { reviewer: data.reviewer },
        { new: true }
      );
    } catch (error) {
      throw error;
    }
    return;
  }

  async positiveTrueAndNegativeFalseBarChart() {
    try {
      const lastYearDate = subYears(new Date(), 1);
      const year = lastYearDate.getFullYear();
      const startDate = startOfYear(lastYearDate);
      const endDate = endOfYear(lastYearDate);

      const positiveResult = await this.reviewModel.aggregate([
        {
          $match: {
            massReviewStatus: massStatus.true,
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
            massReviewStatus: massStatus.false,
            createdAt: { $gte: startDate, $lte: endDate },
          },
        },
        {
          $count: "negativeCount",
        },
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
        const positive = positiveResult.find((item) => item._id === index + 1);
        const negative = negativeResult.find((item) => item._id === index + 1);

        return {
          label: `${monthLabels[index]} ${year}`,
          positive: positive ? positive.positiveCount : 0,
          negative: negative ? negative.negativeCount : 0,
        };
      });

      return chartData;
    } catch (error) {
      throw error;
    }
  }
}
