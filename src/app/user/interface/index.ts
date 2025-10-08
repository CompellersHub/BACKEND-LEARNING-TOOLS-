import { findOne } from "@/global/entities";

export interface IUser {
  _id: string;
  first_name?: string;
  last_name?: string;
  username: string;
  email: string;
  password: string;
  role: Role;
  course: string;
  phone_number: number;
  createdAt: Date;
  updatedAt: Date;
}

export enum Role {
  student = "STUDENT",
  facilitator = "FACILITATOR",
  admin = "ADMIN",
}
// RoleChecker;

export interface AuthUser
  extends Pick<IUser, "_id" | "email" | "username" | "role"> {}

export interface findOneUser extends findOne {
  email?: string;
  username?: string;
  role?: Role;
}
