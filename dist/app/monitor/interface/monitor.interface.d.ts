import { findMany } from "../../../global/entities";
import { Types } from "mongoose";
export declare enum severity {
    low = "Low",
    high = "High",
    medium = "Medium",
    all = "All"
}
export interface IProfile {
    id: string;
    fullName: string;
    aliases: string[];
    dateOfBirth: string;
    nationality: string;
    customerId: string;
    accountNumber: string;
    proofOfIdentity: string;
    proofOfAddress: string;
    occupation: string;
    businessActivity: string;
    customerType: string;
    sourceOfFunds: string;
    sourceOfWealth: string;
    riskRating: string;
    riskReason: string;
    legalStructure: string;
    registeredAddress: string;
    directors: string;
    beneficialOwners: string;
    natureOfBusiness: string;
    sicCodes: string;
    corporateWebsite: string;
    expectedVolume: string;
    expectedFrequency: string;
    typicalTransactionTypes: string[];
    anticipatedJurisdictions: string[];
    anticipatedCounterparties: string[];
    accountPurpose: string;
    countryOfResidence: string;
    expectedTransactionCountries: string[];
    dualCitizenship: string;
    linkedJurisdictions: string[];
    openingDate: string;
    onboardingChannel: string;
    joinDate: string;
    riskScore: number;
    location: string;
    accountType: string;
    totalTransactions: number;
    averageMonthly: number;
    pepStatus: string;
    sanctionsFlags: string;
    adverseMedia: string;
    sarHistory: string;
    internalWatchlist: string;
    behaviorChanges: behaviorChanges[];
}
export interface profileResponse extends IProfile {
    recentTransaction: ITransactions[];
    twoYearsTransaction: ITransactions[];
    transaction: ITransactions[];
}
export interface ITransactions {
    id: string;
    date: string;
    amount: number;
    type: string;
    status: string;
    counterparty: string;
    riskScore: number;
    flagged: boolean;
    jurisdiction?: string;
    reference?: string;
    channel?: string[];
    customer?: Types.ObjectId;
    transactionType: "recent" | "years";
    createdAt?: Date;
    updatedAt?: Date;
}
export interface behaviorChanges {
    date: string;
    change: string;
    riskImpact: string;
}
export interface findManyMonitor extends findMany {
    severity?: severity;
}
export interface Alert {
    _id?: Types.ObjectId;
    id: string;
    type: string;
    severity: string;
    customer: string;
    customerId: string;
    userId: Types.ObjectId;
    amount: string;
    timestamp: string;
    location: string;
    accountType: string;
    monitoringType: string;
    riskScore: number;
    riskFactors: string[];
    description: string;
    status: string;
    aiScore: number;
    deviceFingerprint: string;
    geoLocation: string;
    relatedAlerts: number;
    investigationNotes: string[];
    escalationLevel: string;
    transactionReference: string;
    counterparty: string;
    transactionDetails: string;
    cleared: Date;
    createdAt?: Date;
    updatedAt?: Date;
}
