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
exports.UpdateKYC = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const define_dto_1 = require("./define.dto");
class UpdateKYC {
}
exports.UpdateKYC = UpdateKYC;
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => define_dto_1.FieldTypeString),
    __metadata("design:type", Object)
], UpdateKYC.prototype, "accountNumber", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => define_dto_1.FieldTypeString),
    __metadata("design:type", Object)
], UpdateKYC.prototype, "entityName", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => define_dto_1.FieldTypeString),
    __metadata("design:type", Object)
], UpdateKYC.prototype, "entityType", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => define_dto_1.FieldTypeArray),
    __metadata("design:type", Object)
], UpdateKYC.prototype, "productType", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => define_dto_1.FieldTypeString),
    __metadata("design:type", Object)
], UpdateKYC.prototype, "companyNumber", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => define_dto_1.FieldTypeString),
    __metadata("design:type", Object)
], UpdateKYC.prototype, "industry", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => define_dto_1.FieldTypeString),
    __metadata("design:type", Object)
], UpdateKYC.prototype, "countryOfOrigin", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => define_dto_1.FieldTypeString),
    __metadata("design:type", Object)
], UpdateKYC.prototype, "expectedTransactionVolume", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => define_dto_1.FieldTypeArray),
    __metadata("design:type", Object)
], UpdateKYC.prototype, "sourceOfWealth", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => define_dto_1.FieldTypeString),
    __metadata("design:type", Object)
], UpdateKYC.prototype, "expectedTransactionFrequency", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => define_dto_1.FieldTypeString),
    __metadata("design:type", Object)
], UpdateKYC.prototype, "entityDescription", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => define_dto_1.FieldTypeArray),
    __metadata("design:type", Object)
], UpdateKYC.prototype, "sourcesOfWealth", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => define_dto_1.FieldTypeString),
    __metadata("design:type", Object)
], UpdateKYC.prototype, "sourcesOfWealthExplanation", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => define_dto_1.FieldTypeArray),
    __metadata("design:type", Object)
], UpdateKYC.prototype, "sourceOfFunds", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => define_dto_1.FieldTypeString),
    __metadata("design:type", Object)
], UpdateKYC.prototype, "sourcesOfFundsExplanation", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => define_dto_1.KycDocument),
    __metadata("design:type", Array)
], UpdateKYC.prototype, "sourcesOfWealthEvidenceDocument", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => define_dto_1.KycDocument),
    __metadata("design:type", Array)
], UpdateKYC.prototype, "sourceOfFundsVerificationDocument", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => define_dto_1.KycDocument),
    __metadata("design:type", Array)
], UpdateKYC.prototype, "enhancedBeneficialOwnershipDocument", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => define_dto_1.KycDocument),
    __metadata("design:type", Array)
], UpdateKYC.prototype, "financialStatementsDocument", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => define_dto_1.KycDocument),
    __metadata("design:type", Array)
], UpdateKYC.prototype, "taxReturnsOrCertificatesDocument", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => define_dto_1.KycDocument),
    __metadata("design:type", Array)
], UpdateKYC.prototype, "professionalReferencesDocument", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => define_dto_1.KycDocument),
    __metadata("design:type", Array)
], UpdateKYC.prototype, "assetValuationReportsDocument", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => define_dto_1.KycDocument),
    __metadata("design:type", Array)
], UpdateKYC.prototype, "transactionHistoryDocument", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => define_dto_1.FieldTypeString),
    __metadata("design:type", Object)
], UpdateKYC.prototype, "riskMitigationFactors", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => define_dto_1.FieldTypeString),
    __metadata("design:type", Object)
], UpdateKYC.prototype, "ongoingMonitoringRequirements", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => define_dto_1.FieldTypeString),
    __metadata("design:type", Object)
], UpdateKYC.prototype, "seniorManagementJustification", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => define_dto_1.OwnershipType),
    __metadata("design:type", Array)
], UpdateKYC.prototype, "shareholders", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => define_dto_1.Directors),
    __metadata("design:type", Array)
], UpdateKYC.prototype, "directors", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => define_dto_1.SubShareHolder),
    __metadata("design:type", Array)
], UpdateKYC.prototype, "subShareholder", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => define_dto_1.KycDocument),
    __metadata("design:type", Array)
], UpdateKYC.prototype, "annualReportDocument", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => define_dto_1.KycDocument),
    __metadata("design:type", Array)
], UpdateKYC.prototype, "incorporationCertificateDocument", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => define_dto_1.KycDocument),
    __metadata("design:type", Array)
], UpdateKYC.prototype, "listOfDirectorsDocument", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => define_dto_1.KycDocument),
    __metadata("design:type", Array)
], UpdateKYC.prototype, "shareholdersDocument", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => define_dto_1.KycDocument),
    __metadata("design:type", Array)
], UpdateKYC.prototype, "memorandumDocument", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => define_dto_1.KycDocument),
    __metadata("design:type", Array)
], UpdateKYC.prototype, "natureOfBusinessDocument", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => define_dto_1.KycDocument),
    __metadata("design:type", Array)
], UpdateKYC.prototype, "proofOfIdDocument", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => define_dto_1.KycDocument),
    __metadata("design:type", Array)
], UpdateKYC.prototype, "proofOfIdUboDocument", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => define_dto_1.KycDocument),
    __metadata("design:type", Array)
], UpdateKYC.prototype, "proofOfListingDocument", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => define_dto_1.KycDocument),
    __metadata("design:type", Array)
], UpdateKYC.prototype, "proofOfRegulationDocument", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => define_dto_1.KycDocument),
    __metadata("design:type", Array)
], UpdateKYC.prototype, "sanctionScreeningDocument", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => define_dto_1.KycDocument),
    __metadata("design:type", Array)
], UpdateKYC.prototype, "sanctionScreeningUboDocument", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => define_dto_1.KYCLink),
    __metadata("design:type", Array)
], UpdateKYC.prototype, "annualReportLinks", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => define_dto_1.KYCLink),
    __metadata("design:type", Array)
], UpdateKYC.prototype, "incorporationCertificateLinks", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => define_dto_1.KYCLink),
    __metadata("design:type", Array)
], UpdateKYC.prototype, "listOfDirectorsLinks", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => define_dto_1.KYCLink),
    __metadata("design:type", Array)
], UpdateKYC.prototype, "shareholdersLinks", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => define_dto_1.KYCLink),
    __metadata("design:type", Array)
], UpdateKYC.prototype, "memorandumLinks", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => define_dto_1.KYCLink),
    __metadata("design:type", Array)
], UpdateKYC.prototype, "natureOfBusinessLinks", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => define_dto_1.KYCLink),
    __metadata("design:type", Array)
], UpdateKYC.prototype, "proofOfIdLinks", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => define_dto_1.KYCLink),
    __metadata("design:type", Array)
], UpdateKYC.prototype, "proofOfIdUboLinks", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => define_dto_1.KYCLink),
    __metadata("design:type", Array)
], UpdateKYC.prototype, "proofOfListingLinks", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => define_dto_1.KYCLink),
    __metadata("design:type", Array)
], UpdateKYC.prototype, "proofOfRegulationLinks", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => define_dto_1.KYCLink),
    __metadata("design:type", Array)
], UpdateKYC.prototype, "sanctionScreeningLinks", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => define_dto_1.KYCLink),
    __metadata("design:type", Array)
], UpdateKYC.prototype, "sanctionScreeningUboLinks", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_transformer_1.Transform)(({ value }) => parseInt(value, 10)),
    __metadata("design:type", Number)
], UpdateKYC.prototype, "score", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UpdateKYC.prototype, "comment", void 0);
//# sourceMappingURL=update.dto.js.map