import { Document, model, models, PaginateModel, Schema } from "mongoose";
import {
  Documents,
  eddType,
  PepCategory,
  pepEnhancedDueDiligence,
  selectedDecision,
} from "../interface";
import mongoosePaginate from "mongoose-paginate-v2";

const documentSchema = new Schema<Documents>({
  type: { type: String, required: false },
  name: { type: String, required: false },
  link: { type: String, required: false },
  size: { type: Number, required: false },
});
const PepEnhanceDueDiligenceSchema = new Schema<pepEnhancedDueDiligence>(
  {
    alertId: {
      type: Schema.Types.ObjectId,
      ref: "monitoring_alert",
      required: true,
    },
    eddType: { type: String, enum: Object.values(eddType), required: true },
    pepCategory: {
      type: String,
      enum: Object.values(PepCategory),
      required: false,
    },
    countryOfResidence: { type: String, required: false },
    occupation: { type: String, required: false },
    publicFunction: { type: Boolean, required: false },
    positionLevel: { type: String, required: false },
    governmentEntity: { type: String, required: false },
    isControlOverPublicFunds: { type: Boolean, required: false },
    isRoleLinkedToHighValue: { type: Boolean, required: false },
    familyMemberOfAPep: { type: String, required: false },
    estimatedNetWorth: { type: String, required: false },
    sourceOfWealthDocumentation: { type: String, required: false },
    sourceOfFund: { type: String, required: false },
    sourceOfFundDocumentation: { type: String, required: false },
    offshoreStructure: { type: Boolean, required: false },
    isPepHighRiskOrSanctioned: { type: Boolean, required: false },
    hasNameInCorruptionInvestigations: { type: Boolean, required: false },
    adverseMediaFindingsOnPep: { type: Boolean, required: false },
    willEnhancedMonitoringBeApplied: { type: Boolean, required: false },
    willSeniorManagementSignOff: { type: Boolean, required: false },
    frequencyOfOngoingDueDiligenceChecks: {
      type: String,
      enum: ["Quarterly", "Monthly", "Annually"],
      required: false,
    },
    seniorManagementApproval: { type: Boolean, required: false },
    approverName: { type: String, required: false },
    department: { type: String, required: false },
    position: { type: String, required: false },
    documentUploadAndSupportingEvidence: [documentSchema],
    supportingLinks: { type: [String], required: false },
    eddDecision: {
      type: String,
      enum: ["File Sar Report", "Approved Pep EDD", "Further EDD"],
      required: false,
    },
    addCustomerToPEPRegisterForOngoingMonitoring: {
      type: Boolean,
      required: false,
    },
    decisionRationale: { type: String, required: false },
    finalCaseDecision: {
      type: String,
      enum: Object.values(selectedDecision),
      required: false,
    },
    finalDecisionRationale: { type: String, required: false },
  },
  { timestamps: true }
);

export type PEPDocument = pepEnhancedDueDiligence & Document;
PepEnhanceDueDiligenceSchema.plugin(mongoosePaginate);

export const PEPModel = (models.PEPModel ||
  model<pepEnhancedDueDiligence, PaginateModel<PEPDocument>>(
    "monitoring_peps",
    PepEnhanceDueDiligenceSchema
  )) as PaginateModel<pepEnhancedDueDiligence>;
