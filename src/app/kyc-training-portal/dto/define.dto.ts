import { uploadFile } from "@/global/entities";
import { Transform, Type } from "class-transformer";
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsDefined,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  IsUrl,
  ValidateNested,
} from "class-validator";
import {
  adverseNews,
  directorType,
  fieldTypeArray,
  fieldTypeString,
  kycDocumentType,
  kycLinkType,
  mark,
  ownershipIdType,
  ownershipType,
  politicallyExposedPerson,
  sanctionsScreening,
  shipType,
  subShareholder,
  subShareholderDetails,
} from "../interface";

export class FieldTypeString implements fieldTypeString {
  @IsString()
  @IsOptional()
  value: string;

  @IsIn(Object.values(mark))
  @IsOptional()
  status: mark;
}

export class FieldTypeArray implements fieldTypeArray {
  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  value: string[];

  @IsOptional()
  @IsIn(Object.values(mark))
  status: mark;
}

class PoliticallyExposedPerson implements politicallyExposedPerson {
  @IsString()
  @IsOptional()
  politicalPositionHeld: string;

  @IsString()
  @IsOptional()
  tenurePeriod: string;

  @IsString()
  @IsOptional()
  familyOrCloseAssociateConnection: string;

  @IsString()
  @IsOptional()
  detailedSourceOfWealth: string;

  @IsOptional()
  @Type(() => Buffer)
  bankStatementsDocuments: kycDocumentType[];

  @IsOptional()
  @Type(() => Buffer)
  sourceOfWealthEvidenceDocuments: kycDocumentType[];

  @IsOptional()
  @Type(() => Buffer)
  additionalSupportingDocuments: kycDocumentType[];

  @IsString()
  @IsOptional()
  overAllRiskRating: string;

  @IsString()
  @IsOptional()
  mitigatingFactors: string;

  @IsString()
  @IsOptional()
  ongoingMonitoringRequirements: string;
}

class SanctionsScreening implements sanctionsScreening {
  @IsString()
  @IsOptional()
  sanctioningJurisdiction: string;

  @IsString()
  @IsOptional()
  currentStatus: string;

  @IsString()
  @IsOptional()
  sanctionsDetails: string;

  @IsString()
  @IsOptional()
  detailedSourceOfWealth: string;

  @IsOptional()
  @Type(() => Buffer)
  bankStatementsDocuments: kycDocumentType[];

  @IsOptional()
  @Type(() => Buffer)
  sourceOfWealthEvidenceDocuments: kycDocumentType[];

  @IsOptional()
  @Type(() => Buffer)
  additionalSupportingDocuments: kycDocumentType[];

  @IsString()
  @IsOptional()
  overAllRiskRating: string;

  @IsString()
  @IsOptional()
  mitigatingFactors: string;

  @IsString()
  @IsOptional()
  ongoingMonitoringRequirements: string;
}

class AdverseNews implements adverseNews {
  @IsDate()
  @IsOptional()
  @Transform(({ value }) =>
    typeof value === "string" ? new Date(value) : value
  )
  dateOfNewOrAllegation: Date;

  @IsString()
  @IsOptional()
  newsSource: string;

  @IsString()
  @IsOptional()
  detailsOfAdverseNews: string;

  @IsString()
  @IsOptional()
  assessmentOfImpactOrResolution: string;

  @IsString()
  @IsOptional()
  detailedSourceOfWealth: string;

  @IsOptional()
  @Type(() => Buffer)
  bankStatementsDocuments: kycDocumentType[];

  @IsOptional()
  @Type(() => Buffer)
  sourceOfWealthEvidenceDocuments: kycDocumentType[];

  @IsOptional()
  @Type(() => Buffer)
  additionalSupportingDocuments: kycDocumentType[];

  @IsString()
  @IsOptional()
  overAllRiskRating: string;

  @IsString()
  @IsOptional()
  mitigatingFactors: string;

  @IsString()
  @IsOptional()
  ongoingMonitoringRequirements: string;
}

export class OwnershipType implements ownershipType {
  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  lastName?: string;

  @IsString()
  @IsOptional()
  organizationName?: string;

  @IsString()
  @IsOptional()
  @IsIn(Object.values(shipType))
  type: shipType;

  @IsNumber()
  @IsOptional()
  @Transform(({ value }) =>
    typeof value === "string" ? parseFloat(value) : value
  )
  ownershipPercentage: number;

  @IsString()
  @IsOptional()
  nationality?: string;

  @IsString()
  @IsOptional()
  countryOfResidence?: string;

  @IsString()
  @IsOptional()
  occupation?: string;

  @IsString()
  @IsOptional()
  idType?: ownershipIdType;

  @IsOptional()
  uploadIdDocument?: uploadFile | kycDocumentType;

  @IsOptional()
  uploadProofOfAddress?: uploadFile | kycDocumentType;

  @IsString()
  @IsOptional()
  countryOfOperation?: string;

  @IsString()
  @IsOptional()
  registrationNumber?: string;

  @IsObject()
  @IsDefined()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => PoliticallyExposedPerson)
  politicallyExposedPerson?: politicallyExposedPerson;

  @IsObject()
  @IsDefined()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => SanctionsScreening)
  sanctionsScreening: sanctionsScreening;

  @IsObject()
  @IsDefined()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => AdverseNews)
  adverseNews: adverseNews;

  @IsString()
  @IsOptional()
  identifier: string;

  @IsOptional()
  @IsIn(Object.values(mark))
  status: mark;
}

export class Directors implements directorType {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsOptional()
  occupation: string;

  @IsString()
  @IsOptional()
  nationality: string;

  @IsString()
  @IsOptional()
  countryOfResidence: string;

  @IsDate()
  @IsOptional()
  @Transform(({ value }) =>
    typeof value === "string" ? new Date(value) : value
  )
  dateOfBirth: Date;

  @IsString()
  @IsNotEmpty()
  @IsIn(Object.values(shipType))
  idType: string;

  @IsOptional()
  @Type(() => Buffer)
  uploadIdDocument: Express.Multer.File | kycDocumentType;

  @IsObject()
  @IsDefined()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => PoliticallyExposedPerson)
  politicallyExposedPerson?: politicallyExposedPerson;

  @IsObject()
  @IsDefined()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => SanctionsScreening)
  sanctionsScreening: sanctionsScreening;

  @IsObject()
  @IsDefined()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => AdverseNews)
  adverseNews: adverseNews;

  @IsString()
  @IsOptional()
  position: string;

  @IsIn(Object.values(mark))
  @IsOptional()
  status: mark;
}

export class KYCLink implements kycLinkType {
  @IsString()
  @IsNotEmpty()
  @IsUrl()
  link: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  @IsIn(Object.values(mark))
  status: mark;
}

// export class FoundersType implements foundersType {
//   @IsString()
//   @IsOptional()
//   occupation: string;

//   @IsString()
//   @IsOptional()
//   nationality: string;

//   @IsString()
//   @IsOptional()
//   countryOfResidence: string;

//   @IsDate()
//   @IsOptional()
//   @Transform(({ value }) =>
//     typeof value === "string" ? new Date(value) : value
//   )
//   dateOfBirth: Date;

//   @IsString()
//   @IsOptional()
//   @IsIn(Object.values(ownershipIdType))
//   idType: ownershipIdType;

//   @IsOptional()
//   idDocument?: uploadFile | kycDocumentType;

//   @IsBoolean()
//   @IsOptional()
//   @Transform(({ value }) => {
//     if (value === "true" || value === true) return true;
//     if (value === "false" || value === false) return false;
//     if (value === "yes") return true;
//     if (value === "no") return false;
//   })
//   pep: boolean;

//   @IsBoolean()
//   @IsOptional()
//   @Transform(({ value }) => {
//     if (value === "true" || value === true) return true;
//     if (value === "false" || value === false) return false;
//     if (value === "yes") return true;
//     if (value === "no") return false;
//   })
//   sanctions: boolean;

//   @IsBoolean()
//   @IsOptional()
//   @Transform(({ value }) => {
//     if (value === "true" || value === true) return true;
//     if (value === "false" || value === false) return false;
//     if (value === "yes") return true;
//     if (value === "no") return false;
//   })
//   adverse: boolean;

//   @IsString()
//   @IsOptional()
//   sourceOfWealth: string;

//   @IsString()
//   @IsOptional()
//   sourceOfFunds: string;

//   @IsOptional()
//   @IsIn(Object.values(mark))
//   status: mark;

//   @IsString()
//   @IsOptional()
//   fullName: string;

//   @IsString()
//   @IsOptional()
//   position: string;
// }

class SubShareholderDetails implements subShareholderDetails {
  @IsString()
  @IsNotEmpty()
  shareholderName: string;

  @IsString()
  @IsOptional()
  @IsIn(Object.values(shipType))
  type: shipType;

  @IsNumber()
  @IsOptional()
  @Transform(({ value }) =>
    typeof value === "string" ? parseFloat(value) : value
  )
  ownershipPercentage: number;

  @IsString()
  @IsOptional()
  nationality: string;

  @IsDate()
  @IsOptional()
  @Transform(({ value }) =>
    typeof value === "string" ? new Date(value) : value
  )
  dateOfBirth: Date;

  @IsString()
  @IsOptional()
  placeOfBirth: string;

  @IsString()
  @IsOptional()
  idNumber: string;

  @IsString()
  @IsOptional()
  registrationNumber: string;

  @IsString()
  @IsOptional()
  address: string;

  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => {
    if (value === "true" || value === true) return true;
    if (value === "false" || value === false) return false;
    if (value === "yes") return true;
    if (value === "no") return false;
    return value;
  })
  politicallyExposedPerson: boolean;

  @IsOptional()
  @IsIn(Object.values(mark))
  status: mark;
}

export class SubShareHolder implements subShareholder {
  @IsString()
  @IsNotEmpty()
  parentIdentifier: string;

  @IsArray()
  @IsDefined()
  @ValidateNested({ each: true })
  @Type(() => SubShareholderDetails)
  detailed: subShareholderDetails[];
}

export class KycDocument implements kycDocumentType {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsString()
  @IsUrl()
  @IsNotEmpty()
  uri: string;

  @IsDate()
  @Transform(({ value }) => new Date(value))
  uploadedDate: Date;

  @IsString()
  @IsNotEmpty()
  @IsIn(Object.values(mark))
  status: mark;
}
