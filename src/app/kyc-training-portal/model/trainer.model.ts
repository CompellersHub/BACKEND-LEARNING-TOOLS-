import { Document, model, models, now, PaginateModel, Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import { kycStatus, KycTrainingPortal, riskLevel } from "../interface";
import {
  DirectorSchema,
  FieldTypeArraySchema,
  FieldTypeStringSchema,
  KycDocumentSchema,
  KycLinkSchema,
  OwnershipSchema,
  SubShareholderSchema,
} from "./define";

const KycTrainingPortalSchema = new Schema<KycTrainingPortal>(
  {
    caseId: { type: String, required: true },
    accountNumber: FieldTypeStringSchema,
    entityName: FieldTypeStringSchema,
    entityType: FieldTypeStringSchema,
    productType: FieldTypeArraySchema,
    companyNumber: FieldTypeStringSchema,
    incorporationDate: FieldTypeStringSchema,
    registeredOfficeAddress: FieldTypeStringSchema,
    natureOfBusiness: FieldTypeStringSchema,
    industry: FieldTypeStringSchema,
    countryOfOrigin: FieldTypeStringSchema,
    expectedTransactionVolume: FieldTypeStringSchema,
    sourceOfWealth: FieldTypeArraySchema,
    expectedTransactionFrequency: FieldTypeStringSchema,
    entityDescription: FieldTypeStringSchema,
    sourcesOfWealth: FieldTypeArraySchema,
    sourcesOfWealthExplanation: FieldTypeStringSchema,
    sourceOfFunds: FieldTypeArraySchema,
    sourcesOfFundsExplanation: FieldTypeStringSchema,
    sourcesOfWealthEvidenceDocument: [KycDocumentSchema],
    sourceOfFundsVerificationDocument: [KycDocumentSchema],
    enhancedBeneficialOwnershipDocument: [KycDocumentSchema],
    financialStatementsDocument: [KycDocumentSchema],
    taxReturnsOrCertificatesDocument: [KycDocumentSchema],
    professionalReferencesDocument: [KycDocumentSchema],
    assetValuationReportsDocument: [KycDocumentSchema],
    transactionHistoryDocument: [KycDocumentSchema],
    riskMitigationFactors: FieldTypeStringSchema,
    ongoingMonitoringRequirements: FieldTypeStringSchema,
    seniorManagementJustification: FieldTypeStringSchema,
    directors: [DirectorSchema],
    shareholders: [OwnershipSchema],
    subShareholder: [SubShareholderSchema],
    annualReportDocument: [KycDocumentSchema],
    incorporationCertificateDocument: [KycDocumentSchema],
    listOfDirectorsDocument: [KycDocumentSchema],
    shareholdersDocument: [KycDocumentSchema],
    memorandumDocument: [KycDocumentSchema],
    natureOfBusinessDocument: [KycDocumentSchema],
    proofOfIdDocument: [KycDocumentSchema],
    proofOfIdUboDocument: [KycDocumentSchema],
    proofOfListingDocument: [KycDocumentSchema],
    proofOfRegulationDocument: [KycDocumentSchema],
    sanctionScreeningDocument: [KycDocumentSchema],
    sanctionScreeningUboDocument: [KycDocumentSchema],
    submittedDate: { type: Date, required: true, default: now() },
    riskLevel: { type: String, enum: Object.values(riskLevel), required: true },
    score: { type: Number },
    annualReportLinks: [KycLinkSchema],
    incorporationCertificateLinks: [KycLinkSchema],
    listOfDirectorsLinks: [KycLinkSchema],
    shareholdersLinks: [KycLinkSchema],
    memorandumLinks: [KycLinkSchema],
    natureOfBusinessLinks: [KycLinkSchema],
    proofOfIdLinks: [KycLinkSchema],
    proofOfIdUboLinks: [KycLinkSchema],
    proofOfListingLinks: [KycLinkSchema],
    proofOfRegulationLinks: [KycLinkSchema],
    sanctionScreeningLinks: [KycLinkSchema],
    sanctionScreeningUboLinks: [KycLinkSchema],
    status: { type: String, enum: Object.values(kycStatus), required: false },
    comment: { type: String, required: false },
    decision: { type: String, required: false },
    detailedAnalysisAndFinding: { type: String, required: false },
    internalComments: { type: String, required: false },
    student: { type: Schema.Types.ObjectId, ref: "users", required: false },
    facilitator: { type: Schema.Types.ObjectId, ref: "users", required: false },
  },
  { timestamps: true }
);

KycTrainingPortalSchema.index({
  caseId: 1,
  status: 1,
  riskLevel: 1,
});

export type TrainingDocument = KycTrainingPortal & Document;
KycTrainingPortalSchema.plugin(mongoosePaginate);

export const TrainerModel = (models.TrainerModel ||
  model<KycTrainingPortal, PaginateModel<TrainingDocument>>(
    "kyc-training-portals",
    KycTrainingPortalSchema
  )) as PaginateModel<KycTrainingPortal>;
