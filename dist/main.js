"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const typedi_1 = require("typedi");
const config_1 = require("./config");
const middleware_1 = require("./global/middleware");
const register_models_1 = require("./register-models");
const swagger_1 = require("./swagger");
const utils_1 = require("./global/utils");
const services_1 = require("./global/services");
process.on("unhandledRejection", (reason, promise) => {
    console.error("Unhandled Rejection at:", promise, "reason:", reason);
});
process.on("uncaughtException", (error) => {
    console.error("Uncaught Exception:", error);
    process.exit(1);
});
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 4040;
(0, middleware_1.applicationMiddlewares)(app);
(0, routing_controllers_1.useContainer)(typedi_1.Container);
(0, register_models_1.registerAllModels)();
(0, routing_controllers_1.useExpressServer)(app, {
    routePrefix: "/api",
    validation: {
        whitelist: true,
        validationError: {
            target: false,
            value: false,
        },
        forbidNonWhitelisted: true,
        enableDebugMessages: true,
        skipMissingProperties: false,
    },
    defaultErrorHandler: false,
    development: true,
    classTransformer: true,
    controllers: [path_1.default.join(__dirname, "app/**/*.controller.{ts,js}")],
    middlewares: [path_1.default.join(__dirname, "global/**/*.middleware.{ts,js}")],
    authorizationChecker: middleware_1.authorizationChecker,
    currentUserChecker: middleware_1.currentUserChecker,
});
(0, swagger_1.swaggerDocs)(app, PORT);
(async () => {
    await (0, config_1.connection)();
    typedi_1.Container.get(services_1.ScheduleService);
    await services_1.agenda.start();
    await utils_1.ScheduleRunner.runJob();
})();
app.listen(PORT);
async function graceful() {
    await services_1.agenda.stop();
    process.exit(0);
}
process.on("SIGTERM", graceful);
process.on("SIGINT", graceful);
process.on("SIGTERM", () => {
    console.log("SIGTERM received, shutting down gracefully");
    process.exit(1);
});
//# sourceMappingURL=main.js.map