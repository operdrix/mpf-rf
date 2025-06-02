import { EventCategory } from "@prisma/client";
import { z } from "zod";

export const eventSchema = z.object({
  name: z.string().min(1, "Le nom est requis"),
  poolLength: z.number().refine((val) => val === 25 || val === 50, {
    message: "La longueur du bassin doit être de 25 ou 50 mètres",
  }),
  category: z.enum([EventCategory.MALE, EventCategory.FEMALE, EventCategory.MIXED], {
    errorMap: () => ({ message: "Catégorie invalide" }),
  }),
});

export const eventUpdateSchema = eventSchema.extend({
  id: z.number().int().positive("L'ID est requis"),
});

export type EventInput = z.infer<typeof eventSchema>;
export type EventUpdateInput = z.infer<typeof eventUpdateSchema>; 