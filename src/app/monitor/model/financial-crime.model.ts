import { Document, model, models, PaginateModel, Schema } from "mongoose";
import {
  Documents,
  eddType,
  financialCrime,
  selectedDecision,
  Source,
} from "../interface";
import mongoosePaginate from "mongoose-paginate-v2";

const documentSchema = new Schema<Documents>({
  type: { type: String, required: false },
  name: { type: String, required: false },
  link: { type: String, required: false },
  size: { type: Number, required: false },
});

const sourceSchema = new Schema<Source>(
  {
    source: { type: [String], required: false },
    comment: { type: String, required: false },
    links: { type: [String], required: false },
    document: [documentSchema],
  },
  { _id: false }
);

const FinancialCrimeSchema = new Schema<financialCrime>(
  {
    alertId: {
      type: Schema.Types.ObjectId,
      ref: "monitoring_alert",
      required: true,
    },
    eddType: { type: String, enum: Object.values(eddType), required: true },
    fullNameOfEntity: { type: String, required: false },
    countryOfIncorporation: { type: String, required: false },
    natureOfBusinessOrOccupation: { type: String, required: false },
    complexOwnershipStructure: { type: Boolean, required: false },
    sourceOfWealths: sourceSchema,
    sourceOfFunds: sourceSchema,
    financialProduct: { type: [String], required: false },
    thirdPartyPayment: { type: Boolean, required: false },
    relationshipNote: { type: String, required: false },
    sanctionTouchPoints: { type: String, required: false },
    sanctionTouchPointsNote: { type: String, required: false },
    adverseNewsOrMedia: { type: String, required: false },
    adverseNewsOrMediaNote: { type: String, required: false },
    businessOperationsCountries: { type: [String], required: false },
    primaryCustomersOrSuppliersCountries: { type: [String], required: false },
    fundFlowCountries: { type: [String], required: false },
    isAnyCountriesHighRisk: { type: Boolean, required: false },
    finalRiskRating: { type: String, required: false },
    riskDriverSummary: { type: String, required: false },
    mitigatingMeasures: { type: [String], required: false },
    finalCaseDecision: {
      type: String,
      enum: Object.values(selectedDecision),
      required: false,
    },
    finalDecisionRationale: { type: String, required: false },
  },
  { timestamps: true }
);

export type financialCrimeDocument = financialCrime & Document;
FinancialCrimeSchema.plugin(mongoosePaginate);

export const FinancialModel = (models.FinancialModel ||
  model<financialCrime, PaginateModel<financialCrimeDocument>>(
    "monitoring_financial_crime",
    FinancialCrimeSchema
  )) as PaginateModel<financialCrime>;
