import { Transform, Type } from "class-transformer";
import {
  IsArray,
  IsDefined,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";
import {
  directorType,
  fieldTypeArray,
  fieldTypeString,
  kycDocumentType,
  kycLinkType,
  ownershipType,
  subShareholder,
  update,
} from "../interface";
import {
  Directors,
  FieldTypeArray,
  FieldTypeString,
  KycDocument,
  KYCLink,
  OwnershipType,
  SubShareHolder,
} from "./define.dto";

export class UpdateKYC implements update {
  @IsDefined()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => FieldTypeString)
  accountNumber: fieldTypeString;

  @IsDefined()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => FieldTypeString)
  entityName: fieldTypeString;

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

  @IsDefined()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => FieldTypeString)
  companyNumber: fieldTypeString;

  @IsDefined()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => FieldTypeString)
  industry: fieldTypeString;

  @IsDefined()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => FieldTypeString)
  countryOfOrigin: fieldTypeString;

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

  @IsDefined()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => FieldTypeString)
  expectedTransactionFrequency: fieldTypeString;

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

  @IsArray()
  @IsDefined()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => KycDocument)
  sourcesOfWealthEvidenceDocument: kycDocumentType[];

  @IsArray()
  @IsDefined()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => KycDocument)
  sourceOfFundsVerificationDocument: kycDocumentType[];

  @IsArray()
  @IsDefined()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => KycDocument)
  enhancedBeneficialOwnershipDocument: kycDocumentType[];

  @IsArray()
  @IsDefined()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => KycDocument)
  financialStatementsDocument: kycDocumentType[];

  @IsArray()
  @IsDefined()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => KycDocument)
  taxReturnsOrCertificatesDocument: kycDocumentType[];

  @IsArray()
  @IsDefined()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => KycDocument)
  professionalReferencesDocument: kycDocumentType[];

  @IsArray()
  @IsDefined()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => KycDocument)
  assetValuationReportsDocument: kycDocumentType[];

  @IsArray()
  @IsDefined()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => KycDocument)
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

  @IsArray()
  @IsDefined()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => KycDocument)
  annualReportDocument: kycDocumentType[];

  @IsArray()
  @IsDefined()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => KycDocument)
  incorporationCertificateDocument: kycDocumentType[];

  @IsArray()
  @IsDefined()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => KycDocument)
  listOfDirectorsDocument: kycDocumentType[];

  @IsArray()
  @IsDefined()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => KycDocument)
  shareholdersDocument: kycDocumentType[];

  @IsArray()
  @IsDefined()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => KycDocument)
  memorandumDocument: kycDocumentType[];

  @IsArray()
  @IsDefined()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => KycDocument)
  natureOfBusinessDocument: kycDocumentType[];

  @IsArray()
  @IsDefined()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => KycDocument)
  proofOfIdDocument: kycDocumentType[];

  @IsArray()
  @IsDefined()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => KycDocument)
  proofOfIdUboDocument: kycDocumentType[];

  @IsArray()
  @IsDefined()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => KycDocument)
  proofOfListingDocument: kycDocumentType[];

  @IsArray()
  @IsDefined()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => KycDocument)
  proofOfRegulationDocument: kycDocumentType[];

  @IsArray()
  @IsDefined()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => KycDocument)
  sanctionScreeningDocument: kycDocumentType[];

  @IsArray()
  @IsDefined()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => KycDocument)
  sanctionScreeningUboDocument: kycDocumentType[];

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

  @IsInt()
  @Transform(({ value }) => parseInt(value, 10))
  score?: number;

  @IsString()
  @IsNotEmpty()
  comment?: string;
}
