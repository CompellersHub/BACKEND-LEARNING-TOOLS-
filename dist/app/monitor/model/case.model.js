"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CaseModel = void 0;
const mongoose_1 = require("mongoose");
const mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
const CaseSchema = new mongoose_1.Schema({
    caseId: { type: String, required: true },
    monitoring: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "monitoring_alert",
        required: true,
    },
    profile: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "monitoring_profiles",
        required: true,
    },
    status: { type: String, required: false },
    assignTo: { type: String, required: false },
    priority: { type: String, required: false },
    progress: { type: Number, required: true, default: 0 },
    customerSince: { type: String, required: false },
    pepStatus: { type: String, required: false },
    adverseMedia: { type: String, required: false },
    lastKycUpdate: { type: Date, required: false },
    sanctions: { type: String, required: false },
    totalTransaction: { type: Number, required: false },
    totalAmount: { type: Number, required: false },
    riskScore: { type: Number, required: false },
    evidenceCollecting: [
        {
            transactionRecord: { type: Number, required: false },
            riskLevel: { type: String, required: false },
            status: { type: String, required: false },
        },
    ],
    decisionRationale: { type: String, required: false },
    caseDecision: { type: String, required: true },
}, { timestamps: true });
CaseSchema.plugin(mongoose_paginate_v2_1.default);
exports.CaseModel = (mongoose_1.models.CaseModel ||
    (0, mongoose_1.model)("monitoring-cases", CaseSchema));
//# sourceMappingURL=case.model.js.map