import { z } from "zod";
export declare const CSVRowSchema: z.ZodObject<{
    fullName: z.ZodOptional<z.ZodString>;
    country: z.ZodOptional<z.ZodString>;
    dateOfBirth: z.ZodOptional<z.ZodString>;
    entityType: z.ZodOptional<z.ZodString>;
    nationality: z.ZodOptional<z.ZodString>;
    additional: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
