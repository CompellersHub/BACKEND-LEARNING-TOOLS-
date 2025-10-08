import { FilterQuery, PaginateModel, PaginateResult } from "mongoose";
import { FindMany } from "../entities";
export declare const findManyWrapper: <T>(model: PaginateModel<T>, condition: FilterQuery<T>, findMany: FindMany) => Promise<PaginateResult<T>>;
