import { DataFetcher } from "./data-sources";
import { EnhancedNameMatcher } from "./name-matcher";
import { searchOnline } from "../interface/smart.interface";
export declare class ScreeningService {
    private readonly fetcher;
    private readonly matcher;
    private readonly threshold;
    constructor(fetcher: DataFetcher, matcher: EnhancedNameMatcher, threshold?: number);
    screenIndividual(data: searchOnline): Promise<any[]>;
    calculateRisk(score: any, type: any): number;
}
