import { Document, model, models, PaginateModel, Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import { Action, AlertRecords } from "../interface";

export const AlertRecordSchema = new Schema<AlertRecords>(
  {
    action: { type: String, enum: Object.values(Action), required: true },
    comment: { type: String, required: true },
    alert: {
      type: Schema.Types.ObjectId,
      ref: "monitoringAlerts",
      required: true,
    },
    student: { type: Schema.Types.ObjectId, required: false },
  },
  { timestamps: true }
);

export type AlertRecordsDocument = AlertRecords & Document;
AlertRecordSchema.plugin(mongoosePaginate);

export const AlertRecordModel = (models.AlertRecordModel ||
  model<AlertRecords, PaginateModel<AlertRecordsDocument>>(
    "monitoring_record_alert",
    AlertRecordSchema
  )) as PaginateModel<AlertRecords>;
