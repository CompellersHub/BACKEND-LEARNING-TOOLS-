"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SanctionModel = exports.sanctionsReviewSchema = void 0;
const mongoose_1 = require("mongoose");
const interface_1 = require("../interface");
const mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
const documentSchema = new mongoose_1.Schema({
    type: { type: String, required: false },
    name: { type: String, required: false },
    link: { type: String, required: false },
    size: { type: Number, required: false },
});
const shareholderSchema = new mongoose_1.Schema({
    shareholderName: { type: String, required: false },
    percentage: { type: Number, required: false },
    adverseNews: { type: Boolean, required: false, default: false },
    sanctions: { type: Boolean, required: false, default: false },
    pep: { type: Boolean, required: false, default: false },
    notes: { type: String, required: false },
}, { _id: false });
const directorSchema = new mongoose_1.Schema({
    directorName: { type: String, required: false },
    adverseNews: { type: Boolean, required: false, default: false },
    sanctions: { type: Boolean, required: false, default: false },
    pep: { type: Boolean, required: false, default: false },
    notes: { type: String, required: false },
});
const counterPartySchema = new mongoose_1.Schema({
    sanctionsHit: { type: Boolean, required: false },
    pepStatus: { type: Boolean, required: false },
    adverseNews: { type: Boolean, required: false },
    details: { type: String, required: false },
    fundsFreezeObligations: { type: Boolean, required: false },
});
exports.sanctionsReviewSchema = new mongoose_1.Schema({
    alertId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "monitoring_alert",
        required: true,
    },
    eddType: { type: String, enum: Object.values(interface_1.eddType), required: true },
    documentsObtained: { type: [String], required: false },
    identityVerificationNotes: { type: String, required: false },
    identifyDocuments: [documentSchema],
    kycOrEDDReviewFindings: { type: String, required: false },
    adverseMediaFinding: { type: String, required: false },
    shareholdersChecks: [shareholderSchema],
    directorsChecks: [directorSchema],
    authoritiesScreening: { type: [String], required: false },
    pastCurrentAndPendingTransactions: { type: String, required: false },
    counterParty: counterPartySchema,
    sanctionReviewChecklist: { type: [String], required: false },
    matchType: {
        type: String,
        enum: Object.values(interface_1.sanctionsResult),
        required: false,
    },
    recommendedActionAction: { type: String, required: false },
    commentsAndRationale: { type: String, required: false },
    finalCaseDecision: {
        type: String,
        enum: Object.values(interface_1.selectedDecision),
        required: false,
    },
    finalDecisionRationale: { type: String, required: false },
}, { timestamps: true });
exports.sanctionsReviewSchema.plugin(mongoose_paginate_v2_1.default);
exports.SanctionModel = (mongoose_1.models.SanctionModel ||
    (0, mongoose_1.model)("monitoring_sanctions", exports.sanctionsReviewSchema));
//# sourceMappingURL=sanction-review.model.js.map