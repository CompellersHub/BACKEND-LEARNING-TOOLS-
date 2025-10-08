"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PEPModel = void 0;
const mongoose_1 = require("mongoose");
const interface_1 = require("../interface");
const mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
const documentSchema = new mongoose_1.Schema({
    type: { type: String, required: false },
    name: { type: String, required: false },
    link: { type: String, required: false },
    size: { type: Number, required: false },
});
const PepEnhanceDueDiligenceSchema = new mongoose_1.Schema({
    alertId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "monitoring_alert",
        required: true,
    },
    eddType: { type: String, enum: Object.values(interface_1.eddType), required: true },
    pepCategory: {
        type: String,
        enum: Object.values(interface_1.PepCategory),
        required: false,
    },
    countryOfResidence: { type: String, required: false },
    occupation: { type: String, required: false },
    publicFunction: { type: Boolean, required: false },
    positionLevel: { type: String, required: false },
    governmentEntity: { type: String, required: false },
    isControlOverPublicFunds: { type: Boolean, required: false },
    isRoleLinkedToHighValue: { type: Boolean, required: false },
    familyMemberOfAPep: { type: String, required: false },
    estimatedNetWorth: { type: String, required: false },
    sourceOfWealthDocumentation: { type: String, required: false },
    sourceOfFund: { type: String, required: false },
    sourceOfFundDocumentation: { type: String, required: false },
    offshoreStructure: { type: Boolean, required: false },
    isPepHighRiskOrSanctioned: { type: Boolean, required: false },
    hasNameInCorruptionInvestigations: { type: Boolean, required: false },
    adverseMediaFindingsOnPep: { type: Boolean, required: false },
    willEnhancedMonitoringBeApplied: { type: Boolean, required: false },
    willSeniorManagementSignOff: { type: Boolean, required: false },
    frequencyOfOngoingDueDiligenceChecks: {
        type: String,
        enum: ["Quarterly", "Monthly", "Annually"],
        required: false,
    },
    seniorManagementApproval: { type: Boolean, required: false },
    approverName: { type: String, required: false },
    department: { type: String, required: false },
    position: { type: String, required: false },
    documentUploadAndSupportingEvidence: [documentSchema],
    supportingLinks: { type: [String], required: false },
    eddDecision: {
        type: String,
        enum: ["File Sar Report", "Approved Pep EDD", "Further EDD"],
        required: false,
    },
    addCustomerToPEPRegisterForOngoingMonitoring: {
        type: Boolean,
        required: false,
    },
    decisionRationale: { type: String, required: false },
    finalCaseDecision: {
        type: String,
        enum: Object.values(interface_1.selectedDecision),
        required: false,
    },
    finalDecisionRationale: { type: String, required: false },
}, { timestamps: true });
PepEnhanceDueDiligenceSchema.plugin(mongoose_paginate_v2_1.default);
exports.PEPModel = (mongoose_1.models.PEPModel ||
    (0, mongoose_1.model)("monitoring_peps", PepEnhanceDueDiligenceSchema));
//# sourceMappingURL=pep-enhanced-due-diligence.model.js.map