"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceUnavailableError = exports.ConfigurationError = exports.ScreeningError = void 0;
class ScreeningError extends Error {
    constructor(message, options) {
        super(message);
        this.name = "ScreeningError";
        this.originalError = options?.originalError;
    }
}
exports.ScreeningError = ScreeningError;
class ConfigurationError extends ScreeningError {
    constructor(message) {
        super(message);
        this.name = "ConfigurationError";
    }
}
exports.ConfigurationError = ConfigurationError;
class ServiceUnavailableError extends ScreeningError {
    constructor(message) {
        super(message);
        this.name = "ServiceUnavailableError";
    }
}
exports.ServiceUnavailableError = ServiceUnavailableError;
//# sourceMappingURL=custom-error.js.map