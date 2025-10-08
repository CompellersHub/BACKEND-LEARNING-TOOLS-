import { Document, PaginateModel } from "mongoose";
import { IQuizEnrollment } from "../interface";
export type EnrollDocument = IQuizEnrollment & Document;
export declare const EnrollModel: PaginateModel<IQuizEnrollment>;
