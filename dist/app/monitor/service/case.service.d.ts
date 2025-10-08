import { UploadService } from "../../../global/services";
import { Request } from "express";
import { FilterQuery, PaginateResult } from "mongoose";
import { addOrRemoveEvidence, caseMonitoring, escalate, financialCrime, findManyCase, investigate, pepEnhancedDueDiligence, sanctionReview, updateCase } from "../interface";
import { AlertModel, EscalateDocument, EscalateModel, FinancialModel, InvestigateModel, PEPModel, SanctionModel } from "../model";
import { MonitorService } from "./monitor.service";
import { CaseModel } from "../model/case.model";
import { Types } from "mongoose";
export declare class CaseMonitoringService {
    private readonly escalateModel;
    private readonly financialModel;
    private readonly investigateModel;
    private readonly pepModel;
    private readonly sanctionModel;
    private readonly alert;
    private readonly caseMonitor;
    private readonly uploadService;
    private readonly monitorService;
    constructor(escalateModel: typeof EscalateModel, financialModel: typeof FinancialModel, investigateModel: typeof InvestigateModel, pepModel: typeof PEPModel, sanctionModel: typeof SanctionModel, alert: typeof AlertModel, caseMonitor: typeof CaseModel, uploadService: UploadService, monitorService: MonitorService);
    createEscalate(dto: escalate): Promise<EscalateDocument>;
    createFinancial(dto: financialCrime, request: Request): Promise<import("mongoose").Document<unknown, {}, financialCrime, {}, {}> & financialCrime & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }>;
    createInvestigation(dto: investigate, request: Request): Promise<import("mongoose").Document<unknown, {}, investigate, {}, {}> & investigate & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }>;
    createPep(dto: pepEnhancedDueDiligence, request: Request): Promise<import("mongoose").Document<unknown, {}, pepEnhancedDueDiligence, {}, {}> & pepEnhancedDueDiligence & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }>;
    createSanction(dto: sanctionReview, request: Request): Promise<import("mongoose").Document<unknown, {}, sanctionReview, {}, {}> & sanctionReview & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }>;
    updateCase(dto: updateCase, id: string): Promise<caseMonitoring>;
    addOrRemoveEvidence(dto: addOrRemoveEvidence): Promise<{
        message: string;
    }>;
    findManyCases(query: findManyCase): Promise<PaginateResult<caseMonitoring>>;
    findOneCase(query: FilterQuery<caseMonitoring>): Promise<caseMonitoring>;
    private createCase;
    private filterOneCase;
    private filterManyCase;
    private riskLevel;
    private joinName;
}
