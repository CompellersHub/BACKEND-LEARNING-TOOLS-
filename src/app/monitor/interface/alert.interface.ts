import { findMany, findOne } from "@/global/entities";
import { Types } from "mongoose";
import { severity } from "./monitor.interface";

export enum Action {
  dismiss = "Dismiss",
  investigate = "Investigate",
  escalate = "Escalate",
  file = "File SAR",
  edd = "Perform EDD",
}
export interface AlertRecords {
  action: Action;
  comment: string;
  student?: Types.ObjectId;
  alert: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export type createAlert = Pick<
  AlertRecords,
  "action" | "comment" | "student" | "alert"
>;

export interface findManyTransaction extends findMany {
  type?: "recent" | "years";
  status?: string[];
  customer?: Types.ObjectId;
  from?: Date;
  end?: Date;
}

export interface findOneProfile extends findOne {
  customerId?: string;
  fullName?: string;
}

export interface findManyAlert extends findMany {
  severity?: severity;
}

export enum eddType {
  pep = "PEP Enhanced Due Diligence",
  sanctions = "Sanctions Review",
  financial = "Financial Crime Risk Review",
}

export enum sanctionsResult {
  no = "No Match",
  false = "False Possible",
  match = "Possible Match",
  true = "True Match",
}

export enum PepCategory {
  heads = "Heads of State and Government",
  seniorP = "Senior Politicians",
  seniorM = "Senior Military Officials",
  seniorJ = "Senior Judicial Officials",
  state = "State-Owned Enterprise Officials",
  intern = "International Organization Officials",
}

export interface Shareholder {
  shareholderName: string;
  percentage: number;
  adverseNews: boolean;
  sanctions: boolean;
  pep: boolean;
  notes: string;
}

export interface Director {
  directorName: string;
  adverseNews: boolean;
  sanctions: boolean;
  pep: boolean;
  notes: string;
}

export interface sanctions {
  name: string;
  result: sanctionsResult;
}

export interface counterParty {
  sanctionsHit: boolean;
  pepStatus: boolean;
  adverseNews: boolean;
  details: string;
  fundsFreezeObligations: boolean;
}

export interface Source {
  source: string[];
  comment: string;
  links: string[];
  document?: Documents[];
}

export interface Evidence {
  fileName: string;
  category: string;
  description: string;
  priority: string;
  document?: Documents;
  uploadedOn?: Date;
}

export interface Documents {
  type: string;
  name: string;
  size: number;
  link: string;
}

export enum selectedDecision {
  close = "Close Case - Non Suspicious",
  approve = "Approve EDD",
  file = "File SAR Report",
}

export interface SelectAction {
  _id?: Types.ObjectId;
  id?: string;
  eddType: eddType;

  // pep
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

  documentUploadAndSupportingEvidence?: Documents[];
  supportingLinks: string[];
  eddDecision: "File Sar Report" | "Approved Pep EDD" | "Further EDD";
  addCustomerToPEPRegisterForOngoingMonitoring: boolean;
  decisionRationale: string;

  finalCaseDecision: selectedDecision;
  finalDecisionRationale: string;

  // sanctions Review
  documentsObtained: string[];
  identityVerificationNotes: string;
  identifyDocuments?: Documents[];
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

  // financial crime risk review
  fullNameOfEntity: string;
  countryOfIncorporation: string;
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

  // escalate alert
  escalationLevel: string;
  escalationNotes: string;

  // investigate
  investigationDecision: string;
  reportableOffense: string[];
  jurisdiction: string;
  authority: string;
  assignTo: string;
  investigationNote: string;
  evidence: Evidence[];

  alertId: Types.ObjectId;
  status: string;
  completed: number;
}

export type pepEnhancedDueDiligence = Pick<
  SelectAction,
  | "alertId"
  | "eddType"
  | "pepCategory"
  | "countryOfResidence"
  | "occupation"
  | "publicFunction"
  | "positionLevel"
  | "governmentEntity"
  | "isControlOverPublicFunds"
  | "isRoleLinkedToHighValue"
  | "familyMemberOfAPep"
  | "estimatedNetWorth"
  | "sourceOfWealthDocumentation"
  | "sourceOfFund"
  | "sourceOfFundDocumentation"
  | "offshoreStructure"
  | "isPepHighRiskOrSanctioned"
  | "hasNameInCorruptionInvestigations"
  | "adverseMediaFindingsOnPep"
  | "willEnhancedMonitoringBeApplied"
  | "willSeniorManagementSignOff"
  | "frequencyOfOngoingDueDiligenceChecks"
  | "seniorManagementApproval"
  | "approverName"
  | "department"
  | "position"
  | "documentUploadAndSupportingEvidence"
  | "supportingLinks"
  | "eddDecision"
  | "addCustomerToPEPRegisterForOngoingMonitoring"
  | "decisionRationale"
  | "finalDecisionRationale"
  | "finalCaseDecision"
>;

// sanctions Review
export type sanctionReview = Pick<
  SelectAction,
  | "alertId"
  | "eddType"
  | "documentsObtained"
  | "identityVerificationNotes"
  | "identifyDocuments"
  | "kycOrEDDReviewFindings"
  | "adverseMediaFinding"
  | "shareholdersChecks"
  | "directorsChecks"
  | "authoritiesScreening"
  | "pastCurrentAndPendingTransactions"
  | "counterParty"
  | "sanctionReviewChecklist"
  | "matchType"
  | "recommendedActionAction"
  | "commentsAndRationale"
  | "finalDecisionRationale"
  | "finalCaseDecision"
>;

// financial crime risk review
export type financialCrime = Pick<
  SelectAction,
  | "alertId"
  | "eddType"
  | "fullNameOfEntity"
  | "countryOfIncorporation"
  | "natureOfBusinessOrOccupation"
  | "complexOwnershipStructure"
  | "sourceOfWealths"
  | "sourceOfFunds"
  | "financialProduct"
  | "thirdPartyPayment"
  | "familyMemberOfAPep"
  | "relationshipNote"
  | "sanctionTouchPoints"
  | "sanctionTouchPointsNote"
  | "adverseNewsOrMedia"
  | "adverseNewsOrMediaNote"
  | "businessOperationsCountries"
  | "primaryCustomersOrSuppliersCountries"
  | "fundFlowCountries"
  | "isAnyCountriesHighRisk"
  | "finalRiskRating"
  | "riskDriverSummary"
  | "mitigatingMeasures"
  | "finalDecisionRationale"
  | "finalCaseDecision"
>;

// investigate and file sar have the same type and db
export type investigate = Pick<
  SelectAction,
  | "alertId"
  | "investigationDecision"
  | "reportableOffense"
  | "jurisdiction"
  | "authority"
  | "assignTo"
  | "investigationNote"
  | "evidence"
>;

export type escalate = Pick<
  SelectAction,
  "alertId" | "escalationLevel" | "escalationNotes"
>;

export interface evidenceCollect {
  transactionRecord: number;
  riskLevel: string;
  status: string;
}

export interface addOrRemoveEvidence extends evidenceCollect {
  id: string;
  type: "delete" | "add";
}

export interface caseMonitoring {
  caseId: string;
  monitoring: Types.ObjectId;
  profile: Types.ObjectId;
  status: string;
  assignTo: string;
  priority: string;
  progress: number;
  customerSince: string;
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

export type updateCase = Partial<caseMonitoring>;
export interface findManyCase extends findMany {
  caseId?: string[];
  status?: string[];
  priority?: string[];
}

export interface findOneCase extends findOne {
  caseId?: string;
  status?: string;
  priority?: string;
}
