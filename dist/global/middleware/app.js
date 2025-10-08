"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.applicationMiddlewares = void 0;
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
let compression = require("compression");
const applicationMiddlewares = (app) => {
    app.use((0, cors_1.default)());
    app.use((0, helmet_1.default)());
    app.use(compression());
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: true }));
    app.disable("x-powered-by");
};
exports.applicationMiddlewares = applicationMiddlewares;
//# sourceMappingURL=app.js.map