"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldSchema = exports.KycLinkSchema = exports.DirectorSchema = exports.OwnershipSchema = exports.SubShareholderSchema = exports.KycDocumentSchema = exports.FieldTypeArraySchema = exports.FieldTypeStringSchema = void 0;
const mongoose_1 = require("mongoose");
const interface_1 = require("../interface");
exports.FieldTypeStringSchema = new mongoose_1.Schema({
    value: { type: String, required: false },
    status: { type: String, enum: Object.values(interface_1.mark), required: false },
});
exports.FieldTypeArraySchema = new mongoose_1.Schema({
    value: [{ type: String, required: false }],
    status: { type: String, enum: Object.values(interface_1.mark), required: false },
});
exports.KycDocumentSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
    uri: { type: String, required: true },
    uploadedDate: { type: Date, required: true, default: Date.now },
    status: { type: String, enum: Object.values(interface_1.mark), required: false },
});
const PoliticallyExposedPersonSchema = new mongoose_1.Schema({
    politicalPositionHeld: { type: String, required: false },
    tenurePeriod: { type: String, required: false },
    familyOrCloseAssociateConnection: { type: String, required: false },
    detailedSourceOfWealth: { type: String, required: false },
    bankStatementsDocuments: [exports.KycDocumentSchema],
    sourceOfWealthEvidenceDocuments: [exports.KycDocumentSchema],
    additionalSupportingDocuments: [exports.KycDocumentSchema],
    overAllRiskRating: { type: String, required: false },
    mitigatingFactors: { type: String, required: false },
    ongoingMonitoringRequirements: { type: String, required: false },
}, { _id: false });
const SanctionsScreeningSchema = new mongoose_1.Schema({
    sanctioningJurisdiction: { type: String, required: false },
    currentStatus: { type: String, required: false },
    sanctionsDetails: { type: String, required: false },
    detailedSourceOfWealth: { type: String, required: false },
    bankStatementsDocuments: [exports.KycDocumentSchema],
    sourceOfWealthEvidenceDocuments: [exports.KycDocumentSchema],
    additionalSupportingDocuments: [exports.KycDocumentSchema],
    overAllRiskRating: { type: String, required: false },
    mitigatingFactors: { type: String, required: false },
    ongoingMonitoringRequirements: { type: String, required: false },
}, { _id: false });
const AdverseNewsSchema = new mongoose_1.Schema({
    dateOfNewOrAllegation: { type: Date, required: false },
    newsSource: { type: String, required: false },
    detailsOfAdverseNews: { type: String, required: false },
    assessmentOfImpactOrResolution: { type: String, required: false },
    detailedSourceOfWealth: { type: String, required: false },
    bankStatementsDocuments: [exports.KycDocumentSchema],
    sourceOfWealthEvidenceDocuments: [exports.KycDocumentSchema],
    additionalSupportingDocuments: [exports.KycDocumentSchema],
    overAllRiskRating: { type: String, required: false },
    mitigatingFactors: { type: String, required: false },
    ongoingMonitoringRequirements: { type: String, required: false },
}, { _id: false });
const SubShareholderDetails = new mongoose_1.Schema({
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
    status: { type: String, required: false, enum: Object.values(interface_1.mark) },
}, { _id: false });
exports.SubShareholderSchema = new mongoose_1.Schema({
    parentIdentifier: { type: String, required: false, unique: true },
    detailed: [SubShareholderDetails],
}, { _id: false });
exports.OwnershipSchema = new mongoose_1.Schema({
    firstName: { type: String, required: false },
    lastName: { type: String, required: false },
    organizationName: { type: String, required: false },
    type: { type: String, enum: Object.values(interface_1.shipType), required: false },
    ownershipPercentage: { type: Number, required: false },
    nationality: { type: String, required: false },
    countryOfResidence: { type: String, required: false },
    occupation: { type: String, required: false },
    idType: {
        type: String,
        required: false,
    },
    uploadIdDocument: exports.KycDocumentSchema,
    uploadProofOfAddress: exports.KycDocumentSchema,
    politicallyExposedPerson: PoliticallyExposedPersonSchema,
    sanctionsScreening: SanctionsScreeningSchema,
    adverseNews: AdverseNewsSchema,
    countryOfOperation: { type: String, required: false },
    registrationNumber: { type: String, required: false },
    identifier: { type: String, required: true },
    status: { type: String, enum: Object.values(interface_1.mark), required: false },
});
exports.DirectorSchema = new mongoose_1.Schema({
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
    status: { type: String, enum: Object.values(interface_1.mark), required: false },
});
exports.KycLinkSchema = new mongoose_1.Schema({
    link: { type: String, required: true },
    description: { type: String },
    status: { type: String, enum: Object.values(interface_1.mark), required: false },
});
exports.FieldSchema = new mongoose_1.Schema({
    value: {
        type: mongoose_1.Schema.Types.Mixed,
        required: true,
    },
    status: { type: String, enum: Object.values(interface_1.mark), required: false },
    comment: { type: String, required: false },
});
//# sourceMappingURL=define.js.map