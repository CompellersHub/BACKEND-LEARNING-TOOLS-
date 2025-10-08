import { searchOnline } from "../interface/smart.interface";
export declare class EnhancedNameMatcher {
    private readonly tokenizer;
    private readonly metaphone;
    constructor();
    matchProfile(input: searchOnline, target: searchOnline): number;
    matchName(a: string, b: string): number;
    phoneticMatch(a: string, b: string): 1 | 0;
    tokenSimilarity(a: string, b: string): number;
    matchDates(date1: Date, date2: Date): number;
}
