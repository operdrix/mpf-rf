import { AgeCategory } from "@prisma/client";
import { z } from "zod";

export const performanceSchema = z.object({
  time: z.number().positive("Le temps doit être positif"),
  type: z.enum(["MPF", "RF"], {
    errorMap: () => ({ message: "Le type doit être MPF ou RF" }),
  }),
  date: z.string().transform((str) => new Date(str)),
  valid: z.boolean(),
  competitorId: z.number().int().positive("L'ID du compétiteur est requis"),
  eventId: z.number().int().positive("L'ID de l'épreuve est requis"),
  ageCategory: z.enum([
    AgeCategory.B,
    AgeCategory.M,
    AgeCategory.C,
    AgeCategory.J,
    AgeCategory.S,
    AgeCategory.V1,
    AgeCategory.V2,
    AgeCategory.V3,
    AgeCategory.V4,
    AgeCategory.V5,
    AgeCategory.V6,
    AgeCategory.V7,
    AgeCategory.V8,
    AgeCategory.V9,
  ], {
    errorMap: () => ({ message: "Catégorie d'âge invalide" }),
  }),
});

export const performanceUpdateSchema = performanceSchema.extend({
  id: z.number().int().positive("L'ID est requis"),
});

export type PerformanceInput = z.infer<typeof performanceSchema>;
export type PerformanceUpdateInput = z.infer<typeof performanceUpdateSchema>; 