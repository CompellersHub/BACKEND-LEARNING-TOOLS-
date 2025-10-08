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
exports.FindManyTransaction = exports.FindOneProfile = exports.FindManyAlert = exports.CreateAlert = exports.FindManyMonitorProfile = void 0;
const entities_1 = require("../../../global/entities");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const mongoose_1 = require("mongoose");
const interface_1 = require("../interface");
class FindManyMonitorProfile extends entities_1.FindMany {
    constructor() {
        super(...arguments);
        this.severity = interface_1.severity.all;
    }
}
exports.FindManyMonitorProfile = FindManyMonitorProfile;
__decorate([
    (0, class_validator_1.IsIn)(Object.values(interface_1.severity)),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], FindManyMonitorProfile.prototype, "severity", void 0);
class CreateAlert {
}
exports.CreateAlert = CreateAlert;
__decorate([
    (0, class_validator_1.IsIn)(Object.values(interface_1.Action)),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateAlert.prototype, "action", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MinLength)(20),
    __metadata("design:type", String)
], CreateAlert.prototype, "comment", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], CreateAlert.prototype, "alert", void 0);
__decorate([
    (0, class_validator_1.IsMongoId)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => mongoose_1.Types.ObjectId.isValid(value) ? new mongoose_1.Types.ObjectId(value) : value),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], CreateAlert.prototype, "student", void 0);
class FindManyAlert extends entities_1.FindMany {
}
exports.FindManyAlert = FindManyAlert;
__decorate([
    (0, class_validator_1.IsIn)(Object.values(interface_1.severity)),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], FindManyAlert.prototype, "severity", void 0);
class FindOneProfile extends entities_1.FindOne {
}
exports.FindOneProfile = FindOneProfile;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], FindOneProfile.prototype, "customerId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], FindOneProfile.prototype, "fullName", void 0);
class FindManyTransaction extends entities_1.FindMany {
}
exports.FindManyTransaction = FindManyTransaction;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)(["recent", "years"]),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], FindManyTransaction.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => (typeof value === "string" ? [value] : value)),
    __metadata("design:type", Array)
], FindManyTransaction.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsMongoId)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], FindManyTransaction.prototype, "customer", void 0);
__decorate([
    (0, class_validator_1.IsDate)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => new Date(value)),
    __metadata("design:type", Date)
], FindManyTransaction.prototype, "from", void 0);
__decorate([
    (0, class_validator_1.IsDate)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => new Date(value)),
    __metadata("design:type", Date)
], FindManyTransaction.prototype, "end", void 0);
//# sourceMappingURL=monitor.dto.js.map