import { Schema } from "mongoose";
import {
  aiAnalysis,
  bioDetails,
  matches,
  newsArticles,
  wikipediaData,
} from "../interface";

export const newsArticlesSchema = new Schema<newsArticles>(
  {
    source: { type: String, required: false },
    title: { type: String, required: false },
    url: { type: String, required: false },
    snippet: { type: String, required: false },
    publishedDate: { type: Date, required: false },
    relevanceScore: { type: Number, required: false },
  },
  { _id: false }
);

export const matchesSchema = new Schema<matches>({
  source: { type: String },
  name: { type: String },
  matchPercentage: { type: Number },
  riskLevel: { type: String },
  details: {
    category: { type: String },
    position: { type: String },
    country: { type: String },
    lastUpdated: { type: Date },
  },
});

export const wikipediaDataSchema = new Schema<wikipediaData>(
  {
    source: { type: String, required: false },
    title: { type: String, required: false },
    extract: { type: String, required: false },
    url: { type: String, required: false },
    thumbnail: { type: String, required: false },
  },
  { _id: false }
);

export const bioDetailsSchema = new Schema<bioDetails>(
  {
    dateOfBirth: { type: String, required: false },
    placeOfBirth: { type: String, required: false },
    nationality: { type: String, required: false },
    occupation: { type: String, required: false },
    education: { type: String, required: false },
  },
  { _id: false }
);

export const aiAnalysisSchema = new Schema<aiAnalysis>(
  {
    riskScore: { type: Number, required: false },
    riskLevel: { type: String, required: false },
    summary: { type: String, required: false },
    detailedAnalysis: { type: String, required: false },
    riskFactors: { type: [String], required: false },
    recommendations: { type: [String], required: false },
    bioDetails: bioDetailsSchema,
  },
  { _id: false }
);
