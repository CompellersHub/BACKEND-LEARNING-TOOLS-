"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewModel = void 0;
const mongoose_1 = require("mongoose");
const mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
const screening_1 = require("../interface/screening");
const ReviewSchema = new mongoose_1.Schema({
    massReviewStatus: {
        type: String,
        enum: Object.values(screening_1.massStatus),
        required: true,
    },
    massReviewRationale: { type: String, required: false },
    screeningId: {
        type: mongoose_1.SchemaTypes.ObjectId,
        ref: "smart_search",
        required: true,
    },
    reviewer: { type: mongoose_1.SchemaTypes.ObjectId, required: false },
    student: { type: mongoose_1.SchemaTypes.ObjectId, ref: "users", required: false },
}, { timestamps: true });
ReviewSchema.plugin(mongoose_paginate_v2_1.default);
exports.ReviewModel = (mongoose_1.models.ScreeningModel ||
    (0, mongoose_1.model)("review_on_search", ReviewSchema));
//# sourceMappingURL=review.model.js.map