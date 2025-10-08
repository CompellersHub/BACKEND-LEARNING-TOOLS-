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
exports.KycDocument = exports.SubShareHolder = exports.KYCLink = exports.Directors = exports.OwnershipType = exports.FieldTypeArray = exports.FieldTypeString = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const interface_1 = require("../interface");
class FieldTypeString {
}
exports.FieldTypeString = FieldTypeString;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], FieldTypeString.prototype, "value", void 0);
__decorate([
    (0, class_validator_1.IsIn)(Object.values(interface_1.mark)),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], FieldTypeString.prototype, "status", void 0);
class FieldTypeArray {
}
exports.FieldTypeArray = FieldTypeArray;
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], FieldTypeArray.prototype, "value", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsIn)(Object.values(interface_1.mark)),
    __metadata("design:type", String)
], FieldTypeArray.prototype, "status", void 0);
class PoliticallyExposedPerson {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], PoliticallyExposedPerson.prototype, "politicalPositionHeld", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], PoliticallyExposedPerson.prototype, "tenurePeriod", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], PoliticallyExposedPerson.prototype, "familyOrCloseAssociateConnection", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], PoliticallyExposedPerson.prototype, "detailedSourceOfWealth", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Buffer),
    __metadata("design:type", Array)
], PoliticallyExposedPerson.prototype, "bankStatementsDocuments", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Buffer),
    __metadata("design:type", Array)
], PoliticallyExposedPerson.prototype, "sourceOfWealthEvidenceDocuments", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Buffer),
    __metadata("design:type", Array)
], PoliticallyExposedPerson.prototype, "additionalSupportingDocuments", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], PoliticallyExposedPerson.prototype, "overAllRiskRating", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], PoliticallyExposedPerson.prototype, "mitigatingFactors", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], PoliticallyExposedPerson.prototype, "ongoingMonitoringRequirements", void 0);
class SanctionsScreening {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], SanctionsScreening.prototype, "sanctioningJurisdiction", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], SanctionsScreening.prototype, "currentStatus", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], SanctionsScreening.prototype, "sanctionsDetails", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], SanctionsScreening.prototype, "detailedSourceOfWealth", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Buffer),
    __metadata("design:type", Array)
], SanctionsScreening.prototype, "bankStatementsDocuments", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Buffer),
    __metadata("design:type", Array)
], SanctionsScreening.prototype, "sourceOfWealthEvidenceDocuments", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Buffer),
    __metadata("design:type", Array)
], SanctionsScreening.prototype, "additionalSupportingDocuments", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], SanctionsScreening.prototype, "overAllRiskRating", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], SanctionsScreening.prototype, "mitigatingFactors", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], SanctionsScreening.prototype, "ongoingMonitoringRequirements", void 0);
class AdverseNews {
}
__decorate([
    (0, class_validator_1.IsDate)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => typeof value === "string" ? new Date(value) : value),
    __metadata("design:type", Date)
], AdverseNews.prototype, "dateOfNewOrAllegation", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AdverseNews.prototype, "newsSource", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AdverseNews.prototype, "detailsOfAdverseNews", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AdverseNews.prototype, "assessmentOfImpactOrResolution", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AdverseNews.prototype, "detailedSourceOfWealth", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Buffer),
    __metadata("design:type", Array)
], AdverseNews.prototype, "bankStatementsDocuments", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Buffer),
    __metadata("design:type", Array)
], AdverseNews.prototype, "sourceOfWealthEvidenceDocuments", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Buffer),
    __metadata("design:type", Array)
], AdverseNews.prototype, "additionalSupportingDocuments", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AdverseNews.prototype, "overAllRiskRating", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AdverseNews.prototype, "mitigatingFactors", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], AdverseNews.prototype, "ongoingMonitoringRequirements", void 0);
class OwnershipType {
}
exports.OwnershipType = OwnershipType;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], OwnershipType.prototype, "firstName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], OwnershipType.prototype, "lastName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], OwnershipType.prototype, "organizationName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsIn)(Object.values(interface_1.shipType)),
    __metadata("design:type", String)
], OwnershipType.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => typeof value === "string" ? parseFloat(value) : value),
    __metadata("design:type", Number)
], OwnershipType.prototype, "ownershipPercentage", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], OwnershipType.prototype, "nationality", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], OwnershipType.prototype, "countryOfResidence", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], OwnershipType.prototype, "occupation", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], OwnershipType.prototype, "idType", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], OwnershipType.prototype, "uploadIdDocument", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], OwnershipType.prototype, "uploadProofOfAddress", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], OwnershipType.prototype, "countryOfOperation", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], OwnershipType.prototype, "registrationNumber", void 0);
__decorate([
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => PoliticallyExposedPerson),
    __metadata("design:type", Object)
], OwnershipType.prototype, "politicallyExposedPerson", void 0);
__decorate([
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => SanctionsScreening),
    __metadata("design:type", Object)
], OwnershipType.prototype, "sanctionsScreening", void 0);
__decorate([
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => AdverseNews),
    __metadata("design:type", Object)
], OwnershipType.prototype, "adverseNews", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], OwnershipType.prototype, "identifier", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsIn)(Object.values(interface_1.mark)),
    __metadata("design:type", String)
], OwnershipType.prototype, "status", void 0);
class Directors {
}
exports.Directors = Directors;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], Directors.prototype, "firstName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], Directors.prototype, "lastName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], Directors.prototype, "occupation", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], Directors.prototype, "nationality", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], Directors.prototype, "countryOfResidence", void 0);
__decorate([
    (0, class_validator_1.IsDate)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => typeof value === "string" ? new Date(value) : value),
    __metadata("design:type", Date)
], Directors.prototype, "dateOfBirth", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsIn)(Object.values(interface_1.shipType)),
    __metadata("design:type", String)
], Directors.prototype, "idType", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Buffer),
    __metadata("design:type", Object)
], Directors.prototype, "uploadIdDocument", void 0);
__decorate([
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => PoliticallyExposedPerson),
    __metadata("design:type", Object)
], Directors.prototype, "politicallyExposedPerson", void 0);
__decorate([
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => SanctionsScreening),
    __metadata("design:type", Object)
], Directors.prototype, "sanctionsScreening", void 0);
__decorate([
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => AdverseNews),
    __metadata("design:type", Object)
], Directors.prototype, "adverseNews", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], Directors.prototype, "position", void 0);
__decorate([
    (0, class_validator_1.IsIn)(Object.values(interface_1.mark)),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], Directors.prototype, "status", void 0);
class KYCLink {
}
exports.KYCLink = KYCLink;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsUrl)(),
    __metadata("design:type", String)
], KYCLink.prototype, "link", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], KYCLink.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsIn)(Object.values(interface_1.mark)),
    __metadata("design:type", String)
], KYCLink.prototype, "status", void 0);
class SubShareholderDetails {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], SubShareholderDetails.prototype, "shareholderName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsIn)(Object.values(interface_1.shipType)),
    __metadata("design:type", String)
], SubShareholderDetails.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => typeof value === "string" ? parseFloat(value) : value),
    __metadata("design:type", Number)
], SubShareholderDetails.prototype, "ownershipPercentage", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], SubShareholderDetails.prototype, "nationality", void 0);
__decorate([
    (0, class_validator_1.IsDate)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => typeof value === "string" ? new Date(value) : value),
    __metadata("design:type", Date)
], SubShareholderDetails.prototype, "dateOfBirth", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], SubShareholderDetails.prototype, "placeOfBirth", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], SubShareholderDetails.prototype, "idNumber", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], SubShareholderDetails.prototype, "registrationNumber", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], SubShareholderDetails.prototype, "address", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => {
        if (value === "true" || value === true)
            return true;
        if (value === "false" || value === false)
            return false;
        if (value === "yes")
            return true;
        if (value === "no")
            return false;
        return value;
    }),
    __metadata("design:type", Boolean)
], SubShareholderDetails.prototype, "politicallyExposedPerson", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsIn)(Object.values(interface_1.mark)),
    __metadata("design:type", String)
], SubShareholderDetails.prototype, "status", void 0);
class SubShareHolder {
}
exports.SubShareHolder = SubShareHolder;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], SubShareHolder.prototype, "parentIdentifier", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => SubShareholderDetails),
    __metadata("design:type", Array)
], SubShareHolder.prototype, "detailed", void 0);
class KycDocument {
}
exports.KycDocument = KycDocument;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], KycDocument.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], KycDocument.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsUrl)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], KycDocument.prototype, "uri", void 0);
__decorate([
    (0, class_validator_1.IsDate)(),
    (0, class_transformer_1.Transform)(({ value }) => new Date(value)),
    __metadata("design:type", Date)
], KycDocument.prototype, "uploadedDate", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsIn)(Object.values(interface_1.mark)),
    __metadata("design:type", String)
], KycDocument.prototype, "status", void 0);
//# sourceMappingURL=define.dto.js.map