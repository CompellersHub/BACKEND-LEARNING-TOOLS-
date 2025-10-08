"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnrollModel = void 0;
const mongoose_1 = require("mongoose");
const interface_1 = require("../interface");
const mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
const ResponseSchema = new mongoose_1.Schema({
    questionType: { type: String, enum: Object.values(interface_1.qType), required: true },
    score: { type: Number, required: true, default: 0 },
    startAt: { type: Date, required: true },
    completedAt: { type: Date, required: true },
});
const QuizEnrollmentSchema = new mongoose_1.Schema({
    response: { type: [ResponseSchema], required: true },
    student: { type: mongoose_1.Schema.Types.ObjectId, ref: "users", required: true },
}, { timestamps: true });
QuizEnrollmentSchema.plugin(mongoose_paginate_v2_1.default);
exports.EnrollModel = (mongoose_1.models.EnrollModel ||
    (0, mongoose_1.model)("quiz_enrollments", QuizEnrollmentSchema));
//# sourceMappingURL=quiz-enroll.model.js.map