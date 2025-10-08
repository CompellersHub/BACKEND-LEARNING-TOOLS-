import { findMany, findOne } from "@/global/entities";
import { Types } from "mongoose";

export type questionType =
  | "aml-fundamentals"
  | "kyc-compliance"
  | "sanctions-screening"
  | "data-analysis";

export enum qType {
  aml = "aml-fundamentals",
  kyc = "kyc-compliance",
  san = "sanctions-screening",
  data = "data-analysis",
}

export interface IQuestion {
  _id?: string;
  quizId: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
  type: questionType;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface findManyQuestion extends findMany {
  type?: questionType[];
  quizId?: number[];
}

export interface findOneQuestion extends findOne {
  type?: questionType;
  quizId?: number;
}

export type createQuestion = Omit<
  IQuestion,
  "_id" | "quizId" | "createdAt" | "updatedAt"
>;
export type updateQuestion = Partial<createQuestion>;

export type response = {
  questionType: questionType;
  score: number;
  startAt: Date;
  completedAt: Date;
};

export interface IQuizEnrollment {
  _id?: Types.ObjectId;
  response: response[];
  student: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface enrollment extends response {
  student: Types.ObjectId;
  startAt: Date;
  completedAt: Date;
}

export type dashboardResponse = {
  totalStudent: number;
  totalComplete: number;
  averageScore: number;
  passRate: number;
};

export interface quizPerformanceResponse {
  questionType: string;
  studentsParticipated: number;
  participationRate: number;
}

export interface scoreAndTime {
  timeStats: { averageCompletionTime: string; fastestCompletionTime: string };
  commonScore: number;
}

export interface findManyEnrollment extends findMany {
  student?: string;
}
