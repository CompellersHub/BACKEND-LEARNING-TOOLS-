"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserFromRequest = void 0;
const model_1 = require("../../app/user/model");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const routing_controllers_1 = require("routing-controllers");
const getUserFromRequest = async (req) => {
    if (req.user)
        return req.user;
    const header = req.headers["authorization"];
    if (!header?.startsWith("Bearer ")) {
        throw new routing_controllers_1.UnauthorizedError("Authentication required");
    }
    const token = header.split(" ")[1];
    if (!token)
        throw new routing_controllers_1.UnauthorizedError("Authentication token is missing");
    if (!process.env.JWT_SECRET) {
        throw new routing_controllers_1.BadRequestError("JWT_SECRET is not configured");
    }
    const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
    if (!decoded._id)
        throw new routing_controllers_1.ForbiddenError("Invalid token format");
    const user = await model_1.UserModel.findById(decoded._id);
    if (!user) {
        throw new routing_controllers_1.UnauthorizedError("User not found");
    }
    req.user = user;
    return user;
};
exports.getUserFromRequest = getUserFromRequest;
//# sourceMappingURL=getUserFromRequest.js.map