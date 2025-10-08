// ===============================
// services/DataSourceService.js - External Data Source Integration

import axios, { AxiosError } from "axios";
import cheerio from "cheerio";
import { Service } from "typedi";

@Service()
export class DataSourceService {
  constructor() {}

  private sources() {
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

  async searchPerson(name: string, options = {}) {
    const searchKey = `person_${name.toLowerCase().replace(/\s+/g, "_")}`;

    // Check cache first
    // const cached = await SearchCache.findOne({ searchKey });
    // if (cached && !options.refresh) {
    //   return cached.data;
    // }

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

    // Search across all data sources
    const searchPromises = Object.entries(this.sources).map(
      async ([sourceName, searchFunc]) => {
        try {
          const data = await searchFunc(name, options);
          console.log(data);
          if (data && Object.keys(data).length > 0) {
            results.sources.push(sourceName);
            return { source: sourceName, data };
          }
        } catch (error: unknown) {
          if (error instanceof Error)
            console.error(`Error searching ${sourceName}:`, error.message);
        }
        return null;
      }
    );

    const sourceResults = await Promise.allSettled(searchPromises);
    console.log({ sourceResults });
    const validResults = sourceResults
      .filter(
        (
          result
        ): result is PromiseFulfilledResult<{ source: string; data: any }> =>
          result.status === "fulfilled" && !!result.value
      )
      .map((result) => result.value);

    // Merge results from all sources
    await this.mergeResults(results, validResults);

    // Calculate confidence score
    results.confidence = this.calculateConfidence(validResults, results);

    // Cache the results
    // await SearchCache.findOneAndUpdate(
    //   { searchKey },
    //   {
    //     data: results,
    //     sources: results.sources,
    //     confidence: results.confidence,
    //   },
    //   { upsert: true, new: true }
    // );

    return results;
  }

  // Wikipedia Search
  async searchWikipedia(name: string) {
    try {
      const searchUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(
        name
      )}`;
      const response = await axios.get(searchUrl, {
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

      // Get more detailed info from full page
      const detailedInfo = await this.getWikipediaDetails(pageData.title);
      console.log({ detailedInfo });
      return { ...result, ...detailedInfo };
    } catch (error: unknown) {
      if (error instanceof AxiosError)
        if (error.response?.status === 404) {
          return this.searchWikipediaByQuery(name);
        }
      throw error;
    }
  }

  async searchWikipediaByQuery(name: string) {
    try {
      const queryUrl = `https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&srsearch=${encodeURIComponent(
        name
      )}&srlimit=3`;
      const response = await axios.get(queryUrl);

      const results = response.data.query?.search || [];
      console.log({ results });
      if (results.length > 0) {
        const topResult = results[0];
        return await this.searchWikipedia(topResult.title);
      }
    } catch (error: unknown) {
      if (error instanceof Error)
        console.error("Wikipedia query search error:", error.message);
    }
    return {};
  }

  async getWikipediaDetails(title) {
    try {
      const infoboxUrl = `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=revisions&rvprop=content&titles=${encodeURIComponent(
        title
      )}&rvslots=main`;
      const response = await axios.get(infoboxUrl);

      const pages = response.data.query?.pages || {};
      const pageId = Object.keys(pages)[0];
      const content = pages[pageId]?.revisions?.[0]?.slots?.main?.["*"] || "";

      return this.parseWikipediaInfobox(content);
    } catch (error: unknown) {
      if (error instanceof Error)
        console.error("Wikipedia details error:", error.message);
      return {};
    }
  }

  private parseWikipediaInfobox(content: string) {
    console.log({ content });
    interface details {
      dateOfBirth: string | Date;
      nationality: string;
      occupation: string;
      politicalPosition: string;
      termStart: string;
      termEnd: string;
    }
    const details: details = {} as details;

    // Extract birth date
    const birthMatch =
      content.match(/\|?\s*birth_date\s*=\s*(.+?)(?:\n|\|)/i) ||
      content.match(/\|?\s*born\s*=\s*(.+?)(?:\n|\|)/i);
    if (birthMatch) {
      details.dateOfBirth = this.parseDateString(birthMatch[1]);
    }

    // Extract nationality
    const nationalityMatch =
      content.match(/\|?\s*nationality\s*=\s*(.+?)(?:\n|\|)/i) ||
      content.match(/\|?\s*country\s*=\s*(.+?)(?:\n|\|)/i);
    if (nationalityMatch) {
      details.nationality = nationalityMatch[1]
        .replace(/\[\[|\]\]/g, "")
        .trim();
    }

    // Extract occupation/profession
    const occupationMatch =
      content.match(/\|?\s*occupation\s*=\s*(.+?)(?:\n|\|)/i) ||
      content.match(/\|?\s*profession\s*=\s*(.+?)(?:\n|\|)/i);
    if (occupationMatch) {
      details.occupation = occupationMatch[1].replace(/\[\[|\]\]/g, "").trim();
    }

    // Extract political positions
    const positionMatch =
      content.match(/\|?\s*office\s*=\s*(.+?)(?:\n|\|)/i) ||
      content.match(/\|?\s*title\s*=\s*(.+?)(?:\n|\|)/i);
    if (positionMatch) {
      details.politicalPosition = positionMatch[1]
        .replace(/\[\[|\]\]/g, "")
        .trim();
    }

    // Extract years in office
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

  // Wikidata Search for structured data
  async searchWikidata(name) {
    try {
      const searchUrl = `https://www.wikidata.org/w/api.php?action=wbsearchentities&format=json&language=en&search=${encodeURIComponent(
        name
      )}&limit=3`;
      const response = await axios.get(searchUrl);

      const results = response.data.search || [];

      console.log({ results });
      if (results.length > 0) {
        const entity = results[0];
        return await this.getWikidataEntity(entity.id);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Wikidata search error:", error.message);
      }
    }
    return {};
  }

  async getWikidataEntity(entityId: string) {
    try {
      const entityUrl = `https://www.wikidata.org/w/api.php?action=wbgetentities&format=json&ids=${entityId}&props=claims|labels`;
      const response = await axios.get(entityUrl);

      const entity = response.data.entities?.[entityId];
      if (!entity) return {};

      const claims = entity.claims || {};
      let result: {
        dateOfBirth: Date;
        nationality: string;
        occupation: string;
        positions: string;
      };

      // Extract structured data
      if (claims.P569)
        result.dateOfBirth = claims.P569[0]?.mainsnak?.datavalue?.value?.time; // Date of birth
      if (claims.P27)
        result.nationality = claims.P27[0]?.mainsnak?.datavalue?.value?.id; // Country of citizenship
      if (claims.P106)
        result.occupation = claims.P106[0]?.mainsnak?.datavalue?.value?.id; // Occupation
      if (claims.P39)
        result.positions = claims.P39?.map(
          (pos) => pos.mainsnak?.datavalue?.value?.id
        ); // Positions held

      console.log({ result });
      return result;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Wikidata entity error:", error.message);
      }
      return {};
    }
  }

  // OpenSanctions API for PEP data
  async searchOpenSanctions(name: string) {
    try {
      const apiUrl = `https://api.opensanctions.org/search/entities?q=${encodeURIComponent(
        name
      )}&limit=5`;
      const response = await axios.get(apiUrl, {
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
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("OpenSanctions error:", error.message);
      }
      if (error instanceof AxiosError) {
        console.log(error.response.data);
      }
    }
    return {};
  }

  // World Bank Debarred Firms and Individuals
  async searchWorldBank(name: string) {
    try {
      const apiUrl = `https://apigwext.worldbank.org/dvsvc/v1.0/json/APPLICATION/WORLDBANK/FIRM/${encodeURIComponent(
        name
      )}`;
      const response = await axios.get(apiUrl, {
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
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        if (error.response?.status !== 404) {
          console.error("World Bank API error:", error.message);
        }
      }
    }
    return {};
  }

  // UN Sanctions List
  async searchUNSanctions(name: string) {
    try {
      const apiUrl = `https://scsanctions.un.org/resources/xml/en/consolidated.xml`;
      // Note: UN API requires XML parsing - simplified for example
      const response = await axios.get(apiUrl);

      // Parse XML and search for name (simplified)
      console.log({ response: response.data });
      if (response.data.includes(name)) {
        return {
          unSanctions: true,
          source: "un_sanctions",
        };
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("UN Sanctions error:", error.message);
      }
    }
    return {};
  }

  // OFAC Sanctions
  async searchOFAC(name: string) {
    try {
      // OFAC provides XML/CSV downloads - this is a simplified example
      const apiUrl = `https://www.treasury.gov/ofac/downloads/sdn.xml`;
      const response = await axios.get(apiUrl);

      console.log({ response: response.data });
      if (response.data.includes(name.toUpperCase())) {
        return {
          ofacSanctions: true,
          source: "ofac",
        };
      }
    } catch (error: unknown) {
      if (error instanceof Error) console.error("OFAC error:", error.message);
    }
    return {};
  }

  // PEPs Database (example third-party service)
  async searchPEPsDatabase(name: string) {
    try {
      const apiUrl = `https://api.pepsdb.com/v1/search?name=${encodeURIComponent(
        name
      )}`;
      const response = await axios.get(apiUrl, {
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
    } catch (error: unknown) {
      if (error instanceof AxiosError)
        if (error.response?.status !== 404) {
          console.error("PEPs Database error:", error.message);
        }
    }
    return {};
  }

  // News API for recent information
  async searchNews(name: string) {
    try {
      const apiUrl = `https://newsapi.org/v2/everything?q="${name}"&language=en&sortBy=relevancy&pageSize=5`;
      const response = await axios.get(apiUrl, {
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
    } catch (error: unknown) {
      if (error instanceof Error)
        console.error("News API error:", error.message);
    }
    return {};
  }

  // Companies House (UK) for corporate information
  async searchCompaniesHouse(name: string) {
    try {
      const apiUrl = `https://api.company-information.service.gov.uk/search/officers?q=${encodeURIComponent(
        name
      )}`;
      const response = await axios.get(apiUrl, {
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
    } catch (error: unknown) {
      if (error instanceof Error)
        console.error("Companies House error:", error.message);
    }
    return {};
  }

  // Merge results from multiple sources
  async mergeResults(finalResults, sourceResults) {
    for (const { source, data } of sourceResults) {
      // Merge basic info
      if (data.fullName && !finalResults.firstName) {
        const nameParts = data.fullName.split(" ");
        finalResults.firstName = nameParts[0] || "";
        finalResults.middleName =
          nameParts.length > 2 ? nameParts.slice(1, -1).join(" ") : "";
        finalResults.lastName = nameParts[nameParts.length - 1] || "";
      }

      // Merge dates
      if (data.dateOfBirth) {
        finalResults.dateOfBirth = this.standardizeDate(data.dateOfBirth);
      }

      // Merge nationality
      if (data.nationality) {
        finalResults.nationality = data.nationality;
      }

      // Merge professional profile
      if (data.occupation || data.corporateRoles) {
        finalResults.professionalProfile = {
          ...finalResults.professionalProfile,
          occupation: data.occupation,
          corporateRoles: data.corporateRoles,
          description: data.description,
        };
      }

      // Merge political profile
      if (data.isPEP || data.politicalPosition || data.pepPositions) {
        finalResults.politicalProfile.isPEP =
          data.isPEP || finalResults.politicalProfile.isPEP;

        if (data.riskLevel || data.riskScore) {
          finalResults.politicalProfile.riskLevel = this.mapRiskLevel(
            data.riskLevel || data.riskScore
          );
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

        // Extract years as PEP
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

      // Add sanctions info
      if (data.sanctions || data.unSanctions || data.ofacSanctions) {
        finalResults.politicalProfile.sanctions = {
          ...finalResults.politicalProfile.sanctions,
          openSanctions: data.sanctions,
          unSanctions: data.unSanctions,
          ofacSanctions: data.ofacSanctions,
          worldBankDebarred: data.worldBankStatus === "debarred",
        };
      }

      // Add recent news
      if (data.recentNews) {
        finalResults.recentNews = data.recentNews;
      }
    }

    // Sort years as PEP
    finalResults.politicalProfile.yearsAsPEP.sort((a, b) => a - b);
  }

  // Utility methods
  calculateConfidence(sourceResults, finalResults) {
    let score = 0;
    const maxScore = 100;

    // Base score for having results
    if (sourceResults.length > 0) score += 20;

    // Additional points for each source
    score += Math.min(sourceResults.length * 10, 40);

    // Points for completeness
    if (finalResults.firstName) score += 5;
    if (finalResults.dateOfBirth) score += 10;
    if (finalResults.nationality) score += 5;
    if (finalResults.politicalProfile.isPEP) score += 15;
    if (finalResults.professionalProfile.occupation) score += 5;

    return Math.min(score, maxScore);
  }

  mapRiskLevel(input) {
    if (typeof input === "number") {
      if (input >= 80) return "Critical";
      if (input >= 60) return "High";
      if (input >= 40) return "Medium";
      return "Low";
    }

    const inputLower = String(input).toLowerCase();
    if (inputLower.includes("high") || inputLower.includes("critical"))
      return "High";
    if (inputLower.includes("medium")) return "Medium";
    return "Low";
  }

  standardizeDate(dateStr) {
    try {
      // Handle various date formats
      if (dateStr.includes("T")) {
        return new Date(dateStr).toISOString().split("T")[0];
      }

      const date = new Date(dateStr);
      if (!isNaN(date.getTime())) {
        return date.toISOString().split("T")[0];
      }
    } catch (error) {
      console.error("Date parsing error:", error);
    }
    return dateStr;
  }

  parseDateString(dateStr) {
    // Parse Wikipedia-style dates
    const cleaned = dateStr.replace(/\{\{|\}\}/g, "").replace(/\[\[|\]\]/g, "");

    // Extract year at minimum
    const yearMatch = cleaned.match(/\b(19|20)\d{2}\b/);
    if (yearMatch) {
      return yearMatch[0];
    }

    return cleaned.trim();
  }

  async handleWikipediaDisambiguation(name: string) {
    // Handle disambiguation pages by trying to find the most relevant entry
    try {
      const disambigUrl = `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=links&titles=${encodeURIComponent(
        name
      )}&pllimit=10`;
      const response = await axios.get(disambigUrl);

      const pages = response.data.query?.pages || {};
      console.log({ disambiguation: pages });
      const firstPage = Object.values(pages)[0] as { links?: any[] };
      const links = firstPage?.links || [];
      //   const links = Object.values(pages)[0]?.links || [];

      // Try the first few links to find a person
      for (const link of links.slice(0, 3)) {
        try {
          const result = await this.searchWikipedia(link.title);
          if (result && Object.keys(result).length > 0) {
            return result;
          }
        } catch (error) {
          continue;
        }
      }
    } catch (error: unknown) {
      if (error instanceof Error)
        console.error("Disambiguation handling error:", error.message);
    }
    return {};
  }
}
