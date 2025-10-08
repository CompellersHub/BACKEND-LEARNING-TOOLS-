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
exports.CustomValidationErrorHandler = void 0;
const routing_controllers_1 = require("routing-controllers");
const class_validator_1 = require("class-validator");
const typedi_1 = require("typedi");
const mongoose_1 = require("mongoose");
const multer_1 = __importDefault(require("multer"));
let CustomValidationErrorHandler = class CustomValidationErrorHandler {
    error(error, req, res, next) {
        if (error.message?.includes("stream") &&
            error.message?.includes("readable")) {
            res.status(400).json({
                status: "error",
                message: "Invalid request payload",
                details: "The request body could not be processed",
            });
            return;
        }
        if (res.headersSent)
            return next(error);
        if (error instanceof routing_controllers_1.UnprocessableEntityError || error.httpCode === 422) {
            res.status(422).json({
                status: 422,
                success: false,
                message: error.message || "Validation failed",
            });
            return;
        }
        if (this.isValidationError(error)) {
            res.status(422).json({
                status: 422,
                success: false,
                message: "Validation failed",
                errors: this.formatValidationErrors(error.errors),
            });
            return;
        }
        if (error instanceof routing_controllers_1.HttpError) {
            res.status(error.httpCode).json({
                status: error.httpCode,
                message: error.message,
                ...(process.env.NODE_ENV === "development" && {
                    stack: error.stack,
                    originalError: error,
                }),
                error: error.name,
            });
            return;
        }
        if (error instanceof multer_1.default.MulterError) {
            if (error.code === "LIMIT_FILE_SIZE") {
                res.status(400).json({
                    status: 422,
                    success: false,
                    message: "File Validation failed",
                    errors: "Image must be less then or equal to 2 MB",
                });
            }
            return;
        }
        if (error instanceof mongoose_1.MongooseError) {
            res.status(400).json({
                status: 400,
                message: error.message,
                ...(process.env.NODE_ENV === "development" && {
                    stack: error.stack,
                    originalError: error,
                }),
                error: error.name,
            });
            return;
        }
        console.error("Unhandled Error:", error);
        res.status(500).json({
            status: 500,
            message: "Internal server error",
            ...(process.env.NODE_ENV === "development" && {
                stack: error.stack,
                originalError: error.toString(),
            }),
        });
        return;
    }
    isValidationError(error) {
        return (error instanceof routing_controllers_1.HttpError &&
            error.httpCode === 400 &&
            Array.isArray(error.errors) &&
            error.errors.some((e) => e instanceof class_validator_1.ValidationError));
    }
    formatValidationErrors(errors) {
        return errors.map((error) => {
            if (error.children?.length > 0) {
                return {
                    field: error.property,
                    children: this.formatValidationErrors(error.children),
                };
            }
            return {
                field: error.property,
                messages: Object.values(error.constraints || {}),
            };
        });
    }
};
exports.CustomValidationErrorHandler = CustomValidationErrorHandler;
exports.CustomValidationErrorHandler = CustomValidationErrorHandler = __decorate([
    (0, typedi_1.Service)(),
    (0, routing_controllers_1.Middleware)({ type: "after" })
], CustomValidationErrorHandler);
//# sourceMappingURL=validation.middleware.js.map