import { Document, PaginateModel } from "mongoose";
import { IQuestion } from "../interface";
export type QuizDocument = IQuestion & Document;
export declare const QuizModel: PaginateModel<IQuestion>;
