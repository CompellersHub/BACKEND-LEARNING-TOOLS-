import { decrypted, encryption } from "@/global/helpers";
import { MailService, template } from "@/global/services";
import * as argon from "argon2";
import {
  BadRequestError,
  ForbiddenError,
  NotFoundError,
} from "routing-controllers";
import { Inject, Service } from "typedi";
import { AuthUser, IUser } from "../user/interface";
import { UserModel } from "../user/model";
import jwt from "jsonwebtoken";
import {
  forgetPassword,
  login,
  loginResponse,
  register,
  resetPassword,
  verifyEmail,
} from "./interface";

@Service()
export class AuthService {
  constructor(
    @Inject("userModel") private readonly userModel: typeof UserModel,
    private readonly mailService: MailService
  ) {}

  async signup(data: register): Promise<IUser> {
    try {
      const user = await this.userModel.findOne({ email: data.email });
      // if (user && !user.verified) {
      //   throw new ForbiddenError(
      //     "Account not verified, New verification token set."
      //   );
      // }

      if (user) {
        throw new NotFoundError("Email already exist");
      }

      const password = await argon.hash(data.password);
      const expiredAt = new Date(Date.now() + 10 * 60 * 1000);
      const token = this.generateRandomCode(10);
      const save = { ...data, password, expiredAt, token };
      return this.userModel.create(save).then(async (data) => {
        delete data.password;
        const token = await encryption(
          JSON.stringify({
            email: data.email,
            // token: data.token,
          })
        );
        await this.mailService.sendEmail(
          data.email,
          template.welcome,
          "Welcome! Please Verify Your Account",
          {
            fullname: data.username,
            token,
          }
        );
        return data;
      });
    } catch (error) {
      throw error;
    }
  }

  async signin(data: login): Promise<loginResponse> {
    try {
      const user = await this.userModel.findOne({ email: data.email });

      if (!user) {
        throw new NotFoundError("Invalid credential");
      }

      // if (!user.verified) {
      //   await this.sendEmail(user.email);
      //   throw new ForbiddenError("Email not yet verified");
      // }

      const isMatch = await argon.verify(user.password, data.password);
      if (!isMatch) {
        throw new ForbiddenError("Incorrect password");
      }
      delete user.password;
      const token = await this.authorize({
        _id: user._id,
        email: user.email,
        role: user.role,
        username: user.username,
      });
      return { ...user, accessToken: token };
    } catch (error) {
      throw error;
    }
  }

  async verified(query: verifyEmail): Promise<IUser> {
    try {
      const decryptToken = await decrypted(query.token);

      if (!decryptToken || typeof decryptToken !== "string") {
        throw new BadRequestError("Invalid or missing token");
      }

      const parse: { token: string; email: string } = await JSON.parse(
        decryptToken
      );

      const user = await this.userModel.findOneAndUpdate(
        {
          email: parse.email,
          token: parse.token,
          expiredAt: { $gt: new Date() },
        },
        { $set: { verified: true } },
        { new: true }
      );

      if (!user) {
        throw new ForbiddenError("token expired or user not found.");
      }

      delete user.password;
      return user;
    } catch (error) {
      throw error;
    }
  }

  async resendVerificationEmail(data: forgetPassword) {
    try {
      await this.sendEmail(data.email);

      return { message: "Verification link sent to your email" };
    } catch (error) {
      throw error;
    }
  }

  async forgetPassword(data: forgetPassword) {
    const findUser = await this.userModel.findOne({ email: data.email });
    if (!findUser) throw new NotFoundError("User not found");

    const token = `https://frontend-reset-password-link.com?email=${data.email}`;
    // send email with the token and email
    await this.mailService.sendEmail(
      findUser.email,
      template.forget,
      "Reset Password",
      {
        email: findUser.email,
        username: findUser.username,
        token,
        currentYear: new Date().getFullYear(),
      }
    );

    return { message: "Reset password link sent to your email" };
  }

  async resetPassword(data: resetPassword) {
    try {
      const findUser = await this.userModel.findOne({ email: data.email });
      if (!findUser) throw new Error("User not found");

      const password = await argon.hash(data.password);

      await this.userModel.updateOne(
        { _id: findUser._id },
        { $set: { password } }
      );
      return { message: "Password reset successfully" };
    } catch (error) {
      throw error;
    }
  }

  private async sendEmail(email: string) {
    const expiredAt = new Date(Date.now() + 10 * 60 * 1000);
    const code = this.generateRandomCode(10);
    const token = await encryption(JSON.stringify({ token: code, email }));

    const user = await this.userModel.findOne({ email });
    if (!user) return;

    await Promise.all([
      this.userModel.findOneAndUpdate(
        { email },
        { $set: { token: code, expiredAt } },
        { new: true }
      ),

      this.mailService.sendEmail(
        email,
        template.resend,
        "Verify Your Account – Action Needed",
        {
          fullname: user.username,
          token,
        }
      ),
    ]);
    return;
  }

  private async authorize(data: AuthUser): Promise<string> {
    return jwt.sign(data, process.env.JWT_SECRET, { expiresIn: "24h" });
  }

  private generateRandomCode(length: number): string {
    const bytes = new Uint8Array(length);
    crypto.getRandomValues(bytes);
    return Array.from(bytes)
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  }
}
