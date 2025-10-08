import { addOrRemoveEvidence, counterParty, Director, eddType, escalate, Evidence, evidenceCollect, financialCrime, findManyCase, findOneCase, investigate, PepCategory, pepEnhancedDueDiligence, sanctionReview, sanctionsResult, selectedDecision, Shareholder, Source, updateCase } from "../../../app/monitor/interface";
import { FindMany, FindOne } from "../../../global/entities";
import { Types } from "mongoose";
export declare class CreateInvestigation implements investigate {
    alertId: Types.ObjectId;
    investigationDecision: string;
    reportableOffense: string[];
    jurisdiction: string;
    authority: string;
    assignTo: string;
    investigationNote: string;
    evidence: Evidence[];
}
export declare class Escalate implements escalate {
    alertId: Types.ObjectId;
    escalationLevel: string;
    escalationNotes: string;
}
export declare class PepEnhancedDueDiligence implements pepEnhancedDueDiligence {
    alertId: Types.ObjectId;
    eddType: eddType;
    pepCategory: PepCategory;
    countryOfResidence: string;
    occupation: string;
    publicFunction: boolean;
    positionLevel: string;
    governmentEntity: string;
    isControlOverPublicFunds: boolean;
    isRoleLinkedToHighValue: boolean;
    familyMemberOfAPep: string;
    estimatedNetWorth: string;
    sourceOfWealthDocumentation: string;
    sourceOfFund: string;
    sourceOfFundDocumentation: string;
    offshoreStructure: boolean;
    isPepHighRiskOrSanctioned: boolean;
    hasNameInCorruptionInvestigations: boolean;
    adverseMediaFindingsOnPep: boolean;
    willEnhancedMonitoringBeApplied: boolean;
    willSeniorManagementSignOff: boolean;
    frequencyOfOngoingDueDiligenceChecks: "Quarterly" | "Monthly" | "Annually";
    seniorManagementApproval: boolean;
    approverName: string;
    department: string;
    position: string;
    file?: File[];
    supportingLinks: string[];
    eddDecision: "File Sar Report" | "Approved Pep EDD" | "Further EDD";
    addCustomerToPEPRegisterForOngoingMonitoring: boolean;
    decisionRationale: string;
    finalCaseDecision: selectedDecision;
    finalDecisionRationale: string;
}
export declare class SanctionReview implements sanctionReview {
    alertId: Types.ObjectId;
    eddType: eddType;
    documentsObtained: string[];
    identityVerificationNotes: string;
    kycOrEDDReviewFindings: string;
    adverseMediaFinding: string;
    shareholdersChecks: Shareholder[];
    directorsChecks: Director[];
    authoritiesScreening: string[];
    pastCurrentAndPendingTransactions: string;
    counterParty: counterParty;
    sanctionReviewChecklist: string[];
    matchType: sanctionsResult;
    recommendedActionAction: string;
    commentsAndRationale: string;
    finalCaseDecision: selectedDecision;
    finalDecisionRationale: string;
}
export declare class FinancialCrime implements financialCrime {
    alertId: Types.ObjectId;
    eddType: eddType;
    fullNameOfEntity: string;
    countryOfIncorporation: string;
    familyMemberOfAPep: string;
    natureOfBusinessOrOccupation: string;
    complexOwnershipStructure: boolean;
    sourceOfWealths: Source;
    sourceOfFunds: Source;
    financialProduct: string[];
    thirdPartyPayment: boolean;
    relationshipNote: string;
    sanctionTouchPoints: string;
    sanctionTouchPointsNote?: string;
    adverseNewsOrMedia: string;
    adverseNewsOrMediaNote?: string;
    businessOperationsCountries: string[];
    primaryCustomersOrSuppliersCountries: string[];
    fundFlowCountries: string[];
    isAnyCountriesHighRisk: boolean;
    finalRiskRating: string;
    riskDriverSummary: string;
    mitigatingMeasures: string[];
    finalCaseDecision: selectedDecision;
    finalDecisionRationale: string;
}
declare class EvidenceCollecting implements evidenceCollect {
    transactionRecord: number;
    riskLevel: string;
    status: string;
}
export declare class UpdateCase implements updateCase {
    status: string;
    assignTo: string;
    priority: string;
    progress: number;
    pepStatus: string;
    adverseMedia: string;
    lastKycUpdate: Date;
    sanctions: string;
    totalTransaction: number;
    totalAmount: number;
    riskScore: number;
    evidenceCollecting: evidenceCollect[];
    decisionRationale: string;
    caseDecision: string;
}
export declare class FindManyCase extends FindMany implements findManyCase {
    caseId?: string[];
    status?: string[];
    priority?: string[];
}
export declare class FindOneCase extends FindOne implements findOneCase {
    caseId: string;
    status: string;
    priority: string;
}
export declare class AddOrRemoveEvidence extends EvidenceCollecting implements addOrRemoveEvidence {
    id: string;
    type: "delete" | "add";
}
export {};
