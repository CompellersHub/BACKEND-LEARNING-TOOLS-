"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CatchMongooseErrors = CatchMongooseErrors;
const mongoose_1 = __importDefault(require("mongoose"));
const routing_controllers_1 = require("routing-controllers");
function CatchMongooseErrors() {
    return function (target, propertyKey, descriptor) {
        const originalMethod = descriptor.value;
        console.log(target, propertyKey);
        descriptor.value = async function (...args) {
            try {
                return await originalMethod.apply(this, args);
            }
            catch (error) {
                if (error instanceof mongoose_1.default.Error.ValidationError) {
                    throw new routing_controllers_1.HttpError(422, `name: ${error.name}, message: ${error.message}`);
                }
                if (error instanceof mongoose_1.default.Error.CastError) {
                    throw new routing_controllers_1.HttpError(400, `Invalid value for ${error.path}: ${error.value}`);
                }
                if (error instanceof mongoose_1.default.Error) {
                    throw new routing_controllers_1.HttpError(400, error.message);
                }
                throw error;
            }
        };
        return descriptor;
    };
}
//# sourceMappingURL=catch.js.map