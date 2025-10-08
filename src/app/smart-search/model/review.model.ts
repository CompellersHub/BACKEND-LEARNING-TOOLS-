import {
  Document,
  PaginateModel,
  Schema,
  SchemaTypes,
  model,
  models,
} from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import { massStatus, reviewOnSearch } from "../interface/screening";

const ReviewSchema = new Schema<reviewOnSearch>(
  {
    massReviewStatus: {
      type: String,
      enum: Object.values(massStatus),
      required: true,
    },
    massReviewRationale: { type: String, required: false },
    screeningId: {
      type: SchemaTypes.ObjectId,
      ref: "smart_search",
      required: true,
    },
    // TODO reviewer and student should be ref to user
    reviewer: { type: SchemaTypes.ObjectId, required: false },
    student: { type: SchemaTypes.ObjectId, ref: "users", required: false },
  },
  { timestamps: true }
);

export type ReviewDocument = reviewOnSearch & Document;
ReviewSchema.plugin(mongoosePaginate);

export const ReviewModel = (models.ScreeningModel ||
  model<reviewOnSearch, PaginateModel<ReviewDocument>>(
    "review_on_search",
    ReviewSchema
  )) as PaginateModel<reviewOnSearch>;
