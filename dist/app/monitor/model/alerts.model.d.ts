import { Document, PaginateModel, Schema } from "mongoose";
import { Alert } from "../interface";
export declare const AlertSchema: Schema<Alert, import("mongoose").Model<Alert, any, any, any, Document<unknown, any, Alert, any, {}> & Alert & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Alert, Document<unknown, {}, import("mongoose").FlatRecord<Alert>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<Alert> & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
}>;
export type AlertDocument = Alert & Document;
export declare const AlertModel: PaginateModel<Alert>;
