"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
const interface_1 = require("../interface");
const mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
const UserSchema = new mongoose_1.Schema({
    first_name: { type: String, required: false },
    last_name: { type: String, required: false },
    username: { type: String, required: true },
    email: { type: String, required: true },
    role: {
        type: String,
        required: true,
        enum: Object.values(interface_1.Role),
        default: interface_1.Role.student,
    },
    password: { type: String, required: false },
    course: { type: String, required: false },
    phone_number: { type: Number, required: false },
}, { timestamps: true });
UserSchema.index({ email: 1 });
UserSchema.plugin(mongoose_paginate_v2_1.default);
exports.UserModel = (mongoose_1.models.UserModel ||
    (0, mongoose_1.model)("users", UserSchema));
//# sourceMappingURL=user.model.js.map