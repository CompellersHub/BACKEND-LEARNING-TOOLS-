import { Schema } from "mongoose";
import {
  adverseNews,
  directorType,
  fieldTypeArray,
  fieldTypeString,
  kycDocumentType,
  kycLinkType,
  mark,
  ownershipType,
  politicallyExposedPerson,
  sanctionsScreening,
  shipType,
  subShareholder,
  subShareholderDetails,
} from "../interface";

export const FieldTypeStringSchema = new Schema<fieldTypeString>({
  value: { type: String, required: false },
  status: { type: String, enum: Object.values(mark), required: false },
});

export const FieldTypeArraySchema = new Schema<fieldTypeArray>({
  value: [{ type: String, required: false }],
  status: { type: String, enum: Object.values(mark), required: false },
});

export const KycDocumentSchema = new Schema<kycDocumentType>({
  name: { type: String, required: true },
  type: { type: String, required: true },
  uri: { type: String, required: true },
  uploadedDate: { type: Date, required: true, default: Date.now },
  status: { type: String, enum: Object.values(mark), required: false },
});

const PoliticallyExposedPersonSchema = new Schema<politicallyExposedPerson>(
  {
    politicalPositionHeld: { type: String, required: false },
    tenurePeriod: { type: String, required: false },
    familyOrCloseAssociateConnection: { type: String, required: false },
    detailedSourceOfWealth: { type: String, required: false },
    bankStatementsDocuments: [KycDocumentSchema],
    sourceOfWealthEvidenceDocuments: [KycDocumentSchema],
    additionalSupportingDocuments: [KycDocumentSchema],
    overAllRiskRating: { type: String, required: false },
    mitigatingFactors: { type: String, required: false },
    ongoingMonitoringRequirements: { type: String, required: false },
  },
  { _id: false }
);

const SanctionsScreeningSchema = new Schema<sanctionsScreening>(
  {
    sanctioningJurisdiction: { type: String, required: false },
    currentStatus: { type: String, required: false },
    sanctionsDetails: { type: String, required: false },
    detailedSourceOfWealth: { type: String, required: false },
    bankStatementsDocuments: [KycDocumentSchema],
    sourceOfWealthEvidenceDocuments: [KycDocumentSchema],
    additionalSupportingDocuments: [KycDocumentSchema],
    overAllRiskRating: { type: String, required: false },
    mitigatingFactors: { type: String, required: false },
    ongoingMonitoringRequirements: { type: String, required: false },
  },
  { _id: false }
);

const AdverseNewsSchema = new Schema<adverseNews>(
  {
    dateOfNewOrAllegation: { type: Date, required: false },
    newsSource: { type: String, required: false },
    detailsOfAdverseNews: { type: String, required: false },
    assessmentOfImpactOrResolution: { type: String, required: false },
    detailedSourceOfWealth: { type: String, required: false },
    bankStatementsDocuments: [KycDocumentSchema],
    sourceOfWealthEvidenceDocuments: [KycDocumentSchema],
    additionalSupportingDocuments: [KycDocumentSchema],
    overAllRiskRating: { type: String, required: false },
    mitigatingFactors: { type: String, required: false },
    ongoingMonitoringRequirements: { type: String, required: false },
  },
  { _id: false }
);

const SubShareholderDetails = new Schema<subShareholderDetails>(
  {
    shareholderName: { type: String, required: false },
    type: { type: String, required: false },
    ownershipPercentage: { type: Number, required: false },
    nationality: { type: String, required: false },
    dateOfBirth: { type: Date, required: false },
    placeOfBirth: { type: String, required: false },
    idNumber: { type: String, required: false },
    registrationNumber: { type: String, required: false },
    address: { type: String, required: false },
    politicallyExposedPerson: { type: Boolean, required: false },
    status: { type: String, required: false, enum: Object.values(mark) },
  },
  { _id: false }
);

export const SubShareholderSchema = new Schema<subShareholder>(
  {
    parentIdentifier: { type: String, required: false, unique: true },
    detailed: [SubShareholderDetails],
  },
  { _id: false }
);

export const OwnershipSchema = new Schema<ownershipType>({
  firstName: { type: String, required: false },
  lastName: { type: String, required: false },
  organizationName: { type: String, required: false },
  type: { type: String, enum: Object.values(shipType), required: false },
  ownershipPercentage: { type: Number, required: false },
  nationality: { type: String, required: false },
  countryOfResidence: { type: String, required: false },
  occupation: { type: String, required: false },
  idType: {
    type: String,
    required: false,
  },
  uploadIdDocument: KycDocumentSchema,
  uploadProofOfAddress: KycDocumentSchema,
  politicallyExposedPerson: PoliticallyExposedPersonSchema,
  sanctionsScreening: SanctionsScreeningSchema,
  adverseNews: AdverseNewsSchema,
  countryOfOperation: { type: String, required: false },
  registrationNumber: { type: String, required: false },
  identifier: { type: String, required: true },
  status: { type: String, enum: Object.values(mark), required: false },
});

export const DirectorSchema = new Schema<directorType>({
  firstName: { type: String, required: false },
  lastName: { type: String, required: false },
  position: { type: String, required: false },
  occupation: { type: String, required: false },
  nationality: { type: String, required: false },
  countryOfResidence: { type: String, required: false },
  dateOfBirth: { type: Date, required: false },
  idType: { type: String, required: false },
  politicallyExposedPerson: PoliticallyExposedPersonSchema,
  sanctionsScreening: SanctionsScreeningSchema,
  adverseNews: AdverseNewsSchema,
  status: { type: String, enum: Object.values(mark), required: false },
});

// export const SubsidiaryShareholderSchema = new Schema<subsidiaryShareholder>({
//   parentIdentifier: { type: String, required: false },
//   shareholderName: { type: String, required: false },
//   type: { type: String, enum: Object.values(shipType), required: false },
//   ownershipPercentage: { type: Number, required: false },
//   registrationNumber: { type: String, required: false },
//   nationality: { type: String, required: false },
//   dateOfBirth: { type: Date, required: false },
//   placeOfBirth: { type: String, required: false },
//   idNumber: { type: String, required: false },
//   address: { type: String, required: false },
//   pep: { type: Boolean, required: false },
//   status: { type: String, enum: Object.values(mark), required: false },
// });

// export const FoundersSchema = new Schema<foundersType>({
//   fullName: { type: String, required: false },
//   position: { type: String, required: false },
//   occupation: { type: String, required: false },
//   nationality: { type: String, required: false },
//   countryOfResidence: { type: String, required: false },
//   dateOfBirth: { type: Date, required: false },
//   idType: {
//     type: String,
//     enum: Object.values(ownershipIdType),
//     required: false,
//   },
//   idDocument: KycDocumentSchema,
//   pep: { type: Boolean, required: false },
//   sanctions: { type: Boolean, required: false },
//   adverse: { type: Boolean, required: false },
//   sourceOfWealth: { type: String, required: false },
//   sourceOfFunds: { type: String, required: false },
//   status: { type: String, enum: Object.values(mark), required: false },
// });

export const KycLinkSchema = new Schema<kycLinkType>({
  link: { type: String, required: true },
  description: { type: String },
  status: { type: String, enum: Object.values(mark), required: false },
});

export const FieldSchema = new Schema({
  value: {
    type: Schema.Types.Mixed, // can be string or string[]
    required: true,
  },
  status: { type: String, enum: Object.values(mark), required: false },
  comment: { type: String, required: false },
});
