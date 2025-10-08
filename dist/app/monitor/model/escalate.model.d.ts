import { Document, PaginateModel } from "mongoose";
import { escalate } from "../interface";
export type EscalateDocument = escalate & Document;
export declare const EscalateModel: PaginateModel<escalate>;
