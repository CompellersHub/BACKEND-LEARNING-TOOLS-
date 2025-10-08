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
exports.SmartSearchController = void 0;
const constant_1 = require("../../global/constant");
const helpers_1 = require("../../global/helpers");
const routing_controllers_1 = require("routing-controllers");
const typedi_1 = require("typedi");
const dto_1 = require("./dto");
const service_1 = require("./service");
const logger = new helpers_1.Logger("Smart Search");
let SmartSearchController = class SmartSearchController {
    constructor(smartService, reviewService) {
        this.smartService = smartService;
        this.reviewService = reviewService;
    }
    async SmartSearch(body) {
        try {
            const quick = await this.smartService.create(body);
            return { success: true, status: constant_1.resStatusCode.OK, data: quick };
        }
        catch (error) {
            this.errorLog(error);
        }
    }
    async BatchScreening(document) {
        try {
            this.validateDocument(document);
            const batch = await this.smartService.batchScreening(document);
            return { success: true, status: constant_1.resStatusCode.OK, data: batch };
        }
        catch (error) {
            this.errorLog(error);
        }
    }
    async RecentAlerts() {
        try {
            const batch = await this.smartService.findAll({ limit: 4 });
            return { success: true, status: constant_1.resStatusCode.OK, data: batch };
        }
        catch (error) {
            this.errorLog(error);
        }
    }
    async riskDistribution() {
        try {
            const recent = await this.smartService.riskDistribution();
            return { success: true, status: constant_1.resStatusCode.OK, data: recent };
        }
        catch (error) {
            this.errorLog(error);
        }
    }
    async monthlyScreeningActivity() {
        try {
            const monthly = await this.smartService.monthlyScreeningActivity();
            return { success: true, status: constant_1.resStatusCode.OK, data: monthly };
        }
        catch (error) {
            this.errorLog(error);
        }
    }
    async yearlyReport() {
        try {
            const yearly = await this.smartService.reportStats();
            return { success: true, status: constant_1.resStatusCode.OK, data: yearly };
        }
        catch (error) {
            this.errorLog(error);
        }
    }
    async positiveAndNegative() {
        try {
            const alertCount = await this.reviewService.positiveTrueAndNegativeFalseBarChart();
            return { success: true, status: constant_1.resStatusCode.OK, data: alertCount };
        }
        catch (error) {
            this.errorLog(error);
        }
    }
    async massReviewActions(body) {
        try {
            const review = await this.reviewService.create(body);
            return { success: true, status: constant_1.resStatusCode.CREATED, data: review };
        }
        catch (error) {
            this.errorLog(error);
        }
    }
    async lastYearMonthlyScreeningActivity() {
        try {
            const data = await this.smartService.lastMonthlyScreeningActivity();
            return { success: true, status: constant_1.resStatusCode.OK, data };
        }
        catch (error) {
            this.errorLog(error);
        }
    }
    validateDocument(document) {
        if (!document) {
            throw new routing_controllers_1.UnprocessableEntityError("No files uploaded");
        }
        if (!document.buffer || document.size === 0) {
            throw new routing_controllers_1.UnprocessableEntityError(`Document is empty`);
        }
        const validMimeTypes = ["text/csv"];
        if (!validMimeTypes.includes(document.mimetype)) {
            throw new routing_controllers_1.UnprocessableEntityError(`Document has invalid file type. Only CSV are allowed`);
        }
        const maxSize = 5 * 1024 * 1024;
        if (document.size > maxSize) {
            throw new routing_controllers_1.UnprocessableEntityError(`Document exceeds maximum size of 5MB`);
        }
    }
    errorLog(error) {
        if (error instanceof Error) {
            const message = error.message || "internal server error";
            logger.error(message, error);
            throw new routing_controllers_1.BadRequestError(message);
        }
        throw new routing_controllers_1.InternalServerError("Internal server error");
    }
};
exports.SmartSearchController = SmartSearchController;
__decorate([
    (0, routing_controllers_1.Post)("smart-search"),
    __param(0, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.SearchOnline]),
    __metadata("design:returntype", Promise)
], SmartSearchController.prototype, "SmartSearch", null);
__decorate([
    (0, routing_controllers_1.Post)("batch-screening"),
    __param(0, (0, routing_controllers_1.UploadedFile)("document")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SmartSearchController.prototype, "BatchScreening", null);
__decorate([
    (0, routing_controllers_1.Get)("recent-alerts"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SmartSearchController.prototype, "RecentAlerts", null);
__decorate([
    (0, routing_controllers_1.Get)("risk-distribution"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SmartSearchController.prototype, "riskDistribution", null);
__decorate([
    (0, routing_controllers_1.Get)("monthly-screening"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SmartSearchController.prototype, "monthlyScreeningActivity", null);
__decorate([
    (0, routing_controllers_1.Get)("reports-stats"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SmartSearchController.prototype, "yearlyReport", null);
__decorate([
    (0, routing_controllers_1.Get)("alert-analysis"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SmartSearchController.prototype, "positiveAndNegative", null);
__decorate([
    (0, routing_controllers_1.Post)("submit-alert"),
    __param(0, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateReview]),
    __metadata("design:returntype", Promise)
], SmartSearchController.prototype, "massReviewActions", null);
__decorate([
    (0, routing_controllers_1.Get)("screening-volume"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SmartSearchController.prototype, "lastYearMonthlyScreeningActivity", null);
exports.SmartSearchController = SmartSearchController = __decorate([
    (0, typedi_1.Service)(),
    (0, routing_controllers_1.Controller)("/", { transformResponse: false }),
    __metadata("design:paramtypes", [service_1.SmartSearchService,
        service_1.ReviewService])
], SmartSearchController);
//# sourceMappingURL=smart-search.controller.js.map