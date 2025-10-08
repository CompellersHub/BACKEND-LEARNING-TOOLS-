import { Document, model, models, PaginateModel, Schema } from "mongoose";
import {
  counterParty,
  Director,
  Documents,
  eddType,
  sanctionReview,
  sanctionsResult,
  selectedDecision,
  Shareholder,
} from "../interface";
import mongoosePaginate from "mongoose-paginate-v2";

const documentSchema = new Schema<Documents>({
  type: { type: String, required: false },
  name: { type: String, required: false },
  link: { type: String, required: false },
  size: { type: Number, required: false },
});

const shareholderSchema = new Schema<Shareholder>(
  {
    shareholderName: { type: String, required: false },
    percentage: { type: Number, required: false },
    adverseNews: { type: Boolean, required: false, default: false },
    sanctions: { type: Boolean, required: false, default: false },
    pep: { type: Boolean, required: false, default: false },
    notes: { type: String, required: false },
  },
  { _id: false }
);

const directorSchema = new Schema<Director>({
  directorName: { type: String, required: false },
  adverseNews: { type: Boolean, required: false, default: false },
  sanctions: { type: Boolean, required: false, default: false },
  pep: { type: Boolean, required: false, default: false },
  notes: { type: String, required: false },
});

const counterPartySchema = new Schema<counterParty>({
  sanctionsHit: { type: Boolean, required: false },
  pepStatus: { type: Boolean, required: false },
  adverseNews: { type: Boolean, required: false },
  details: { type: String, required: false },
  fundsFreezeObligations: { type: Boolean, required: false },
});

export const sanctionsReviewSchema = new Schema<sanctionReview>(
  {
    alertId: {
      type: Schema.Types.ObjectId,
      ref: "monitoring_alert",
      required: true,
    },
    eddType: { type: String, enum: Object.values(eddType), required: true },
    documentsObtained: { type: [String], required: false },
    identityVerificationNotes: { type: String, required: false },
    identifyDocuments: [documentSchema],
    kycOrEDDReviewFindings: { type: String, required: false },
    adverseMediaFinding: { type: String, required: false },
    shareholdersChecks: [shareholderSchema],
    directorsChecks: [directorSchema],
    authoritiesScreening: { type: [String], required: false },
    pastCurrentAndPendingTransactions: { type: String, required: false },
    counterParty: counterPartySchema,
    sanctionReviewChecklist: { type: [String], required: false },
    matchType: {
      type: String,
      enum: Object.values(sanctionsResult),
      required: false,
    },
    recommendedActionAction: { type: String, required: false },
    commentsAndRationale: { type: String, required: false },
    finalCaseDecision: {
      type: String,
      enum: Object.values(selectedDecision),
      required: false,
    },
    finalDecisionRationale: { type: String, required: false },
  },
  { timestamps: true }
);

export type SanctionsDocument = sanctionReview & Document;
sanctionsReviewSchema.plugin(mongoosePaginate);

export const SanctionModel = (models.SanctionModel ||
  model<sanctionReview, PaginateModel<SanctionsDocument>>(
    "monitoring_sanctions",
    sanctionsReviewSchema
  )) as PaginateModel<sanctionReview>;
