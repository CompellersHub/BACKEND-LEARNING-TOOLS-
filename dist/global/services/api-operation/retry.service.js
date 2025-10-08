"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RetryError = exports.WithRetry = void 0;
const typedi_1 = require("typedi");
let WithRetry = class WithRetry {
    async withRetry(operation, options = {}) {
        const { retries = 3, delay = 1000 } = options;
        const backoff = options.backoff || ((attempt) => Math.pow(2, attempt) * delay);
        let lastError;
        for (let attempt = 0; attempt <= retries; attempt++) {
            try {
                return await operation();
            }
            catch (error) {
                lastError = error;
                if (attempt < retries) {
                    const waitTime = backoff(attempt);
                    await new Promise((resolve) => setTimeout(resolve, waitTime));
                }
            }
        }
        throw new RetryError(`Operation failed after ${retries} retries: ${lastError?.message}, originalError: ${lastError}`);
    }
};
exports.WithRetry = WithRetry;
exports.WithRetry = WithRetry = __decorate([
    (0, typedi_1.Service)()
], WithRetry);
class RetryError extends Error {
    constructor(message, options) {
        super(message);
        this.name = "RetryError";
        this.originalError = options?.originalError;
    }
}
exports.RetryError = RetryError;
//# sourceMappingURL=retry.service.js.map