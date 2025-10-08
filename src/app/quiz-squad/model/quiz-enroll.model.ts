import { Document, model, models, PaginateModel, Schema } from "mongoose";
import { IQuizEnrollment, qType, response } from "../interface";
import mongoosePaginate from "mongoose-paginate-v2";

const ResponseSchema = new Schema<response>({
  questionType: { type: String, enum: Object.values(qType), required: true },
  score: { type: Number, required: true, default: 0 },
  startAt: { type: Date, required: true },
  completedAt: { type: Date, required: true },
});

const QuizEnrollmentSchema = new Schema<IQuizEnrollment>(
  {
    response: { type: [ResponseSchema], required: true },
    student: { type: Schema.Types.ObjectId, ref: "users", required: true },
  },
  { timestamps: true }
);

export type EnrollDocument = IQuizEnrollment & Document;
QuizEnrollmentSchema.plugin(mongoosePaginate);

export const EnrollModel = (models.EnrollModel ||
  model<IQuizEnrollment, PaginateModel<EnrollDocument>>(
    "quiz_enrollments",
    QuizEnrollmentSchema
  )) as PaginateModel<IQuizEnrollment>;
