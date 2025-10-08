import { Document, PaginateModel } from "mongoose";
import { reviewOnSearch } from "../interface/screening";
export type ReviewDocument = reviewOnSearch & Document;
export declare const ReviewModel: PaginateModel<reviewOnSearch>;
