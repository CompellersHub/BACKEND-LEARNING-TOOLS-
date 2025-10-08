import { Document, PaginateModel } from "mongoose";
import { financialCrime } from "../interface";
export type financialCrimeDocument = financialCrime & Document;
export declare const FinancialModel: PaginateModel<financialCrime>;
