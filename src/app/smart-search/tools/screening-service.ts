// Screening Service
import { Service } from "typedi";
import { DataFetcher } from "./data-sources";
import { EnhancedNameMatcher } from "./name-matcher";
import { searchOnline, smartType } from "../interface/smart.interface";

@Service()
export class ScreeningService {
  constructor(
    private readonly fetcher: DataFetcher,
    private readonly matcher: EnhancedNameMatcher,
    private readonly threshold = 0.65
  ) {}

  async screenIndividual(data: searchOnline) {
    const { fullName, country, dateOfBirth, nationality } = data;

    // Parallel API calls
    const [sanctions, peps, wikiData, wikiDetails] = await Promise.all([
      this.fetcher.searchOpenSanctions(fullName, country),
      this.fetcher.searchPEPs(fullName, country),
      this.fetcher.searchWikipedia(fullName),
      this.fetcher.searchWikipediaDetails(fullName),
    ]);

    // Combine and filter results
    let results = [
      ...sanctions.filter((r: { score: number }) => r.score >= this.threshold),
      ...peps.filter((r: { score: number }) => r.score >= this.threshold),
    ];

    // console.log({ xml });

    // Add Wikipedia data if found
    if (wikiData) {
      results.push(wikiData);
    }
    if (wikiDetails) {
      results.push(wikiDetails);
    }

    // Enhance with match scores considering all fields
    results = results.map((result) => {
      const fullMatchScore = this.matcher.matchProfile(data, {
        fullName: result.name,
        country: result.country,
        dateOfBirth: result.dob || "",
        nationality: result.nationality || "",
        entityType: smartType.in,
      });

      return {
        ...result,
        matchScore: fullMatchScore,
        riskLevel: this.calculateRisk(fullMatchScore, result.type),
      };
    });

    // Sort by risk then match score
    return results.sort((a, b) => {
      if (b.riskLevel !== a.riskLevel) return b.riskLevel - a.riskLevel;
      return b.matchScore - a.matchScore;
    });
  }

  calculateRisk(score, type) {
    let baseRisk = score * 100;
    if (type === "PEP") baseRisk *= 1.3;
    if (type === "Sanction") baseRisk *= 1.7;
    return Math.min(100, Math.round(baseRisk));
  }
}
