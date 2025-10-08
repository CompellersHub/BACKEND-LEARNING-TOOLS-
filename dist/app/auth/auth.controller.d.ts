import { IUser } from "../user/interface";
import { AuthService } from "./auth.service";
import { ForgetPassword, Login, Register, ResendEmailVerification, ResetPassword, VerifyEmail } from "./dto";
import { loginResponse } from "./interface";
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signup(body: Register): Promise<IUser>;
    signin(body: Login): Promise<loginResponse>;
    verify(param: VerifyEmail): Promise<IUser>;
    forgetPassword(body: ForgetPassword): Promise<{
        message: string;
    }>;
    resetPassword(body: ResetPassword): Promise<{
        message: string;
    }>;
    ResendVerification(body: ResendEmailVerification): Promise<{
        message: string;
    }>;
}
