"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EscalateModel = void 0;
const mongoose_1 = require("mongoose");
const mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
const escalateSchema = new mongoose_1.Schema({
    alertId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "monitoring_alert",
        required: true,
    },
    escalationLevel: { type: String, required: true },
    escalationNotes: { type: String, required: true },
}, { timestamps: true });
escalateSchema.plugin(mongoose_paginate_v2_1.default);
exports.EscalateModel = (mongoose_1.models.EscalateModel ||
    (0, mongoose_1.model)("monitoring_escalates", escalateSchema));
//# sourceMappingURL=escalate.model.js.map