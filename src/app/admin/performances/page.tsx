import React from "react";
import AddPerformanceForm from "./AddPerformanceForm";
import EditButton from "./EditButton";
import DeleteButton from "./DeleteButton";
import type { Performance } from "./types";
import type { Competiteur } from "../competiteurs/types";
import type { Epreuve } from "../epreuves/types";

async function getData() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const [performancesRes, competiteursRes, epreuvesRes] = await Promise.all([
    fetch(`${baseUrl}/api/admin/performances`, { cache: "no-store" }),
    fetch(`${baseUrl}/api/admin/competiteurs`, { cache: "no-store" }),
    fetch(`${baseUrl}/api/admin/epreuves`, { cache: "no-store" }),
  ]);
  if (!performancesRes.ok || !competiteursRes.ok || !epreuvesRes.ok) throw new Error("Erreur lors du chargement des données");
  const [performances, competiteurs, epreuves] = await Promise.all([
    performancesRes.json(),
    competiteursRes.json(),
    epreuvesRes.json(),
  ]);
  return { performances, competiteurs, epreuves };
}

export default async function AdminPerformancesPage() {
  const { performances, competiteurs, epreuves }: { performances: Performance[], competiteurs: Competiteur[], epreuves: Epreuve[] } = await getData();
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Gestion des performances (MPF / RF)</h1>
      <AddPerformanceForm competiteurs={competiteurs} epreuves={epreuves} />
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Compétiteur</th>
              <th>Épreuve</th>
              <th>Temps (s)</th>
              <th>Type</th>
              <th>Date</th>
              <th>Catégorie d&apos;âge</th>
              <th>Homologué</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {performances.map((p) => (
              <tr key={p.id}>
                <td>{p.competitor?.lastName} {p.competitor?.firstName} ({p.competitor?.license})</td>
                <td>{p.event?.name} ({p.event?.poolLength}m, {p.event?.category})</td>
                <td>{p.time}</td>
                <td>{p.type}</td>
                <td>{new Date(p.date).toLocaleDateString()}</td>
                <td>{p.ageCategory}</td>
                <td>{p.valid ? "Oui" : "Non"}</td>
                <td><EditButton performance={p} competiteurs={competiteurs} epreuves={epreuves} /> <DeleteButton id={p.id} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 