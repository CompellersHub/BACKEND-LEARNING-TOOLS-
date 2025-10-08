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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnhancedNameMatcher = void 0;
const fast_levenshtein_1 = __importDefault(require("fast-levenshtein"));
const natural_1 = __importDefault(require("natural"));
const string_similarity_1 = require("string-similarity");
const typedi_1 = require("typedi");
const date_fns_1 = require("date-fns");
let EnhancedNameMatcher = class EnhancedNameMatcher {
    constructor() {
        this.tokenizer = new natural_1.default.WordTokenizer();
        this.metaphone = new natural_1.default.Metaphone();
    }
    matchProfile(input, target) {
        const weights = {
            name: 0.5,
            country: 0.2,
            dob: 0.2,
            nationality: 0.1,
        };
        const nameScore = this.matchName(input.fullName, target.fullName);
        const countryScore = input.country && target.country
            ? input.country.toLowerCase() === target.country.toLowerCase()
                ? 1
                : 0.3
            : 0;
        const dob = new Date(input.dateOfBirth);
        const targetDob = new Date(target.dateOfBirth);
        const dobScore = input.dateOfBirth && target.dateOfBirth
            ? this.matchDates(dob, targetDob)
            : 0;
        const nationalityScore = input.nationality && target.nationality
            ? (0, string_similarity_1.compareTwoStrings)(input.nationality.toLowerCase(), target.nationality.toLowerCase())
            : 0;
        return (nameScore * weights.name +
            countryScore * weights.country +
            dobScore * weights.dob +
            nationalityScore * weights.nationality);
    }
    matchName(a, b) {
        if (!a || !b)
            return 0;
        const levDist = fast_levenshtein_1.default.get(a, b);
        const maxLen = Math.max(a.length, b.length);
        const levScore = 1 - levDist / maxLen;
        const phoneScore = this.phoneticMatch(a, b);
        const tokenScore = this.tokenSimilarity(a, b);
        return levScore * 0.4 + phoneScore * 0.3 + tokenScore * 0.3;
    }
    phoneticMatch(a, b) {
        return this.metaphone.compare(a, b) ? 1 : 0;
    }
    tokenSimilarity(a, b) {
        const tokensA = this.tokenizer.tokenize(a.toLowerCase());
        const tokensB = this.tokenizer.tokenize(b.toLowerCase());
        const intersection = tokensA.filter((t) => tokensB.includes(t));
        return intersection.length / Math.max(tokensA.length, tokensB.length);
    }
    matchDates(date1, date2) {
        if (!(date1 instanceof Date) || !(date2 instanceof Date)) {
            return 0;
        }
        if ((0, date_fns_1.isSameDay)(date1, date2))
            return 1;
        if ((0, date_fns_1.isSameMonth)(date1, date2))
            return 0.8;
        if ((0, date_fns_1.isSameYear)(date1, date2))
            return 0.5;
        return 0;
    }
};
exports.EnhancedNameMatcher = EnhancedNameMatcher;
exports.EnhancedNameMatcher = EnhancedNameMatcher = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [])
], EnhancedNameMatcher);
//# sourceMappingURL=name-matcher.js.map