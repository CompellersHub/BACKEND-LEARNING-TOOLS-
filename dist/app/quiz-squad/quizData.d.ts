import { IQuestion } from "./interface";
export interface Question {
    id: number;
    question: string;
    options: string[];
    correctAnswer: number;
    explanation?: string;
}
export interface QuizCategory {
    id: string;
    name: string;
    description: string;
    questions: Question[];
}
export declare const amlQuestions: IQuestion[];
export declare const kycQuestions: IQuestion[];
export declare const sanctionsQuestions: IQuestion[];
