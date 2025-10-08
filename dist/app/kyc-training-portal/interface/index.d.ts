export * from "./training.interface";
import { findMany, findOne } from "../../../global/entities";
import { KycTrainingPortal } from "./training.interface";
export interface create extends Omit<KycTrainingPortal, "_id" | "createdAt" | "updatedAt" | "comment" | "status" | "score" | "student" | "facilitator" | "submittedDate" | "annualReportDocument" | "incorporationCertificateDocument" | "listOfDirectorsDocument" | "shareholdersDocument" | "memorandumDocument" | "natureOfBusinessDocument" | "proofOfIdDocument" | "proofOfIdUboDocument" | "proofOfListingDocument" | "proofOfRegulationDocument" | "sanctionScreeningDocument" | "sanctionScreeningUboDocument"> {
}
export interface update extends Partial<Omit<KycTrainingPortal, "_id" | "createdAt" | "updatedAt" | "status" | "caseId" | "submittedDate" | "riskLevel" | "student" | "facilitator">> {
}
export interface findManyKycTrainingPortal extends findMany {
    caseId?: string[];
    entityName?: string[];
    accountNumber?: string[];
    productType?: string[];
    companyNumber?: string[];
}
export interface findOneKycTrainingPortal extends findOne {
    caseId?: string;
    entityName?: string;
    accountNumber?: string;
    productType?: string;
    companyNumber?: string;
}
export type caseStatsResponse = {
    totalCases: number;
    underReview: number;
    completed: number;
    averageScore: number;
};
export type dashboardStatsResponse = {
    totalCases: number;
    underReview: number;
    totalCompleted: number;
    highRisk: number;
};
export type responseInterface<T extends object> = {
    success: boolean;
    status: number;
    message: string;
    errors?: string[];
    data?: T;
};
