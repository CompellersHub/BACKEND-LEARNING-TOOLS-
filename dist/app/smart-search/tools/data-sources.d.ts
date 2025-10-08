import { EnhancedNameMatcher } from "./name-matcher";
import { HttpClient } from "../../../global/utils";
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
    news: {
        title: string;
        url: string;
    }[];
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
    news?: {
        title: string;
        url: string;
    }[];
    thumbnail?: string;
}
export declare class DataFetcher {
    private readonly matcher;
    private readonly httpClient;
    constructor(matcher: EnhancedNameMatcher, httpClient: HttpClient);
    searchOpenSanctions(name: string, country?: string): Promise<any>;
    searchWikipediaDetails(query: string): Promise<EnrichedResult[]>;
    searchWikipedia(name: string): Promise<{
        name: string;
        source: string;
        url: string;
        summary: any;
        thumbnail: any;
    }>;
    matchSanctionedEntities(inputName: string): Promise<SanctionEntity[]>;
    AiAnalysis(title: string, article: string): Promise<any>;
    searchPEPs(name: string, country?: string): Promise<any>;
    fetchNews(title: string): Promise<{
        title: string;
        url: string;
    }[]>;
    private fetchSanctionsXML;
    private parseSanctionsXML;
    private calculateRisk;
}
export {};
