"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuizModel = void 0;
const mongoose_1 = require("mongoose");
const interface_1 = require("../interface");
const mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
const QuizSchema = new mongoose_1.Schema({
    quizId: { type: Number, required: true },
    question: { type: String, required: true },
    options: { type: [String], required: true },
    correctAnswer: { type: Number, required: true },
    explanation: { type: String, required: false },
    type: {
        type: String,
        enum: Object.values(interface_1.qType),
        required: true,
    },
}, { timestamps: true });
QuizSchema.plugin(mongoose_paginate_v2_1.default);
exports.QuizModel = (mongoose_1.models.QuizModel ||
    (0, mongoose_1.model)("quiz_questions", QuizSchema));
//# sourceMappingURL=quiz-squad.model.js.map