import { Document, model, models, PaginateModel, Schema } from "mongoose";
import { WatchList, watchStatus } from "../interface/smart.interface";
import mongoosePaginate from "mongoose-paginate-v2";

const WatchSchema = new Schema<WatchList>(
  {
    serviceName: { type: String, required: true },
    status: { type: String, enum: watchStatus, required: true },
    type: { type: String, required: true },
    description: { type: String, required: true },
    provide: { type: String, required: true },
    records: { type: Number, required: true },
    users: { type: [String], required: false },
    lastUpdate: { type: Date, required: true, default: Date.now },
  },
  { timestamps: true }
);

export type WatchListDocument = WatchList & Document;
WatchSchema.plugin(mongoosePaginate);

export const WatchModel = (models.WatchModel ||
  model<WatchList, PaginateModel<WatchListDocument>>(
    "watch_list",
    WatchSchema
  )) as PaginateModel<WatchList>;
