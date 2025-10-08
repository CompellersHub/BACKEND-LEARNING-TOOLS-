import { resStatusCode } from "../../global/constant";
import { Request } from "express";
import { CreateKYC, FindManyKycTraining, FindOneKycTraining, UpdateKYC } from "./dto";
import { KycTrainingPortalService } from "./kyc.service";
export declare class KycController {
    private kycService;
    constructor(kycService: KycTrainingPortalService);
    create(body: CreateKYC, request: Request): Promise<import("./interface").KycTrainingPortal>;
    findMany(query: FindManyKycTraining): Promise<{
        success: boolean;
        status: resStatusCode;
        data: import("mongoose").PaginateResult<import("./interface").KycTrainingPortal>;
    }>;
    findOne(query: FindOneKycTraining): Promise<{
        success: boolean;
        status: resStatusCode;
        data: import("./interface").KycTrainingPortal;
    }>;
    update(param: string, body: UpdateKYC): Promise<{
        success: boolean;
        status: resStatusCode;
        data: import("./interface").KycTrainingPortal;
    }>;
    caseStats(): Promise<{
        success: boolean;
        status: resStatusCode;
        data: import("./interface").caseStatsResponse;
    }>;
    dashboardStats(): Promise<{
        success: boolean;
        status: resStatusCode;
        data: import("./interface").dashboardStatsResponse;
    }>;
}
