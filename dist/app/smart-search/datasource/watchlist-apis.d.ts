import { wikiResponse } from "../interface/smart.interface";
import { HttpClient } from "../../../global/utils";
export declare class WatchListAPI {
    private readonly httpClient;
    constructor(httpClient: HttpClient);
    searchOFAC(name: string): Promise<any[]>;
    searchUNSanctions(name: string): Promise<any[]>;
    searchEUSanctions(name: string): Promise<any[]>;
    searchPEPDatabase(name: string): Promise<any[]>;
    searchInterpol(name: string): Promise<any[]>;
    searchNigerianWatchlists(name: string): Promise<any[]>;
    searchNews(name: string): Promise<any>;
    searchWikipedia(name: string): Promise<{
        source: string;
        title: any;
        extract: any;
        url: any;
        thumbnail: any;
    }>;
    searchWikipediaDetails(query: string, limit?: number): Promise<wikiResponse[]>;
}
