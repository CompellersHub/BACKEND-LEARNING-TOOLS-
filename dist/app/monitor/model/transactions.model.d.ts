import { Document, PaginateModel, Schema } from "mongoose";
import { ITransactions } from "../interface";
export declare const twoYearTransactionsSchema: Schema<ITransactions, import("mongoose").Model<ITransactions, any, any, any, Document<unknown, any, ITransactions, any, {}> & ITransactions & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, ITransactions, Document<unknown, {}, import("mongoose").FlatRecord<ITransactions>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<ITransactions> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export type TransactionDocument = ITransactions & Document;
export declare const TransactionModel: PaginateModel<ITransactions>;
