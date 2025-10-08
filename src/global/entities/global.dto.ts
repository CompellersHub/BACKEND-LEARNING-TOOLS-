import { Transform } from "class-transformer";
import { IsBoolean, IsInt, IsOptional, IsString, Min } from "class-validator";
import { findMany, findOne, PopulateOptions } from "./global.interface";

export class FindMany implements findMany {
  @IsOptional()
  @Transform((v) => (typeof v.value === "string" ? [v.value] : v.value))
  @IsString({ each: true })
  search?: string[];

  @IsOptional()
  @Transform((v) => (typeof v.value === "string" ? [v.value] : v.value))
  @IsString({ each: true })
  sort?: string[] = ["updatedAt"];

  @IsOptional()
  @Transform((v) => (typeof v.value === "string" ? [v.value] : v.value))
  @IsString({ each: true })
  populate?: Array<string | PopulateOptions>;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Transform((v) => parseInt(v.value, 10))
  offset?: number = 0;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Transform((v) => parseInt(v.value, 10))
  limit?: number = 10;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Transform((v) => parseInt(v.value, 10))
  page?: number = 1;

  @IsOptional()
  @IsBoolean()
  @Transform((v) => (v.value === "true" ? true : false))
  lean?: any = true;

  @IsOptional()
  @IsString({ each: true })
  @Transform((v) => (typeof v.value === "string" ? [v.value] : v.value))
  select?: string[];
}

export class FindOne implements findOne {
  @IsOptional()
  @IsString()
  @Transform((v) => v.value)
  _id?: string;

  @IsBoolean()
  @Transform((v) => (v.value === "true" ? true : false))
  lean?: boolean = true;

  @IsOptional()
  session?: any;

  @IsBoolean()
  @Transform((v) => (v.value === "true" ? true : false))
  increaseView?: boolean = false;

  @IsOptional()
  @Transform((v) => (typeof v.value === "string" ? [v.value] : v.value))
  @IsString({ each: true })
  populate?: Array<string | PopulateOptions>;

  @IsOptional()
  @IsString({ each: true })
  @Transform((v) => (typeof v.value === "string" ? [v.value] : v.value))
  select?: string[];
}
