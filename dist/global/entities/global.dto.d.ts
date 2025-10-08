import { findMany, findOne, PopulateOptions } from "./global.interface";
export declare class FindMany implements findMany {
    search?: string[];
    sort?: string[];
    populate?: Array<string | PopulateOptions>;
    offset?: number;
    limit?: number;
    page?: number;
    lean?: any;
    select?: string[];
}
export declare class FindOne implements findOne {
    _id?: string;
    lean?: boolean;
    session?: any;
    increaseView?: boolean;
    populate?: Array<string | PopulateOptions>;
    select?: string[];
}
