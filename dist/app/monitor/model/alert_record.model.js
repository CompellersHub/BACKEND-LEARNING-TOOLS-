"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlertRecordModel = exports.AlertRecordSchema = void 0;
const mongoose_1 = require("mongoose");
const mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
const interface_1 = require("../interface");
exports.AlertRecordSchema = new mongoose_1.Schema({
    action: { type: String, enum: Object.values(interface_1.Action), required: true },
    comment: { type: String, required: true },
    alert: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "monitoringAlerts",
        required: true,
    },
    student: { type: mongoose_1.Schema.Types.ObjectId, required: false },
}, { timestamps: true });
exports.AlertRecordSchema.plugin(mongoose_paginate_v2_1.default);
exports.AlertRecordModel = (mongoose_1.models.AlertRecordModel ||
    (0, mongoose_1.model)("monitoring_record_alert", exports.AlertRecordSchema));
//# sourceMappingURL=alert_record.model.js.map