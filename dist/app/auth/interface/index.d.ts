import { IUser } from "../../../app/user/interface";
export interface register extends Pick<IUser, "email" | "username" | "password" | "role"> {
}
export interface login extends Omit<register, "username" | "role"> {
}
export interface loginResponse extends IUser {
    accessToken: string;
}
export interface verifyEmail {
    token: string;
}
export interface forgetPassword extends Pick<IUser, "email"> {
}
export interface resetPassword extends Pick<IUser, "password" | "email"> {
}
