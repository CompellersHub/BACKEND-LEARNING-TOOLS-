"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FinancialModel = void 0;
const mongoose_1 = require("mongoose");
const interface_1 = require("../interface");
const mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
const documentSchema = new mongoose_1.Schema({
    type: { type: String, required: false },
    name: { type: String, required: false },
    link: { type: String, required: false },
    size: { type: Number, required: false },
});
const sourceSchema = new mongoose_1.Schema({
    source: { type: [String], required: false },
    comment: { type: String, required: false },
    links: { type: [String], required: false },
    document: [documentSchema],
}, { _id: false });
const FinancialCrimeSchema = new mongoose_1.Schema({
    alertId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "monitoring_alert",
        required: true,
    },
    eddType: { type: String, enum: Object.values(interface_1.eddType), required: true },
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
        enum: Object.values(interface_1.selectedDecision),
        required: false,
    },
    finalDecisionRationale: { type: String, required: false },
}, { timestamps: true });
FinancialCrimeSchema.plugin(mongoose_paginate_v2_1.default);
exports.FinancialModel = (mongoose_1.models.FinancialModel ||
    (0, mongoose_1.model)("monitoring_financial_crime", FinancialCrimeSchema));
//# sourceMappingURL=financial-crime.model.js.map