import React from "react";
import AddEpreuveForm from "./AddEpreuveForm";
import EditButton from "./EditButton";
import DeleteButton from "./DeleteButton";
import type { Epreuve } from "./types";

async function getEpreuves() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const res = await fetch(`${baseUrl}/api/admin/epreuves`, { cache: "no-store" });
  if (!res.ok) throw new Error("Erreur lors du chargement des épreuves");
  return res.json();
}

export default async function AdminEpreuvesPage() {
  const epreuves: Epreuve[] = await getEpreuves();
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Gestion des épreuves</h1>
      <AddEpreuveForm />
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Bassin</th>
              <th>Catégorie</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {epreuves.map((e) => (
              <tr key={e.id}>
                <td>{e.name}</td>
                <td>{e.poolLength}m</td>
                <td>{e.category}</td>
                <td><EditButton epreuve={e} /> <DeleteButton id={e.id} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 