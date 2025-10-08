import {
  Document,
  PaginateModel,
  Schema,
  SchemaTypes,
  model,
  models,
} from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import { ScreeningCount } from "../interface/screening";

const ScreeningCountSchema = new Schema<ScreeningCount>(
  {
    screeningId: {
      type: SchemaTypes.ObjectId,
      ref: "smart_search",
      required: true,
    },
    year: Number,
    month: Number, // 1 to 12
    today: { type: Number, default: 1 },
    yesterday: { type: Number, default: 0 },
    total: { type: Number, default: 0 },
    isUpdating: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export type ScreeningDocument = ScreeningCount & Document;
ScreeningCountSchema.plugin(mongoosePaginate);

export const ScreeningModel = (models.ScreeningModel ||
  model<ScreeningCount, PaginateModel<ScreeningDocument>>(
    "screening_count",
    ScreeningCountSchema
  )) as PaginateModel<ScreeningCount>;
