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
exports.MonitorController = void 0;
const constant_1 = require("../../global/constant");
const routing_controllers_1 = require("routing-controllers");
const routing_controllers_openapi_1 = require("routing-controllers-openapi");
const typedi_1 = require("typedi");
const upload_1 = require("../kyc-training-portal/upload");
const dto_1 = require("./dto");
const case_dto_1 = require("./dto/case.dto");
const case_service_1 = require("./service/case.service");
const monitor_service_1 = require("./service/monitor.service");
let MonitorController = class MonitorController {
    constructor(monitor, caseService) {
        this.monitor = monitor;
        this.caseService = caseService;
    }
    async submitReviewAlert(body) {
        try {
            const data = await this.monitor.submitReviewAlert(body);
            return { success: true, data, status: constant_1.resStatusCode.OK };
        }
        catch (error) {
            throw error;
        }
    }
    async findManyAlert(query) {
        try {
            const alert = await this.monitor.findManyAlerts(query);
            return { success: true, data: alert, status: constant_1.resStatusCode.OK };
        }
        catch (error) {
            throw error;
        }
    }
    async findMonitoringUsers(query) {
        try {
            const profile = await this.monitor.findOneProfile(query);
            return { success: true, data: profile, status: constant_1.resStatusCode.OK };
        }
        catch (error) {
            throw error;
        }
    }
    async AnalysisDashboard() {
        try {
            const analysis = await this.monitor.analyticsDashboard();
            return { success: true, data: analysis, status: constant_1.resStatusCode.OK };
        }
        catch (error) {
            throw error;
        }
    }
    async TopBarStats() {
        try {
            const stats = await this.monitor.topbarAnalytics();
            return { success: true, data: stats, status: constant_1.resStatusCode.OK };
        }
        catch (error) {
            throw error;
        }
    }
    async AlertCount() {
        try {
            const alert = await this.monitor.alertCount();
            return { success: true, data: alert, status: constant_1.resStatusCode.OK };
        }
        catch (error) {
            throw error;
        }
    }
    createEscalate(body) {
        return this.caseService.createEscalate(body);
    }
    createInvestigation(body, req) {
        return this.caseService.createInvestigation(body, req);
    }
    createFinancial(body, req) {
        return this.caseService.createFinancial(body, req);
    }
    createPep(body, req) {
        return this.caseService.createPep(body, req);
    }
    createSanction(body, req) {
        return this.caseService.createSanction(body, req);
    }
    updateCase(body, id) {
        return this.caseService.updateCase(body, id);
    }
    findManyCase(query) {
        return this.caseService.findManyCases(query);
    }
    findOneCase(query) {
        return this.caseService.findOneCase(query);
    }
    addOrRemoveEvidence(body) {
        return this.caseService.addOrRemoveEvidence(body);
    }
};
exports.MonitorController = MonitorController;
__decorate([
    (0, routing_controllers_1.Post)("submit-review"),
    __param(0, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateAlert]),
    __metadata("design:returntype", Promise)
], MonitorController.prototype, "submitReviewAlert", null);
__decorate([
    (0, routing_controllers_1.Get)("alerts"),
    __param(0, (0, routing_controllers_1.QueryParams)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.FindManyAlert]),
    __metadata("design:returntype", Promise)
], MonitorController.prototype, "findManyAlert", null);
__decorate([
    (0, routing_controllers_1.Get)("monitoring-users"),
    __param(0, (0, routing_controllers_1.QueryParams)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.FindOneProfile]),
    __metadata("design:returntype", Promise)
], MonitorController.prototype, "findMonitoringUsers", null);
__decorate([
    (0, routing_controllers_1.Get)("analytics-dashboard"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MonitorController.prototype, "AnalysisDashboard", null);
__decorate([
    (0, routing_controllers_1.Get)("topbar-stats"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MonitorController.prototype, "TopBarStats", null);
__decorate([
    (0, routing_controllers_1.Get)("alert-count"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MonitorController.prototype, "AlertCount", null);
__decorate([
    (0, routing_controllers_1.Post)("create-escalate"),
    __param(0, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [case_dto_1.Escalate]),
    __metadata("design:returntype", void 0)
], MonitorController.prototype, "createEscalate", null);
__decorate([
    (0, routing_controllers_1.Post)("create-investigate"),
    (0, routing_controllers_1.UseBefore)(upload_1.loadAny),
    __param(0, (0, routing_controllers_1.Body)()),
    __param(1, (0, routing_controllers_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [case_dto_1.CreateInvestigation, Object]),
    __metadata("design:returntype", void 0)
], MonitorController.prototype, "createInvestigation", null);
__decorate([
    (0, routing_controllers_1.Post)("create-financial"),
    (0, routing_controllers_1.UseBefore)(upload_1.loadAny),
    __param(0, (0, routing_controllers_1.Body)()),
    __param(1, (0, routing_controllers_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [case_dto_1.FinancialCrime, Object]),
    __metadata("design:returntype", void 0)
], MonitorController.prototype, "createFinancial", null);
__decorate([
    (0, routing_controllers_1.Post)("create-pep"),
    (0, routing_controllers_1.UseBefore)(upload_1.loadAny),
    __param(0, (0, routing_controllers_1.Body)()),
    __param(1, (0, routing_controllers_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [case_dto_1.PepEnhancedDueDiligence, Object]),
    __metadata("design:returntype", void 0)
], MonitorController.prototype, "createPep", null);
__decorate([
    (0, routing_controllers_1.Post)("create-sanction"),
    (0, routing_controllers_1.UseBefore)(upload_1.loadAny),
    __param(0, (0, routing_controllers_1.Body)()),
    __param(1, (0, routing_controllers_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [case_dto_1.SanctionReview, Object]),
    __metadata("design:returntype", void 0)
], MonitorController.prototype, "createSanction", null);
__decorate([
    (0, routing_controllers_1.Patch)("update-case/:caseId"),
    __param(0, (0, routing_controllers_1.Body)()),
    __param(1, (0, routing_controllers_1.Param)("caseId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [case_dto_1.UpdateCase, String]),
    __metadata("design:returntype", void 0)
], MonitorController.prototype, "updateCase", null);
__decorate([
    (0, routing_controllers_1.Get)("case-monitorings"),
    __param(0, (0, routing_controllers_1.QueryParams)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [case_dto_1.FindManyCase]),
    __metadata("design:returntype", void 0)
], MonitorController.prototype, "findManyCase", null);
__decorate([
    (0, routing_controllers_1.Get)("case-monitoring"),
    __param(0, (0, routing_controllers_1.QueryParams)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [case_dto_1.FindOneCase]),
    __metadata("design:returntype", void 0)
], MonitorController.prototype, "findOneCase", null);
__decorate([
    (0, routing_controllers_1.Post)("add-or-remove-evidence"),
    __param(0, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [case_dto_1.AddOrRemoveEvidence]),
    __metadata("design:returntype", void 0)
], MonitorController.prototype, "addOrRemoveEvidence", null);
exports.MonitorController = MonitorController = __decorate([
    (0, typedi_1.Service)(),
    (0, routing_controllers_1.Controller)("/", { transformResponse: false }),
    (0, routing_controllers_openapi_1.OpenAPI)({
        tags: ["Transaction Monitor"],
    }),
    __metadata("design:paramtypes", [monitor_service_1.MonitorService,
        case_service_1.CaseMonitoringService])
], MonitorController);
//# sourceMappingURL=monitor.controller.js.map