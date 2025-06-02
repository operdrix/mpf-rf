"use client";
import { CompetitorInput } from "@/lib/validations/competitor";
import { Club } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


export default function AddCompetiteurForm() {
  const [clubs, setClubs] = useState<Club[]>([]);
  const [form, setForm] = useState<CompetitorInput>({
    license: "",
    lastName: "",
    firstName: "",
    clubId: 0,
    birthDate: new Date(),
    gender: "MALE"
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  useEffect(() => {
    const fetchClubs = async () => {
      const res = await fetch(`${baseUrl}/api/admin/clubs`);
      const data = await res.json();
      setClubs(data);
    };
    fetchClubs();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch(`${baseUrl}/api/admin/competiteurs`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setLoading(false);
    if (!res.ok) {
      setError("Erreur lors de l'ajout du compétiteur");
      return;
    }
    router.refresh();
    setForm({ license: "", lastName: "", firstName: "", clubId: 0, birthDate: new Date(), gender: "MALE" });
  };

  return (
    <form className="mb-6 flex flex-wrap gap-4 items-end" onSubmit={handleSubmit}>
      <input name="license" value={form.license} onChange={handleChange} className="input input-bordered" placeholder="Licence" required />
      <input name="lastName" value={form.lastName} onChange={handleChange} className="input input-bordered" placeholder="Nom" required />
      <input name="firstName" value={form.firstName} onChange={handleChange} className="input input-bordered" placeholder="Prénom" required />
      <select name="clubId" value={form.clubId} onChange={handleChange} className="select select-bordered" required>
        {clubs.map((club) => (
          <option key={club.id} value={club.id}>{club.name}</option>
        ))}
      </select>
      <input name="birthDate" value={form.birthDate.toISOString().split("T")[0]} onChange={handleChange} className="input input-bordered" type="date" required />
      <select name="gender" value={form.gender} onChange={handleChange} className="select select-bordered" required>
        <option value="MALE">Masculin</option>
        <option value="FEMALE">Féminin</option>
      </select>
      <input name="birthDate" value={form.birthDate.toISOString().split("T")[0]} onChange={handleChange} className="input input-bordered" type="date" required />
      <button className="btn btn-primary" type="submit" disabled={loading}>{loading ? "Ajout..." : "Ajouter"}</button>
      {error && <span className="text-error ml-4">{error}</span>}
    </form>
  );
} 