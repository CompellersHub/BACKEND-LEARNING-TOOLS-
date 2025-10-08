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
exports.CreateKYC = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const interface_1 = require("../interface");
const define_dto_1 = require("./define.dto");
class CreateKYC {
}
exports.CreateKYC = CreateKYC;
__decorate([
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => define_dto_1.FieldTypeString),
    __metadata("design:type", Object)
], CreateKYC.prototype, "accountNumber", void 0);
__decorate([
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => define_dto_1.FieldTypeString),
    __metadata("design:type", Object)
], CreateKYC.prototype, "entityName", void 0);
__decorate([
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => define_dto_1.FieldTypeString),
    __metadata("design:type", Object)
], CreateKYC.prototype, "entityType", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => define_dto_1.FieldTypeArray),
    __metadata("design:type", Object)
], CreateKYC.prototype, "productType", void 0);
__decorate([
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => define_dto_1.FieldTypeString),
    __metadata("design:type", Object)
], CreateKYC.prototype, "companyNumber", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => define_dto_1.FieldTypeString),
    __metadata("design:type", Object)
], CreateKYC.prototype, "incorporationDate", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => define_dto_1.FieldTypeString),
    __metadata("design:type", Object)
], CreateKYC.prototype, "registeredOfficeAddress", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => define_dto_1.FieldTypeString),
    __metadata("design:type", Object)
], CreateKYC.prototype, "natureOfBusiness", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => define_dto_1.FieldTypeString),
    __metadata("design:type", Object)
], CreateKYC.prototype, "industry", void 0);
__decorate([
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => define_dto_1.FieldTypeString),
    __metadata("design:type", Object)
], CreateKYC.prototype, "countryOfOrigin", void 0);
__decorate([
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => define_dto_1.FieldTypeString),
    __metadata("design:type", Object)
], CreateKYC.prototype, "expectedTransactionVolume", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => define_dto_1.FieldTypeArray),
    __metadata("design:type", Object)
], CreateKYC.prototype, "sourceOfWealth", void 0);
__decorate([
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => define_dto_1.FieldTypeString),
    __metadata("design:type", Object)
], CreateKYC.prototype, "expectedTransactionFrequency", void 0);
__decorate([
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => define_dto_1.FieldTypeString),
    __metadata("design:type", Object)
], CreateKYC.prototype, "entityDescription", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => define_dto_1.FieldTypeArray),
    __metadata("design:type", Object)
], CreateKYC.prototype, "sourcesOfWealth", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => define_dto_1.FieldTypeString),
    __metadata("design:type", Object)
], CreateKYC.prototype, "sourcesOfWealthExplanation", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => define_dto_1.FieldTypeArray),
    __metadata("design:type", Object)
], CreateKYC.prototype, "sourceOfFunds", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => define_dto_1.FieldTypeString),
    __metadata("design:type", Object)
], CreateKYC.prototype, "sourcesOfFundsExplanation", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => define_dto_1.FieldTypeString),
    __metadata("design:type", Object)
], CreateKYC.prototype, "riskMitigationFactors", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => define_dto_1.FieldTypeString),
    __metadata("design:type", Object)
], CreateKYC.prototype, "ongoingMonitoringRequirements", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => define_dto_1.FieldTypeString),
    __metadata("design:type", Object)
], CreateKYC.prototype, "seniorManagementJustification", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => define_dto_1.OwnershipType),
    __metadata("design:type", Array)
], CreateKYC.prototype, "shareholders", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => define_dto_1.Directors),
    __metadata("design:type", Array)
], CreateKYC.prototype, "directors", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => define_dto_1.SubShareHolder),
    __metadata("design:type", Array)
], CreateKYC.prototype, "subShareholder", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)(Object.values(interface_1.riskLevel)),
    __metadata("design:type", String)
], CreateKYC.prototype, "riskLevel", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => define_dto_1.KYCLink),
    __metadata("design:type", Array)
], CreateKYC.prototype, "annualReportLinks", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => define_dto_1.KYCLink),
    __metadata("design:type", Array)
], CreateKYC.prototype, "incorporationCertificateLinks", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => define_dto_1.KYCLink),
    __metadata("design:type", Array)
], CreateKYC.prototype, "listOfDirectorsLinks", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => define_dto_1.KYCLink),
    __metadata("design:type", Array)
], CreateKYC.prototype, "shareholdersLinks", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => define_dto_1.KYCLink),
    __metadata("design:type", Array)
], CreateKYC.prototype, "memorandumLinks", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => define_dto_1.KYCLink),
    __metadata("design:type", Array)
], CreateKYC.prototype, "natureOfBusinessLinks", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => define_dto_1.KYCLink),
    __metadata("design:type", Array)
], CreateKYC.prototype, "proofOfIdLinks", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => define_dto_1.KYCLink),
    __metadata("design:type", Array)
], CreateKYC.prototype, "proofOfIdUboLinks", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => define_dto_1.KYCLink),
    __metadata("design:type", Array)
], CreateKYC.prototype, "proofOfListingLinks", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => define_dto_1.KYCLink),
    __metadata("design:type", Array)
], CreateKYC.prototype, "proofOfRegulationLinks", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => define_dto_1.KYCLink),
    __metadata("design:type", Array)
], CreateKYC.prototype, "sanctionScreeningLinks", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => define_dto_1.KYCLink),
    __metadata("design:type", Array)
], CreateKYC.prototype, "sanctionScreeningUboLinks", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)(["Decline", "Request Info", "Approve"]),
    __metadata("design:type", String)
], CreateKYC.prototype, "decision", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateKYC.prototype, "detailedAnalysisAndFinding", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateKYC.prototype, "internalComments", void 0);
//# sourceMappingURL=create.dto.js.map