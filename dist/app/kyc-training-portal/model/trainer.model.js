"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrainerModel = void 0;
const mongoose_1 = require("mongoose");
const mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
const interface_1 = require("../interface");
const define_1 = require("./define");
const KycTrainingPortalSchema = new mongoose_1.Schema({
    caseId: { type: String, required: true },
    accountNumber: define_1.FieldTypeStringSchema,
    entityName: define_1.FieldTypeStringSchema,
    entityType: define_1.FieldTypeStringSchema,
    productType: define_1.FieldTypeArraySchema,
    companyNumber: define_1.FieldTypeStringSchema,
    incorporationDate: define_1.FieldTypeStringSchema,
    registeredOfficeAddress: define_1.FieldTypeStringSchema,
    natureOfBusiness: define_1.FieldTypeStringSchema,
    industry: define_1.FieldTypeStringSchema,
    countryOfOrigin: define_1.FieldTypeStringSchema,
    expectedTransactionVolume: define_1.FieldTypeStringSchema,
    sourceOfWealth: define_1.FieldTypeArraySchema,
    expectedTransactionFrequency: define_1.FieldTypeStringSchema,
    entityDescription: define_1.FieldTypeStringSchema,
    sourcesOfWealth: define_1.FieldTypeArraySchema,
    sourcesOfWealthExplanation: define_1.FieldTypeStringSchema,
    sourceOfFunds: define_1.FieldTypeArraySchema,
    sourcesOfFundsExplanation: define_1.FieldTypeStringSchema,
    sourcesOfWealthEvidenceDocument: [define_1.KycDocumentSchema],
    sourceOfFundsVerificationDocument: [define_1.KycDocumentSchema],
    enhancedBeneficialOwnershipDocument: [define_1.KycDocumentSchema],
    financialStatementsDocument: [define_1.KycDocumentSchema],
    taxReturnsOrCertificatesDocument: [define_1.KycDocumentSchema],
    professionalReferencesDocument: [define_1.KycDocumentSchema],
    assetValuationReportsDocument: [define_1.KycDocumentSchema],
    transactionHistoryDocument: [define_1.KycDocumentSchema],
    riskMitigationFactors: define_1.FieldTypeStringSchema,
    ongoingMonitoringRequirements: define_1.FieldTypeStringSchema,
    seniorManagementJustification: define_1.FieldTypeStringSchema,
    directors: [define_1.DirectorSchema],
    shareholders: [define_1.OwnershipSchema],
    subShareholder: [define_1.SubShareholderSchema],
    annualReportDocument: [define_1.KycDocumentSchema],
    incorporationCertificateDocument: [define_1.KycDocumentSchema],
    listOfDirectorsDocument: [define_1.KycDocumentSchema],
    shareholdersDocument: [define_1.KycDocumentSchema],
    memorandumDocument: [define_1.KycDocumentSchema],
    natureOfBusinessDocument: [define_1.KycDocumentSchema],
    proofOfIdDocument: [define_1.KycDocumentSchema],
    proofOfIdUboDocument: [define_1.KycDocumentSchema],
    proofOfListingDocument: [define_1.KycDocumentSchema],
    proofOfRegulationDocument: [define_1.KycDocumentSchema],
    sanctionScreeningDocument: [define_1.KycDocumentSchema],
    sanctionScreeningUboDocument: [define_1.KycDocumentSchema],
    submittedDate: { type: Date, required: true, default: (0, mongoose_1.now)() },
    riskLevel: { type: String, enum: Object.values(interface_1.riskLevel), required: true },
    score: { type: Number },
    annualReportLinks: [define_1.KycLinkSchema],
    incorporationCertificateLinks: [define_1.KycLinkSchema],
    listOfDirectorsLinks: [define_1.KycLinkSchema],
    shareholdersLinks: [define_1.KycLinkSchema],
    memorandumLinks: [define_1.KycLinkSchema],
    natureOfBusinessLinks: [define_1.KycLinkSchema],
    proofOfIdLinks: [define_1.KycLinkSchema],
    proofOfIdUboLinks: [define_1.KycLinkSchema],
    proofOfListingLinks: [define_1.KycLinkSchema],
    proofOfRegulationLinks: [define_1.KycLinkSchema],
    sanctionScreeningLinks: [define_1.KycLinkSchema],
    sanctionScreeningUboLinks: [define_1.KycLinkSchema],
    status: { type: String, enum: Object.values(interface_1.kycStatus), required: false },
    comment: { type: String, required: false },
    decision: { type: String, required: false },
    detailedAnalysisAndFinding: { type: String, required: false },
    internalComments: { type: String, required: false },
    student: { type: mongoose_1.Schema.Types.ObjectId, ref: "users", required: false },
    facilitator: { type: mongoose_1.Schema.Types.ObjectId, ref: "users", required: false },
}, { timestamps: true });
KycTrainingPortalSchema.index({
    caseId: 1,
    status: 1,
    riskLevel: 1,
});
KycTrainingPortalSchema.plugin(mongoose_paginate_v2_1.default);
exports.TrainerModel = (mongoose_1.models.TrainerModel ||
    (0, mongoose_1.model)("kyc-training-portals", KycTrainingPortalSchema));
//# sourceMappingURL=trainer.model.js.map