import { AIAnalysisResult, ScreeningData } from "../interface/smart.interface";
export declare class AiAnalysis {
    constructor();
    performAIAnalysis(data: ScreeningData): Promise<AIAnalysisResult>;
    getFallbackAnalysis(data: ScreeningData): AIAnalysisResult;
    summarizeNewsArticles(articles: any[]): Promise<string>;
}
