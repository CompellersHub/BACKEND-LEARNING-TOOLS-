import { ClassConstructor } from "class-transformer";
import { ValidationError } from "class-validator";
export declare const formattedErrors: (errors: ValidationError[]) => any[];
type ValidationResult = true | {
    success: false;
    status: number;
    error: any;
};
export declare const validation: <T extends object>(dto: ClassConstructor<T>, data: Record<string, any>) => Promise<ValidationResult>;
export {};
