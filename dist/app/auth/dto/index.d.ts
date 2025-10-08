import { forgetPassword, login, register, resetPassword, verifyEmail } from "../interface";
import { Role } from "../../../app/user/interface";
export declare class Register implements register {
    email: string;
    username: string;
    password: string;
    role: Role;
}
export declare class Login implements login {
    email: string;
    password: string;
}
export declare class ResetPassword extends Login implements resetPassword {
}
export declare class ForgetPassword implements forgetPassword {
    email: string;
}
export declare class VerifyEmail implements verifyEmail {
    token: string;
}
export declare class ResendEmailVerification implements forgetPassword {
    email: string;
}
