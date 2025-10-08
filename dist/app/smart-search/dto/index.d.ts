import { createWatchList, findManyWatchList, searchOnline, smartType, toggleList, watchStatus } from "../interface/smart.interface";
import { FindMany, FindOne } from "../../../global/entities";
import { findManySmartSearch, findOneSmartSearch } from "../interface";
import { assignReviewer, createReview, massStatus } from "../interface/screening";
import { Types } from "mongoose";
export declare class SearchOnline implements searchOnline {
    additional?: string;
    country: string;
    dateOfBirth?: Date;
    entityType: smartType;
    fullName: string;
    nationality?: string;
}
export declare class CreateWatchList implements createWatchList {
    serviceName: string;
    status: watchStatus;
    type: string;
    description: string;
    provide: string;
    records: number;
}
export declare class FindManyWatchList extends FindMany implements findManyWatchList {
    serviceName: string[];
    status: watchStatus[];
    type: string[];
    provide: string[];
}
export declare class FindManySmartSearch extends FindMany implements findManySmartSearch {
    fullName?: string[];
    riskLevel?: string[];
    riskScore?: string[];
    responseTime?: string[];
}
export declare class FindOneSmartSearch extends FindOne implements findOneSmartSearch {
    fullName?: string;
    riskLevel?: string;
    riskScore?: string;
    responseTime?: string;
}
export declare class CreateReview implements createReview {
    massReviewRationale?: string;
    massReviewStatus: massStatus;
    screeningId: Types.ObjectId;
}
export declare class AssignReviewer implements assignReviewer {
    _id: Types.ObjectId;
    reviewer: Types.ObjectId;
}
export declare class ToggleUser implements toggleList {
    user: string;
}
