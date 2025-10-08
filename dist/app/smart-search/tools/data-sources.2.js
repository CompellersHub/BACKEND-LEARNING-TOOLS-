"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataSourceService = void 0;
const axios_1 = __importStar(require("axios"));
const typedi_1 = require("typedi");
let DataSourceService = class DataSourceService {
    constructor() { }
    sources() {
        return {
            wikipedia: this.searchWikipedia.bind(this),
            wikidata: this.searchWikidata.bind(this),
            opensanctions: this.searchOpenSanctions.bind(this),
            worldbank: this.searchWorldBank.bind(this),
            un: this.searchUNSanctions.bind(this),
            ofac: this.searchOFAC.bind(this),
            pepsdb: this.searchPEPsDatabase.bind(this),
            newsapi: this.searchNews.bind(this),
            companieshouse: this.searchCompaniesHouse.bind(this),
        };
    }
    async searchPerson(name, options = {}) {
        const searchKey = `person_${name.toLowerCase().replace(/\s+/g, "_")}`;
        const results = {
            firstName: "",
            middleName: "",
            lastName: "",
            dateOfBirth: "",
            nationality: "",
            professionalProfile: {},
            politicalProfile: {
                isPEP: false,
                riskLevel: "Low",
                positions: [],
                yearsAsPEP: [],
                organizations: [],
            },
            sources: [],
            confidence: 0,
            searchTimestamp: new Date().toISOString(),
        };
        const searchPromises = Object.entries(this.sources).map(async ([sourceName, searchFunc]) => {
            try {
                const data = await searchFunc(name, options);
                console.log(data);
                if (data && Object.keys(data).length > 0) {
                    results.sources.push(sourceName);
                    return { source: sourceName, data };
                }
            }
            catch (error) {
                if (error instanceof Error)
                    console.error(`Error searching ${sourceName}:`, error.message);
            }
            return null;
        });
        const sourceResults = await Promise.allSettled(searchPromises);
        console.log({ sourceResults });
        const validResults = sourceResults
            .filter((result) => result.status === "fulfilled" && !!result.value)
            .map((result) => result.value);
        await this.mergeResults(results, validResults);
        results.confidence = this.calculateConfidence(validResults, results);
        return results;
    }
    async searchWikipedia(name) {
        try {
            const searchUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(name)}`;
            const response = await axios_1.default.get(searchUrl, {
                headers: { "User-Agent": "PEP-Search-Service/1.0" },
            });
            if (response.data.type === "disambiguation") {
                return await this.handleWikipediaDisambiguation(name);
            }
            const pageData = response.data;
            const result = {
                source: "wikipedia",
                fullName: pageData.title,
                description: pageData.extract,
                url: pageData.content_urls?.desktop?.page,
            };
            const detailedInfo = await this.getWikipediaDetails(pageData.title);
            console.log({ detailedInfo });
            return { ...result, ...detailedInfo };
        }
        catch (error) {
            if (error instanceof axios_1.AxiosError)
                if (error.response?.status === 404) {
                    return this.searchWikipediaByQuery(name);
                }
            throw error;
        }
    }
    async searchWikipediaByQuery(name) {
        try {
            const queryUrl = `https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&srsearch=${encodeURIComponent(name)}&srlimit=3`;
            const response = await axios_1.default.get(queryUrl);
            const results = response.data.query?.search || [];
            console.log({ results });
            if (results.length > 0) {
                const topResult = results[0];
                return await this.searchWikipedia(topResult.title);
            }
        }
        catch (error) {
            if (error instanceof Error)
                console.error("Wikipedia query search error:", error.message);
        }
        return {};
    }
    async getWikipediaDetails(title) {
        try {
            const infoboxUrl = `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=revisions&rvprop=content&titles=${encodeURIComponent(title)}&rvslots=main`;
            const response = await axios_1.default.get(infoboxUrl);
            const pages = response.data.query?.pages || {};
            const pageId = Object.keys(pages)[0];
            const content = pages[pageId]?.revisions?.[0]?.slots?.main?.["*"] || "";
            return this.parseWikipediaInfobox(content);
        }
        catch (error) {
            if (error instanceof Error)
                console.error("Wikipedia details error:", error.message);
            return {};
        }
    }
    parseWikipediaInfobox(content) {
        console.log({ content });
        const details = {};
        const birthMatch = content.match(/\|?\s*birth_date\s*=\s*(.+?)(?:\n|\|)/i) ||
            content.match(/\|?\s*born\s*=\s*(.+?)(?:\n|\|)/i);
        if (birthMatch) {
            details.dateOfBirth = this.parseDateString(birthMatch[1]);
        }
        const nationalityMatch = content.match(/\|?\s*nationality\s*=\s*(.+?)(?:\n|\|)/i) ||
            content.match(/\|?\s*country\s*=\s*(.+?)(?:\n|\|)/i);
        if (nationalityMatch) {
            details.nationality = nationalityMatch[1]
                .replace(/\[\[|\]\]/g, "")
                .trim();
        }
        const occupationMatch = content.match(/\|?\s*occupation\s*=\s*(.+?)(?:\n|\|)/i) ||
            content.match(/\|?\s*profession\s*=\s*(.+?)(?:\n|\|)/i);
        if (occupationMatch) {
            details.occupation = occupationMatch[1].replace(/\[\[|\]\]/g, "").trim();
        }
        const positionMatch = content.match(/\|?\s*office\s*=\s*(.+?)(?:\n|\|)/i) ||
            content.match(/\|?\s*title\s*=\s*(.+?)(?:\n|\|)/i);
        if (positionMatch) {
            details.politicalPosition = positionMatch[1]
                .replace(/\[\[|\]\]/g, "")
                .trim();
        }
        const termMatch = content.match(/\|?\s*term_start\s*=\s*(.+?)(?:\n|\|)/i);
        const termEndMatch = content.match(/\|?\s*term_end\s*=\s*(.+?)(?:\n|\|)/i);
        if (termMatch) {
            details.termStart = this.parseDateString(termMatch[1]);
            if (termEndMatch) {
                details.termEnd = this.parseDateString(termEndMatch[1]);
            }
        }
        console.log(details);
        return details;
    }
    async searchWikidata(name) {
        try {
            const searchUrl = `https://www.wikidata.org/w/api.php?action=wbsearchentities&format=json&language=en&search=${encodeURIComponent(name)}&limit=3`;
            const response = await axios_1.default.get(searchUrl);
            const results = response.data.search || [];
            console.log({ results });
            if (results.length > 0) {
                const entity = results[0];
                return await this.getWikidataEntity(entity.id);
            }
        }
        catch (error) {
            if (error instanceof Error) {
                console.error("Wikidata search error:", error.message);
            }
        }
        return {};
    }
    async getWikidataEntity(entityId) {
        try {
            const entityUrl = `https://www.wikidata.org/w/api.php?action=wbgetentities&format=json&ids=${entityId}&props=claims|labels`;
            const response = await axios_1.default.get(entityUrl);
            const entity = response.data.entities?.[entityId];
            if (!entity)
                return {};
            const claims = entity.claims || {};
            let result;
            if (claims.P569)
                result.dateOfBirth = claims.P569[0]?.mainsnak?.datavalue?.value?.time;
            if (claims.P27)
                result.nationality = claims.P27[0]?.mainsnak?.datavalue?.value?.id;
            if (claims.P106)
                result.occupation = claims.P106[0]?.mainsnak?.datavalue?.value?.id;
            if (claims.P39)
                result.positions = claims.P39?.map((pos) => pos.mainsnak?.datavalue?.value?.id);
            console.log({ result });
            return result;
        }
        catch (error) {
            if (error instanceof Error) {
                console.error("Wikidata entity error:", error.message);
            }
            return {};
        }
    }
    async searchOpenSanctions(name) {
        try {
            const apiUrl = `https://api.opensanctions.org/search/entities?q=${encodeURIComponent(name)}&limit=5`;
            const response = await axios_1.default.get(apiUrl, {
                headers: {
                    Authorization: `Bearer ${process.env.OPENSANCTIONS_API_KEY}`,
                    "User-Agent": "PEP-Search-Service/1.0",
                },
            });
            const results = response.data.results || [];
            console.log({ results });
            if (results.length > 0) {
                const entity = results[0];
                return {
                    isPEP: true,
                    riskLevel: this.mapRiskLevel(entity.datasets),
                    sanctions: entity.datasets,
                    properties: entity.properties,
                    source: "opensanctions",
                };
            }
        }
        catch (error) {
            if (error instanceof Error) {
                console.error("OpenSanctions error:", error.message);
            }
            if (error instanceof axios_1.AxiosError) {
                console.log(error.response.data);
            }
        }
        return {};
    }
    async searchWorldBank(name) {
        try {
            const apiUrl = `https://apigwext.worldbank.org/dvsvc/v1.0/json/APPLICATION/WORLDBANK/FIRM/${encodeURIComponent(name)}`;
            const response = await axios_1.default.get(apiUrl, {
                headers: { apikey: process.env.WORLDBANK_API_KEY },
            });
            console.log({ response: response.data });
            if (response.data && response.data.response) {
                return {
                    worldBankStatus: "debarred",
                    debarmentInfo: response.data.response,
                    source: "worldbank",
                };
            }
        }
        catch (error) {
            if (error instanceof axios_1.AxiosError) {
                if (error.response?.status !== 404) {
                    console.error("World Bank API error:", error.message);
                }
            }
        }
        return {};
    }
    async searchUNSanctions(name) {
        try {
            const apiUrl = `https://scsanctions.un.org/resources/xml/en/consolidated.xml`;
            const response = await axios_1.default.get(apiUrl);
            console.log({ response: response.data });
            if (response.data.includes(name)) {
                return {
                    unSanctions: true,
                    source: "un_sanctions",
                };
            }
        }
        catch (error) {
            if (error instanceof Error) {
                console.error("UN Sanctions error:", error.message);
            }
        }
        return {};
    }
    async searchOFAC(name) {
        try {
            const apiUrl = `https://www.treasury.gov/ofac/downloads/sdn.xml`;
            const response = await axios_1.default.get(apiUrl);
            console.log({ response: response.data });
            if (response.data.includes(name.toUpperCase())) {
                return {
                    ofacSanctions: true,
                    source: "ofac",
                };
            }
        }
        catch (error) {
            if (error instanceof Error)
                console.error("OFAC error:", error.message);
        }
        return {};
    }
    async searchPEPsDatabase(name) {
        try {
            const apiUrl = `https://api.pepsdb.com/v1/search?name=${encodeURIComponent(name)}`;
            const response = await axios_1.default.get(apiUrl, {
                headers: { "X-API-Key": process.env.PEPSDB_API_KEY },
            });
            const data = response.data;
            if (data.results && data.results.length > 0) {
                const person = data.results[0];
                return {
                    isPEP: true,
                    pepPositions: person.positions || [],
                    riskScore: person.risk_score,
                    countries: person.countries,
                    source: "pepsdb",
                };
            }
        }
        catch (error) {
            if (error instanceof axios_1.AxiosError)
                if (error.response?.status !== 404) {
                    console.error("PEPs Database error:", error.message);
                }
        }
        return {};
    }
    async searchNews(name) {
        try {
            const apiUrl = `https://newsapi.org/v2/everything?q="${name}"&language=en&sortBy=relevancy&pageSize=5`;
            const response = await axios_1.default.get(apiUrl, {
                headers: { "X-API-Key": process.env.NEWS_API_KEY },
            });
            const articles = response.data.articles || [];
            return {
                recentNews: articles.map((article) => ({
                    title: article.title,
                    url: article.url,
                    publishedAt: article.publishedAt,
                    source: article.source.name,
                })),
                source: "news_api",
            };
        }
        catch (error) {
            if (error instanceof Error)
                console.error("News API error:", error.message);
        }
        return {};
    }
    async searchCompaniesHouse(name) {
        try {
            const apiUrl = `https://api.company-information.service.gov.uk/search/officers?q=${encodeURIComponent(name)}`;
            const response = await axios_1.default.get(apiUrl, {
                auth: { username: process.env.COMPANIES_HOUSE_API_KEY, password: "" },
            });
            const officers = response.data.items || [];
            return {
                corporateRoles: officers.map((officer) => ({
                    name: officer.title,
                    company: officer.company_name,
                    role: officer.officer_role,
                    appointedOn: officer.appointed_on,
                })),
                source: "companies_house",
            };
        }
        catch (error) {
            if (error instanceof Error)
                console.error("Companies House error:", error.message);
        }
        return {};
    }
    async mergeResults(finalResults, sourceResults) {
        for (const { source, data } of sourceResults) {
            if (data.fullName && !finalResults.firstName) {
                const nameParts = data.fullName.split(" ");
                finalResults.firstName = nameParts[0] || "";
                finalResults.middleName =
                    nameParts.length > 2 ? nameParts.slice(1, -1).join(" ") : "";
                finalResults.lastName = nameParts[nameParts.length - 1] || "";
            }
            if (data.dateOfBirth) {
                finalResults.dateOfBirth = this.standardizeDate(data.dateOfBirth);
            }
            if (data.nationality) {
                finalResults.nationality = data.nationality;
            }
            if (data.occupation || data.corporateRoles) {
                finalResults.professionalProfile = {
                    ...finalResults.professionalProfile,
                    occupation: data.occupation,
                    corporateRoles: data.corporateRoles,
                    description: data.description,
                };
            }
            if (data.isPEP || data.politicalPosition || data.pepPositions) {
                finalResults.politicalProfile.isPEP =
                    data.isPEP || finalResults.politicalProfile.isPEP;
                if (data.riskLevel || data.riskScore) {
                    finalResults.politicalProfile.riskLevel = this.mapRiskLevel(data.riskLevel || data.riskScore);
                }
                if (data.pepPositions) {
                    finalResults.politicalProfile.positions.push(...data.pepPositions);
                }
                if (data.politicalPosition) {
                    finalResults.politicalProfile.positions.push({
                        title: data.politicalPosition,
                        startDate: data.termStart,
                        endDate: data.termEnd,
                        source: source,
                    });
                }
                if (data.termStart) {
                    const startYear = new Date(data.termStart).getFullYear();
                    const endYear = data.termEnd
                        ? new Date(data.termEnd).getFullYear()
                        : new Date().getFullYear();
                    for (let year = startYear; year <= endYear; year++) {
                        if (!finalResults.politicalProfile.yearsAsPEP.includes(year)) {
                            finalResults.politicalProfile.yearsAsPEP.push(year);
                        }
                    }
                }
            }
            if (data.sanctions || data.unSanctions || data.ofacSanctions) {
                finalResults.politicalProfile.sanctions = {
                    ...finalResults.politicalProfile.sanctions,
                    openSanctions: data.sanctions,
                    unSanctions: data.unSanctions,
                    ofacSanctions: data.ofacSanctions,
                    worldBankDebarred: data.worldBankStatus === "debarred",
                };
            }
            if (data.recentNews) {
                finalResults.recentNews = data.recentNews;
            }
        }
        finalResults.politicalProfile.yearsAsPEP.sort((a, b) => a - b);
    }
    calculateConfidence(sourceResults, finalResults) {
        let score = 0;
        const maxScore = 100;
        if (sourceResults.length > 0)
            score += 20;
        score += Math.min(sourceResults.length * 10, 40);
        if (finalResults.firstName)
            score += 5;
        if (finalResults.dateOfBirth)
            score += 10;
        if (finalResults.nationality)
            score += 5;
        if (finalResults.politicalProfile.isPEP)
            score += 15;
        if (finalResults.professionalProfile.occupation)
            score += 5;
        return Math.min(score, maxScore);
    }
    mapRiskLevel(input) {
        if (typeof input === "number") {
            if (input >= 80)
                return "Critical";
            if (input >= 60)
                return "High";
            if (input >= 40)
                return "Medium";
            return "Low";
        }
        const inputLower = String(input).toLowerCase();
        if (inputLower.includes("high") || inputLower.includes("critical"))
            return "High";
        if (inputLower.includes("medium"))
            return "Medium";
        return "Low";
    }
    standardizeDate(dateStr) {
        try {
            if (dateStr.includes("T")) {
                return new Date(dateStr).toISOString().split("T")[0];
            }
            const date = new Date(dateStr);
            if (!isNaN(date.getTime())) {
                return date.toISOString().split("T")[0];
            }
        }
        catch (error) {
            console.error("Date parsing error:", error);
        }
        return dateStr;
    }
    parseDateString(dateStr) {
        const cleaned = dateStr.replace(/\{\{|\}\}/g, "").replace(/\[\[|\]\]/g, "");
        const yearMatch = cleaned.match(/\b(19|20)\d{2}\b/);
        if (yearMatch) {
            return yearMatch[0];
        }
        return cleaned.trim();
    }
    async handleWikipediaDisambiguation(name) {
        try {
            const disambigUrl = `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=links&titles=${encodeURIComponent(name)}&pllimit=10`;
            const response = await axios_1.default.get(disambigUrl);
            const pages = response.data.query?.pages || {};
            console.log({ disambiguation: pages });
            const firstPage = Object.values(pages)[0];
            const links = firstPage?.links || [];
            for (const link of links.slice(0, 3)) {
                try {
                    const result = await this.searchWikipedia(link.title);
                    if (result && Object.keys(result).length > 0) {
                        return result;
                    }
                }
                catch (error) {
                    continue;
                }
            }
        }
        catch (error) {
            if (error instanceof Error)
                console.error("Disambiguation handling error:", error.message);
        }
        return {};
    }
};
exports.DataSourceService = DataSourceService;
exports.DataSourceService = DataSourceService = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [])
], DataSourceService);
//# sourceMappingURL=data-sources.2.js.map