import { uploadFile } from "@/global/entities";
import { Types } from "mongoose";

export enum kycStatus {
  queued = "queued",
  completed = "completed",
  underReview = "underReview",
  flagged = "flagged",
}

export enum riskLevel {
  low = "LOW",
  medium = "MEDIUM",
  high = "HIGH",
}

export enum mark {
  pending = "pending",
  correct = "correct",
  wrong = "wrong",
}

export enum ownershipIdType {
  pass = "Passport",
  id = "National ID",
  dl = "Driver's License",
  others = "others",
}

export enum shipType {
  in = "individual",
  co = "corporate",
}

export type subShareholderDetails = {
  shareholderName: string;
  type: shipType;
  ownershipPercentage: number;
  nationality: string;
  dateOfBirth: Date;
  placeOfBirth: string;
  idNumber: string;
  registrationNumber: string;
  address: string;
  politicallyExposedPerson: boolean;
  status: mark;
};

export type subShareholder = {
  parentIdentifier: string;
  detailed: subShareholderDetails[];
};

export type ownershipType = {
  firstName?: string;
  lastName?: string;
  organizationName?: string;
  type: shipType;
  ownershipPercentage: number;
  nationality?: string;
  countryOfResidence?: string;
  occupation?: string;
  idType?: ownershipIdType;
  uploadIdDocument?: uploadFile | kycDocumentType;
  uploadProofOfAddress?: uploadFile | kycDocumentType;
  countryOfOperation?: string;
  registrationNumber?: string;
  politicallyExposedPerson?: politicallyExposedPerson;
  sanctionsScreening: sanctionsScreening;
  adverseNews: adverseNews;
  identifier: string;
  status: mark;
};

// export interface foundersType extends Omit<directorType, "appointmentDate"> {
//   occupation: string;
//   nationality: string;
//   countryOfResidence: string;
//   dateOfBirth: Date;
//   idType: ownershipIdType;
//   idDocument?: uploadFile | kycDocumentType;
//   pep: boolean;
//   sanctions: boolean;
//   adverse: boolean;
//   sourceOfWealth: string;
//   sourceOfFunds: string;
// }

export type politicallyExposedPerson = {
  // pep details
  politicalPositionHeld: string;
  tenurePeriod: string;
  familyOrCloseAssociateConnection: string;

  // enhanced source of wealth verification
  detailedSourceOfWealth: string;
  bankStatementsDocuments: kycDocumentType[];
  sourceOfWealthEvidenceDocuments: kycDocumentType[];
  additionalSupportingDocuments: kycDocumentType[];

  // Risk assessment & monitoring
  overAllRiskRating: string;
  mitigatingFactors: string;
  ongoingMonitoringRequirements: string;
};

export interface adverseNews
  extends Omit<
    politicallyExposedPerson,
    | "politicalPositionHeld"
    | "tenurePeriod"
    | "familyOrCloseAssociateConnection"
  > {
  // Adverse News information
  dateOfNewOrAllegation: Date;
  newsSource: string;
  detailsOfAdverseNews: string;
  assessmentOfImpactOrResolution: string;
}

export interface sanctionsScreening
  extends Omit<
    politicallyExposedPerson,
    | "politicalPositionHeld"
    | "tenurePeriod"
    | "familyOrCloseAssociateConnection"
  > {
  // sanctions information
  sanctioningJurisdiction: string;
  currentStatus: string;
  sanctionsDetails: string;
}

export type directorType = {
  firstName: string;
  lastName: string;
  position: string;
  occupation: string;
  nationality: string;
  countryOfResidence: string;
  dateOfBirth: Date;
  idType: string;
  uploadIdDocument: uploadFile | kycDocumentType;
  politicallyExposedPerson?: politicallyExposedPerson;
  sanctionsScreening: sanctionsScreening;
  adverseNews: adverseNews;
  status: mark;
};

export type kycDocumentType = {
  name: string;
  type: string;
  uri: string;
  uploadedDate: Date;
  status?: mark;
};

export type kycLinkType = {
  link: string;
  description?: string;
  status: mark;
};

export interface FileProcessingResult {
  annualReportDocument: kycDocumentType[];
  incorporationCertificateDocument: kycDocumentType[];
  listOfDirectorsDocument: kycDocumentType[];
  shareholdersDocument: kycDocumentType[];
  memorandumDocument: kycDocumentType[];
  natureOfBusinessDocument: kycDocumentType[];
  proofOfIdDocument: kycDocumentType[];
  proofOfIdUboDocument: kycDocumentType[];
  proofOfListingDocument: kycDocumentType[];
  proofOfRegulationDocument: kycDocumentType[];
  sanctionScreeningDocument: kycDocumentType[];
  sanctionScreeningUboDocument: kycDocumentType[];
}

export type fieldTypeString = {
  value: string;
  status: mark;
};

export type fieldTypeArray = {
  value: string[];
  status: mark;
};

export interface KycTrainingPortal {
  _id?: Types.ObjectId;
  caseId?: string;
  accountNumber: fieldTypeString;
  productType: fieldTypeArray;
  entityName: fieldTypeString;
  companyNumber: fieldTypeString;
  incorporationDate: fieldTypeString;
  registeredOfficeAddress: fieldTypeString;
  natureOfBusiness: fieldTypeString;
  entityType: fieldTypeString;
  industry: fieldTypeString;
  countryOfOrigin: fieldTypeString;
  expectedTransactionVolume: fieldTypeString;
  sourceOfWealth: fieldTypeArray;
  expectedTransactionFrequency: fieldTypeString;
  entityDescription: fieldTypeString;

  // new
  sourcesOfWealth: fieldTypeArray;
  sourcesOfWealthExplanation: fieldTypeString;
  sourceOfFunds: fieldTypeArray;
  sourcesOfFundsExplanation: fieldTypeString;
  sourcesOfWealthEvidenceDocument: kycDocumentType[];
  sourceOfFundsVerificationDocument: kycDocumentType[];
  enhancedBeneficialOwnershipDocument: kycDocumentType[];
  financialStatementsDocument: kycDocumentType[];
  taxReturnsOrCertificatesDocument: kycDocumentType[];
  professionalReferencesDocument: kycDocumentType[];
  assetValuationReportsDocument: kycDocumentType[];
  transactionHistoryDocument: kycDocumentType[];
  riskMitigationFactors: fieldTypeString;
  ongoingMonitoringRequirements: fieldTypeString;
  seniorManagementJustification: fieldTypeString;

  directors: directorType[];
  shareholders: ownershipType[];
  subShareholder: subShareholder[];

  // founders: foundersType[];
  // boardOfDirectors: foundersType[];
  // foundationCouncil: foundersType[];

  annualReportDocument: kycDocumentType[];
  incorporationCertificateDocument: kycDocumentType[];
  listOfDirectorsDocument: kycDocumentType[];
  shareholdersDocument: kycDocumentType[];
  memorandumDocument: kycDocumentType[];
  natureOfBusinessDocument: kycDocumentType[];
  proofOfIdDocument: kycDocumentType[];
  proofOfIdUboDocument: kycDocumentType[];
  proofOfListingDocument: kycDocumentType[];
  proofOfRegulationDocument: kycDocumentType[];
  sanctionScreeningDocument: kycDocumentType[];
  sanctionScreeningUboDocument: kycDocumentType[];
  submittedDate: Date;
  riskLevel: riskLevel;
  score: number;
  annualReportLinks: kycLinkType[];
  incorporationCertificateLinks: kycLinkType[];
  listOfDirectorsLinks: kycLinkType[];
  shareholdersLinks: kycLinkType[];
  memorandumLinks: kycLinkType[];
  natureOfBusinessLinks: kycLinkType[];
  proofOfIdLinks: kycLinkType[];
  proofOfIdUboLinks: kycLinkType[];
  proofOfListingLinks: kycLinkType[];
  proofOfRegulationLinks: kycLinkType[];
  sanctionScreeningLinks: kycLinkType[];
  sanctionScreeningUboLinks: kycLinkType[];
  status: kycStatus;
  comment?: string;
  decision: "Decline" | "Request Info" | "Approve";
  detailedAnalysisAndFinding: string;
  internalComments: string;
  student?: Types.ObjectId;
  facilitator?: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}
