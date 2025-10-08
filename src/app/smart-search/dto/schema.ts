import { z } from "zod";

export const CSVRowSchema = z.object({
  fullName: z.string().optional(),
  country: z.string().optional(),
  dateOfBirth: z.string().optional(),
  entityType: z.string().optional(),
  nationality: z.string().optional(),
  additional: z.string().optional(),
});
