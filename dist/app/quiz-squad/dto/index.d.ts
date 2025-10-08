import { FindMany, FindOne } from "../../../global/entities";
import { Types } from "mongoose";
import { createQuestion, enrollment, findManyEnrollment, findManyQuestion, findOneQuestion, questionType, updateQuestion } from "../interface";
export declare class CreateQuestion implements createQuestion {
    question: string;
    options: string[];
    correctAnswer: number;
    explanation?: string;
    type: questionType;
}
export declare class UpdateQuestion implements updateQuestion {
    question: string;
    options: string[];
    correctAnswer: number;
    explanation?: string;
    type: questionType;
}
export declare class FindManyQuestion extends FindMany implements findManyQuestion {
    type?: questionType[];
    quizId?: number[];
}
export declare class FindOneQuestion extends FindOne implements findOneQuestion {
    type?: questionType;
    quizId?: number;
}
export declare class RecordScore implements enrollment {
    student: Types.ObjectId;
    startAt: Date;
    completedAt: Date;
    questionType: questionType;
    score: number;
}
export declare class FindManyEnrollment extends FindMany implements findManyEnrollment {
    student?: string;
}
