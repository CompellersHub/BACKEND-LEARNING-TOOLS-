import * as mongoose from "mongoose";
import { FindOne } from "../entities";
export declare const findOneWrapper: <T>(query: mongoose.Query<T & {
    _id: mongoose.Types.ObjectId;
}, T & {
    _id: mongoose.Types.ObjectId;
}>, findOne: FindOne, model: string) => Promise<T>;
