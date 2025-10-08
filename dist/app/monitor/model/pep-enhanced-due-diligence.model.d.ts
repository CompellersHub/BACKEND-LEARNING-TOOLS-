import { Document, PaginateModel } from "mongoose";
import { pepEnhancedDueDiligence } from "../interface";
export type PEPDocument = pepEnhancedDueDiligence & Document;
export declare const PEPModel: PaginateModel<pepEnhancedDueDiligence>;
