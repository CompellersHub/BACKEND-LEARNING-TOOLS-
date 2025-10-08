import { Document, model, models, now, PaginateModel, Schema } from "mongoose";
import { Documents, Evidence, investigate } from "../interface";
import mongoosePaginate from "mongoose-paginate-v2";

const documentSchema = new Schema<Documents>({
  type: { type: String, required: false },
  name: { type: String, required: false },
  link: { type: String, required: false },
  size: { type: Number, required: false },
});

const EvidenceSchema = new Schema<Evidence>(
  {
    fileName: { type: String, required: false },
    category: { type: String, required: false },
    description: { type: String, required: false },
    priority: { type: String, required: false },
    uploadedOn: { type: Date, required: true, default: now() },
    document: documentSchema,
  },
  { _id: false }
);

const InvestigateSchema = new Schema<investigate>(
  {
    alertId: {
      type: Schema.Types.ObjectId,
      ref: "monitoring_alert",
      required: true,
    },
    investigationDecision: { type: String, required: false },
    reportableOffense: { type: [String], required: false },
    jurisdiction: { type: String, required: false },
    authority: { type: String, required: false },
    assignTo: { type: String, required: false },
    investigationNote: { type: String, required: false },
    evidence: [EvidenceSchema],
  },
  { timestamps: true }
);

export type investigateDocument = investigate & Document;
InvestigateSchema.plugin(mongoosePaginate);

export const InvestigateModel = (models.InvestigateModel ||
  model<investigate, PaginateModel<investigateDocument>>(
    "monitoring_investigate",
    InvestigateSchema
  )) as PaginateModel<investigate>;
