import { MailService } from "../../global/services";
import { IUser } from "../user/interface";
import { UserModel } from "../user/model";
import { forgetPassword, login, loginResponse, register, resetPassword, verifyEmail } from "./interface";
export declare class AuthService {
    private readonly userModel;
    private readonly mailService;
    constructor(userModel: typeof UserModel, mailService: MailService);
    signup(data: register): Promise<IUser>;
    signin(data: login): Promise<loginResponse>;
    verified(query: verifyEmail): Promise<IUser>;
    resendVerificationEmail(data: forgetPassword): Promise<{
        message: string;
    }>;
    forgetPassword(data: forgetPassword): Promise<{
        message: string;
    }>;
    resetPassword(data: resetPassword): Promise<{
        message: string;
    }>;
    private sendEmail;
    private authorize;
    private generateRandomCode;
}
