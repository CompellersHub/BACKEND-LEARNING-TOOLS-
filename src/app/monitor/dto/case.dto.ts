import {
  addOrRemoveEvidence,
  counterParty,
  Director,
  eddType,
  escalate,
  Evidence,
  evidenceCollect,
  financialCrime,
  findManyCase,
  findOneCase,
  investigate,
  PepCategory,
  pepEnhancedDueDiligence,
  sanctionReview,
  sanctions,
  sanctionsResult,
  selectedDecision,
  Shareholder,
  Source,
  updateCase,
} from "@/app/monitor/interface";
import { FindMany, FindOne } from "@/global/entities";
import { Transform, Type } from "class-transformer";
import {
  ArrayNotEmpty,
  ArrayUnique,
  IsArray,
  IsBoolean,
  IsDefined,
  IsIn,
  IsInt,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  IsUrl,
  ValidateNested,
} from "class-validator";
import { Types } from "mongoose";

class IEvidence implements Evidence {
  @IsString()
  @IsNotEmpty()
  fileName: string;

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  priority: string;
}

export class CreateInvestigation implements investigate {
  @IsString()
  @IsMongoId()
  alertId: Types.ObjectId;

  @IsString()
  @IsNotEmpty()
  investigationDecision: string;

  @IsArray()
  @IsOptional()
  @ArrayUnique()
  @IsString({ each: true })
  reportableOffense: string[];

  @IsString()
  @IsNotEmpty()
  jurisdiction: string;

  @IsString()
  @IsOptional()
  authority: string;

  @IsString()
  @IsOptional()
  assignTo: string;

  @IsString()
  @IsOptional()
  investigationNote: string;

  @IsOptional()
  @IsArray()
  @ValidateNested()
  @Type(() => IEvidence)
  evidence: Evidence[];
}

export class Escalate implements escalate {
  @IsMongoId()
  alertId: Types.ObjectId;

  @IsString()
  @IsNotEmpty()
  escalationLevel: string;

  @IsString()
  @IsNotEmpty()
  escalationNotes: string;
}

class IShareholder implements Shareholder {
  @IsString()
  @IsNotEmpty()
  shareholderName: string;

  @IsNumber()
  @Transform(({ value }) =>
    typeof value === "string" ? parseFloat(value) : value
  )
  percentage: number;

  @IsBoolean()
  @Transform(({ value }) => {
    if (value === "true" || value === true) return true;
    if (value === "false" || value === false) return false;
    if (value === "yes") return true;
    if (value === "no") return false;
    return value;
  })
  adverseNews: boolean;

  @IsBoolean()
  @Transform(({ value }) => {
    if (value === "true" || value === true) return true;
    if (value === "false" || value === false) return false;
    if (value === "yes") return true;
    if (value === "no") return false;
    return value;
  })
  sanctions: boolean;

  @IsBoolean()
  @Transform(({ value }) => {
    if (value === "true" || value === true) return true;
    if (value === "false" || value === false) return false;
    if (value === "yes") return true;
    if (value === "no") return false;
    return value;
  })
  pep: boolean;

  @IsString()
  @IsNotEmpty()
  notes: string;
}

class IDirector implements Director {
  @IsString()
  @IsNotEmpty()
  directorName: string;

  @IsBoolean()
  @Transform(({ value }) => {
    if (value === "true" || value === true) return true;
    if (value === "false" || value === false) return false;
    if (value === "yes") return true;
    if (value === "no") return false;
    return value;
  })
  adverseNews: boolean;

  @IsBoolean()
  @Transform(({ value }) => {
    if (value === "true" || value === true) return true;
    if (value === "false" || value === false) return false;
    if (value === "yes") return true;
    if (value === "no") return false;
    return value;
  })
  sanctions: boolean;

  @IsBoolean()
  @Transform(({ value }) => {
    if (value === "true" || value === true) return true;
    if (value === "false" || value === false) return false;
    if (value === "yes") return true;
    if (value === "no") return false;
    return value;
  })
  pep: boolean;

  @IsString()
  @IsNotEmpty()
  notes: string;
}

class CounterParty implements counterParty {
  @IsBoolean()
  @Transform(({ value }) => {
    if (value === "true" || value === true) return true;
    if (value === "false" || value === false) return false;
    if (value === "yes") return true;
    if (value === "no") return false;
    return value;
  })
  sanctionsHit: boolean;

  @IsBoolean()
  @Transform(({ value }) => {
    if (value === "true" || value === true) return true;
    if (value === "false" || value === false) return false;
    if (value === "yes") return true;
    if (value === "no") return false;
    return value;
  })
  pepStatus: boolean;

  @IsBoolean()
  @Transform(({ value }) => {
    if (value === "true" || value === true) return true;
    if (value === "false" || value === false) return false;
    if (value === "yes") return true;
    if (value === "no") return false;
    return value;
  })
  adverseNews: boolean;

  @IsString()
  @IsNotEmpty()
  details: string;

  @IsBoolean()
  @Transform(({ value }) => {
    if (value === "true" || value === true) return true;
    if (value === "false" || value === false) return false;
    if (value === "yes") return true;
    if (value === "no") return false;
  })
  fundsFreezeObligations: boolean;
}

class ISource implements Source {
  @IsArray()
  @ArrayNotEmpty()
  @ArrayUnique()
  @IsString({ each: true })
  source: string[];

  @IsString()
  comment: string;

  @IsArray()
  @ArrayNotEmpty()
  @ArrayUnique()
  @IsString({ each: true })
  links: string[];
}

export class PepEnhancedDueDiligence implements pepEnhancedDueDiligence {
  @IsString()
  @IsNotEmpty()
  @IsMongoId()
  alertId: Types.ObjectId;

  @IsString()
  @IsIn(Object.values(eddType))
  @IsOptional()
  eddType: eddType = eddType.pep;

  @IsString()
  @IsOptional()
  @IsIn(Object.values(PepCategory))
  pepCategory: PepCategory;

  @IsString()
  @IsNotEmpty()
  countryOfResidence: string;

  @IsString()
  @IsNotEmpty()
  occupation: string;

  @IsBoolean()
  @Transform(({ value }) => {
    if (value === "true" || value === true) return true;
    if (value === "false" || value === false) return false;
    if (value === "yes") return true;
    if (value === "no") return false;
    return value;
  })
  publicFunction: boolean;

  @IsString()
  @IsNotEmpty()
  positionLevel: string;

  @IsString()
  @IsNotEmpty()
  governmentEntity: string;

  @IsBoolean()
  @Transform(({ value }) => {
    if (value === "true" || value === true) return true;
    if (value === "false" || value === false) return false;
    if (value === "yes") return true;
    if (value === "no") return false;
    return value;
  })
  isControlOverPublicFunds: boolean;

  @IsBoolean()
  @Transform(({ value }) => {
    if (value === "true" || value === true) return true;
    if (value === "false" || value === false) return false;
    if (value === "yes") return true;
    if (value === "no") return false;
    return value;
  })
  isRoleLinkedToHighValue: boolean;

  @IsString()
  @IsNotEmpty()
  familyMemberOfAPep: string;

  @IsString()
  @IsNotEmpty()
  estimatedNetWorth: string;

  @IsString()
  @IsNotEmpty()
  sourceOfWealthDocumentation: string;

  @IsString()
  @IsNotEmpty()
  sourceOfFund: string;

  @IsString()
  @IsNotEmpty()
  sourceOfFundDocumentation: string;

  @IsBoolean()
  @Transform(({ value }) => {
    if (value === "true" || value === true) return true;
    if (value === "false" || value === false) return false;
    if (value === "yes" || value === true) return true;
    if (value === "no" || value === false) return false;
    return value;
  })
  offshoreStructure: boolean;

  @IsBoolean()
  @Transform(({ value }) => {
    if (value === "true" || value === true) return true;
    if (value === "false" || value === false) return false;
    if (value === "yes" || value === true) return true;
    if (value === "no" || value === false) return false;
    return value;
  })
  isPepHighRiskOrSanctioned: boolean;

  @IsBoolean()
  @Transform(({ value }) => {
    if (value === "true" || value === true) return true;
    if (value === "false" || value === false) return false;
    if (value === "yes" || value === true) return true;
    if (value === "no" || value === false) return false;
    return value;
  })
  hasNameInCorruptionInvestigations: boolean;

  @IsBoolean()
  @Transform(({ value }) => {
    if (value === "true" || value === true) return true;
    if (value === "false" || value === false) return false;
    if (value === "yes" || value === true) return true;
    if (value === "no" || value === false) return false;
    return value;
  })
  adverseMediaFindingsOnPep: boolean;

  @IsBoolean()
  @Transform(({ value }) => {
    if (value === "true" || value === true) return true;
    if (value === "false" || value === false) return false;
    if (value === "yes" || value === true) return true;
    if (value === "no" || value === false) return false;
    return value;
  })
  willEnhancedMonitoringBeApplied: boolean;

  @IsBoolean()
  @Transform(({ value }) => {
    if (value === "true" || value === true) return true;
    if (value === "false" || value === false) return false;
    if (value === "yes" || value === true) return true;
    if (value === "no" || value === false) return false;
    return value;
  })
  willSeniorManagementSignOff: boolean;

  @IsString()
  @IsIn(["Quarterly", "Monthly", "Annually"])
  frequencyOfOngoingDueDiligenceChecks: "Quarterly" | "Monthly" | "Annually";

  @IsBoolean()
  @Transform(({ value }) => {
    if (value === "true" || value === true) return true;
    if (value === "false" || value === false) return false;
    if (value === "yes" || value === true) return true;
    if (value === "no" || value === false) return false;
    return value;
  })
  seniorManagementApproval: boolean;

  @IsString()
  @IsNotEmpty()
  approverName: string;

  @IsString()
  @IsNotEmpty()
  department: string;

  @IsString()
  @IsNotEmpty()
  position: string;

  file?: File[];

  @IsArray()
  @IsUrl({}, { each: true })
  @IsString({ each: true })
  supportingLinks: string[];

  @IsString()
  @IsNotEmpty()
  @IsIn(["File Sar Report", "Approved Pep EDD", "Further EDD"])
  eddDecision: "File Sar Report" | "Approved Pep EDD" | "Further EDD";

  @IsBoolean()
  @Transform(({ value }) => {
    if (value === "true" || value === true) return true;
    if (value === "false" || value === false) return false;
    if (value === "yes" || value === true) return true;
    if (value === "no" || value === false) return false;
    return value;
  })
  addCustomerToPEPRegisterForOngoingMonitoring: boolean;

  @IsString()
  @IsNotEmpty()
  decisionRationale: string;

  @IsString()
  @IsNotEmpty()
  @IsIn(Object.values(selectedDecision))
  finalCaseDecision: selectedDecision;

  @IsString()
  @IsNotEmpty()
  finalDecisionRationale: string;
}

export class SanctionReview implements sanctionReview {
  @IsMongoId()
  @IsString()
  @IsNotEmpty()
  alertId: Types.ObjectId;

  @IsString()
  @IsOptional()
  @IsIn(Object.values(eddType))
  eddType: eddType = eddType.sanctions;

  @IsArray()
  @ArrayUnique()
  @ArrayNotEmpty()
  @IsString({ each: true })
  documentsObtained: string[];

  @IsString()
  @IsNotEmpty()
  identityVerificationNotes: string;

  @IsString()
  @IsNotEmpty()
  kycOrEDDReviewFindings: string;

  @IsString()
  @IsNotEmpty()
  adverseMediaFinding: string;

  @IsArray()
  @IsDefined()
  @ValidateNested()
  @Type(() => IShareholder)
  shareholdersChecks: Shareholder[];

  @IsArray()
  @IsDefined()
  @ValidateNested()
  @Type(() => IDirector)
  directorsChecks: Director[];

  @IsArray()
  @ArrayUnique()
  @ArrayNotEmpty()
  @IsString({ each: true })
  authoritiesScreening: string[];

  @IsString()
  @IsNotEmpty()
  pastCurrentAndPendingTransactions: string;

  @IsObject()
  @ValidateNested()
  @Type(() => CounterParty)
  counterParty: counterParty;

  @IsArray()
  @IsString({ each: true })
  sanctionReviewChecklist: string[];

  @IsString()
  @IsNotEmpty()
  @IsIn(Object.values(sanctionsResult))
  matchType: sanctionsResult;

  @IsString()
  @IsNotEmpty()
  recommendedActionAction: string;

  @IsString()
  @IsNotEmpty()
  commentsAndRationale: string;

  @IsString()
  @IsNotEmpty()
  @IsIn(Object.values(selectedDecision))
  finalCaseDecision: selectedDecision;

  @IsString()
  @IsNotEmpty()
  finalDecisionRationale: string;
}

export class FinancialCrime implements financialCrime {
  @IsMongoId()
  @IsString()
  @IsNotEmpty()
  alertId: Types.ObjectId;

  @IsString()
  @IsOptional()
  @IsIn(Object.values(eddType))
  eddType: eddType = eddType.financial;

  @IsString()
  @IsNotEmpty()
  fullNameOfEntity: string;

  @IsString()
  @IsNotEmpty()
  countryOfIncorporation: string;

  @IsString()
  @IsNotEmpty()
  familyMemberOfAPep: string;

  @IsString()
  @IsNotEmpty()
  natureOfBusinessOrOccupation: string;

  @IsBoolean()
  @Transform(({ value }) => {
    if (value === "true" || value === true) return true;
    if (value === "false" || value === false) return false;
    if (value === "yes" || value === true) return true;
    if (value === "no" || value === false) return false;
    return value;
  })
  complexOwnershipStructure: boolean;

  @IsObject()
  @ValidateNested()
  @Type(() => ISource)
  sourceOfWealths: Source;

  @IsObject()
  @ValidateNested()
  @Type(() => ISource)
  sourceOfFunds: Source;

  @IsArray()
  @IsString({ each: true })
  financialProduct: string[];

  @IsBoolean()
  @Transform(({ value }) => {
    if (value === "true" || value === true) return true;
    if (value === "false" || value === false) return false;
    if (value === "yes" || value === true) return true;
    if (value === "no" || value === false) return false;
    return value;
  })
  thirdPartyPayment: boolean;

  @IsString()
  @IsNotEmpty()
  relationshipNote: string;

  @IsString()
  @IsNotEmpty()
  sanctionTouchPoints: string;

  @IsString()
  @IsOptional()
  sanctionTouchPointsNote?: string;

  @IsString()
  @IsNotEmpty()
  adverseNewsOrMedia: string;

  @IsString()
  @IsOptional()
  adverseNewsOrMediaNote?: string;

  @IsArray()
  @ArrayUnique()
  @ArrayNotEmpty()
  @IsString({ each: true })
  businessOperationsCountries: string[];

  @IsArray()
  @ArrayUnique()
  @ArrayNotEmpty()
  @IsString({ each: true })
  primaryCustomersOrSuppliersCountries: string[];

  @IsArray()
  @ArrayUnique()
  @ArrayNotEmpty()
  @IsString({ each: true })
  fundFlowCountries: string[];

  @IsBoolean()
  @Transform(({ value }) => {
    if (value === "true" || value === true) return true;
    if (value === "false" || value === false) return false;
    if (value === "yes" || value === true) return true;
    if (value === "no" || value === false) return false;
    return value;
  })
  isAnyCountriesHighRisk: boolean;

  @IsString()
  @IsNotEmpty()
  finalRiskRating: string;

  @IsString()
  @IsNotEmpty()
  riskDriverSummary: string;

  @IsArray()
  @ArrayUnique()
  @ArrayNotEmpty()
  @IsString({ each: true })
  mitigatingMeasures: string[];

  @IsString()
  @IsNotEmpty()
  @IsIn(Object.values(selectedDecision))
  finalCaseDecision: selectedDecision;

  @IsString()
  @IsNotEmpty()
  finalDecisionRationale: string;
}

class EvidenceCollecting implements evidenceCollect {
  @IsNumber()
  @IsNotEmpty()
  @Transform(({ value }) =>
    typeof value === "string" ? parseInt(value, 10) : value
  )
  transactionRecord: number;

  @IsString()
  @IsNotEmpty()
  riskLevel: string;

  @IsString()
  @IsNotEmpty()
  status: string;
}
export class UpdateCase implements updateCase {
  @IsString()
  @IsOptional()
  status: string;

  @IsString()
  @IsOptional()
  assignTo: string;

  @IsString()
  @IsOptional()
  priority: string;

  @IsInt()
  @IsOptional()
  @Transform(({ value }) =>
    typeof value === "string" ? parseInt(value, 10) : value
  )
  progress: number;

  @IsString()
  @IsOptional()
  pepStatus: string;

  @IsString()
  @IsOptional()
  adverseMedia: string;

  @IsString()
  @IsOptional()
  @Transform(({ value }) =>
    typeof value === "string" ? new Date(value) : value
  )
  lastKycUpdate: Date;

  @IsString()
  @IsOptional()
  sanctions: string;

  @IsNumber()
  @IsOptional()
  @Transform(({ value }) =>
    typeof value === "string" ? parseFloat(value) : value
  )
  totalTransaction: number;

  @IsNumber()
  @IsOptional()
  @Transform(({ value }) =>
    typeof value === "string" ? parseFloat(value) : value
  )
  totalAmount: number;

  @IsNumber()
  @IsOptional()
  @Transform(({ value }) =>
    typeof value === "string" ? parseInt(value, 10) : value
  )
  riskScore: number;

  @IsArray()
  @IsDefined()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => EvidenceCollecting)
  evidenceCollecting: evidenceCollect[];

  @IsNumber()
  @IsOptional()
  decisionRationale: string;

  @IsNumber()
  @IsOptional()
  caseDecision: string;
}
export class FindManyCase extends FindMany implements findManyCase {
  @IsOptional()
  @IsString({ each: true })
  @Transform(({ value }) => (typeof value === "string" ? [value] : value))
  caseId?: string[];

  @IsOptional()
  @IsString({ each: true })
  @Transform(({ value }) => (typeof value === "string" ? [value] : value))
  status?: string[];

  @IsOptional()
  @IsString({ each: true })
  @Transform(({ value }) => (typeof value === "string" ? [value] : value))
  priority?: string[];
}
export class FindOneCase extends FindOne implements findOneCase {
  @IsOptional()
  @IsString()
  caseId: string;

  @IsOptional()
  @IsString()
  status: string;

  @IsOptional()
  @IsString()
  priority: string;
}

export class AddOrRemoveEvidence
  extends EvidenceCollecting
  implements addOrRemoveEvidence
{
  @IsString()
  @IsMongoId()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  @IsIn(["delete", "add"])
  type: "delete" | "add";
}
