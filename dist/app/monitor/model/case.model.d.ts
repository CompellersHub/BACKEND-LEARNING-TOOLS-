import { Document, PaginateModel } from "mongoose";
import { caseMonitoring } from "../interface";
export type CaseDocument = caseMonitoring & Document;
export declare const CaseModel: PaginateModel<caseMonitoring>;
