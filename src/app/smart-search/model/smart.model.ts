import { Document, model, models, PaginateModel, Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import { ISmartSearch } from "../interface";
import {
  aiAnalysisSchema,
  matchesSchema,
  newsArticlesSchema,
  wikipediaDataSchema,
} from "./define";

const SmartSearchSchema = new Schema<ISmartSearch>(
  {
    fullName: { type: String, required: true },
    matches: [matchesSchema],
    newsArticles: [newsArticlesSchema],
    wikipediaData: wikipediaDataSchema,
    aiAnalysis: aiAnalysisSchema,
    newsSummary: { type: String, required: false },
    riskScore: { type: Number, required: false },
    riskLevel: { type: String, required: false },
    responseTime: { type: String, required: true },
    reviewDecision: { type: String, required: false },
    reviewRationale: { type: String, required: false },
  },
  { timestamps: true }
);

export type SmartSearchDocument = ISmartSearch & Document;
SmartSearchSchema.plugin(mongoosePaginate);

export const SmartModel = (models.SmartModel ||
  model<ISmartSearch, PaginateModel<SmartSearchDocument>>(
    "smart_search",
    SmartSearchSchema
  )) as PaginateModel<ISmartSearch>;
