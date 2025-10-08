import { FindMany, FindOne } from "@/global/entities";
import { Transform } from "class-transformer";
import {
  IsDate,
  IsIn,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from "class-validator";
import { Types } from "mongoose";
import {
  Action,
  createAlert,
  findManyAlert,
  findManyMonitor,
  findManyTransaction,
  findOneProfile,
  severity,
} from "../interface";

export class FindManyMonitorProfile
  extends FindMany
  implements findManyMonitor
{
  @IsIn(Object.values(severity))
  @IsOptional()
  severity?: severity = severity.all;
}

export class CreateAlert implements createAlert {
  @IsIn(Object.values(Action))
  @IsNotEmpty()
  action: Action;

  @IsString()
  @IsNotEmpty()
  @MinLength(20)
  comment: string;

  @IsString()
  @IsNotEmpty()
  alert: Types.ObjectId;

  @IsMongoId()
  @IsOptional()
  @Transform(({ value }) =>
    Types.ObjectId.isValid(value) ? new Types.ObjectId(value) : value
  )
  student?: Types.ObjectId;
}

export class FindManyAlert extends FindMany implements findManyAlert {
  @IsIn(Object.values(severity))
  @IsOptional()
  severity?: severity;
}

export class FindOneProfile extends FindOne implements findOneProfile {
  @IsString()
  @IsOptional()
  customerId?: string;

  @IsString()
  @IsOptional()
  fullName?: string;
}

export class FindManyTransaction
  extends FindMany
  implements findManyTransaction
{
  @IsString()
  @IsIn(["recent", "years"])
  @IsOptional()
  type?: "recent" | "years";

  @IsString()
  @IsOptional()
  @Transform(({ value }) => (typeof value === "string" ? [value] : value))
  status?: string[];

  @IsMongoId()
  @IsOptional()
  customer?: Types.ObjectId;

  @IsDate()
  @IsOptional()
  @Transform(({ value }) => new Date(value))
  from?: Date;

  @IsDate()
  @IsOptional()
  @Transform(({ value }) => new Date(value))
  end?: Date;
}
