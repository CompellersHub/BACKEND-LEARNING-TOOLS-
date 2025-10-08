import { findMany, findOne } from "@/global/entities";
import { Types } from "mongoose";

export interface ISmartSearch {
  _id: Types.ObjectId;
  fullName: string;
  matches: string[];
  newsArticles: newsArticles[];
  wikipediaData: wikipediaData;
  aiAnalysis: aiAnalysis;
  newsSummary: string;
  responseTime?: string;
  riskScore: number;
  riskLevel: string;
  reviewRationale: string;
  reviewDecision: string;
}

export interface findManySmartSearch extends findMany {
  fullName?: string[];
  riskLevel?: string[];
  riskScore?: string[];
  responseTime?: string[];
}

export interface findOneSmartSearch extends findOne {
  fullName?: string;
  riskLevel?: string;
  riskScore?: string;
  responseTime?: string;
}

export interface newsArticles {
  source: string;
  title: string;
  url: string;
  snippet: string;
  publishedDate: Date | string;
  relevanceScore: number;
}

export interface wikipediaData {
  source: string;
  title: string;
  extract: string;
  url: string;
  thumbnail: string;
}

export interface matchesDetails {
  category: String;
  position: String;
  country: String;
  lastUpdated: Date;
}
export interface matches {
  source: String;
  name: String;
  matchPercentage: Number;
  riskLevel: String;
  details: matchesDetails;
}

export interface aiAnalysis {
  riskScore: number;
  riskLevel: string;
  summary: string;
  detailedAnalysis: string;
  riskFactors: string[];
  recommendations: string[];
  bioDetails: bioDetails;
}

export interface bioDetails {
  fullName: string;
  dateOfBirth: string;
  placeOfBirth: string;
  nationality: string;
  occupation: string;
  education: string;
}

export interface FileProcessing<T = any> {
  data: T[];
  headers: string[];
  metadata: {
    rowCount: number;
  };
}

export interface CSVRow {
  "Full Name"?: string;
  Country?: string;
  "Date Of Birth"?: string;
  Type?: string;
  Nationality?: string;
  Additional?: string;
}
// Define a type for the raw CSV row
export interface ProcessedRow {
  fullName: string;
  dateOfBirth?: string | Date;
  entityType?: string;
  nationality?: string;
  additional?: string;
  country?: string;
}

export interface recentResponse {
  Low: number;
  High: number;
  Medium: number;
}

export interface monthly {
  label: string;
  totalScreening: number;
  alertGenerate?: number;
}
