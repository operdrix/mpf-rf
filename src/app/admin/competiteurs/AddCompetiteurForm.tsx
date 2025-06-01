"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddCompetiteurForm() {
  const [form, setForm] = useState({
    license: "",
    lastName: "",
    firstName: "",
    club: "",
    birthDate: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    setForm({ license: "", lastName: "", firstName: "", club: "", birthDate: "" });
  };

  return (
    <form className="mb-6 flex flex-wrap gap-4 items-end" onSubmit={handleSubmit}>
      <input name="license" value={form.license} onChange={handleChange} className="input input-bordered" placeholder="Licence" required />
      <input name="lastName" value={form.lastName} onChange={handleChange} className="input input-bordered" placeholder="Nom" required />
      <input name="firstName" value={form.firstName} onChange={handleChange} className="input input-bordered" placeholder="Prénom" required />
      <input name="club" value={form.club} onChange={handleChange} className="input input-bordered" placeholder="Club" required />
      <input name="birthDate" value={form.birthDate} onChange={handleChange} className="input input-bordered" type="date" required />
      <button className="btn btn-primary" type="submit" disabled={loading}>{loading ? "Ajout..." : "Ajouter"}</button>
      {error && <span className="text-error ml-4">{error}</span>}
    </form>
  );
} 