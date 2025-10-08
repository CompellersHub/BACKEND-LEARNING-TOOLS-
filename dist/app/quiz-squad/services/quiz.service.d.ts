import { FilterQuery, PaginateResult } from "mongoose";
import { createQuestion, findManyQuestion, IQuestion, updateQuestion } from "../interface";
import { QuizModel } from "../model";
export declare class QuizService {
    private readonly quizModel;
    constructor(quizModel: typeof QuizModel);
    createQuestion: (create: createQuestion) => Promise<IQuestion>;
    updateQuestion: (update: updateQuestion, id: string) => Promise<IQuestion>;
    findManyQuestion: (query: findManyQuestion) => Promise<PaginateResult<IQuestion>>;
    findOneQuestion: (query: FilterQuery<IQuestion>) => Promise<IQuestion>;
    deleteQuestion: (id: string) => Promise<import("mongoose").Document<unknown, {}, IQuestion, {}, {}> & IQuestion & Required<{
        _id: string;
    }> & {
        __v: number;
    }>;
    private filterOneQuestion;
    private filterManyQuestion;
}
