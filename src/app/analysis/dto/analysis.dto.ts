import { IsNotEmpty, IsString, IsUUID, Matches } from "class-validator";
import { createMeasure } from "../interface";

export class searchData {
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @IsString()
  search: string;
}

export class CreateMeasure implements createMeasure {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsUUID()
  tableId: string;

  @IsString()
  @Matches(/^\[[^\]]+\] [-+*%] \[[^\]]+\]$/, {
    message:
      'Expression must be in the format "[...] [-+*%] [...]" with no extra characters.',
  })
  expression: string;
}
