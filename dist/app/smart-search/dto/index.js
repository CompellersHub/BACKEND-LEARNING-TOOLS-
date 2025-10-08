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
exports.ToggleUser = exports.AssignReviewer = exports.CreateReview = exports.FindOneSmartSearch = exports.FindManySmartSearch = exports.FindManyWatchList = exports.CreateWatchList = exports.SearchOnline = void 0;
const class_validator_1 = require("class-validator");
const smart_interface_1 = require("../interface/smart.interface");
const class_transformer_1 = require("class-transformer");
const entities_1 = require("../../../global/entities");
const screening_1 = require("../interface/screening");
const mongoose_1 = require("mongoose");
class SearchOnline {
}
exports.SearchOnline = SearchOnline;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(255),
    (0, class_transformer_1.Transform)(({ value }) => value.trim()),
    __metadata("design:type", String)
], SearchOnline.prototype, "additional", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => value.trim()),
    __metadata("design:type", String)
], SearchOnline.prototype, "country", void 0);
__decorate([
    (0, class_validator_1.IsDate)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => new Date(value)),
    __metadata("design:type", Date)
], SearchOnline.prototype, "dateOfBirth", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Transform)(({ value }) => value.trim()),
    (0, class_validator_1.IsIn)(Object.values(smart_interface_1.smartType)),
    __metadata("design:type", String)
], SearchOnline.prototype, "entityType", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Transform)(({ value }) => value.trim()),
    __metadata("design:type", String)
], SearchOnline.prototype, "fullName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => value.trim()),
    __metadata("design:type", String)
], SearchOnline.prototype, "nationality", void 0);
class CreateWatchList {
}
exports.CreateWatchList = CreateWatchList;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Transform)(({ value }) => value.trim()),
    __metadata("design:type", String)
], CreateWatchList.prototype, "serviceName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Transform)(({ value }) => value.trim()),
    __metadata("design:type", String)
], CreateWatchList.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Transform)(({ value }) => value.trim()),
    __metadata("design:type", String)
], CreateWatchList.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Transform)(({ value }) => value.trim()),
    __metadata("design:type", String)
], CreateWatchList.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Transform)(({ value }) => value.trim()),
    __metadata("design:type", String)
], CreateWatchList.prototype, "provide", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Transform)(({ value }) => value.trim()),
    __metadata("design:type", Number)
], CreateWatchList.prototype, "records", void 0);
class FindManyWatchList extends entities_1.FindMany {
}
exports.FindManyWatchList = FindManyWatchList;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_transformer_1.Transform)(({ value }) => (typeof value === "string" ? [value] : value)),
    __metadata("design:type", Array)
], FindManyWatchList.prototype, "serviceName", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_transformer_1.Transform)(({ value }) => (typeof value === "string" ? [value] : value)),
    __metadata("design:type", Array)
], FindManyWatchList.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_transformer_1.Transform)(({ value }) => (typeof value === "string" ? [value] : value)),
    __metadata("design:type", Array)
], FindManyWatchList.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_transformer_1.Transform)(({ value }) => (typeof value === "string" ? [value] : value)),
    __metadata("design:type", Array)
], FindManyWatchList.prototype, "provide", void 0);
class FindManySmartSearch extends entities_1.FindMany {
}
exports.FindManySmartSearch = FindManySmartSearch;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_transformer_1.Transform)(({ value }) => (typeof value === "string" ? [value] : value)),
    __metadata("design:type", Array)
], FindManySmartSearch.prototype, "fullName", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_transformer_1.Transform)(({ value }) => (typeof value === "string" ? [value] : value)),
    __metadata("design:type", Array)
], FindManySmartSearch.prototype, "riskLevel", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_transformer_1.Transform)(({ value }) => (typeof value === "string" ? [value] : value)),
    __metadata("design:type", Array)
], FindManySmartSearch.prototype, "riskScore", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_transformer_1.Transform)(({ value }) => (typeof value === "string" ? [value] : value)),
    __metadata("design:type", Array)
], FindManySmartSearch.prototype, "responseTime", void 0);
class FindOneSmartSearch extends entities_1.FindOne {
}
exports.FindOneSmartSearch = FindOneSmartSearch;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], FindOneSmartSearch.prototype, "fullName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], FindOneSmartSearch.prototype, "riskLevel", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], FindOneSmartSearch.prototype, "riskScore", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], FindOneSmartSearch.prototype, "responseTime", void 0);
class CreateReview {
}
exports.CreateReview = CreateReview;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateReview.prototype, "massReviewRationale", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsIn)(Object.values(screening_1.massStatus)),
    __metadata("design:type", String)
], CreateReview.prototype, "massReviewStatus", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsMongoId)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Transform)(({ value }) => new mongoose_1.Types.ObjectId(value)),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], CreateReview.prototype, "screeningId", void 0);
class AssignReviewer {
}
exports.AssignReviewer = AssignReviewer;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsMongoId)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Transform)(({ value }) => new mongoose_1.Types.ObjectId(value)),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], AssignReviewer.prototype, "_id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsMongoId)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Transform)(({ value }) => new mongoose_1.Types.ObjectId(value)),
    __metadata("design:type", mongoose_1.Types.ObjectId)
], AssignReviewer.prototype, "reviewer", void 0);
class ToggleUser {
}
exports.ToggleUser = ToggleUser;
__decorate([
    (0, class_validator_1.IsMongoId)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ToggleUser.prototype, "user", void 0);
//# sourceMappingURL=index.js.map