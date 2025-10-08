"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvestigateModel = void 0;
const mongoose_1 = require("mongoose");
const mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
const documentSchema = new mongoose_1.Schema({
    type: { type: String, required: false },
    name: { type: String, required: false },
    link: { type: String, required: false },
    size: { type: Number, required: false },
});
const EvidenceSchema = new mongoose_1.Schema({
    fileName: { type: String, required: false },
    category: { type: String, required: false },
    description: { type: String, required: false },
    priority: { type: String, required: false },
    uploadedOn: { type: Date, required: true, default: (0, mongoose_1.now)() },
    document: documentSchema,
}, { _id: false });
const InvestigateSchema = new mongoose_1.Schema({
    alertId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "monitoring_alert",
        required: true,
    },
    investigationDecision: { type: String, required: false },
    reportableOffense: { type: [String], required: false },
    jurisdiction: { type: String, required: false },
    authority: { type: String, required: false },
    assignTo: { type: String, required: false },
    investigationNote: { type: String, required: false },
    evidence: [EvidenceSchema],
}, { timestamps: true });
InvestigateSchema.plugin(mongoose_paginate_v2_1.default);
exports.InvestigateModel = (mongoose_1.models.InvestigateModel ||
    (0, mongoose_1.model)("monitoring_investigate", InvestigateSchema));
//# sourceMappingURL=investigate.model.js.map