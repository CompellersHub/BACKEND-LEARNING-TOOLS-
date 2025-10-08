import { Document, model, models, PaginateModel, Schema } from "mongoose";
import { IUser, Role } from "../interface";
import mongoosePaginate from "mongoose-paginate-v2";

const UserSchema = new Schema<IUser>(
  {
    first_name: { type: String, required: false },
    last_name: { type: String, required: false },
    username: { type: String, required: true },
    email: { type: String, required: true },
    role: {
      type: String,
      required: true,
      enum: Object.values(Role),
      default: Role.student,
    },
    password: { type: String, required: false },
    course: { type: String, required: false },
    phone_number: { type: Number, required: false },
  },
  { timestamps: true }
);

UserSchema.index({ email: 1 });

export type UserDocument = IUser & Document;
UserSchema.plugin(mongoosePaginate);

export const UserModel = (models.UserModel ||
  model<IUser, PaginateModel<UserDocument>>(
    "users",
    UserSchema
  )) as PaginateModel<IUser>;
