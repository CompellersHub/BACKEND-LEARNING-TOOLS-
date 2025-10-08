import { Document, PaginateModel, Schema } from "mongoose";
import { IProfile } from "../interface";
export declare const ProfileSchema: Schema<IProfile, import("mongoose").Model<IProfile, any, any, any, Document<unknown, any, IProfile, any, {}> & IProfile & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, IProfile, Document<unknown, {}, import("mongoose").FlatRecord<IProfile>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<IProfile> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
export type ProfileDocument = IProfile & Document;
export declare const ProfileModel: PaginateModel<IProfile>;
