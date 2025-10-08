import { Document, model, models, PaginateModel, Schema } from "mongoose";
import { behaviorChanges, IProfile } from "../interface";
import mongoosePaginate from "mongoose-paginate-v2";

const behaviorChangeSchema = new Schema<behaviorChanges>(
  {
    date: { type: String, required: true },
    change: { type: String, required: true },
    riskImpact: { type: String, required: true },
  },
  { _id: false }
);

export const ProfileSchema = new Schema<IProfile>(
  {
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

    // Business/Corporate Data (applicable for business customers)
    legalStructure: { type: String, required: true },
    registeredAddress: { type: String, required: true },
    directors: { type: String, required: true },
    beneficialOwners: { type: String, required: true },
    natureOfBusiness: { type: String, required: true },
    sicCodes: { type: String, required: true },
    corporateWebsite: { type: String, required: true },

    // Expected Account Activity
    expectedVolume: { type: String, required: true },
    expectedFrequency: { type: String, required: true },
    typicalTransactionTypes: { type: [String], required: true },
    anticipatedJurisdictions: { type: [String], required: true },
    anticipatedCounterparties: { type: [String], required: true },
    accountPurpose: { type: String, required: true },

    // Geographic Information
    countryOfResidence: { type: String, required: true },
    expectedTransactionCountries: { type: [String], required: true },
    dualCitizenship: { type: String, required: true },
    linkedJurisdictions: { type: [String], required: true },

    // Account History
    openingDate: { type: String, required: true },
    onboardingChannel: { type: String, required: true },
    joinDate: { type: String, required: true },
    riskScore: { type: Number, required: true },
    location: { type: String, required: true },
    accountType: { type: String, required: true },
    totalTransactions: { type: Number, required: true },
    averageMonthly: { type: Number, required: true },

    // Risk and Watchlist Indicators
    pepStatus: { type: String, required: true },
    sanctionsFlags: { type: String, required: true },
    adverseMedia: { type: String, required: true },
    sarHistory: { type: String, required: true },
    internalWatchlist: { type: String, required: true },
    behaviorChanges: [behaviorChangeSchema],
  },
  { timestamps: true }
);

export type ProfileDocument = IProfile & Document;
ProfileSchema.plugin(mongoosePaginate);

export const ProfileModel = (models.ProfileModel ||
  model<IProfile, PaginateModel<ProfileDocument>>(
    "monitoring_profiles",
    ProfileSchema
  )) as PaginateModel<IProfile>;
