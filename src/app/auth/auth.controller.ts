import { Body, Get, JsonController, Params, Post } from "routing-controllers";
import { OpenAPI } from "routing-controllers-openapi";
import { Service } from "typedi";
import { IUser } from "../user/interface";
import { AuthService } from "./auth.service";
import {
  ForgetPassword,
  Login,
  Register,
  ResendEmailVerification,
  ResetPassword,
  VerifyEmail,
} from "./dto";
import { loginResponse } from "./interface";

@JsonController("/auth", { transformResponse: false })
@Service()
@OpenAPI({ tags: ["Authentication"] })
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("/signup")
  async signup(@Body({ required: true }) body: Register): Promise<IUser> {
    return this.authService.signin(body);
  }

  @Post("/signin")
  async signin(@Body({ required: true }) body: Login): Promise<loginResponse> {
    return this.authService.signin(body);
  }

  @Get("/verify")
  async verify(@Params({ required: true }) param: VerifyEmail): Promise<IUser> {
    return this.authService.verified(param);
  }

  @Post("/forget-password")
  async forgetPassword(
    @Body({ required: true }) body: ForgetPassword
  ): Promise<{ message: string }> {
    return this.authService.forgetPassword(body);
  }

  @Post("/reset-password")
  async resetPassword(
    @Body({ required: true }) body: ResetPassword
  ): Promise<{ message: string }> {
    return this.authService.resetPassword(body);
  }

  @Post("/resend-verification")
  async ResendVerification(
    @Body({ required: true }) body: ResendEmailVerification
  ): Promise<{ message: string }> {
    return this.authService.resendVerificationEmail(body);
  }
}
