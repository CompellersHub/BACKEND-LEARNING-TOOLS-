"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
function getTimestamp() {
    return new Date().toISOString();
}
class Logger {
    constructor(context) {
        this.context = context || "Application";
    }
    async log(level, message, ...optionalParams) {
        console.log(`[${level}] [${getTimestamp()}] [${this.context}]`, message, ...optionalParams);
    }
    async info(message, ...optionalParams) {
        await this.log("INFO", message, ...optionalParams);
    }
    async warn(message, ...optionalParams) {
        await this.log("WARN", message, ...optionalParams);
    }
    async error(message, errorStack = "", ...optionalParams) {
        await this.log("ERROR", message, ...optionalParams);
        if (errorStack) {
            console.log(errorStack);
        }
    }
    async debug(message, ...optionalParams) {
        if (process.env.NODE_ENV === "development") {
            await this.log("DEBUG", message, ...optionalParams);
        }
    }
}
exports.Logger = Logger;
//# sourceMappingURL=logger.js.map