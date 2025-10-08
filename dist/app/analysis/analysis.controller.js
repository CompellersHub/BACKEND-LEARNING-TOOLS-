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
exports.AnalysisToolsController = void 0;
const routing_controllers_1 = require("routing-controllers");
const routing_controllers_openapi_1 = require("routing-controllers-openapi");
const typedi_1 = require("typedi");
const analysis_service_1 = require("./analysis.service");
const helpers_1 = require("../../global/helpers");
const dto_1 = require("./dto");
const logger = new helpers_1.Logger("Analysis Tools");
let AnalysisToolsController = class AnalysisToolsController {
    constructor(toolServices) {
        this.toolServices = toolServices;
    }
    async uploadfile(file) {
        try {
            return this.toolServices.uploadFile(file);
        }
        catch (error) {
            throw error;
        }
    }
    async findMany() {
        try {
            return this.toolServices.findAll({ id: "12345" });
        }
        catch (error) {
            throw error;
        }
    }
    async SearchColumn(param) {
        try {
            return this.toolServices.searchColumn(param);
        }
        catch (error) {
            throw error;
        }
    }
    async createMeasure(body) {
        return this.toolServices.createMeasure(body);
    }
};
exports.AnalysisToolsController = AnalysisToolsController;
__decorate([
    (0, routing_controllers_1.Post)("connect-file"),
    (0, routing_controllers_openapi_1.OpenAPI)({
        description: "Upload a file to analysis",
    }),
    __param(0, (0, routing_controllers_1.UploadedFile)("file", {
        required: true,
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AnalysisToolsController.prototype, "uploadfile", null);
__decorate([
    (0, routing_controllers_1.Get)("file-connected"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AnalysisToolsController.prototype, "findMany", null);
__decorate([
    (0, routing_controllers_1.Get)("search-column"),
    __param(0, (0, routing_controllers_1.QueryParams)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.searchData]),
    __metadata("design:returntype", Promise)
], AnalysisToolsController.prototype, "SearchColumn", null);
__decorate([
    (0, routing_controllers_1.Post)("dax-engine"),
    __param(0, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateMeasure]),
    __metadata("design:returntype", Promise)
], AnalysisToolsController.prototype, "createMeasure", null);
exports.AnalysisToolsController = AnalysisToolsController = __decorate([
    (0, routing_controllers_1.Controller)("/", { transformResponse: false }),
    (0, routing_controllers_openapi_1.OpenAPI)({
        tags: ["Analysis Tools"],
    }),
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [analysis_service_1.AnalysisToolServices])
], AnalysisToolsController);
//# sourceMappingURL=analysis.controller.js.map