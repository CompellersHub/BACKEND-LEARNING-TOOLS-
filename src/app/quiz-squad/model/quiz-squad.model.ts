import { Document, model, models, PaginateModel, Schema } from "mongoose";
import { IQuestion, qType } from "../interface";
import mongoosePaginate from "mongoose-paginate-v2";

const QuizSchema = new Schema<IQuestion>(
  {
    quizId: { type: Number, required: true },
    question: { type: String, required: true },
    options: { type: [String], required: true },
    correctAnswer: { type: Number, required: true },
    explanation: { type: String, required: false },
    type: {
      type: String,
      enum: Object.values(qType),
      required: true,
    },
  },
  { timestamps: true }
);

export type QuizDocument = IQuestion & Document;
QuizSchema.plugin(mongoosePaginate);

export const QuizModel = (models.QuizModel ||
  model<IQuestion, PaginateModel<QuizDocument>>(
    "quiz_questions",
    QuizSchema
  )) as PaginateModel<IQuestion>;
