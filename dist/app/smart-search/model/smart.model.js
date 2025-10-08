"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmartModel = void 0;
const mongoose_1 = require("mongoose");
const mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
const define_1 = require("./define");
const SmartSearchSchema = new mongoose_1.Schema({
    fullName: { type: String, required: true },
    matches: [define_1.matchesSchema],
    newsArticles: [define_1.newsArticlesSchema],
    wikipediaData: define_1.wikipediaDataSchema,
    aiAnalysis: define_1.aiAnalysisSchema,
    newsSummary: { type: String, required: false },
    riskScore: { type: Number, required: false },
    riskLevel: { type: String, required: false },
    responseTime: { type: String, required: true },
    reviewDecision: { type: String, required: false },
    reviewRationale: { type: String, required: false },
}, { timestamps: true });
SmartSearchSchema.plugin(mongoose_paginate_v2_1.default);
exports.SmartModel = (mongoose_1.models.SmartModel ||
    (0, mongoose_1.model)("smart_search", SmartSearchSchema));
//# sourceMappingURL=smart.model.js.map