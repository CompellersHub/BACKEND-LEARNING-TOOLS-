import { FindMany, FindOne } from "../../../global/entities";
import { findManyKycTrainingPortal, findOneKycTrainingPortal } from "../interface";
export declare class FindManyKycTraining extends FindMany implements findManyKycTrainingPortal {
    caseId?: string[];
    entityName?: string[];
    accountNumber?: string[];
    productType?: string[];
    companyNumber?: string[];
}
export declare class FindOneKycTraining extends FindOne implements findOneKycTrainingPortal {
    caseId?: string;
    entityName?: string;
    accountNumber?: string;
    productType?: string;
    companyNumber?: string;
}
export declare class updateParams {
    _id: string;
}
