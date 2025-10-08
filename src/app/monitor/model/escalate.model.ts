import { Document, model, models, PaginateModel, Schema } from "mongoose";
import { escalate } from "../interface";
import mongoosePaginate from "mongoose-paginate-v2";

const escalateSchema = new Schema<escalate>(
  {
    alertId: {
      type: Schema.Types.ObjectId,
      ref: "monitoring_alert",
      required: true,
    },
    escalationLevel: { type: String, required: true },
    escalationNotes: { type: String, required: true },
  },
  { timestamps: true }
);

export type EscalateDocument = escalate & Document;
escalateSchema.plugin(mongoosePaginate);

export const EscalateModel = (models.EscalateModel ||
  model<escalate, PaginateModel<EscalateDocument>>(
    "monitoring_escalates",
    escalateSchema
  )) as PaginateModel<escalate>;
