// Enhanced Name Matcher with additional fields
import levenshtein from "fast-levenshtein";
import natural from "natural";
import { compareTwoStrings } from "string-similarity";
import { Service } from "typedi";
import { searchOnline } from "../interface/smart.interface";
import { isSameDay, isSameYear, isSameMonth } from "date-fns";

@Service()
export class EnhancedNameMatcher {
  private readonly tokenizer = new natural.WordTokenizer();
  private readonly metaphone = new natural.Metaphone();
  constructor() {}

  // Main matching function that considers all fields
  matchProfile(input: searchOnline, target: searchOnline) {
    const weights = {
      name: 0.5,
      country: 0.2,
      dob: 0.2,
      nationality: 0.1,
    };

    // Name matching (multiple methods)
    const nameScore = this.matchName(input.fullName, target.fullName);

    // Country matching (exact or fuzzy)
    const countryScore =
      input.country && target.country
        ? input.country.toLowerCase() === target.country.toLowerCase()
          ? 1
          : 0.3
        : 0;

    // Date of birth matching (exact or partial)
    const dob = new Date(input.dateOfBirth);
    const targetDob = new Date(target.dateOfBirth);
    const dobScore =
      input.dateOfBirth && target.dateOfBirth
        ? this.matchDates(dob, targetDob)
        : 0;

    // Nationality matching
    const nationalityScore =
      input.nationality && target.nationality
        ? compareTwoStrings(
            input.nationality.toLowerCase(),
            target.nationality.toLowerCase()
          )
        : 0;

    // Calculate weighted score
    return (
      nameScore * weights.name +
      countryScore * weights.country +
      dobScore * weights.dob +
      nationalityScore * weights.nationality
    );
  }

  matchName(a: string, b: string) {
    if (!a || !b) return 0;
    const levDist = levenshtein.get(a, b);
    const maxLen = Math.max(a.length, b.length);
    const levScore = 1 - levDist / maxLen;

    const phoneScore = this.phoneticMatch(a, b);
    const tokenScore = this.tokenSimilarity(a, b);

    return levScore * 0.4 + phoneScore * 0.3 + tokenScore * 0.3;
  }

  phoneticMatch(a: string, b: string) {
    return this.metaphone.compare(a, b) ? 1 : 0;
  }

  tokenSimilarity(a: string, b: string) {
    const tokensA = this.tokenizer.tokenize(a.toLowerCase());
    const tokensB = this.tokenizer.tokenize(b.toLowerCase());
    const intersection = tokensA.filter((t) => tokensB.includes(t));
    return intersection.length / Math.max(tokensA.length, tokensB.length);
  }

  matchDates(date1: Date, date2: Date): number {
    if (!(date1 instanceof Date) || !(date2 instanceof Date)) {
      return 0;
    }
    if (isSameDay(date1, date2)) return 1;
    if (isSameMonth(date1, date2)) return 0.8;
    if (isSameYear(date1, date2)) return 0.5;
    return 0;
  }
}
