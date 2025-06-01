"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddEpreuveForm() {
  const [form, setForm] = useState({
    name: "",
    poolLength: "25",
    category: "Hommes",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/admin/epreuves", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setLoading(false);
    if (!res.ok) {
      setError("Erreur lors de l'ajout de l'épreuve");
      return;
    }
    router.refresh();
    setForm({ name: "", poolLength: "25", category: "Hommes" });
  };

  return (
    <form className="mb-6 flex flex-wrap gap-4 items-end" onSubmit={handleSubmit}>
      <input name="name" value={form.name} onChange={handleChange} className="input input-bordered" placeholder="Nom de l'épreuve" required />
      <select name="poolLength" value={form.poolLength} onChange={handleChange} className="select select-bordered" required>
        <option value="25">25m</option>
        <option value="50">50m</option>
      </select>
      <select name="category" value={form.category} onChange={handleChange} className="select select-bordered" required>
        <option value="Hommes">Hommes</option>
        <option value="Femmes">Femmes</option>
        <option value="Mixte">Mixte</option>
      </select>
      <button className="btn btn-primary" type="submit" disabled={loading}>{loading ? "Ajout..." : "Ajouter"}</button>
      {error && <span className="text-error ml-4">{error}</span>}
    </form>
  );
} 