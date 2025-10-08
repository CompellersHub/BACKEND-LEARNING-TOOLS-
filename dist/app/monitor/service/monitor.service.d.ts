import { FilterQuery, PaginateResult } from "mongoose";
import { Alert, AlertRecords, createAlert, findManyAlert, findManyTransaction, ITransactions, profileResponse } from "../interface";
import { AlertModel, AlertRecordModel, ProfileDocument, ProfileModel, TransactionModel } from "../model";
import { Define } from "./define";
export declare class MonitorService extends Define {
    private readonly profile;
    private readonly alert;
    private readonly alertRecord;
    private readonly transaction;
    constructor(profile: typeof ProfileModel, alert: typeof AlertModel, alertRecord: typeof AlertRecordModel, transaction: typeof TransactionModel);
    submitReviewAlert(data: createAlert): Promise<AlertRecords>;
    analyticsDashboard(): Promise<{
        highRisk: any;
        sarFile: any;
        countries: any;
        activeAlert: any;
        typeDistribution: any[];
        falsePositive: number;
        systemUptime: number;
    }>;
    findOneProfile(query: FilterQuery<ProfileDocument>): Promise<profileResponse>;
    topbarAnalytics(): Promise<{
        activeAlert: any;
        highRisk: any;
        investigate: any;
    }>;
    alertCount(): Promise<{
        all: number;
        highRisk: number;
        mediumAlert: number;
        lowAlert: number;
    }>;
    recentActivities(): Promise<void>;
    findManyTransactions(query: findManyTransaction): Promise<PaginateResult<ITransactions>>;
    findManyAlerts(query: findManyAlert): Promise<PaginateResult<Alert>>;
}
