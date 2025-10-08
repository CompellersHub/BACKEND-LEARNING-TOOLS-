import { resStatusCode } from "../../global/constant";
import { uploadFile } from "../../global/entities";
import { CreateReview, SearchOnline } from "./dto";
import { ReviewService, SmartSearchService } from "./service";
export declare class SmartSearchController {
    private readonly smartService;
    private readonly reviewService;
    constructor(smartService: SmartSearchService, reviewService: ReviewService);
    SmartSearch(body: SearchOnline): Promise<{
        success: boolean;
        status: resStatusCode;
        data: any[];
    }>;
    BatchScreening(document: uploadFile): Promise<{
        success: boolean;
        status: resStatusCode;
        data: {
            data: (any[] | {
                error: string;
                details: string;
            })[];
            headers: string[];
            metadata: {
                rowCount: number;
            };
            successCount: number;
            errorCount: number;
        };
    }>;
    RecentAlerts(): Promise<{
        success: boolean;
        status: resStatusCode;
        data: import("mongoose").PaginateResult<import("./interface").ISmartSearch>;
    }>;
    riskDistribution(): Promise<{
        success: boolean;
        status: resStatusCode;
        data: import("./interface").recentResponse;
    }>;
    monthlyScreeningActivity(): Promise<{
        success: boolean;
        status: resStatusCode;
        data: import("./interface").monthly[];
    }>;
    yearlyReport(): Promise<{
        success: boolean;
        status: resStatusCode;
        data: {
            year: number;
            total: {
                totalScreening: any;
                alerts: any;
            };
            highAlerts: any;
            averageResponseRate: any;
            positivePercentage: number;
        };
    }>;
    positiveAndNegative(): Promise<{
        success: boolean;
        status: resStatusCode;
        data: {
            label: string;
            positive: any;
            negative: any;
        }[];
    }>;
    massReviewActions(body: CreateReview): Promise<{
        success: boolean;
        status: resStatusCode;
        data: import("./interface/screening").reviewOnSearch;
    }>;
    lastYearMonthlyScreeningActivity(): Promise<{
        success: boolean;
        status: resStatusCode;
        data: import("./interface").monthly[];
    }>;
    private validateDocument;
    private errorLog;
}
