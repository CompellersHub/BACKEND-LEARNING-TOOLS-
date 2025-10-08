"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlertModel = exports.AlertSchema = void 0;
const mongoose_1 = require("mongoose");
const interface_1 = require("../interface");
const mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
exports.AlertSchema = new mongoose_1.Schema({
    id: { type: String, required: false },
    type: { type: String, required: false },
    severity: { type: String, required: false, enum: Object.values(interface_1.severity) },
    customer: { type: String, required: false },
    customerId: { type: String, required: false },
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "monitoring_profiles",
        required: true,
    },
    amount: { type: String, required: false },
    timestamp: { type: String, required: false },
    location: { type: String, required: false },
    accountType: { type: String, required: false },
    monitoringType: { type: String, required: false },
    riskScore: { type: Number, required: false },
    riskFactors: { type: [String], required: false },
    description: { type: String, required: false },
    status: { type: String, required: false },
    aiScore: { type: Number, required: false },
    deviceFingerprint: { type: String, required: false },
    geoLocation: { type: String, required: false },
    relatedAlerts: { type: Number, required: false },
    investigationNotes: { type: [String], required: false },
    escalationLevel: { type: String, required: false },
    transactionReference: { type: String, required: false },
    counterparty: { type: String, required: false },
    transactionDetails: { type: String, required: false },
    cleared: { type: Date, required: false },
}, { timestamps: true });
exports.AlertSchema.plugin(mongoose_paginate_v2_1.default);
exports.AlertModel = (mongoose_1.models.AlertModel ||
    (0, mongoose_1.model)("monitoring_alert", exports.AlertSchema));
//# sourceMappingURL=alerts.model.js.map