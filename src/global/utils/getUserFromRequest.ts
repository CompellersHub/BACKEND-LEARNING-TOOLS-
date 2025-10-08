import { UserModel } from "@/app/user/model";
import jwt from "jsonwebtoken";
import {
  BadRequestError,
  ForbiddenError,
  UnauthorizedError,
} from "routing-controllers";
import { AuthRequest, JwtPayload } from "../entities";

/**
 * Extracts and returns the user from the request, with caching.
 */
export const getUserFromRequest = async (req: AuthRequest) => {
  if (req.user) return req.user; // cached user

  const header = req.headers["authorization"];
  if (!header?.startsWith("Bearer ")) {
    throw new UnauthorizedError("Authentication required");
  }

  const token = header.split(" ")[1];
  if (!token) throw new UnauthorizedError("Authentication token is missing");

  if (!process.env.JWT_SECRET) {
    throw new BadRequestError("JWT_SECRET is not configured");
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;
  if (!decoded._id) throw new ForbiddenError("Invalid token format");

  const user = await UserModel.findById(decoded._id);
  if (!user) {
    throw new UnauthorizedError("User not found");
  }

  req.user = user; // cache it
  return user;
};
