import { Gender } from "@prisma/client";
import { z } from "zod";

export const competitorSchema = z.object({
  license: z.string().min(1, "La licence est requise"),
  lastName: z.string().min(1, "Le nom est requis"),
  firstName: z.string().min(1, "Le prénom est requis"),
  clubId: z.number().int().positive("L'ID du club est requis"),
  birthDate: z.string().transform((str) => new Date(str)),
  gender: z.enum([Gender.MALE, Gender.FEMALE], {
    errorMap: () => ({ message: "Genre invalide" }),
  }),
});

export const competitorUpdateSchema = competitorSchema.extend({
  id: z.number().int().positive("L'ID est requis"),
});

export type CompetitorInput = z.infer<typeof competitorSchema>;
export type CompetitorUpdateInput = z.infer<typeof competitorUpdateSchema>; 