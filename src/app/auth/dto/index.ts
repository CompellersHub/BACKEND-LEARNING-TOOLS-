import {
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
} from "class-validator";
import {
  forgetPassword,
  login,
  register,
  resetPassword,
  verifyEmail,
} from "../interface";
import { Role } from "@/app/user/interface";

export class Register implements register {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  @IsStrongPassword(
    {
      minLength: 8,
      minLowercase: 1,
      minSymbols: 1,
      minNumbers: 1,
      minUppercase: 1,
    },
    {
      message:
        "Include atleast one number, one lowercase letter, one uppercase letter, one symbol and upto 8 in length ",
    }
  )
  password: string;

  @IsString()
  @IsOptional()
  @IsIn(Object.values(Role))
  role: Role = Role.student;
}

export class Login implements login {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @IsStrongPassword(
    {
      minLength: 8,
      minLowercase: 1,
      minSymbols: 1,
      minNumbers: 1,
      minUppercase: 1,
    },
    {
      message:
        "Include atleast one number, one lowercase letter, one uppercase letter, one symbol and upto 8 in length ",
    }
  )
  password: string;
}

export class ResetPassword extends Login implements resetPassword {}

export class ForgetPassword implements forgetPassword {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;
}

export class VerifyEmail implements verifyEmail {
  @IsString()
  @IsNotEmpty()
  token: string;
}

export class ResendEmailVerification implements forgetPassword {
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;
}
