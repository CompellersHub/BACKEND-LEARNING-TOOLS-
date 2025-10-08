import { Document, PaginateModel } from "mongoose";
import { ScreeningCount } from "../interface/screening";
export type ScreeningDocument = ScreeningCount & Document;
export declare const ScreeningModel: PaginateModel<ScreeningCount>;
