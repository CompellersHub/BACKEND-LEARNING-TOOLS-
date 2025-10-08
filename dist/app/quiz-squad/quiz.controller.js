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
exports.QuizController = void 0;
const constant_1 = require("../../global/constant");
const routing_controllers_1 = require("routing-controllers");
const routing_controllers_openapi_1 = require("routing-controllers-openapi");
const typedi_1 = require("typedi");
const dto_1 = require("./dto");
const services_1 = require("./services");
let QuizController = class QuizController {
    constructor(quizService, enrollService) {
        this.quizService = quizService;
        this.enrollService = enrollService;
    }
    async CreateNewQuestions(body) {
        try {
            const data = await this.quizService.createQuestion(body);
            return { data, success: true, status: constant_1.resStatusCode.CREATED };
        }
        catch (error) {
            throw error;
        }
    }
    async FindManyQuiz(query) {
        try {
            const data = await this.quizService.findManyQuestion(query);
            return { data, status: constant_1.resStatusCode.OK, success: true };
        }
        catch (error) {
            throw error;
        }
    }
    async FindOneQuestion(query) {
        try {
            const data = await this.quizService.findOneQuestion(query);
            return { data, status: constant_1.resStatusCode.OK, success: true };
        }
        catch (error) {
            throw error;
        }
    }
    async UpdateOneQuestion(param, body) {
        try {
            if (!param) {
                throw new routing_controllers_1.UnprocessableEntityError("ID is required");
            }
            const data = await this.quizService.updateQuestion(body, param);
            return { data, success: true, status: constant_1.resStatusCode.OK };
        }
        catch (error) {
            throw error;
        }
    }
    async DeleteOneQuestion(param) {
        try {
            if (!param) {
                throw new routing_controllers_1.UnprocessableEntityError("ID is required");
            }
            const data = await this.quizService.deleteQuestion(param);
            return { data, success: true, status: constant_1.resStatusCode.OK };
        }
        catch (error) {
            throw error;
        }
    }
    async RecordScore(record) {
        try {
            const data = await this.enrollService.recordScore(record);
            return { data, success: true, status: constant_1.resStatusCode.CREATED };
        }
        catch (error) {
            throw error;
        }
    }
    async FacilitatorDashboard() {
        try {
            const data = await this.enrollService.facilitatorDashboardStat();
            return { data, status: constant_1.resStatusCode.OK, success: true };
        }
        catch (error) {
            throw error;
        }
    }
    async StudentTracker(query) {
        try {
            const data = await this.enrollService.studentTracker(query);
            return { data, success: true, status: constant_1.resStatusCode.OK };
        }
        catch (error) {
            throw error;
        }
    }
    async QuizPerformance() {
        try {
            const data = await this.enrollService.quizPerformance();
            return { data, success: true, status: constant_1.resStatusCode.OK };
        }
        catch (error) {
            throw error;
        }
    }
    async TimeAndScorePerformance() {
        try {
            const data = await this.enrollService.timePerformance();
            return { data, success: true, status: constant_1.resStatusCode.OK };
        }
        catch (error) {
            throw error;
        }
    }
};
exports.QuizController = QuizController;
__decorate([
    (0, routing_controllers_1.Post)("/quiz"),
    __param(0, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateQuestion]),
    __metadata("design:returntype", Promise)
], QuizController.prototype, "CreateNewQuestions", null);
__decorate([
    (0, routing_controllers_1.Get)("/quizzes"),
    __param(0, (0, routing_controllers_1.QueryParams)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.FindManyQuestion]),
    __metadata("design:returntype", Promise)
], QuizController.prototype, "FindManyQuiz", null);
__decorate([
    (0, routing_controllers_1.Get)("/quiz"),
    __param(0, (0, routing_controllers_1.QueryParams)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.FindOneQuestion]),
    __metadata("design:returntype", Promise)
], QuizController.prototype, "FindOneQuestion", null);
__decorate([
    (0, routing_controllers_1.Patch)("/quiz/:id"),
    __param(0, (0, routing_controllers_1.Param)("id")),
    __param(1, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.UpdateQuestion]),
    __metadata("design:returntype", Promise)
], QuizController.prototype, "UpdateOneQuestion", null);
__decorate([
    (0, routing_controllers_1.Delete)("/quiz/:id"),
    __param(0, (0, routing_controllers_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], QuizController.prototype, "DeleteOneQuestion", null);
__decorate([
    (0, routing_controllers_1.Post)("/enrollment"),
    __param(0, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.RecordScore]),
    __metadata("design:returntype", Promise)
], QuizController.prototype, "RecordScore", null);
__decorate([
    (0, routing_controllers_1.Get)("/dashboard-stats"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], QuizController.prototype, "FacilitatorDashboard", null);
__decorate([
    (0, routing_controllers_1.Get)("/student-tracker"),
    __param(0, (0, routing_controllers_1.QueryParams)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.FindManyEnrollment]),
    __metadata("design:returntype", Promise)
], QuizController.prototype, "StudentTracker", null);
__decorate([
    (0, routing_controllers_1.Get)("/quiz-performance"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], QuizController.prototype, "QuizPerformance", null);
__decorate([
    (0, routing_controllers_1.Get)("time-and-score-stats"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], QuizController.prototype, "TimeAndScorePerformance", null);
exports.QuizController = QuizController = __decorate([
    (0, typedi_1.Service)(),
    (0, routing_controllers_openapi_1.OpenAPI)({
        tags: ["QUIZ"],
    }),
    (0, routing_controllers_1.Controller)("", { transformResponse: false }),
    __metadata("design:paramtypes", [services_1.QuizService,
        services_1.EnrollService])
], QuizController);
//# sourceMappingURL=quiz.controller.js.map