import { uploadFile } from "../../../global/entities";
import { Timeout, WithRetry } from "../../../global/services/api-operation";
import { FilterQuery, PaginateResult } from "mongoose";
import { AiAnalysis, WatchListAPI } from "../datasource";
import { findManySmartSearch, ISmartSearch, monthly, recentResponse } from "../interface";
import { searchOnline } from "../interface/smart.interface";
import { ReviewModel, ScreeningModel, SmartModel, SmartSearchDocument } from "../model";
export declare class SmartSearchService {
    private readonly smartModel;
    private readonly reviewModel;
    private readonly screeningModel;
    private readonly analysis;
    private readonly watchList;
    private readonly timeout;
    private readonly retry;
    constructor(smartModel: typeof SmartModel, reviewModel: typeof ReviewModel, screeningModel: typeof ScreeningModel, analysis: AiAnalysis, watchList: WatchListAPI, timeout: Timeout, retry: WithRetry);
    create(body: searchOnline): Promise<any[]>;
    batchScreening(file: uploadFile): Promise<{
        data: (any[] | {
            error: string;
            details: string;
        })[];
        headers: string[];
        metadata: {
            rowCount: number;
        };
        successCount: number;
        errorCount: number;
    }>;
    findAll(query: findManySmartSearch): Promise<PaginateResult<ISmartSearch>>;
    findOne(query: FilterQuery<SmartSearchDocument>): Promise<ISmartSearch>;
    riskDistribution(): Promise<recentResponse>;
    monthlyScreeningActivity(): Promise<monthly[]>;
    lastMonthlyScreeningActivity(): Promise<monthly[]>;
    reportStats(): Promise<{
        year: number;
        total: {
            totalScreening: any;
            alerts: any;
        };
        highAlerts: any;
        averageResponseRate: any;
        positivePercentage: number;
    }>;
    private recordScreening;
    private findOneFilter;
    private findManyFilter;
    private processCSV;
    private transformRow;
    private joinFileName;
    private formatMatches;
    private processWikiResult;
    private searchWikipedia;
    private generateNameVariations;
    private sleep;
}
