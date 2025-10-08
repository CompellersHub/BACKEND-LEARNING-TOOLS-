import { FindMany, FindOne } from "@/global/entities";
import { Transform } from "class-transformer";
import {
  ArrayMinSize,
  IsArray,
  IsDate,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
} from "class-validator";
import { Types } from "mongoose";
import {
  createQuestion,
  enrollment,
  findManyEnrollment,
  findManyQuestion,
  findOneQuestion,
  qType,
  questionType,
  updateQuestion,
} from "../interface";

export class CreateQuestion implements createQuestion {
  @IsString()
  @IsNotEmpty()
  question: string;

  @IsArray()
  @IsString({ each: true })
  options: string[];

  @IsInt()
  @IsNotEmpty()
  @Transform(({ value }) => parseInt(value, 10))
  correctAnswer: number;

  @IsString()
  @IsOptional()
  explanation?: string;

  @IsString()
  @IsNotEmpty()
  @IsIn(Object.values(qType))
  type: questionType;
}

export class UpdateQuestion implements updateQuestion {
  @IsString()
  @IsOptional()
  question: string;

  @IsArray()
  @IsOptional()
  @ArrayMinSize(3)
  @IsString({ each: true })
  options: string[];

  @IsInt()
  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  correctAnswer: number;

  @IsString()
  @IsOptional()
  explanation?: string;

  @IsString()
  @IsOptional()
  @IsIn(Object.values(qType))
  type: questionType;
}

export class FindManyQuestion extends FindMany implements findManyQuestion {
  @IsString({ each: true })
  @IsOptional()
  @IsIn(Object.values(qType), {
    each: true,
  })
  @Transform(({ value }) => (typeof value === "string" ? [value] : value))
  type?: questionType[];

  @IsOptional()
  @IsInt({ each: true })
  @Transform(({ value }) => {
    if (Array.isArray(value)) {
      return value.map((v) => parseInt(v, 10));
    }
    if (typeof value === "string" || typeof value === "number") {
      return [parseInt(value as string, 10)];
    }
    return value;
  })
  quizId?: number[];
}

export class FindOneQuestion extends FindOne implements findOneQuestion {
  @IsString()
  @IsOptional()
  @IsIn(Object.values(qType))
  type?: questionType;

  @IsString()
  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  quizId?: number;
}

export class RecordScore implements enrollment {
  @IsString()
  @IsNotEmpty()
  student: Types.ObjectId;

  @IsDate()
  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  startAt: Date;

  @IsDate()
  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  completedAt: Date;

  @IsString()
  @IsIn(Object.values(qType))
  @IsNotEmpty()
  questionType: questionType;

  @IsInt()
  @IsNotEmpty()
  @Max(100)
  @Transform(({ value }) => parseInt(value, 10))
  score: number;
}

export class FindManyEnrollment extends FindMany implements findManyEnrollment {
  @IsOptional()
  student?: string;
}
