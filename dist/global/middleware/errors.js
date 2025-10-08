"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unmatchedRoutes = exports.generalErrorHandler = void 0;
const generalErrorHandler = (app) => {
    app.use((err, req, res, next) => {
        res.status(err.status || 500).json({
            error: {
                message: err.message,
                stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
            },
        });
    });
};
exports.generalErrorHandler = generalErrorHandler;
const unmatchedRoutes = (app) => {
    app.use((req, res, next) => {
        const error = new Error(process.env.NODE_ENV === "development"
            ? "Unexpected route! Oh, you missed the road."
            : "Route not found");
        error.status = 404;
        next(error);
    });
};
exports.unmatchedRoutes = unmatchedRoutes;
//# sourceMappingURL=errors.js.map