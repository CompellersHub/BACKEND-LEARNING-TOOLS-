import { AuthUser } from "@/app/user/interface";
import { Request } from "express";

export interface PopulateOptions {
  path: string;
  select?: any;
  match?: any;
  perDocumentLimit?: number;
  strictPopulate?: boolean;
}

export interface findMany {
  search?: string[];
  sort?: string[];
  populate?: Array<string | PopulateOptions>;
  offset?: number;
  limit?: number;
  page?: number;
  lean?: any;
  select?: string[];
}

export interface findOne extends Pick<findMany, "populate" | "select"> {
  _id?: string;
  lean?: boolean;
  session?: any;
  increaseView?: boolean;
}

export interface AuthRequest extends Request {
  user?: AuthUser;
}

export interface JwtPayload extends AuthUser {
  iat?: number;
  exp?: number;
}

export interface PaginateResult<T> {
  docs: T[];
  totalDocs: number;
  offset: number;
  limit: number;
  totalPages: number;
  page?: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage?: number | null;
  nextPage?: number | null;

  [key: string]: any;
}

export type uploadFile = Express.Multer.File;
