import { Type } from "class-transformer";
import {
  IsArray,
  IsDefined,
  IsIn,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";
import {
  create,
  directorType,
  fieldTypeArray,
  fieldTypeString,
  kycDocumentType,
  kycLinkType,
  ownershipType,
  riskLevel,
  subShareholder,
} from "../interface";
import {
  Directors,
  FieldTypeArray,
  FieldTypeString,
  KYCLink,
  OwnershipType,
  SubShareHolder,
} from "./define.dto";

export class CreateKYC implements create {
  @IsObject()
  @IsDefined()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => FieldTypeString)
  accountNumber: fieldTypeString;

  @IsObject()
  @IsDefined()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => FieldTypeString)
  entityName: fieldTypeString;

  @IsObject()
  @IsDefined()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => FieldTypeString)
  entityType: fieldTypeString;

  @IsDefined()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => FieldTypeArray)
  productType: fieldTypeArray;

  @IsObject()
  @IsOptional()
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => FieldTypeString)
  companyNumber: fieldTypeString;

  @IsDefined()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => FieldTypeString)
  incorporationDate: fieldTypeString;

  @IsDefined()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => FieldTypeString)
  registeredOfficeAddress: fieldTypeString;

  @IsDefined()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => FieldTypeString)
  natureOfBusiness: fieldTypeString;

  @IsDefined()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => FieldTypeString)
  industry: fieldTypeString;

  @IsObject()
  @IsDefined()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => FieldTypeString)
  countryOfOrigin: fieldTypeString;

  @IsObject()
  @IsDefined()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => FieldTypeString)
  expectedTransactionVolume: fieldTypeString;

  @IsDefined()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => FieldTypeArray)
  sourceOfWealth: fieldTypeArray;

  @IsObject()
  @IsDefined()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => FieldTypeString)
  expectedTransactionFrequency: fieldTypeString;

  @IsObject()
  @IsDefined()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => FieldTypeString)
  entityDescription: fieldTypeString;

  @IsDefined()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => FieldTypeArray)
  sourcesOfWealth: fieldTypeArray;

  @IsDefined()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => FieldTypeString)
  sourcesOfWealthExplanation: fieldTypeString;

  @IsDefined()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => FieldTypeArray)
  sourceOfFunds: fieldTypeArray;

  @IsDefined()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => FieldTypeString)
  sourcesOfFundsExplanation: fieldTypeString;

  sourcesOfWealthEvidenceDocument: kycDocumentType[];
  sourceOfFundsVerificationDocument: kycDocumentType[];
  enhancedBeneficialOwnershipDocument: kycDocumentType[];
  financialStatementsDocument: kycDocumentType[];
  taxReturnsOrCertificatesDocument: kycDocumentType[];
  professionalReferencesDocument: kycDocumentType[];
  assetValuationReportsDocument: kycDocumentType[];
  transactionHistoryDocument: kycDocumentType[];

  @IsDefined()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => FieldTypeString)
  riskMitigationFactors: fieldTypeString;

  @IsDefined()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => FieldTypeString)
  ongoingMonitoringRequirements: fieldTypeString;

  @IsDefined()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => FieldTypeString)
  seniorManagementJustification: fieldTypeString;

  @IsArray()
  @IsDefined()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => OwnershipType)
  shareholders: ownershipType[];

  @IsArray()
  @IsDefined()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => Directors)
  directors: directorType[];

  @IsArray()
  @IsDefined()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => SubShareHolder)
  subShareholder: subShareholder[];

  @IsString()
  @IsIn(Object.values(riskLevel))
  riskLevel: riskLevel;

  @IsArray()
  @IsDefined()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => KYCLink)
  annualReportLinks: kycLinkType[];

  @IsArray()
  @IsDefined()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => KYCLink)
  incorporationCertificateLinks: kycLinkType[];

  @IsArray()
  @IsDefined()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => KYCLink)
  listOfDirectorsLinks: kycLinkType[];

  @IsArray()
  @IsDefined()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => KYCLink)
  shareholdersLinks: kycLinkType[];

  @IsArray()
  @IsDefined()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => KYCLink)
  memorandumLinks: kycLinkType[];

  @IsArray()
  @IsDefined()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => KYCLink)
  natureOfBusinessLinks: kycLinkType[];

  @IsArray()
  @IsDefined()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => KYCLink)
  proofOfIdLinks: kycLinkType[];

  @IsArray()
  @IsDefined()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => KYCLink)
  proofOfIdUboLinks: kycLinkType[];

  @IsArray()
  @IsDefined()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => KYCLink)
  proofOfListingLinks: kycLinkType[];

  @IsArray()
  @IsDefined()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => KYCLink)
  proofOfRegulationLinks: kycLinkType[];

  @IsArray()
  @IsDefined()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => KYCLink)
  sanctionScreeningLinks: kycLinkType[];

  @IsArray()
  @IsDefined()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => KYCLink)
  sanctionScreeningUboLinks: kycLinkType[];

  @IsString()
  @IsIn(["Decline", "Request Info", "Approve"])
  decision: "Decline" | "Request Info" | "Approve";

  @IsString()
  @IsOptional()
  detailedAnalysisAndFinding: string;

  @IsString()
  @IsOptional()
  internalComments: string;

  // @IsArray()
  // @IsDefined()
  // @IsOptional()
  // @ValidateNested({ each: true })
  // @Type(() => KYCLink)
  // sourceOfIncomeLinks: kycLinkType[];

  // @IsArray()
  // @IsDefined()
  // @IsOptional()
  // @ValidateNested({ each: true })
  // @Type(() => KYCLink)
  // proofOfAddressLinks: kycLinkType[];

  // @IsArray()
  // @IsDefined()
  // @IsOptional()
  // @ValidateNested({ each: true })
  // @Type(() => FoundersType)
  // founders: foundersType[];

  // @IsArray()
  // @IsDefined()
  // @IsOptional()
  // @ValidateNested({ each: true })
  // @Type(() => FoundersType)
  // boardOfDirectors: foundersType[];

  // @IsArray()
  // @IsDefined()
  // @IsOptional()
  // @ValidateNested({ each: true })
  // @Type(() => FoundersType)
  // foundationCouncil: foundersType[];

  // @IsArray()
  // @IsDefined()
  // @IsOptional()
  // @ValidateNested({ each: true })
  // @Type(() => SubsidiaryShareholder)
  // subsidiaryShareholder: subsidiaryShareholder[];
}
