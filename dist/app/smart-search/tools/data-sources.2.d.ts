export declare class DataSourceService {
    constructor();
    private sources;
    searchPerson(name: string, options?: {}): Promise<{
        firstName: string;
        middleName: string;
        lastName: string;
        dateOfBirth: string;
        nationality: string;
        professionalProfile: {};
        politicalProfile: {
            isPEP: boolean;
            riskLevel: string;
            positions: any[];
            yearsAsPEP: any[];
            organizations: any[];
        };
        sources: any[];
        confidence: number;
        searchTimestamp: string;
    }>;
    searchWikipedia(name: string): any;
    searchWikipediaByQuery(name: string): any;
    getWikipediaDetails(title: any): Promise<{}>;
    private parseWikipediaInfobox;
    searchWikidata(name: any): Promise<{}>;
    getWikidataEntity(entityId: string): Promise<{}>;
    searchOpenSanctions(name: string): Promise<{
        isPEP: boolean;
        riskLevel: string;
        sanctions: any;
        properties: any;
        source: string;
    } | {
        isPEP?: undefined;
        riskLevel?: undefined;
        sanctions?: undefined;
        properties?: undefined;
        source?: undefined;
    }>;
    searchWorldBank(name: string): Promise<{
        worldBankStatus: string;
        debarmentInfo: any;
        source: string;
    } | {
        worldBankStatus?: undefined;
        debarmentInfo?: undefined;
        source?: undefined;
    }>;
    searchUNSanctions(name: string): Promise<{
        unSanctions: boolean;
        source: string;
    } | {
        unSanctions?: undefined;
        source?: undefined;
    }>;
    searchOFAC(name: string): Promise<{
        ofacSanctions: boolean;
        source: string;
    } | {
        ofacSanctions?: undefined;
        source?: undefined;
    }>;
    searchPEPsDatabase(name: string): Promise<{
        isPEP: boolean;
        pepPositions: any;
        riskScore: any;
        countries: any;
        source: string;
    } | {
        isPEP?: undefined;
        pepPositions?: undefined;
        riskScore?: undefined;
        countries?: undefined;
        source?: undefined;
    }>;
    searchNews(name: string): Promise<{
        recentNews: any;
        source: string;
    } | {
        recentNews?: undefined;
        source?: undefined;
    }>;
    searchCompaniesHouse(name: string): Promise<{
        corporateRoles: any;
        source: string;
    } | {
        corporateRoles?: undefined;
        source?: undefined;
    }>;
    mergeResults(finalResults: any, sourceResults: any): Promise<void>;
    calculateConfidence(sourceResults: any, finalResults: any): number;
    mapRiskLevel(input: any): "Low" | "High" | "Medium" | "Critical";
    standardizeDate(dateStr: any): any;
    parseDateString(dateStr: any): any;
    handleWikipediaDisambiguation(name: string): any;
}
