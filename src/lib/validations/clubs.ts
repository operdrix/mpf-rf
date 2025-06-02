import { z } from "zod";

export const clubSchema = z.object({
  name: z.string().min(1, "Le nom est requis"),
  shortName: z.string().optional(),
  city: z.string().optional(),
});

export const clubUpdateSchema = clubSchema.extend({
  id: z.number().int().positive("L'ID est requis"),
});

export type ClubInput = z.infer<typeof clubSchema>;
export type ClubUpdateInput = z.infer<typeof clubUpdateSchema>;