import { findMany } from "../../../global/entities";
import { bioDetails } from ".";
export declare enum smartType {
    in = "Individual",
    company = "Company",
    Vessel = "Vessel"
}
export declare enum smartRank {
    low = "Low",
    high = "High",
    medium = "Medium"
}
export interface SmartSearch {
    _id?: string;
    fullName: string;
    entityType?: string;
    dateOfBirth?: string | Date;
    nationality?: string;
    country?: string;
    additional?: string;
    rank: smartRank;
    responseTime: string;
    reviewDecision: string;
    reviewRationale: string;
    createdAt?: Date;
    updatedAt?: Date;
}
export declare enum watchStatus {
    active = "Active",
    inactive = "Inactive"
}
export interface WatchList {
    _id?: string;
    serviceName: string;
    status: watchStatus;
    type: string;
    description: string;
    provide: string;
    records: number;
    users: string[];
    lastUpdate: Date;
    createdAt?: Date;
    updatedAt?: Date;
}
export type searchOnline = Pick<SmartSearch, "additional" | "country" | "dateOfBirth" | "entityType" | "fullName" | "nationality">;
export type createWatchList = Omit<WatchList, "_id" | "createdAt" | "updatedAt" | "lastUpdate" | "users">;
export interface findManyWatchList extends findMany {
    serviceName?: string[];
    status?: watchStatus[];
    type?: string[];
    provide?: string[];
}
export type toggleList = {
    user: string;
};
export interface ScreeningData {
    name: string;
    watchlistMatches: any[];
    newsArticles: any[];
    wikipediaData: any;
    entityType: string;
    nationality?: string;
    dateOfBirth?: string;
}
export interface AIAnalysisResult {
    riskScore: number;
    riskLevel: "LOW" | "MEDIUM" | "HIGH";
    summary: string;
    detailedAnalysis: string;
    riskFactors: string[];
    recommendations: string[];
    bioDetails: bioDetails;
}
export interface wikiResponse {
    source: string;
    title: string;
    url: string;
    summary: string;
    extract: string;
    thumbnail: string;
}
export interface searchResponse {
    fullName: string;
    matches: any[];
    newsArticles: any[];
    wikipediaData: wikiResponse;
    aiAnalysis: AIAnalysisResult;
    newsSummary: string;
    riskScore: number;
    riskLevel: string;
    responseTime: number;
    searchTime: number;
}
