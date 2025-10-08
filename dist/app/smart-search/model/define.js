"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.aiAnalysisSchema = exports.bioDetailsSchema = exports.wikipediaDataSchema = exports.matchesSchema = exports.newsArticlesSchema = void 0;
const mongoose_1 = require("mongoose");
exports.newsArticlesSchema = new mongoose_1.Schema({
    source: { type: String, required: false },
    title: { type: String, required: false },
    url: { type: String, required: false },
    snippet: { type: String, required: false },
    publishedDate: { type: Date, required: false },
    relevanceScore: { type: Number, required: false },
}, { _id: false });
exports.matchesSchema = new mongoose_1.Schema({
    source: { type: String },
    name: { type: String },
    matchPercentage: { type: Number },
    riskLevel: { type: String },
    details: {
        category: { type: String },
        position: { type: String },
        country: { type: String },
        lastUpdated: { type: Date },
    },
});
exports.wikipediaDataSchema = new mongoose_1.Schema({
    source: { type: String, required: false },
    title: { type: String, required: false },
    extract: { type: String, required: false },
    url: { type: String, required: false },
    thumbnail: { type: String, required: false },
}, { _id: false });
exports.bioDetailsSchema = new mongoose_1.Schema({
    dateOfBirth: { type: String, required: false },
    placeOfBirth: { type: String, required: false },
    nationality: { type: String, required: false },
    occupation: { type: String, required: false },
    education: { type: String, required: false },
}, { _id: false });
exports.aiAnalysisSchema = new mongoose_1.Schema({
    riskScore: { type: Number, required: false },
    riskLevel: { type: String, required: false },
    summary: { type: String, required: false },
    detailedAnalysis: { type: String, required: false },
    riskFactors: { type: [String], required: false },
    recommendations: { type: [String], required: false },
    bioDetails: exports.bioDetailsSchema,
}, { _id: false });
//# sourceMappingURL=define.js.map