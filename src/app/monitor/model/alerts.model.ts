import { Document, model, models, PaginateModel, Schema } from "mongoose";
import { Alert, severity } from "../interface";
import mongoosePaginate from "mongoose-paginate-v2";

export const AlertSchema = new Schema<Alert>(
  {
    id: { type: String, required: false },
    type: { type: String, required: false },
    severity: { type: String, required: false, enum: Object.values(severity) },
    customer: { type: String, required: false },
    customerId: { type: String, required: false },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "monitoring_profiles",
      required: true,
    },
    amount: { type: String, required: false },
    timestamp: { type: String, required: false },
    location: { type: String, required: false },
    accountType: { type: String, required: false },
    monitoringType: { type: String, required: false },
    riskScore: { type: Number, required: false },
    riskFactors: { type: [String], required: false },
    description: { type: String, required: false },
    status: { type: String, required: false },
    aiScore: { type: Number, required: false },
    deviceFingerprint: { type: String, required: false },
    geoLocation: { type: String, required: false },
    relatedAlerts: { type: Number, required: false },
    investigationNotes: { type: [String], required: false },
    escalationLevel: { type: String, required: false },
    transactionReference: { type: String, required: false },
    counterparty: { type: String, required: false },
    transactionDetails: { type: String, required: false },
    cleared: { type: Date, required: false },
  },
  { timestamps: true }
);

export type AlertDocument = Alert & Document;
AlertSchema.plugin(mongoosePaginate);

export const AlertModel = (models.AlertModel ||
  model<Alert, PaginateModel<AlertDocument>>(
    "monitoring_alert",
    AlertSchema
  )) as PaginateModel<Alert>;
