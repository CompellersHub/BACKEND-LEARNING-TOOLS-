import { Document, PaginateModel } from "mongoose";
import { investigate } from "../interface";
export type investigateDocument = investigate & Document;
export declare const InvestigateModel: PaginateModel<investigate>;
