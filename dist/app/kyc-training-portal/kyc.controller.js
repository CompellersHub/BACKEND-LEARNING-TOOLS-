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
exports.KycController = void 0;
const constant_1 = require("../../global/constant");
const helpers_1 = require("../../global/helpers");
const routing_controllers_1 = require("routing-controllers");
const routing_controllers_openapi_1 = require("routing-controllers-openapi");
const typedi_1 = require("typedi");
const dto_1 = require("./dto");
const kyc_service_1 = require("./kyc.service");
const upload_1 = require("./upload");
const logger = new helpers_1.Logger("KYC Training Portal");
let KycController = class KycController {
    constructor(kycService) {
        this.kycService = kycService;
    }
    async create(body, request) {
        return this.kycService.create(body, request);
    }
    async findMany(query) {
        try {
            const kycTrainingPortals = await this.kycService.findMany(query);
            return {
                success: true,
                status: constant_1.resStatusCode.OK,
                data: kycTrainingPortals,
            };
        }
        catch (error) {
            const message = error.message || "internal server error";
            logger.error(message, error);
            throw new routing_controllers_1.InternalServerError(message);
        }
    }
    async findOne(query) {
        try {
            const kycTrainingPortal = await this.kycService.findOne(query);
            return {
                success: true,
                status: constant_1.resStatusCode.OK,
                data: kycTrainingPortal,
            };
        }
        catch (error) {
            const message = error.message || "internal server error";
            logger.error(message, error);
            throw new routing_controllers_1.InternalServerError(message);
        }
    }
    async update(param, body) {
        try {
            if (!param) {
                throw new routing_controllers_1.UnprocessableEntityError("ID is required");
            }
            const updatedKyc = await this.kycService.update(body, param);
            return {
                success: true,
                status: constant_1.resStatusCode.OK,
                data: updatedKyc,
            };
        }
        catch (error) {
            const message = error.message || "internal server error";
            logger.error(message, error);
            throw new routing_controllers_1.InternalServerError(message);
        }
    }
    async caseStats() {
        try {
            const stats = await this.kycService.caseStats();
            return {
                success: true,
                status: constant_1.resStatusCode.OK,
                data: stats,
            };
        }
        catch (error) {
            const message = error.message || "internal server error";
            logger.error(message, error);
            throw new routing_controllers_1.InternalServerError(message);
        }
    }
    async dashboardStats() {
        try {
            const stats = await this.kycService.dashboardStats();
            return {
                success: true,
                status: constant_1.resStatusCode.OK,
                data: stats,
            };
        }
        catch (error) {
            const message = error.message || "internal server error";
            logger.error(message, error);
            throw new routing_controllers_1.InternalServerError(message);
        }
    }
};
exports.KycController = KycController;
__decorate([
    (0, routing_controllers_1.Post)("kyc-trainer"),
    (0, routing_controllers_1.UseBefore)(upload_1.loadAny),
    __param(0, (0, routing_controllers_1.Body)()),
    __param(1, (0, routing_controllers_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateKYC, Object]),
    __metadata("design:returntype", Promise)
], KycController.prototype, "create", null);
__decorate([
    (0, routing_controllers_1.Get)("kyc-trainers"),
    __param(0, (0, routing_controllers_1.QueryParams)({ type: dto_1.FindManyKycTraining })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.FindManyKycTraining]),
    __metadata("design:returntype", Promise)
], KycController.prototype, "findMany", null);
__decorate([
    (0, routing_controllers_1.Get)("kyc-trainer"),
    __param(0, (0, routing_controllers_1.QueryParams)({
        type: dto_1.FindOneKycTraining,
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.FindOneKycTraining]),
    __metadata("design:returntype", Promise)
], KycController.prototype, "findOne", null);
__decorate([
    (0, routing_controllers_1.Patch)("kyc-trainer/:id"),
    __param(0, (0, routing_controllers_1.Param)("id")),
    __param(1, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.UpdateKYC]),
    __metadata("design:returntype", Promise)
], KycController.prototype, "update", null);
__decorate([
    (0, routing_controllers_1.Get)("kyc-trainer/case-stats"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], KycController.prototype, "caseStats", null);
__decorate([
    (0, routing_controllers_1.Get)("kyc-trainer/dashboard-stats"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], KycController.prototype, "dashboardStats", null);
exports.KycController = KycController = __decorate([
    (0, routing_controllers_1.Controller)("/", { transformResponse: false }),
    (0, routing_controllers_openapi_1.OpenAPI)({
        tags: ["KYC TRAINERS"],
    }),
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [kyc_service_1.KycTrainingPortalService])
], KycController);
//# sourceMappingURL=kyc.controller.js.map