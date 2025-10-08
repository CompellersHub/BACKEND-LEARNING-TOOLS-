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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WatchListAPI = void 0;
const cheerio = __importStar(require("cheerio"));
const typedi_1 = require("typedi");
const utils_1 = require("../../../global/utils");
let WatchListAPI = class WatchListAPI {
    constructor(httpClient) {
        this.httpClient = httpClient;
    }
    async searchOFAC(name) {
        try {
            const response = await fetch("https://www.treasury.gov/ofac/downloads/sdn.xml");
            const xmlData = await response.text();
            const matches = [];
            const nameRegex = new RegExp(name.split(" ").join(".*"), "i");
            if (nameRegex.test(xmlData)) {
                matches.push({
                    source: "OFAC",
                    name: name,
                    matchPercentage: 85,
                    riskLevel: "HIGH",
                    details: {
                        listType: "SDN",
                        program: "Various sanctions programs",
                        lastUpdated: new Date().toISOString(),
                    },
                });
            }
            return matches;
        }
        catch (error) {
            console.error("OFAC search error:", error);
            return [];
        }
    }
    async searchUNSanctions(name) {
        try {
            const response = await fetch(`https://scsanctions.un.org/resources/xml/en/consolidated.xml`);
            const xmlData = await response.text();
            const matches = [];
            const nameRegex = new RegExp(name.split(" ").join(".*"), "i");
            if (nameRegex.test(xmlData)) {
                matches.push({
                    source: "UN",
                    name: name,
                    matchPercentage: 80,
                    riskLevel: "HIGH",
                    details: {
                        listType: "Consolidated List",
                        committee: "Security Council",
                        lastUpdated: new Date().toISOString(),
                    },
                });
            }
            return matches;
        }
        catch (error) {
            console.error("UN Sanctions search error:", error);
            return [];
        }
    }
    async searchEUSanctions(name) {
        try {
            const response = await fetch("https://webgate.ec.europa.eu/europeaid/fsd/fsf/public/files/xmlFullSanctionsList_1_1/content?token=dG9rZW4=");
            if (!response.ok) {
                throw new Error("EU API not available");
            }
            const xmlData = await response.text();
            const matches = [];
            const nameRegex = new RegExp(name.split(" ").join(".*"), "i");
            if (nameRegex.test(xmlData)) {
                matches.push({
                    source: "EU",
                    name: name,
                    matchPercentage: 75,
                    riskLevel: "HIGH",
                    details: {
                        listType: "Consolidated List",
                        regulation: "EU Sanctions",
                        lastUpdated: new Date().toISOString(),
                    },
                });
            }
            return matches;
        }
        catch (error) {
            console.error("EU Sanctions search error:", error);
            return [];
        }
    }
    async searchPEPDatabase(name) {
        try {
            const pepNames = [
                "Donald Trump",
                "Joe Biden",
                "Vladimir Putin",
                "Xi Jinping",
                "Emmanuel Macron",
                "Angela Merkel",
                "Boris Johnson",
                "Narendra Modi",
            ];
            const matches = [];
            const nameWords = name.toLowerCase().split(" ");
            for (const pepName of pepNames) {
                const pepWords = pepName.toLowerCase().split(" ");
                const commonWords = nameWords.filter((word) => pepWords.some((pepWord) => pepWord.includes(word) || word.includes(pepWord)));
                if (commonWords.length > 0) {
                    const matchPercentage = (commonWords.length / Math.max(nameWords.length, pepWords.length)) *
                        100;
                    if (matchPercentage > 50) {
                        matches.push({
                            source: "PEP",
                            name: pepName,
                            matchPercentage: Math.round(matchPercentage),
                            riskLevel: matchPercentage > 80 ? "HIGH" : "MEDIUM",
                            details: {
                                category: "Politically Exposed Person",
                                position: "Government Official",
                                country: "Various",
                                lastUpdated: new Date().toISOString(),
                            },
                        });
                    }
                }
            }
            return matches;
        }
        catch (error) {
            console.error("PEP search error:", error);
            return [];
        }
    }
    async searchInterpol(name) {
        try {
            return [];
        }
        catch (error) {
            console.error("Interpol search error:", error);
            return [];
        }
    }
    async searchNigerianWatchlists(name) {
        try {
            const matches = [];
            if (name.toLowerCase().includes("fraud") ||
                name.toLowerCase().includes("corrupt")) {
                matches.push({
                    source: "EFCC",
                    name: name,
                    matchPercentage: 70,
                    riskLevel: "HIGH",
                    details: {
                        listType: "Wanted List",
                        charges: "Financial Crimes",
                        lastUpdated: new Date().toISOString(),
                    },
                });
            }
            return matches;
        }
        catch (error) {
            console.error("Nigerian watchlist search error:", error);
            return [];
        }
    }
    async searchNews(name) {
        try {
            const apiKey = process.env.NEWSAPI_KEY;
            if (!apiKey) {
                console.warn("Google News API key not configured");
                return [];
            }
            const client = this.httpClient.getClient();
            const response = await client.get(`https://newsapi.org/v2/everything?q="${name}"&sortBy=relevancy&apiKey=${apiKey}`);
            return (response.data.articles?.slice(0, 5).map((article) => ({
                source: "Google News",
                title: article.title,
                url: article.url,
                snippet: article.description,
                publishedDate: article.publishedAt,
                relevanceScore: 75,
            })) || []);
        }
        catch (error) {
            console.error("News search error:", error);
            return [];
        }
    }
    async searchWikipedia(name) {
        try {
            const client = this.httpClient.getClient();
            const response = await client.get(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(name)}`);
            const data = await response.data;
            return {
                source: "Wikipedia",
                title: data.title,
                extract: data.extract,
                url: data.content_urls?.desktop?.page,
                thumbnail: data.thumbnail?.source,
            };
        }
        catch (error) {
            console.error("Wikipedia search error:", error);
            return null;
        }
    }
    async searchWikipediaDetails(query, limit = 10) {
        try {
            const url = `https://en.wikipedia.org/w/rest.php/v1/search/title?q=${encodeURIComponent(query)}&limit=${limit}`;
            const client = this.httpClient.getClient();
            const response = await client.get(url);
            const pages = response.data?.pages;
            if (!pages?.length)
                return [];
            const result = await Promise.all(pages.map(async (page) => {
                const pageUrl = `https://en.wikipedia.org/wiki/${page.key}`;
                let articleText = "";
                try {
                    const client = this.httpClient.getClient();
                    const articleHtml = await client.get(pageUrl);
                    const $ = cheerio.load(articleHtml.data);
                    const paragraphs = $("#mw-content-text .mw-parser-output > p")
                        .map((_, el) => $(el).text().trim())
                        .get()
                        .filter(Boolean)
                        .slice(0, 3);
                    articleText = paragraphs.join("\n\n");
                }
                catch (err) {
                    console.error(`Failed to fetch article for ${page.title}:`, err.message);
                }
                return {
                    source: "Wikipedia",
                    title: page.title,
                    url: pageUrl,
                    summary: page.excerpt.replace(/<[^>]+>/g, ""),
                    extract: articleText,
                    thumbnail: page.thumbnail?.url
                        ? `https:${page.thumbnail.url}`
                        : undefined,
                };
            }));
            return result;
        }
        catch (error) {
            if (error instanceof Error) {
                console.error("Wikipedia detail search error:", error.message);
            }
            console.log(error);
            return [];
        }
    }
};
exports.WatchListAPI = WatchListAPI;
exports.WatchListAPI = WatchListAPI = __decorate([
    (0, typedi_1.Service)(),
    __param(0, (0, typedi_1.Inject)()),
    __metadata("design:paramtypes", [utils_1.HttpClient])
], WatchListAPI);
//# sourceMappingURL=watchlist-apis.js.map