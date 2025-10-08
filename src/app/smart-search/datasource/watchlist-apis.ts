import * as cheerio from "cheerio";
import { Inject, Service } from "typedi";
import { wikiResponse } from "../interface/smart.interface";
import { HttpClient } from "@/global/utils";

@Service()
export class WatchListAPI {
  constructor(
    @Inject()
    private readonly httpClient: HttpClient
  ) {}

  // It have company's information
  async searchOFAC(name: string) {
    try {
      // OFAC doesn't have a direct API, but we can use their XML data
      // In production, you'd want to download and parse their SDN list regularly
      const response = await fetch(
        "https://www.treasury.gov/ofac/downloads/sdn.xml"
      );
      const xmlData = await response.text();

      // Parse XML and search for matches
      // This is a simplified implementation - in production you'd use a proper XML parser
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
    } catch (error) {
      console.error("OFAC search error:", error);
      return [];
    }
  }

  // UN Sanctions API Integration
  async searchUNSanctions(name: string) {
    try {
      // UN Consolidated List API
      const response = await fetch(
        `https://scsanctions.un.org/resources/xml/en/consolidated.xml`
      );
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
    } catch (error) {
      console.error("UN Sanctions search error:", error);
      return [];
    }
  }

  // EU Sanctions API Integration
  async searchEUSanctions(name: string) {
    try {
      // EU doesn't have a direct API, but they provide XML files
      const response = await fetch(
        "https://webgate.ec.europa.eu/europeaid/fsd/fsf/public/files/xmlFullSanctionsList_1_1/content?token=dG9rZW4="
      );

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
    } catch (error) {
      console.error("EU Sanctions search error:", error);
      return [];
    }
  }

  // PEP Database Search (using World-Check or similar)
  async searchPEPDatabase(name: string) {
    try {
      // This would integrate with a commercial PEP database
      // For demo purposes, we'll simulate some matches
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
        const commonWords = nameWords.filter((word) =>
          pepWords.some(
            (pepWord) => pepWord.includes(word) || word.includes(pepWord)
          )
        );

        if (commonWords.length > 0) {
          const matchPercentage =
            (commonWords.length / Math.max(nameWords.length, pepWords.length)) *
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
    } catch (error) {
      console.error("PEP search error:", error);
      return [];
    }
  }

  // Interpol Red Notices
  async searchInterpol(name: string) {
    try {
      // Interpol doesn't provide a public API for Red Notices
      // This would require special access or web scraping
      // For demo purposes, we'll return empty results
      return [];
    } catch (error) {
      console.error("Interpol search error:", error);
      return [];
    }
  }

  // Nigerian EFCC/NFIU Integration
  async searchNigerianWatchlists(name: string) {
    try {
      // These would require specific API access or web scraping
      // For demo purposes, we'll simulate some results
      const matches = [];

      // Simulate EFCC wanted list check
      if (
        name.toLowerCase().includes("fraud") ||
        name.toLowerCase().includes("corrupt")
      ) {
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
    } catch (error) {
      console.error("Nigerian watchlist search error:", error);
      return [];
    }
  }

  // News and Media Search
  async searchNews(name: string) {
    try {
      // Google News API (requires API key)
      const apiKey = process.env.NEWSAPI_KEY; //GOOGLE_NEWS_API_KEY;
      if (!apiKey) {
        console.warn("Google News API key not configured");
        return [];
      }

      const client = this.httpClient.getClient();
      const response = await client.get(
        `https://newsapi.org/v2/everything?q="${name}"&sortBy=relevancy&apiKey=${apiKey}`
      );

      return (
        response.data.articles?.slice(0, 5).map((article: any) => ({
          source: "Google News",
          title: article.title,
          url: article.url,
          snippet: article.description,
          publishedDate: article.publishedAt,
          relevanceScore: 75,
        })) || []
      );
    } catch (error) {
      console.error("News search error:", error);
      return [];
    }
  }

  // Wikipedia/Wikidata Search
  async searchWikipedia(name: string) {
    try {
      const client = this.httpClient.getClient();
      const response = await client.get(
        `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(
          name
        )}`
      );

      const data = await response.data;
      return {
        source: "Wikipedia",
        title: data.title,
        extract: data.extract,
        url: data.content_urls?.desktop?.page,
        thumbnail: data.thumbnail?.source,
      };
    } catch (error) {
      console.error("Wikipedia search error:", error);
      return null;
    }
  }

  async searchWikipediaDetails(
    query: string,
    limit = 10
  ): Promise<wikiResponse[]> {
    try {
      const url = `https://en.wikipedia.org/w/rest.php/v1/search/title?q=${encodeURIComponent(
        query
      )}&limit=${limit}`;
      const client = this.httpClient.getClient();
      const response = await client.get(url);
      const pages = response.data?.pages;

      if (!pages?.length) return [];

      const result = await Promise.all(
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
        })
      );
      return result;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Wikipedia detail search error:", error.message);
      }
      console.log(error);
      return [];
    }
  }
}
