import { Types } from "mongoose";
import { Alert, IProfile, ITransactions } from "./interface";
export declare const generateProfiles: (count: number) => IProfile[];
export declare const generateCustomerHistory: (count: number, customerId: Types.ObjectId) => ITransactions[];
export declare function generateTwoYearHistory(customerId: Types.ObjectId): ITransactions[];
export declare const generateMockAlerts: (count: number, user: {
    name: string;
    id: Types.ObjectId;
}[], name: string[]) => Alert[];
