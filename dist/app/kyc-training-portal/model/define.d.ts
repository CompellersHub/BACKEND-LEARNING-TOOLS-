import { Schema } from "mongoose";
import { directorType, fieldTypeArray, fieldTypeString, kycDocumentType, kycLinkType, mark, ownershipType, subShareholder } from "../interface";
export declare const FieldTypeStringSchema: Schema<fieldTypeString, import("mongoose").Model<fieldTypeString, any, any, any, import("mongoose").Document<unknown, any, fieldTypeString, any, {}> & fieldTypeString & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, fieldTypeString, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<fieldTypeString>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<fieldTypeString> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export declare const FieldTypeArraySchema: Schema<fieldTypeArray, import("mongoose").Model<fieldTypeArray, any, any, any, import("mongoose").Document<unknown, any, fieldTypeArray, any, {}> & fieldTypeArray & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, fieldTypeArray, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<fieldTypeArray>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<fieldTypeArray> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export declare const KycDocumentSchema: Schema<kycDocumentType, import("mongoose").Model<kycDocumentType, any, any, any, import("mongoose").Document<unknown, any, kycDocumentType, any, {}> & kycDocumentType & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, kycDocumentType, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<kycDocumentType>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<kycDocumentType> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export declare const SubShareholderSchema: Schema<subShareholder, import("mongoose").Model<subShareholder, any, any, any, import("mongoose").Document<unknown, any, subShareholder, any, {}> & subShareholder & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, subShareholder, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<subShareholder>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<subShareholder> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export declare const OwnershipSchema: Schema<ownershipType, import("mongoose").Model<ownershipType, any, any, any, import("mongoose").Document<unknown, any, ownershipType, any, {}> & ownershipType & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, ownershipType, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<ownershipType>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<ownershipType> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export declare const DirectorSchema: Schema<directorType, import("mongoose").Model<directorType, any, any, any, import("mongoose").Document<unknown, any, directorType, any, {}> & directorType & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, directorType, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<directorType>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<directorType> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export declare const KycLinkSchema: Schema<kycLinkType, import("mongoose").Model<kycLinkType, any, any, any, import("mongoose").Document<unknown, any, kycLinkType, any, {}> & kycLinkType & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, kycLinkType, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<kycLinkType>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<kycLinkType> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export declare const FieldSchema: Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
    value: any;
    comment?: string;
    status?: mark;
}, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{
    value: any;
    comment?: string;
    status?: mark;
}>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<{
    value: any;
    comment?: string;
    status?: mark;
}> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
