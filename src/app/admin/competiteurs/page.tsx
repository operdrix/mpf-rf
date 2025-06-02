import AddCompetiteurForm from "./AddCompetiteurForm";
import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";
import type { Competiteur } from "./types";

async function getCompetiteurs() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const res = await fetch(`${baseUrl}/api/admin/competiteurs`, { cache: "no-store" });
  console.log(res);
  if (!res.ok) throw new Error("Erreur lors du chargement des compétiteurs");
  return res.json();
}

export default async function AdminCompetiteursPage() {
  const competiteurs: Competiteur[] = await getCompetiteurs();
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Gestion des compétiteurs</h1>
      <AddCompetiteurForm />
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Licence</th>
              <th>Nom</th>
              <th>Prénom</th>
              <th>Club</th>
              <th>Date de naissance</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {competiteurs.map((c) => (
              <tr key={c.id}>
                <td>{c.license}</td>
                <td>{c.lastName}</td>
                <td>{c.firstName}</td>
                <td>{c.club.name}</td>
                <td>{new Date(c.birthDate).toLocaleDateString()}</td>
                <td><EditButton competiteur={c} /> <DeleteButton id={c.id} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 