import { ClassConstructor, plainToInstance } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import { resStatusCode } from "../constant";

export const formattedErrors = (errors: ValidationError[]): any[] => {
  return errors.map((error) => {
    if (error.children && error.children.length > 0) {
      return {
        property: error.property,
        children: formattedErrors(error.children),
      };
    }
    return {
      property: error.property,
      message: error.constraints,
    };
  });
};

type ValidationResult =
  | true
  | {
      success: false;
      status: number;
      error: any;
    };

export const validation = async <T extends object>(
  dto: ClassConstructor<T>,
  data: Record<string, any>
): Promise<ValidationResult> => {
  const query = plainToInstance(dto, data);
  const errors = await validate(query, {
    whitelist: true,
    forbidNonWhitelisted: false,
  });

  if (errors.length > 0) {
    return {
      success: false,
      status: resStatusCode.BAD_REQUEST,
      error: formattedErrors(errors),
    };
  }

  return true;
};
