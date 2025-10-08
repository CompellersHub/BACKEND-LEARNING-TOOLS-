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
exports.AiAnalysis = void 0;
const ai_1 = require("ai");
const openai_1 = require("@ai-sdk/openai");
const typedi_1 = require("typedi");
let AiAnalysis = class AiAnalysis {
    constructor() { }
    async performAIAnalysis(data) {
        if (!process.env.OPENAI_API_KEY) {
            console.warn("OpenAI not configured, using fallback analysis");
            return this.getFallbackAnalysis(data);
        }
        try {
            const prompt = `
You are a highly objective and impartial KYC/AML Compliance Analyst with extensive expertise in financial crime prevention, regulatory compliance, and data analysis. Your role is to analyze KYC and AML results strictly based on the provided data, delivering factual, unbiased, and precise insights. You adhere to the following principles:

— Factual Accuracy: Base your analysis exclusively on the data provided. Do not infer, speculate, or assume information beyond what is explicitly stated in the input or verifiably sourced from public records (e.g., Wikipedia, sanctions databases, etc.).

— Unbiased Reporting: Present findings neutrally, avoiding overly generous, negative, or subjective interpretations. Maintain a professional, neutral tone.

— Data-Driven Validation: Use only reliable and verifiable sources such as:
  - Official government records
  - International sanctions lists (OFAC, EU, UN, etc.)
  - FATF and regional AML directives
  - Reputable public sources (e.g., Wikipedia, reputable media)
Clearly cite these sources when drawing conclusions.

— Transparency: For any conclusions drawn, explicitly reference the specific data points or evidence that support your findings. If data is insufficient, state this and recommend further investigation.

— Regulatory Compliance: Align all analysis with global KYC/AML standards (e.g., FATF, OFAC, EU AML Directives). Flag any potential red flags including:
  - PEP (Politically Exposed Person) status
  - Sanctions or watchlist matches
  - Adverse media (corruption, fraud, etc.)
  - Unusual or suspicious transaction patterns

— Clarity and Structure: Provide a clear, structured response with:
  1. Risk Score (0–100)
  2. Risk Level (LOW: 0–30, MEDIUM: 31–70, HIGH: 71–100)
  3. Subject Category (e.g., PEP, Former PEP, Sanctioned, Watchlisted, None)
  4. Brief summary (2–3 sentences)
  5. Detailed analysis (1–2 paragraphs)
  6. Key risk factors (bullet list)
  7. Recommendations for compliance officers (bullet list)
  8. Bio Details:
     {
        Date of Birth: Month Day, Year,
        Place of Birth: Town, state, country,
        Nationality: Country,
        Occupation: Jobs about the user,
        Education: schools attended
     }

— PEP, Sanction, and Category Detection:
Automatically assess whether the subject qualifies as any of the following:
  - Politically Exposed Person (PEP)
  - Former PEP (retired or inactive >10 years)
  - Sanctioned individual/entity
  - Watchlist match
  - Adverse media subject
If classification is not clear, use the available public information (e.g., Wikipedia or news) to determine roles, exposure, and relevance.

Risk Weighting Guidelines:
  - Active PEP: base score 75
  - Former PEP (>10 years inactive): base score 50
  - On Sanctions List: 95–100 (HIGH)
  - Watchlist Match (credible): +25
  - Adverse Media: +20
  - No exposure or red flags: 0–30 (LOW)

— Task Instructions:
Analyze the provided KYC/AML data, including customer identity, watchlist matches, transaction indicators, Wikipedia entries, and news content. Your goal is to generate a risk profile for the subject using the principles above.

  SUBJECT INFORMATION:
  - Name: ${data.name}
  - Entity Type: ${data.entityType}
  - Nationality: ${data.nationality || "Unknown"}
  - Date of Birth: ${data.dateOfBirth || "Get it from the wikipedia article"}
  
  WATCHLIST MATCHES:
  ${data.watchlistMatches
                .map((match) => `
  - Source: ${match.source}
  - Match: ${match.name} (${match.matchPercentage}% match)
  - Risk Level: ${match.riskLevel}
  - Details: ${JSON.stringify(match.details)}
  `)
                .join("\n")}
  
  NEWS ARTICLES:
  ${data.newsArticles
                .map((article) => `
  - Title: ${article.title}
  - Source: ${article.source}
  - Snippet: ${article.snippet}
  - Published: ${article.publishedDate}
  `)
                .join("\n")}
  
  WIKIPEDIA DATA:
  ${data.wikipediaData
                ? `
  - Title: ${data.wikipediaData.title}
  - Extract: ${data.wikipediaData.extract}
  `
                : "No Wikipedia data found"}
  
  Please provide:
  1. A risk score from 0-100
  2. A risk level (LOW: 0-30, MEDIUM: 31-70, HIGH: 71-100)
  3. A brief summary (2-3 sentences)
  4. A detailed analysis (1-2 paragraphs)
  5. Key risk factors (bullet points)
  6. Recommendations for compliance officers
  7. Bio Details:{
      Date of Birth: Month Day, Year,
      Place of Birth: Town, state, country,
      Nationality: Country,
      Occupation: Jobs about the user,
      Education: schools attend
    }
  
  Return only raw JSON without code fences or Markdown formatting like \`\`\`json.
  Example format:
  {
    "riskScore": number,
    "riskLevel": "string",
    "summary": "string",
    "detailedAnalysis": "string",
    "riskFactors": ["string"],
    "recommendations": ["string"]
    "bioDetails":{
      "dateOfBirth": "string",
      "placeOfBirth": "string"
      "nationality": "string",
      "occupation": "string",
      "education": "string"
    }
  }
  `;
            const { text } = await (0, ai_1.generateText)({
                model: (0, openai_1.openai)("gpt-4o-mini"),
                prompt,
                temperature: 0.3,
            });
            let cleaned = text.trim();
            if (cleaned.startsWith("```")) {
                cleaned = cleaned
                    .replace(/^```[a-z]*\s*/i, "")
                    .replace(/```$/, "")
                    .trim();
            }
            let analysis;
            try {
                analysis = JSON.parse(cleaned);
            }
            catch (e) {
                console.error("JSON parsing failed:", cleaned);
                throw new Error("Invalid AI response format");
            }
            if (typeof analysis.riskScore !== "number" ||
                typeof analysis.riskLevel !== "string" ||
                typeof analysis.summary !== "string") {
                console.error("Incomplete AI response:", analysis);
                throw new Error("Invalid AI response structure");
            }
            return analysis;
        }
        catch (error) {
            console.error("AI analysis error:", error);
            return this.getFallbackAnalysis(data);
        }
    }
    getFallbackAnalysis(data) {
        const highRiskMatches = data.watchlistMatches.filter((m) => m.riskLevel === "HIGH");
        const mediumRiskMatches = data.watchlistMatches.filter((m) => m.riskLevel === "MEDIUM");
        let riskScore = 0;
        let riskLevel = "LOW";
        if (highRiskMatches.length > 0) {
            riskScore = 85;
            riskLevel = "HIGH";
        }
        else if (mediumRiskMatches.length > 0) {
            riskScore = 55;
            riskLevel = "MEDIUM";
        }
        else if (data.watchlistMatches.length > 0) {
            riskScore = 25;
            riskLevel = "LOW";
        }
        return {
            riskScore,
            riskLevel,
            summary: `Found ${data.watchlistMatches.length} watchlist matches for ${data.name}. ${riskLevel} risk level assigned based on match sources.`,
            detailedAnalysis: `Screening completed against multiple watchlists. ${highRiskMatches.length} high-risk matches found in sanctions lists. ${mediumRiskMatches.length} medium-risk matches in PEP databases. Manual review recommended for verification.`,
            riskFactors: [
                ...highRiskMatches.map((m) => `High-risk match in ${m.source}: ${m.name}`),
                ...mediumRiskMatches.map((m) => `Medium-risk match in ${m.source}: ${m.name}`),
                ...(data.newsArticles.length > 0
                    ? [`${data.newsArticles.length} news mentions found`]
                    : []),
            ],
            recommendations: [
                "Verify identity documents",
                "Check for false positives",
                "Review source credibility",
                ...(riskLevel === "HIGH"
                    ? [
                        "Escalate to senior compliance officer",
                        "Consider enhanced due diligence",
                    ]
                    : []),
                "Document decision rationale",
            ],
            bioDetails: {
                fullName: data.name,
                dateOfBirth: data.dateOfBirth,
                placeOfBirth: "",
                nationality: data.nationality,
                education: "",
                occupation: "",
            },
        };
    }
    async summarizeNewsArticles(articles) {
        if (!articles.length)
            return "No relevant news articles found.";
        try {
            const prompt = `
  Summarize the following news articles and identify any potential compliance risks:
  
  ${articles
                .map((article) => `
  Title: ${article.title}
  Content: ${article.snippet}
  ---
  `)
                .join("\n")}
  
  Provide a concise summary focusing on:
  1. Key themes or patterns
  2. Any mentions of legal issues, sanctions, or regulatory actions
  3. Overall sentiment and potential reputational risks
  
  Keep the summary to 2-3 sentences.
  `;
            const { text } = await (0, ai_1.generateText)({
                model: (0, openai_1.openai)("gpt-4o"),
                prompt,
                temperature: 0.3,
            });
            return text;
        }
        catch (error) {
            console.error("News summarization error:", error);
            return `Found ${articles.length} news articles. Manual review recommended.`;
        }
    }
};
exports.AiAnalysis = AiAnalysis;
exports.AiAnalysis = AiAnalysis = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [])
], AiAnalysis);
//# sourceMappingURL=ai-analysis.js.map