import { uploadFile } from "../../../global/entities";
import { adverseNews, directorType, fieldTypeArray, fieldTypeString, kycDocumentType, kycLinkType, mark, ownershipIdType, ownershipType, politicallyExposedPerson, sanctionsScreening, shipType, subShareholder, subShareholderDetails } from "../interface";
export declare class FieldTypeString implements fieldTypeString {
    value: string;
    status: mark;
}
export declare class FieldTypeArray implements fieldTypeArray {
    value: string[];
    status: mark;
}
export declare class OwnershipType implements ownershipType {
    firstName?: string;
    lastName?: string;
    organizationName?: string;
    type: shipType;
    ownershipPercentage: number;
    nationality?: string;
    countryOfResidence?: string;
    occupation?: string;
    idType?: ownershipIdType;
    uploadIdDocument?: uploadFile | kycDocumentType;
    uploadProofOfAddress?: uploadFile | kycDocumentType;
    countryOfOperation?: string;
    registrationNumber?: string;
    politicallyExposedPerson?: politicallyExposedPerson;
    sanctionsScreening: sanctionsScreening;
    adverseNews: adverseNews;
    identifier: string;
    status: mark;
}
export declare class Directors implements directorType {
    firstName: string;
    lastName: string;
    occupation: string;
    nationality: string;
    countryOfResidence: string;
    dateOfBirth: Date;
    idType: string;
    uploadIdDocument: Express.Multer.File | kycDocumentType;
    politicallyExposedPerson?: politicallyExposedPerson;
    sanctionsScreening: sanctionsScreening;
    adverseNews: adverseNews;
    position: string;
    status: mark;
}
export declare class KYCLink implements kycLinkType {
    link: string;
    description?: string;
    status: mark;
}
export declare class SubShareHolder implements subShareholder {
    parentIdentifier: string;
    detailed: subShareholderDetails[];
}
export declare class KycDocument implements kycDocumentType {
    name: string;
    type: string;
    uri: string;
    uploadedDate: Date;
    status: mark;
}
