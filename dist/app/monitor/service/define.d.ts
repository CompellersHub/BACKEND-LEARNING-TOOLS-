import { FilterQuery } from "mongoose";
import { findManyAlert, findManyTransaction, findOneProfile, ITransactions } from "../interface";
export declare class Define {
    filterManyTransaction(query: findManyTransaction): FilterQuery<ITransactions>;
    filterOneProfile(query: findOneProfile): {
        options: {
            lean: boolean;
            session: any;
            select: string[];
            populate: (string | import("../../../global/entities").PopulateOptions)[];
        };
        filter: {
            customerId?: string;
            fullName?: string;
            _id?: string;
        };
    };
    filterManyAlert(query: findManyAlert): FilterQuery<findManyAlert>;
}
