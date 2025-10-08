"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const routing_controllers_1 = require("routing-controllers");
const routing_controllers_openapi_1 = require("routing-controllers-openapi");
const typedi_1 = require("typedi");
const auth_service_1 = require("./auth.service");
const dto_1 = require("./dto");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async signup(body) {
        return this.authService.signin(body);
    }
    async signin(body) {
        return this.authService.signin(body);
    }
    async verify(param) {
        return this.authService.verified(param);
    }
    async forgetPassword(body) {
        return this.authService.forgetPassword(body);
    }
    async resetPassword(body) {
        return this.authService.resetPassword(body);
    }
    async ResendVerification(body) {
        return this.authService.resendVerificationEmail(body);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, routing_controllers_1.Post)("/signup"),
    __param(0, (0, routing_controllers_1.Body)({ required: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.Register]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signup", null);
__decorate([
    (0, routing_controllers_1.Post)("/signin"),
    __param(0, (0, routing_controllers_1.Body)({ required: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.Login]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signin", null);
__decorate([
    (0, routing_controllers_1.Get)("/verify"),
    __param(0, (0, routing_controllers_1.Params)({ required: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.VerifyEmail]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "verify", null);
__decorate([
    (0, routing_controllers_1.Post)("/forget-password"),
    __param(0, (0, routing_controllers_1.Body)({ required: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.ForgetPassword]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "forgetPassword", null);
__decorate([
    (0, routing_controllers_1.Post)("/reset-password"),
    __param(0, (0, routing_controllers_1.Body)({ required: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.ResetPassword]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "resetPassword", null);
__decorate([
    (0, routing_controllers_1.Post)("/resend-verification"),
    __param(0, (0, routing_controllers_1.Body)({ required: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.ResendEmailVerification]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "ResendVerification", null);
exports.AuthController = AuthController = __decorate([
    (0, routing_controllers_1.JsonController)("/auth", { transformResponse: false }),
    (0, typedi_1.Service)(),
    (0, routing_controllers_openapi_1.OpenAPI)({ tags: ["Authentication"] }),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map