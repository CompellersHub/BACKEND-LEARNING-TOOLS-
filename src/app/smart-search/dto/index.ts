import {
  IsDate,
  IsIn,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from "class-validator";
import {
  createWatchList,
  findManyWatchList,
  searchOnline,
  smartType,
  toggleList,
  watchStatus,
} from "../interface/smart.interface";
import { Transform } from "class-transformer";
import { FindMany, FindOne } from "@/global/entities";
import { findManySmartSearch, findOneSmartSearch } from "../interface";
import {
  assignReviewer,
  createReview,
  massStatus,
} from "../interface/screening";
import { Types } from "mongoose";

export class SearchOnline implements searchOnline {
  @IsOptional()
  @IsString()
  @MaxLength(255)
  @Transform(({ value }) => value.trim())
  additional?: string;

  @IsString()
  @IsOptional()
  @Transform(({ value }) => value.trim())
  country: string;

  @IsDate()
  @IsOptional()
  @Transform(({ value }) => new Date(value))
  dateOfBirth?: Date;

  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  @IsIn(Object.values(smartType))
  entityType: smartType;

  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  fullName: string;

  @IsString()
  @IsOptional()
  @Transform(({ value }) => value.trim())
  nationality?: string;
}

export class CreateWatchList implements createWatchList {
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  serviceName: string;

  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  status: watchStatus;

  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  type: string;

  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  description: string;

  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  provide: string;

  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  records: number;
}

export class FindManyWatchList extends FindMany implements findManyWatchList {
  @IsOptional()
  @IsString({ each: true })
  @Transform(({ value }) => (typeof value === "string" ? [value] : value))
  serviceName: string[];

  @IsOptional()
  @IsString({ each: true })
  @Transform(({ value }) => (typeof value === "string" ? [value] : value))
  status: watchStatus[];

  @IsOptional()
  @IsString({ each: true })
  @Transform(({ value }) => (typeof value === "string" ? [value] : value))
  type: string[];

  @IsOptional()
  @IsString({ each: true })
  @Transform(({ value }) => (typeof value === "string" ? [value] : value))
  provide: string[];
}

export class FindManySmartSearch
  extends FindMany
  implements findManySmartSearch
{
  @IsOptional()
  @IsString({ each: true })
  @Transform(({ value }) => (typeof value === "string" ? [value] : value))
  fullName?: string[];

  @IsOptional()
  @IsString({ each: true })
  @Transform(({ value }) => (typeof value === "string" ? [value] : value))
  riskLevel?: string[];

  @IsOptional()
  @IsString({ each: true })
  @Transform(({ value }) => (typeof value === "string" ? [value] : value))
  riskScore?: string[];

  @IsOptional()
  @IsString({ each: true })
  @Transform(({ value }) => (typeof value === "string" ? [value] : value))
  responseTime?: string[];
}

export class FindOneSmartSearch extends FindOne implements findOneSmartSearch {
  @IsString()
  @IsOptional()
  fullName?: string;

  @IsString()
  @IsOptional()
  riskLevel?: string;

  @IsString()
  @IsOptional()
  riskScore?: string;

  @IsString()
  @IsOptional()
  responseTime?: string;
}

export class CreateReview implements createReview {
  @IsString()
  @IsOptional()
  massReviewRationale?: string;

  @IsString()
  @IsNotEmpty()
  @IsIn(Object.values(massStatus))
  massReviewStatus: massStatus;

  @IsString()
  @IsMongoId()
  @IsNotEmpty()
  @Transform(({ value }) => new Types.ObjectId(value))
  screeningId: Types.ObjectId;
}

export class AssignReviewer implements assignReviewer {
  @IsString()
  @IsMongoId()
  @IsNotEmpty()
  @Transform(({ value }) => new Types.ObjectId(value))
  _id: Types.ObjectId;

  @IsString()
  @IsMongoId()
  @IsNotEmpty()
  @Transform(({ value }) => new Types.ObjectId(value))
  reviewer: Types.ObjectId;
}
export class ToggleUser implements toggleList {
  @IsMongoId()
  @IsNotEmpty()
  user: string;
}
