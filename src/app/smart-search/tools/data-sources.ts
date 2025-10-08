// data source
import { Inject, Service } from "typedi";
import { EnhancedNameMatcher } from "./name-matcher";
import axios from "axios";
import * as wikidata from "wikidata-sdk";
import { AppCache, HttpClient } from "@/global/utils";
import cache from "@/global/utils/cache";
import * as cheerio from "cheerio";
import { XMLParser } from "fast-xml-parser";

interface EnrichedResult {
  name: string;
  type: string;
  riskLevel: number;
  score: number;
  source: string[];
  url: string;
  summary: string;
  article: string;
  aiAnalysis: string;
  news: { title: string; url: string }[];
  tags: string[];
  thumbnail?: string;
}

interface SanctionEntity {
  name: string;
  entityId: string;
  type: string;
  birthDate?: string;
  nationality?: string;
  score: number;
  riskLevel: number;
  source: string;
  tags: string[];
  url?: string;
  summary?: string;
  article?: string;
  aiAnalysis?: string;
  news?: { title: string; url: string }[];
  thumbnail?: string;
}

@Service()
export class DataFetcher {
  constructor(
    private readonly matcher: EnhancedNameMatcher,
    @Inject()
    private readonly httpClient: HttpClient
  ) {}

  async searchOpenSanctions(name: string, country?: string) {
    try {
      const cacheKey = AppCache.generateKey("opensanctions", {
        name,
        country,
      });
      const cached = cache.get(cacheKey);
      if (cached) return cached;

      // Updated OpenSanctions API endpoint
      const url = `https://api.opensanctions.org/search/default?q=${encodeURIComponent(
        name
      )}${country ? `&countries=${country}` : ""}`;
      const client = this.httpClient.getClient();
      const response = await client.get(url, {
        headers: {
          Accept: "application/json",
          Authorization: `Api-Key ${process.env.OPENSANCTIONS_API_KEY}`,
        },
      });

      // Safely handle response data
      if (!response.data?.results) return [];

      return response.data.results.map((item: any) => ({
        name: item.name || "Unknown",
        type: item.schema || "Entity",
        country: item.country || "",
        source: "OpenSanctions",
        details: item.summary || "",
        score: item.name ? this.matcher.matchName(name, item.name) : 0,
      }));
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("OpenSanctions error:", error.message);
      }
      return [];
    }
  }

  async searchWikipediaDetails(query: string) {
    try {
      const url = `https://en.wikipedia.org/w/rest.php/v1/search/title?q=${encodeURIComponent(
        query
      )}&limit=5`;
      const client = this.httpClient.getClient();
      const response = await client.get(url);
      const pages = response.data?.pages;

      if (!pages?.length) return [];

      const results: EnrichedResult[] = await Promise.all(
        pages.map(async (page: any) => {
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
          } catch (err) {
            console.error(
              `Failed to fetch article for ${page.title}:`,
              (err as Error).message
            );
          }

          // AI Analysis using OpenAI
          const aiAnalysis = await this.AiAnalysis(page.title, articleText);

          // News fetch using NewsAPI
          const news = await this.fetchNews(page.title);
          const score = this.matcher.matchName(page.title, query);
          return {
            name: page.title,
            type: "PEP",
            // riskLevel: this.calculateRisk(score, "PEP"),
            // score,
            source: ["Wikipedia", "Open AI", "News API"],
            url: pageUrl,
            summary: page.excerpt.replace(/<[^>]+>/g, ""),
            article: articleText,
            aiAnalysis: JSON.parse(aiAnalysis),
            news,
            tags: ["PEP", "Former President", "Military"], // Could enhance with NLP
            thumbnail: page.thumbnail?.url
              ? `https:${page.thumbnail.url}`
              : undefined,
          };
        })
      );

      // return results;
      return results.sort((a, b) => {
        if (b.riskLevel !== a.riskLevel) return b.riskLevel - a.riskLevel;
        return b.score - a.score;
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Wikipedia detail search error:", error.message);
      }
      console.log(error);
      return [];
    }
  }

  async searchWikipedia(name: string) {
    try {
      // Step 1: Search for the entity
      const searchUrl = wikidata.searchEntities(name, "en", 1);
      const searchResponse = await axios.get(searchUrl);
      const searchResults = searchResponse.data?.search;

      if (!searchResults?.length) return null;

      const entityId = searchResults[0].id;

      // Step 2: Get full entity data
      const entityUrl = wikidata.getEntities(entityId, ["en"]);
      const entityResponse = await axios.get(entityUrl);
      const entityData = entityResponse.data?.entities?.[entityId];

      // Step 3: Get the English Wikipedia sitelink
      const sitelinkTitle = entityData?.sitelinks?.enwiki?.title;
      if (!sitelinkTitle) return null;

      const wikipediaUrl = `https://en.wikipedia.org/wiki/${encodeURIComponent(
        sitelinkTitle
      )}`;

      // Step 4: Fetch the summary from Wikipedia
      const summaryUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(
        sitelinkTitle
      )}`;
      const summaryResponse = await axios.get(summaryUrl);

      return {
        name,
        source: "wikipedia",
        url: wikipediaUrl,
        summary: summaryResponse.data?.extract || "",
        thumbnail: summaryResponse.data?.thumbnail?.source,
      };
    } catch (error) {
      console.error("Wikipedia search error:", (error as Error).message);
      return null;
    }
  }

  async matchSanctionedEntities(inputName: string): Promise<SanctionEntity[]> {
    const xml = await this.fetchSanctionsXML();
    const entities = this.parseSanctionsXML(xml);
    return entities
      .map((entity) => {
        // Fake score logic for now, you can integrate your matcher here
        const score = entity.name
          .toLowerCase()
          .includes(inputName.toLowerCase())
          ? 0.9
          : 0.2;
        return { ...entity, score, riskLevel: Math.round(score * 100) };
      })
      .filter((e) => e.score >= 0.85);
  }

  async AiAnalysis(title: string, article: string) {
    try {
      const client = this.httpClient.getClient();
      const aiResponse = await client.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-4",
          messages: [
            {
              role: "system",
              content:
                "You are a biographical information parser. Your job is to extract structured profile data from raw summaries about people. Format the output in JSON and be accurate with names, dates, positions, and PEP status.",
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
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          },
        }
      );
      return aiResponse.data.choices[0]?.message?.content?.trim() || "";
    } catch (error) {
      console.error("AI analysis failed:", (error as Error).message);
    }
  }

  async searchPEPs(name: string, country?: string) {
    try {
      const client = this.httpClient.getClient();
      const response = await client.get(
        "https://api.opencorporates.com/v0.4/peps/search",
        {
          params: {
            q: name,
            ...(country && { country_code: country }),
            api_token: process.env.OPENCORPORATES_KEY,
          },
        }
      );

      // Safely handle response data
      if (!response.data?.results?.people) return [];

      return response.data.results.people.map((person: any) => ({
        name: person.name || "Unknown",
        type: "PEP",
        country: person.country_code || "",
        position: person.position || "",
        source: "OpenCorporates",
        score: person.name ? this.matcher.matchName(name, person.name) : 0,
      }));
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("PEP search error:", error.message);
      }
      return [];
    }
  }

  async fetchNews(title: string) {
    let news: { title: string; url: string }[] = [];
    try {
      const client = this.httpClient.getClient();
      const newsResponse = await client.get(
        `https://newsapi.org/v2/everything?q=${encodeURIComponent(
          title
        )}&language=en&sortBy=publishedAt&pageSize=3&apiKey=${
          process.env.NEWSAPI_KEY
        }`
      );
      news = (newsResponse.data.articles || []).map((a: any) => ({
        title: a.title,
        url: a.url,
      }));

      return news;
    } catch (error) {
      console.error("News fetch failed:", (error as Error).message);
    }
  }

  private async fetchSanctionsXML(): Promise<string> {
    const EU_SANCTIONS_URL =
      "https://webgate.ec.europa.eu/europeaid/fsd/fsf/public/files/xmlFullSanctionsList_1_1/content?token=dG9rZW4=";
    const res = await axios.get(EU_SANCTIONS_URL, {
      responseType: "text",
    });
    return res.data;
  }

  private parseSanctionsXML(xml: string): SanctionEntity[] {
    const parser = new XMLParser({ ignoreAttributes: false });
    const json = parser.parse(xml);
    const entries = json?.sanctionsList?.sanctionEntity || [];

    return entries.map((entry: any): SanctionEntity => {
      const name =
        entry?.name?.firstName + " " + entry?.name?.lastName ||
        entry?.name?.wholeName;
      const nationality = entry?.citizenship?.countryDescription || "";
      const birthDate = entry?.birthdate || "";
      return {
        name,
        entityId: entry.entityId,
        type: entry.type || "individual",
        birthDate,
        nationality,
        score: 0, // Placeholder to be filled by matching engine
        riskLevel: 100,
        source: "EU_Sanctions",
        tags: ["Sanctioned", "EU"],
      };
    });
  }

  private calculateRisk(score: number, type: string) {
    let baseRisk = score * 100;
    if (type === "PEP") baseRisk *= 1.3;
    if (type === "Sanction") baseRisk *= 1.7;
    return Math.min(100, Math.round(baseRisk));
  }
}
