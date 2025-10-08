import { Document, PaginateModel } from "mongoose";
import { ISmartSearch } from "../interface";
export type SmartSearchDocument = ISmartSearch & Document;
export declare const SmartModel: PaginateModel<ISmartSearch>;
