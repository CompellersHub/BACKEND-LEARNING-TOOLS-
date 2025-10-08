"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScreeningModel = void 0;
const mongoose_1 = require("mongoose");
const mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
const ScreeningCountSchema = new mongoose_1.Schema({
    screeningId: {
        type: mongoose_1.SchemaTypes.ObjectId,
        ref: "smart_search",
        required: true,
    },
    year: Number,
    month: Number,
    today: { type: Number, default: 1 },
    yesterday: { type: Number, default: 0 },
    total: { type: Number, default: 0 },
    isUpdating: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });
ScreeningCountSchema.plugin(mongoose_paginate_v2_1.default);
exports.ScreeningModel = (mongoose_1.models.ScreeningModel ||
    (0, mongoose_1.model)("screening_count", ScreeningCountSchema));
//# sourceMappingURL=screening.model.js.map