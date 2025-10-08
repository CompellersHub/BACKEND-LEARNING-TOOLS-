import { FindMany, FindOne } from "@/global/entities";
import { Transform } from "class-transformer";
import { IsMongoId, IsOptional, IsString } from "class-validator";
import {
  findManyKycTrainingPortal,
  findOneKycTrainingPortal,
} from "../interface";

export class FindManyKycTraining
  extends FindMany
  implements findManyKycTrainingPortal
{
  @IsString({ each: true })
  @IsOptional()
  @Transform(({ value }) => (typeof value === "string" ? [value] : value))
  caseId?: string[];

  @IsString({ each: true })
  @IsOptional()
  @Transform(({ value }) => (typeof value === "string" ? [value] : value))
  entityName?: string[];

  @IsString({ each: true })
  @IsOptional()
  @Transform(({ value }) => (typeof value === "string" ? [value] : value))
  accountNumber?: string[];

  @IsString({ each: true })
  @IsOptional()
  @Transform(({ value }) => (typeof value === "string" ? [value] : value))
  productType?: string[];

  @IsString({ each: true })
  @IsOptional()
  @Transform(({ value }) => (typeof value === "string" ? [value] : value))
  companyNumber?: string[];
}

export class FindOneKycTraining
  extends FindOne
  implements findOneKycTrainingPortal
{
  @IsString()
  @IsOptional()
  caseId?: string;

  @IsString()
  @IsOptional()
  entityName?: string;

  @IsString()
  @IsOptional()
  accountNumber?: string;

  @IsString()
  @IsOptional()
  productType?: string;

  @IsString()
  @IsOptional()
  companyNumber?: string;
}

export class updateParams {
  @IsMongoId()
  _id: string;
}
