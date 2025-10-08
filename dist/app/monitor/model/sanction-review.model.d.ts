import { Document, PaginateModel, Schema } from "mongoose";
import { sanctionReview } from "../interface";
export declare const sanctionsReviewSchema: Schema<sanctionReview, import("mongoose").Model<sanctionReview, any, any, any, Document<unknown, any, sanctionReview, any, {}> & sanctionReview & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, sanctionReview, Document<unknown, {}, import("mongoose").FlatRecord<sanctionReview>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<sanctionReview> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export type SanctionsDocument = sanctionReview & Document;
export declare const SanctionModel: PaginateModel<sanctionReview>;
