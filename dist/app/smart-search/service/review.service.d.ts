import { ReviewModel } from "../model/review.model";
import { assignReviewer, createReview, reviewOnSearch } from "../interface/screening";
import { SmartModel } from "../model";
export declare class ReviewService {
    private readonly reviewModel;
    private readonly smartModel;
    constructor(reviewModel: typeof ReviewModel, smartModel: typeof SmartModel);
    create(data: createReview): Promise<reviewOnSearch>;
    assignReview(data: assignReviewer): Promise<reviewOnSearch>;
    positiveTrueAndNegativeFalseBarChart(): Promise<{
        label: string;
        positive: any;
        negative: any;
    }[]>;
}
