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
exports.ScreeningService = void 0;
const typedi_1 = require("typedi");
const data_sources_1 = require("./data-sources");
const name_matcher_1 = require("./name-matcher");
const smart_interface_1 = require("../interface/smart.interface");
let ScreeningService = class ScreeningService {
    constructor(fetcher, matcher, threshold = 0.65) {
        this.fetcher = fetcher;
        this.matcher = matcher;
        this.threshold = threshold;
    }
    async screenIndividual(data) {
        const { fullName, country, dateOfBirth, nationality } = data;
        const [sanctions, peps, wikiData, wikiDetails] = await Promise.all([
            this.fetcher.searchOpenSanctions(fullName, country),
            this.fetcher.searchPEPs(fullName, country),
            this.fetcher.searchWikipedia(fullName),
            this.fetcher.searchWikipediaDetails(fullName),
        ]);
        let results = [
            ...sanctions.filter((r) => r.score >= this.threshold),
            ...peps.filter((r) => r.score >= this.threshold),
        ];
        if (wikiData) {
            results.push(wikiData);
        }
        if (wikiDetails) {
            results.push(wikiDetails);
        }
        results = results.map((result) => {
            const fullMatchScore = this.matcher.matchProfile(data, {
                fullName: result.name,
                country: result.country,
                dateOfBirth: result.dob || "",
                nationality: result.nationality || "",
                entityType: smart_interface_1.smartType.in,
            });
            return {
                ...result,
                matchScore: fullMatchScore,
                riskLevel: this.calculateRisk(fullMatchScore, result.type),
            };
        });
        return results.sort((a, b) => {
            if (b.riskLevel !== a.riskLevel)
                return b.riskLevel - a.riskLevel;
            return b.matchScore - a.matchScore;
        });
    }
    calculateRisk(score, type) {
        let baseRisk = score * 100;
        if (type === "PEP")
            baseRisk *= 1.3;
        if (type === "Sanction")
            baseRisk *= 1.7;
        return Math.min(100, Math.round(baseRisk));
    }
};
exports.ScreeningService = ScreeningService;
exports.ScreeningService = ScreeningService = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [data_sources_1.DataFetcher,
        name_matcher_1.EnhancedNameMatcher, Object])
], ScreeningService);
//# sourceMappingURL=screening-service.js.map