import { resStatusCode } from "../../global/constant";
import { Request } from "express";
import { CreateAlert, FindManyAlert, FindOneProfile } from "./dto";
import { AddOrRemoveEvidence, CreateInvestigation, Escalate, FinancialCrime, FindManyCase, FindOneCase, PepEnhancedDueDiligence, SanctionReview, UpdateCase } from "./dto/case.dto";
import { CaseMonitoringService } from "./service/case.service";
import { MonitorService } from "./service/monitor.service";
export declare class MonitorController {
    private readonly monitor;
    private readonly caseService;
    constructor(monitor: MonitorService, caseService: CaseMonitoringService);
    submitReviewAlert(body: CreateAlert): Promise<{
        success: boolean;
        data: import("./interface").AlertRecords;
        status: resStatusCode;
    }>;
    findManyAlert(query: FindManyAlert): Promise<{
        success: boolean;
        data: import("mongoose").PaginateResult<import("./interface").Alert>;
        status: resStatusCode;
    }>;
    findMonitoringUsers(query: FindOneProfile): Promise<{
        success: boolean;
        data: import("./interface").profileResponse;
        status: resStatusCode;
    }>;
    AnalysisDashboard(): Promise<{
        success: boolean;
        data: {
            highRisk: any;
            sarFile: any;
            countries: any;
            activeAlert: any;
            typeDistribution: any[];
            falsePositive: number;
            systemUptime: number;
        };
        status: resStatusCode;
    }>;
    TopBarStats(): Promise<{
        success: boolean;
        data: {
            activeAlert: any;
            highRisk: any;
            investigate: any;
        };
        status: resStatusCode;
    }>;
    AlertCount(): Promise<{
        success: boolean;
        data: {
            all: number;
            highRisk: number;
            mediumAlert: number;
            lowAlert: number;
        };
        status: resStatusCode;
    }>;
    createEscalate(body: Escalate): Promise<import("./model").EscalateDocument>;
    createInvestigation(body: CreateInvestigation, req: Request): Promise<import("mongoose").Document<unknown, {}, import("./interface").investigate, {}, {}> & import("./interface").investigate & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    createFinancial(body: FinancialCrime, req: Request): Promise<import("mongoose").Document<unknown, {}, import("./interface").financialCrime, {}, {}> & import("./interface").financialCrime & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    createPep(body: PepEnhancedDueDiligence, req: Request): Promise<import("mongoose").Document<unknown, {}, import("./interface").pepEnhancedDueDiligence, {}, {}> & import("./interface").pepEnhancedDueDiligence & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    createSanction(body: SanctionReview, req: Request): Promise<import("mongoose").Document<unknown, {}, import("./interface").sanctionReview, {}, {}> & import("./interface").sanctionReview & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    updateCase(body: UpdateCase, id: string): Promise<import("./interface").caseMonitoring>;
    findManyCase(query: FindManyCase): Promise<import("mongoose").PaginateResult<import("./interface").caseMonitoring>>;
    findOneCase(query: FindOneCase): Promise<import("./interface").caseMonitoring>;
    addOrRemoveEvidence(body: AddOrRemoveEvidence): Promise<{
        message: string;
    }>;
}
