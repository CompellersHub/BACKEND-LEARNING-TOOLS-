"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionModel = exports.twoYearTransactionsSchema = void 0;
const mongoose_1 = require("mongoose");
const mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
exports.twoYearTransactionsSchema = new mongoose_1.Schema({
    id: { type: String, required: true },
    date: { type: String, required: true },
    amount: { type: Number, required: true },
    type: { type: String, required: true },
    counterparty: { type: String, required: true },
    status: { type: String, required: true },
    jurisdiction: { type: String, required: false },
    reference: { type: String, required: false },
    channel: { type: [String], required: false },
    riskScore: { type: Number, required: true },
    flagged: { type: Boolean, required: true },
    transactionType: { type: String, enum: ["recent", "years"], required: true },
    customer: { type: mongoose_1.Schema.Types.ObjectId, ref: "monitoring_profiles" },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});
exports.twoYearTransactionsSchema.plugin(mongoose_paginate_v2_1.default);
exports.TransactionModel = (mongoose_1.models.TransactionModel ||
    (0, mongoose_1.model)("monitoring_transactions", exports.twoYearTransactionsSchema));
//# sourceMappingURL=transactions.model.js.map