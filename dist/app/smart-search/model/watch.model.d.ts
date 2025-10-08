import { Document, PaginateModel } from "mongoose";
import { WatchList } from "../interface/smart.interface";
export type WatchListDocument = WatchList & Document;
export declare const WatchModel: PaginateModel<WatchList>;
