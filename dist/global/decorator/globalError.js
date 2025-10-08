"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.enableGlobalMongooseErrorHandling = enableGlobalMongooseErrorHandling;
const mongoose_1 = __importDefault(require("mongoose"));
const routing_controllers_1 = require("routing-controllers");
const routing_controllers_2 = require("routing-controllers");
function enableGlobalMongooseErrorHandling() {
    const storage = (0, routing_controllers_2.getMetadataArgsStorage)();
    storage.controllers.forEach((controller) => {
        const methods = Object.getOwnPropertyNames(controller.target.prototype);
        methods.forEach((methodName) => {
            if (methodName === "constructor" ||
                typeof controller.target.prototype[methodName] !== "function") {
                return;
            }
            const originalMethod = controller.target.prototype[methodName];
            controller.target.prototype[methodName] = async function (...args) {
                try {
                    return await originalMethod.apply(this, args);
                }
                catch (error) {
                    handleMongooseError(error);
                }
            };
        });
    });
}
function handleMongooseError(error) {
    if (error instanceof mongoose_1.default.Error.ValidationError) {
        const errors = Object.fromEntries(Object.entries(error.errors).map(([key, value]) => [key, value.message]));
        throw new routing_controllers_1.HttpError(422, "Validation failed");
    }
    if (error instanceof mongoose_1.default.Error.CastError) {
        throw new routing_controllers_1.HttpError(400, `Invalid value for ${error.path}: ${error.value}`);
    }
    if (error instanceof mongoose_1.default.Error) {
        throw new routing_controllers_1.HttpError(400, error.message);
    }
    throw error;
}
//# sourceMappingURL=globalError.js.map