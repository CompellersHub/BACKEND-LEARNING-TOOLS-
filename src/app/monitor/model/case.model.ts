import { Document, model, models, PaginateModel, Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import { caseMonitoring } from "../interface";

const CaseSchema = new Schema<caseMonitoring>(
  {
    caseId: { type: String, required: true },
    monitoring: {
      type: Schema.Types.ObjectId,
      ref: "monitoring_alert",
      required: true,
    },
    profile: {
      type: Schema.Types.ObjectId,
      ref: "monitoring_profiles",
      required: true,
    },
    status: { type: String, required: false },
    assignTo: { type: String, required: false },
    priority: { type: String, required: false },
    progress: { type: Number, required: true, default: 0 },
    customerSince: { type: String, required: false },
    pepStatus: { type: String, required: false },
    adverseMedia: { type: String, required: false },
    lastKycUpdate: { type: Date, required: false },
    sanctions: { type: String, required: false },
    totalTransaction: { type: Number, required: false },
    totalAmount: { type: Number, required: false },
    riskScore: { type: Number, required: false },
    evidenceCollecting: [
      {
        transactionRecord: { type: Number, required: false },
        riskLevel: { type: String, required: false },
        status: { type: String, required: false },
      },
    ],
    decisionRationale: { type: String, required: false },
    caseDecision: { type: String, required: true },
  },
  { timestamps: true }
);

export type CaseDocument = caseMonitoring & Document;
CaseSchema.plugin(mongoosePaginate);

export const CaseModel = (models.CaseModel ||
  model<caseMonitoring, PaginateModel<CaseDocument>>(
    "monitoring-cases",
    CaseSchema
  )) as PaginateModel<caseMonitoring>;
