import { Document, PaginateModel } from "mongoose";
import { IUser } from "../interface";
export type UserDocument = IUser & Document;
export declare const UserModel: PaginateModel<IUser>;
