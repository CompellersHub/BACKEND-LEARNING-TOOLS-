import { Document, model, models, PaginateModel, Schema } from "mongoose";
import { ITransactions } from "../interface";
import mongoosePaginate from "mongoose-paginate-v2";

export const twoYearTransactionsSchema = new Schema<ITransactions>({
  id: { type: String, required: true },
  date: { type: String, required: true },
  amount: { type: Number, required: true },
  type: { type: String, required: true },
  counterparty: { type: String, required: true },
  status: { type: String, required: true },
  jurisdiction: { type: String, required: false },
  reference: { type: String, required: false },
  channel: { type: [String], required: false },
  riskScore: { type: Number, required: true },
  flagged: { type: Boolean, required: true },
  transactionType: { type: String, enum: ["recent", "years"], required: true },
  customer: { type: Schema.Types.ObjectId, ref: "monitoring_profiles" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export type TransactionDocument = ITransactions & Document;
twoYearTransactionsSchema.plugin(mongoosePaginate);

export const TransactionModel = (models.TransactionModel ||
  model<ITransactions, PaginateModel<TransactionDocument>>(
    "monitoring_transactions",
    twoYearTransactionsSchema
  )) as PaginateModel<ITransactions>;
