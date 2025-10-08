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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindManyEnrollment = exports.RecordScore = exports.FindOneQuestion = exports.FindManyQuestion = exports.UpdateQuestion = exports.CreateQuestion = void 0;
const entities_1 = require("../../../global/entities");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const mongoose_1 = require("mongoose");
const interface_1 = require("../interface");
class CreateQuestion {
}
exports.CreateQuestion = CreateQuestion;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateQuestion.prototype, "question", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], CreateQuestion.prototype, "options", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Transform)(({ value }) => parseInt(value, 10)),
    __metadata("design:type", Number)
], CreateQuestion.prototype, "correctAnswer", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateQuestion.prototype, "explanation", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsIn)(Object.values(interface_1.qType)),
    __metadata("design:type", String)
], CreateQuestion.prototype, "type", void 0);
class UpdateQuestion {
}
exports.UpdateQuestion = UpdateQuestion;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateQuestion.prototype, "question", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ArrayMinSize)(3),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], UpdateQuestion.prototype, "options", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => parseInt(value, 10)),
    __metadata("design:type", Number)
], UpdateQuestion.prototype, "correctAnswer", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateQuestion.prototype, "explanation", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsIn)(Object.values(interface_1.qType)),
    __metadata("design:type", String)
], UpdateQuestion.prototype, "type", void 0);
class FindManyQuestion extends entities_1.FindMany {
}
exports.FindManyQuestion = FindManyQuestion;
__decorate([
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsIn)(Object.values(interface_1.qType), {
        each: true,
    }),
    (0, class_transformer_1.Transform)(({ value }) => (typeof value === "string" ? [value] : value)),
    __metadata("design:type", Array)
], FindManyQuestion.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)({ each: true }),
    (0, class_transformer_1.Transform)(({ value }) => {
        if (Array.isArray(value)) {
            return value.map((v) => parseInt(v, 10));
        }
        if (typeof value === "string" || typeof value === "number") {
            return [parseInt(value, 10)];
        }
        return value;
    }),
    __metadata("design:type", Array)
], FindManyQuestion.prototype, "quizId", void 0);
class FindOneQuestion extends entities_1.FindOne {
}
exports.FindOneQuestion = FindOneQuestion;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsIn)(Object.values(interface_1.qType)),
    __metadata("design:type", String)
], FindOneQuestion.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => parseInt(value, 10)),
    __metadata("design:type", Number)
], FindOneQuestion.prototype, "quizId", void 0);
class RecordScore {
}
exports.RecordScore = RecordScore;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], RecordScore.prototype, "student", void 0);
__decorate([
    (0, class_validator_1.IsDate)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Transform)(({ value }) => new Date(value)),
    __metadata("design:type", Date)
], RecordScore.prototype, "startAt", void 0);
__decorate([
    (0, class_validator_1.IsDate)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Transform)(({ value }) => new Date(value)),
    __metadata("design:type", Date)
], RecordScore.prototype, "completedAt", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)(Object.values(interface_1.qType)),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], RecordScore.prototype, "questionType", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Max)(100),
    (0, class_transformer_1.Transform)(({ value }) => parseInt(value, 10)),
    __metadata("design:type", Number)
], RecordScore.prototype, "score", void 0);
class FindManyEnrollment extends entities_1.FindMany {
}
exports.FindManyEnrollment = FindManyEnrollment;
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], FindManyEnrollment.prototype, "student", void 0);
//# sourceMappingURL=index.js.map