import { Document, PaginateModel, Schema } from "mongoose";
import { AlertRecords } from "../interface";
export declare const AlertRecordSchema: Schema<AlertRecords, import("mongoose").Model<AlertRecords, any, any, any, Document<unknown, any, AlertRecords, any, {}> & AlertRecords & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, AlertRecords, Document<unknown, {}, import("mongoose").FlatRecord<AlertRecords>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<AlertRecords> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export type AlertRecordsDocument = AlertRecords & Document;
export declare const AlertRecordModel: PaginateModel<AlertRecords>;
