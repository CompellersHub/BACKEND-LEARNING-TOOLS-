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
exports.AddOrRemoveEvidence = exports.FindOneCase = exports.FindManyCase = exports.UpdateCase = exports.FinancialCrime = exports.SanctionReview = exports.PepEnhancedDueDiligence = exports.Escalate = exports.CreateInvestigation = void 0;
const interface_1 = require("../../../app/monitor/interface");
const entities_1 = require("../../../global/entities");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const mongoose_1 = require("mongoose");
class IEvidence {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], IEvidence.prototype, "fileName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], IEvidence.prototype, "category", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], IEvidence.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], IEvidence.prototype, "priority", void 0);
class CreateInvestigation {
}
exports.CreateInvestigation = CreateInvestigation;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], CreateInvestigation.prototype, "alertId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateInvestigation.prototype, "investigationDecision", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ArrayUnique)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], CreateInvestigation.prototype, "reportableOffense", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateInvestigation.prototype, "jurisdiction", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateInvestigation.prototype, "authority", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateInvestigation.prototype, "assignTo", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateInvestigation.prototype, "investigationNote", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => IEvidence),
    __metadata("design:type", Array)
], CreateInvestigation.prototype, "evidence", void 0);
class Escalate {
}
exports.Escalate = Escalate;
__decorate([
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], Escalate.prototype, "alertId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], Escalate.prototype, "escalationLevel", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], Escalate.prototype, "escalationNotes", void 0);
class IShareholder {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], IShareholder.prototype, "shareholderName", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Transform)(({ value }) => typeof value === "string" ? parseFloat(value) : value),
    __metadata("design:type", Number)
], IShareholder.prototype, "percentage", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
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
], IShareholder.prototype, "adverseNews", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
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
], IShareholder.prototype, "sanctions", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
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
], IShareholder.prototype, "pep", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], IShareholder.prototype, "notes", void 0);
class IDirector {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], IDirector.prototype, "directorName", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
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
], IDirector.prototype, "adverseNews", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
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
], IDirector.prototype, "sanctions", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
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
], IDirector.prototype, "pep", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], IDirector.prototype, "notes", void 0);
class CounterParty {
}
__decorate([
    (0, class_validator_1.IsBoolean)(),
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
], CounterParty.prototype, "sanctionsHit", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
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
], CounterParty.prototype, "pepStatus", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
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
], CounterParty.prototype, "adverseNews", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CounterParty.prototype, "details", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_transformer_1.Transform)(({ value }) => {
        if (value === "true" || value === true)
            return true;
        if (value === "false" || value === false)
            return false;
        if (value === "yes")
            return true;
        if (value === "no")
            return false;
    }),
    __metadata("design:type", Boolean)
], CounterParty.prototype, "fundsFreezeObligations", void 0);
class ISource {
}
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayNotEmpty)(),
    (0, class_validator_1.ArrayUnique)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], ISource.prototype, "source", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ISource.prototype, "comment", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayNotEmpty)(),
    (0, class_validator_1.ArrayUnique)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], ISource.prototype, "links", void 0);
class PepEnhancedDueDiligence {
    constructor() {
        this.eddType = interface_1.eddType.pep;
    }
}
exports.PepEnhancedDueDiligence = PepEnhancedDueDiligence;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], PepEnhancedDueDiligence.prototype, "alertId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)(Object.values(interface_1.eddType)),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], PepEnhancedDueDiligence.prototype, "eddType", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsIn)(Object.values(interface_1.PepCategory)),
    __metadata("design:type", String)
], PepEnhancedDueDiligence.prototype, "pepCategory", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], PepEnhancedDueDiligence.prototype, "countryOfResidence", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], PepEnhancedDueDiligence.prototype, "occupation", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
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
], PepEnhancedDueDiligence.prototype, "publicFunction", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], PepEnhancedDueDiligence.prototype, "positionLevel", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], PepEnhancedDueDiligence.prototype, "governmentEntity", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
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
], PepEnhancedDueDiligence.prototype, "isControlOverPublicFunds", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
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
], PepEnhancedDueDiligence.prototype, "isRoleLinkedToHighValue", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], PepEnhancedDueDiligence.prototype, "familyMemberOfAPep", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], PepEnhancedDueDiligence.prototype, "estimatedNetWorth", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], PepEnhancedDueDiligence.prototype, "sourceOfWealthDocumentation", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], PepEnhancedDueDiligence.prototype, "sourceOfFund", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], PepEnhancedDueDiligence.prototype, "sourceOfFundDocumentation", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_transformer_1.Transform)(({ value }) => {
        if (value === "true" || value === true)
            return true;
        if (value === "false" || value === false)
            return false;
        if (value === "yes" || value === true)
            return true;
        if (value === "no" || value === false)
            return false;
        return value;
    }),
    __metadata("design:type", Boolean)
], PepEnhancedDueDiligence.prototype, "offshoreStructure", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_transformer_1.Transform)(({ value }) => {
        if (value === "true" || value === true)
            return true;
        if (value === "false" || value === false)
            return false;
        if (value === "yes" || value === true)
            return true;
        if (value === "no" || value === false)
            return false;
        return value;
    }),
    __metadata("design:type", Boolean)
], PepEnhancedDueDiligence.prototype, "isPepHighRiskOrSanctioned", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_transformer_1.Transform)(({ value }) => {
        if (value === "true" || value === true)
            return true;
        if (value === "false" || value === false)
            return false;
        if (value === "yes" || value === true)
            return true;
        if (value === "no" || value === false)
            return false;
        return value;
    }),
    __metadata("design:type", Boolean)
], PepEnhancedDueDiligence.prototype, "hasNameInCorruptionInvestigations", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_transformer_1.Transform)(({ value }) => {
        if (value === "true" || value === true)
            return true;
        if (value === "false" || value === false)
            return false;
        if (value === "yes" || value === true)
            return true;
        if (value === "no" || value === false)
            return false;
        return value;
    }),
    __metadata("design:type", Boolean)
], PepEnhancedDueDiligence.prototype, "adverseMediaFindingsOnPep", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_transformer_1.Transform)(({ value }) => {
        if (value === "true" || value === true)
            return true;
        if (value === "false" || value === false)
            return false;
        if (value === "yes" || value === true)
            return true;
        if (value === "no" || value === false)
            return false;
        return value;
    }),
    __metadata("design:type", Boolean)
], PepEnhancedDueDiligence.prototype, "willEnhancedMonitoringBeApplied", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_transformer_1.Transform)(({ value }) => {
        if (value === "true" || value === true)
            return true;
        if (value === "false" || value === false)
            return false;
        if (value === "yes" || value === true)
            return true;
        if (value === "no" || value === false)
            return false;
        return value;
    }),
    __metadata("design:type", Boolean)
], PepEnhancedDueDiligence.prototype, "willSeniorManagementSignOff", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)(["Quarterly", "Monthly", "Annually"]),
    __metadata("design:type", String)
], PepEnhancedDueDiligence.prototype, "frequencyOfOngoingDueDiligenceChecks", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_transformer_1.Transform)(({ value }) => {
        if (value === "true" || value === true)
            return true;
        if (value === "false" || value === false)
            return false;
        if (value === "yes" || value === true)
            return true;
        if (value === "no" || value === false)
            return false;
        return value;
    }),
    __metadata("design:type", Boolean)
], PepEnhancedDueDiligence.prototype, "seniorManagementApproval", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], PepEnhancedDueDiligence.prototype, "approverName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], PepEnhancedDueDiligence.prototype, "department", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], PepEnhancedDueDiligence.prototype, "position", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsUrl)({}, { each: true }),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], PepEnhancedDueDiligence.prototype, "supportingLinks", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsIn)(["File Sar Report", "Approved Pep EDD", "Further EDD"]),
    __metadata("design:type", String)
], PepEnhancedDueDiligence.prototype, "eddDecision", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_transformer_1.Transform)(({ value }) => {
        if (value === "true" || value === true)
            return true;
        if (value === "false" || value === false)
            return false;
        if (value === "yes" || value === true)
            return true;
        if (value === "no" || value === false)
            return false;
        return value;
    }),
    __metadata("design:type", Boolean)
], PepEnhancedDueDiligence.prototype, "addCustomerToPEPRegisterForOngoingMonitoring", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], PepEnhancedDueDiligence.prototype, "decisionRationale", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsIn)(Object.values(interface_1.selectedDecision)),
    __metadata("design:type", String)
], PepEnhancedDueDiligence.prototype, "finalCaseDecision", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], PepEnhancedDueDiligence.prototype, "finalDecisionRationale", void 0);
class SanctionReview {
    constructor() {
        this.eddType = interface_1.eddType.sanctions;
    }
}
exports.SanctionReview = SanctionReview;
__decorate([
    (0, class_validator_1.IsMongoId)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], SanctionReview.prototype, "alertId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsIn)(Object.values(interface_1.eddType)),
    __metadata("design:type", String)
], SanctionReview.prototype, "eddType", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayUnique)(),
    (0, class_validator_1.ArrayNotEmpty)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], SanctionReview.prototype, "documentsObtained", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], SanctionReview.prototype, "identityVerificationNotes", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], SanctionReview.prototype, "kycOrEDDReviewFindings", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], SanctionReview.prototype, "adverseMediaFinding", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => IShareholder),
    __metadata("design:type", Array)
], SanctionReview.prototype, "shareholdersChecks", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => IDirector),
    __metadata("design:type", Array)
], SanctionReview.prototype, "directorsChecks", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayUnique)(),
    (0, class_validator_1.ArrayNotEmpty)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], SanctionReview.prototype, "authoritiesScreening", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], SanctionReview.prototype, "pastCurrentAndPendingTransactions", void 0);
__decorate([
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => CounterParty),
    __metadata("design:type", Object)
], SanctionReview.prototype, "counterParty", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], SanctionReview.prototype, "sanctionReviewChecklist", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsIn)(Object.values(interface_1.sanctionsResult)),
    __metadata("design:type", String)
], SanctionReview.prototype, "matchType", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], SanctionReview.prototype, "recommendedActionAction", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], SanctionReview.prototype, "commentsAndRationale", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsIn)(Object.values(interface_1.selectedDecision)),
    __metadata("design:type", String)
], SanctionReview.prototype, "finalCaseDecision", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], SanctionReview.prototype, "finalDecisionRationale", void 0);
class FinancialCrime {
    constructor() {
        this.eddType = interface_1.eddType.financial;
    }
}
exports.FinancialCrime = FinancialCrime;
__decorate([
    (0, class_validator_1.IsMongoId)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], FinancialCrime.prototype, "alertId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsIn)(Object.values(interface_1.eddType)),
    __metadata("design:type", String)
], FinancialCrime.prototype, "eddType", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], FinancialCrime.prototype, "fullNameOfEntity", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], FinancialCrime.prototype, "countryOfIncorporation", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], FinancialCrime.prototype, "familyMemberOfAPep", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], FinancialCrime.prototype, "natureOfBusinessOrOccupation", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_transformer_1.Transform)(({ value }) => {
        if (value === "true" || value === true)
            return true;
        if (value === "false" || value === false)
            return false;
        if (value === "yes" || value === true)
            return true;
        if (value === "no" || value === false)
            return false;
        return value;
    }),
    __metadata("design:type", Boolean)
], FinancialCrime.prototype, "complexOwnershipStructure", void 0);
__decorate([
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => ISource),
    __metadata("design:type", Object)
], FinancialCrime.prototype, "sourceOfWealths", void 0);
__decorate([
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => ISource),
    __metadata("design:type", Object)
], FinancialCrime.prototype, "sourceOfFunds", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], FinancialCrime.prototype, "financialProduct", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_transformer_1.Transform)(({ value }) => {
        if (value === "true" || value === true)
            return true;
        if (value === "false" || value === false)
            return false;
        if (value === "yes" || value === true)
            return true;
        if (value === "no" || value === false)
            return false;
        return value;
    }),
    __metadata("design:type", Boolean)
], FinancialCrime.prototype, "thirdPartyPayment", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], FinancialCrime.prototype, "relationshipNote", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], FinancialCrime.prototype, "sanctionTouchPoints", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], FinancialCrime.prototype, "sanctionTouchPointsNote", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], FinancialCrime.prototype, "adverseNewsOrMedia", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], FinancialCrime.prototype, "adverseNewsOrMediaNote", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayUnique)(),
    (0, class_validator_1.ArrayNotEmpty)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], FinancialCrime.prototype, "businessOperationsCountries", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayUnique)(),
    (0, class_validator_1.ArrayNotEmpty)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], FinancialCrime.prototype, "primaryCustomersOrSuppliersCountries", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayUnique)(),
    (0, class_validator_1.ArrayNotEmpty)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], FinancialCrime.prototype, "fundFlowCountries", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_transformer_1.Transform)(({ value }) => {
        if (value === "true" || value === true)
            return true;
        if (value === "false" || value === false)
            return false;
        if (value === "yes" || value === true)
            return true;
        if (value === "no" || value === false)
            return false;
        return value;
    }),
    __metadata("design:type", Boolean)
], FinancialCrime.prototype, "isAnyCountriesHighRisk", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], FinancialCrime.prototype, "finalRiskRating", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], FinancialCrime.prototype, "riskDriverSummary", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayUnique)(),
    (0, class_validator_1.ArrayNotEmpty)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], FinancialCrime.prototype, "mitigatingMeasures", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsIn)(Object.values(interface_1.selectedDecision)),
    __metadata("design:type", String)
], FinancialCrime.prototype, "finalCaseDecision", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], FinancialCrime.prototype, "finalDecisionRationale", void 0);
class EvidenceCollecting {
}
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Transform)(({ value }) => typeof value === "string" ? parseInt(value, 10) : value),
    __metadata("design:type", Number)
], EvidenceCollecting.prototype, "transactionRecord", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], EvidenceCollecting.prototype, "riskLevel", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], EvidenceCollecting.prototype, "status", void 0);
class UpdateCase {
}
exports.UpdateCase = UpdateCase;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateCase.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateCase.prototype, "assignTo", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateCase.prototype, "priority", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => typeof value === "string" ? parseInt(value, 10) : value),
    __metadata("design:type", Number)
], UpdateCase.prototype, "progress", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateCase.prototype, "pepStatus", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateCase.prototype, "adverseMedia", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => typeof value === "string" ? new Date(value) : value),
    __metadata("design:type", Date)
], UpdateCase.prototype, "lastKycUpdate", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateCase.prototype, "sanctions", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => typeof value === "string" ? parseFloat(value) : value),
    __metadata("design:type", Number)
], UpdateCase.prototype, "totalTransaction", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => typeof value === "string" ? parseFloat(value) : value),
    __metadata("design:type", Number)
], UpdateCase.prototype, "totalAmount", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => typeof value === "string" ? parseInt(value, 10) : value),
    __metadata("design:type", Number)
], UpdateCase.prototype, "riskScore", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => EvidenceCollecting),
    __metadata("design:type", Array)
], UpdateCase.prototype, "evidenceCollecting", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateCase.prototype, "decisionRationale", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateCase.prototype, "caseDecision", void 0);
class FindManyCase extends entities_1.FindMany {
}
exports.FindManyCase = FindManyCase;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_transformer_1.Transform)(({ value }) => (typeof value === "string" ? [value] : value)),
    __metadata("design:type", Array)
], FindManyCase.prototype, "caseId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_transformer_1.Transform)(({ value }) => (typeof value === "string" ? [value] : value)),
    __metadata("design:type", Array)
], FindManyCase.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_transformer_1.Transform)(({ value }) => (typeof value === "string" ? [value] : value)),
    __metadata("design:type", Array)
], FindManyCase.prototype, "priority", void 0);
class FindOneCase extends entities_1.FindOne {
}
exports.FindOneCase = FindOneCase;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], FindOneCase.prototype, "caseId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], FindOneCase.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], FindOneCase.prototype, "priority", void 0);
class AddOrRemoveEvidence extends EvidenceCollecting {
}
exports.AddOrRemoveEvidence = AddOrRemoveEvidence;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsMongoId)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], AddOrRemoveEvidence.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsIn)(["delete", "add"]),
    __metadata("design:type", String)
], AddOrRemoveEvidence.prototype, "type", void 0);
//# sourceMappingURL=case.dto.js.map