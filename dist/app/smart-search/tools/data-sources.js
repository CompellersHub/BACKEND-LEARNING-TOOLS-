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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataFetcher = void 0;
const typedi_1 = require("typedi");
const name_matcher_1 = require("./name-matcher");
const axios_1 = __importDefault(require("axios"));
const wikidata = __importStar(require("wikidata-sdk"));
const utils_1 = require("../../../global/utils");
const cache_1 = __importDefault(require("../../../global/utils/cache"));
const cheerio = __importStar(require("cheerio"));
const fast_xml_parser_1 = require("fast-xml-parser");
let DataFetcher = class DataFetcher {
    constructor(matcher, httpClient) {
        this.matcher = matcher;
        this.httpClient = httpClient;
    }
    async searchOpenSanctions(name, country) {
        try {
            const cacheKey = utils_1.AppCache.generateKey("opensanctions", {
                name,
                country,
            });
            const cached = cache_1.default.get(cacheKey);
            if (cached)
                return cached;
            const url = `https://api.opensanctions.org/search/default?q=${encodeURIComponent(name)}${country ? `&countries=${country}` : ""}`;
            const client = this.httpClient.getClient();
            const response = await client.get(url, {
                headers: {
                    Accept: "application/json",
                    Authorization: `Api-Key ${process.env.OPENSANCTIONS_API_KEY}`,
                },
            });
            if (!response.data?.results)
                return [];
            return response.data.results.map((item) => ({
                name: item.name || "Unknown",
                type: item.schema || "Entity",
                country: item.country || "",
                source: "OpenSanctions",
                details: item.summary || "",
                score: item.name ? this.matcher.matchName(name, item.name) : 0,
            }));
        }
        catch (error) {
            if (error instanceof Error) {
                console.error("OpenSanctions error:", error.message);
            }
            return [];
        }
    }
    async searchWikipediaDetails(query) {
        try {
            const url = `https://en.wikipedia.org/w/rest.php/v1/search/title?q=${encodeURIComponent(query)}&limit=5`;
            const client = this.httpClient.getClient();
            const response = await client.get(url);
            const pages = response.data?.pages;
            if (!pages?.length)
                return [];
            const results = await Promise.all(pages.map(async (page) => {
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
                const aiAnalysis = await this.AiAnalysis(page.title, articleText);
                const news = await this.fetchNews(page.title);
                const score = this.matcher.matchName(page.title, query);
                return {
                    name: page.title,
                    type: "PEP",
                    source: ["Wikipedia", "Open AI", "News API"],
                    url: pageUrl,
                    summary: page.excerpt.replace(/<[^>]+>/g, ""),
                    article: articleText,
                    aiAnalysis: JSON.parse(aiAnalysis),
                    news,
                    tags: ["PEP", "Former President", "Military"],
                    thumbnail: page.thumbnail?.url
                        ? `https:${page.thumbnail.url}`
                        : undefined,
                };
            }));
            return results.sort((a, b) => {
                if (b.riskLevel !== a.riskLevel)
                    return b.riskLevel - a.riskLevel;
                return b.score - a.score;
            });
        }
        catch (error) {
            if (error instanceof Error) {
                console.error("Wikipedia detail search error:", error.message);
            }
            console.log(error);
            return [];
        }
    }
    async searchWikipedia(name) {
        try {
            const searchUrl = wikidata.searchEntities(name, "en", 1);
            const searchResponse = await axios_1.default.get(searchUrl);
            const searchResults = searchResponse.data?.search;
            if (!searchResults?.length)
                return null;
            const entityId = searchResults[0].id;
            const entityUrl = wikidata.getEntities(entityId, ["en"]);
            const entityResponse = await axios_1.default.get(entityUrl);
            const entityData = entityResponse.data?.entities?.[entityId];
            const sitelinkTitle = entityData?.sitelinks?.enwiki?.title;
            if (!sitelinkTitle)
                return null;
            const wikipediaUrl = `https://en.wikipedia.org/wiki/${encodeURIComponent(sitelinkTitle)}`;
            const summaryUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(sitelinkTitle)}`;
            const summaryResponse = await axios_1.default.get(summaryUrl);
            return {
                name,
                source: "wikipedia",
                url: wikipediaUrl,
                summary: summaryResponse.data?.extract || "",
                thumbnail: summaryResponse.data?.thumbnail?.source,
            };
        }
        catch (error) {
            console.error("Wikipedia search error:", error.message);
            return null;
        }
    }
    async matchSanctionedEntities(inputName) {
        const xml = await this.fetchSanctionsXML();
        const entities = this.parseSanctionsXML(xml);
        return entities
            .map((entity) => {
            const score = entity.name
                .toLowerCase()
                .includes(inputName.toLowerCase())
                ? 0.9
                : 0.2;
            return { ...entity, score, riskLevel: Math.round(score * 100) };
        })
            .filter((e) => e.score >= 0.85);
    }
    async AiAnalysis(title, article) {
        try {
            const client = this.httpClient.getClient();
            const aiResponse = await client.post("https://api.openai.com/v1/chat/completions", {
                model: "gpt-4",
                messages: [
                    {
                        role: "system",
                        content: "You are a biographical information parser. Your job is to extract structured profile data from raw summaries about people. Format the output in JSON and be accurate with names, dates, positions, and PEP status.",
                    },
                    {
                        role: "user",
                        content: `You are an intelligent data extractor. Given a biographical summary, extract the following fields in JSON format. If any field is missing, return null or an empty string. Use inference if the information is implied. Focus especially on identifying politically exposed person (PEP) status and related roles. Fields to extract:

First Name

Middle Name (if available)

Last Name

Date of Birth (format: YYYY-MM-DD)

Nationality

Professional Profile (brief summary of career and roles)

Political Profile:

IsPEP (true or false)

YearsAsPEP (e.g., ["1999–2007"])

Positions (e.g., "President", "Minister of Finance")

Organizations (e.g., "Federal Government of Nigeria", "United Nations")${article}`,
                    },
                ],
                temperature: 0.3,
            }, {
                headers: {
                    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
                },
            });
            return aiResponse.data.choices[0]?.message?.content?.trim() || "";
        }
        catch (error) {
            console.error("AI analysis failed:", error.message);
        }
    }
    async searchPEPs(name, country) {
        try {
            const client = this.httpClient.getClient();
            const response = await client.get("https://api.opencorporates.com/v0.4/peps/search", {
                params: {
                    q: name,
                    ...(country && { country_code: country }),
                    api_token: process.env.OPENCORPORATES_KEY,
                },
            });
            if (!response.data?.results?.people)
                return [];
            return response.data.results.people.map((person) => ({
                name: person.name || "Unknown",
                type: "PEP",
                country: person.country_code || "",
                position: person.position || "",
                source: "OpenCorporates",
                score: person.name ? this.matcher.matchName(name, person.name) : 0,
            }));
        }
        catch (error) {
            if (error instanceof Error) {
                console.error("PEP search error:", error.message);
            }
            return [];
        }
    }
    async fetchNews(title) {
        let news = [];
        try {
            const client = this.httpClient.getClient();
            const newsResponse = await client.get(`https://newsapi.org/v2/everything?q=${encodeURIComponent(title)}&language=en&sortBy=publishedAt&pageSize=3&apiKey=${process.env.NEWSAPI_KEY}`);
            news = (newsResponse.data.articles || []).map((a) => ({
                title: a.title,
                url: a.url,
            }));
            return news;
        }
        catch (error) {
            console.error("News fetch failed:", error.message);
        }
    }
    async fetchSanctionsXML() {
        const EU_SANCTIONS_URL = "https://webgate.ec.europa.eu/europeaid/fsd/fsf/public/files/xmlFullSanctionsList_1_1/content?token=dG9rZW4=";
        const res = await axios_1.default.get(EU_SANCTIONS_URL, {
            responseType: "text",
        });
        return res.data;
    }
    parseSanctionsXML(xml) {
        const parser = new fast_xml_parser_1.XMLParser({ ignoreAttributes: false });
        const json = parser.parse(xml);
        const entries = json?.sanctionsList?.sanctionEntity || [];
        return entries.map((entry) => {
            const name = entry?.name?.firstName + " " + entry?.name?.lastName ||
                entry?.name?.wholeName;
            const nationality = entry?.citizenship?.countryDescription || "";
            const birthDate = entry?.birthdate || "";
            return {
                name,
                entityId: entry.entityId,
                type: entry.type || "individual",
                birthDate,
                nationality,
                score: 0,
                riskLevel: 100,
                source: "EU_Sanctions",
                tags: ["Sanctioned", "EU"],
            };
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
exports.DataFetcher = DataFetcher;
exports.DataFetcher = DataFetcher = __decorate([
    (0, typedi_1.Service)(),
    __param(1, (0, typedi_1.Inject)()),
    __metadata("design:paramtypes", [name_matcher_1.EnhancedNameMatcher,
        utils_1.HttpClient])
], DataFetcher);
//# sourceMappingURL=data-sources.js.map