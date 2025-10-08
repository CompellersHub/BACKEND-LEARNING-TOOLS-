"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongooseErrorHandler = void 0;
const routing_controllers_1 = require("routing-controllers");
const mongoose_1 = __importDefault(require("mongoose"));
const typedi_1 = require("typedi");
let MongooseErrorHandler = class MongooseErrorHandler {
    error(error, req, res, next) {
        if (res.headersSent) {
            return next(error);
        }
        if (error instanceof mongoose_1.default.Error.ValidationError) {
            const errors = {};
            for (const field in error.errors) {
                errors[field] = error.errors[field].message;
            }
            res.status(422).json({
                status: "error",
                type: "ValidationError",
                message: "Validation failed",
                errors,
            });
            return;
        }
        if (error instanceof mongoose_1.default.Error.CastError) {
            res.status(400).json({
                status: "error",
                type: "CastError",
                message: `Invalid value for ${error.path}: ${error.value}`,
                field: error.path,
                value: error.value,
            });
            return;
        }
        if (error.code === 11000) {
            res.status(409).json({
                status: "error",
                type: "DuplicateKeyError",
                message: "Duplicate key error",
                keyValue: error.keyValue,
            });
            return;
        }
        if (error instanceof mongoose_1.default.Error) {
            res.status(400).json({
                status: "error",
                type: error.name,
                message: error.message,
            });
            return;
        }
        next(error);
    }
};
exports.MongooseErrorHandler = MongooseErrorHandler;
exports.MongooseErrorHandler = MongooseErrorHandler = __decorate([
    (0, typedi_1.Service)(),
    (0, routing_controllers_1.Middleware)({ type: "after" })
], MongooseErrorHandler);
//# sourceMappingURL=mongoose.middleware.js.map