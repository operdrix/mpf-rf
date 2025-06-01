import type { Competiteur } from "../../competiteurs/types";
import type { Epreuve } from "../../epreuves/types";

export type Performance = {
  id: number;
  time: number;
  type: string;
  date: string;
  valid: boolean;
  competitorId: number;
  eventId: number;
  ageCategory: string;
  competitor?: Competiteur;
  event?: Epreuve;
}; 