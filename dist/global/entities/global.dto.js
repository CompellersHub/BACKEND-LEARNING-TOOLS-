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
exports.FindOne = exports.FindMany = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class FindMany {
    constructor() {
        this.sort = ["updatedAt"];
        this.offset = 0;
        this.limit = 10;
        this.page = 1;
        this.lean = true;
    }
}
exports.FindMany = FindMany;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)((v) => (typeof v.value === "string" ? [v.value] : v.value)),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], FindMany.prototype, "search", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)((v) => (typeof v.value === "string" ? [v.value] : v.value)),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], FindMany.prototype, "sort", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)((v) => (typeof v.value === "string" ? [v.value] : v.value)),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], FindMany.prototype, "populate", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    (0, class_transformer_1.Transform)((v) => parseInt(v.value, 10)),
    __metadata("design:type", Number)
], FindMany.prototype, "offset", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_transformer_1.Transform)((v) => parseInt(v.value, 10)),
    __metadata("design:type", Number)
], FindMany.prototype, "limit", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_transformer_1.Transform)((v) => parseInt(v.value, 10)),
    __metadata("design:type", Number)
], FindMany.prototype, "page", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    (0, class_transformer_1.Transform)((v) => (v.value === "true" ? true : false)),
    __metadata("design:type", Object)
], FindMany.prototype, "lean", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_transformer_1.Transform)((v) => (typeof v.value === "string" ? [v.value] : v.value)),
    __metadata("design:type", Array)
], FindMany.prototype, "select", void 0);
class FindOne {
    constructor() {
        this.lean = true;
        this.increaseView = false;
    }
}
exports.FindOne = FindOne;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Transform)((v) => v.value),
    __metadata("design:type", String)
], FindOne.prototype, "_id", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_transformer_1.Transform)((v) => (v.value === "true" ? true : false)),
    __metadata("design:type", Boolean)
], FindOne.prototype, "lean", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], FindOne.prototype, "session", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_transformer_1.Transform)((v) => (v.value === "true" ? true : false)),
    __metadata("design:type", Boolean)
], FindOne.prototype, "increaseView", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)((v) => (typeof v.value === "string" ? [v.value] : v.value)),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], FindOne.prototype, "populate", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_transformer_1.Transform)((v) => (typeof v.value === "string" ? [v.value] : v.value)),
    __metadata("design:type", Array)
], FindOne.prototype, "select", void 0);
//# sourceMappingURL=global.dto.js.map