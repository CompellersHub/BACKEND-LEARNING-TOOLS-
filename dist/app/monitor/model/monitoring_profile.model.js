"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileModel = exports.ProfileSchema = void 0;
const mongoose_1 = require("mongoose");
const mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
const behaviorChangeSchema = new mongoose_1.Schema({
    date: { type: String, required: true },
    change: { type: String, required: true },
    riskImpact: { type: String, required: true },
}, { _id: false });
exports.ProfileSchema = new mongoose_1.Schema({
    id: { type: String, required: true },
    fullName: { type: String, required: true },
    aliases: { type: [String], required: true },
    dateOfBirth: { type: String, required: true },
    nationality: { type: String, required: true },
    customerId: { type: String, required: true },
    accountNumber: { type: String, required: true },
    proofOfIdentity: { type: String, required: true },
    proofOfAddress: { type: String, required: true },
    occupation: { type: String, required: true },
    businessActivity: { type: String, required: true },
    customerType: { type: String, required: true },
    sourceOfFunds: { type: String, required: true },
    sourceOfWealth: { type: String, required: true },
    riskRating: { type: String, required: true },
    riskReason: { type: String, required: true },
    legalStructure: { type: String, required: true },
    registeredAddress: { type: String, required: true },
    directors: { type: String, required: true },
    beneficialOwners: { type: String, required: true },
    natureOfBusiness: { type: String, required: true },
    sicCodes: { type: String, required: true },
    corporateWebsite: { type: String, required: true },
    expectedVolume: { type: String, required: true },
    expectedFrequency: { type: String, required: true },
    typicalTransactionTypes: { type: [String], required: true },
    anticipatedJurisdictions: { type: [String], required: true },
    anticipatedCounterparties: { type: [String], required: true },
    accountPurpose: { type: String, required: true },
    countryOfResidence: { type: String, required: true },
    expectedTransactionCountries: { type: [String], required: true },
    dualCitizenship: { type: String, required: true },
    linkedJurisdictions: { type: [String], required: true },
    openingDate: { type: String, required: true },
    onboardingChannel: { type: String, required: true },
    joinDate: { type: String, required: true },
    riskScore: { type: Number, required: true },
    location: { type: String, required: true },
    accountType: { type: String, required: true },
    totalTransactions: { type: Number, required: true },
    averageMonthly: { type: Number, required: true },
    pepStatus: { type: String, required: true },
    sanctionsFlags: { type: String, required: true },
    adverseMedia: { type: String, required: true },
    sarHistory: { type: String, required: true },
    internalWatchlist: { type: String, required: true },
    behaviorChanges: [behaviorChangeSchema],
}, { timestamps: true });
exports.ProfileSchema.plugin(mongoose_paginate_v2_1.default);
exports.ProfileModel = (mongoose_1.models.ProfileModel ||
    (0, mongoose_1.model)("monitoring_profiles", exports.ProfileSchema));
//# sourceMappingURL=monitoring_profile.model.js.map