"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WatchModel = void 0;
const mongoose_1 = require("mongoose");
const smart_interface_1 = require("../interface/smart.interface");
const mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
const WatchSchema = new mongoose_1.Schema({
    serviceName: { type: String, required: true },
    status: { type: String, enum: smart_interface_1.watchStatus, required: true },
    type: { type: String, required: true },
    description: { type: String, required: true },
    provide: { type: String, required: true },
    records: { type: Number, required: true },
    users: { type: [String], required: false },
    lastUpdate: { type: Date, required: true, default: Date.now },
}, { timestamps: true });
WatchSchema.plugin(mongoose_paginate_v2_1.default);
exports.WatchModel = (mongoose_1.models.WatchModel ||
    (0, mongoose_1.model)("watch_list", WatchSchema));
//# sourceMappingURL=watch.model.js.map