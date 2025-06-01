"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Competiteur } from "../../competiteurs/types";
import type { Epreuve } from "../../epreuves/types";

export default function AddPerformanceForm({ competiteurs, epreuves }: { competiteurs: Competiteur[], epreuves: Epreuve[] }) {
  const [form, setForm] = useState({
    time: "",
    type: "MPF",
    date: "",
    valid: true,
    competitorId: competiteurs[0]?.id || "",
    eventId: epreuves[0]?.id || "",
    ageCategory: "",
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
    const res = await fetch("/api/admin/performances", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setLoading(false);
    if (!res.ok) {
      setError("Erreur lors de l'ajout de la performance");
      return;
    }
    router.refresh();
    setForm({ ...form, time: "", date: "", ageCategory: "" });
  };

  return (
    <form className="mb-6 flex flex-wrap gap-4 items-end" onSubmit={handleSubmit}>
      <select name="competitorId" value={form.competitorId} onChange={handleChange} className="select select-bordered" required>
        {competiteurs.map(c => (
          <option key={c.id} value={c.id}>{c.lastName} {c.firstName} ({c.license})</option>
        ))}
      </select>
      <select name="eventId" value={form.eventId} onChange={handleChange} className="select select-bordered" required>
        {epreuves.map(e => (
          <option key={e.id} value={e.id}>{e.name} ({e.poolLength}m, {e.category})</option>
        ))}
      </select>
      <input name="time" value={form.time} onChange={handleChange} className="input input-bordered" placeholder="Temps (s)" type="number" step="0.01" required />
      <select name="type" value={form.type} onChange={handleChange} className="select select-bordered" required>
        <option value="MPF">MPF</option>
        <option value="RF">RF</option>
      </select>
      <input name="date" value={form.date} onChange={handleChange} className="input input-bordered" type="date" required />
      <input name="ageCategory" value={form.ageCategory} onChange={handleChange} className="input input-bordered" placeholder="Catégorie d'âge" required />
      <label className="label cursor-pointer">
        <span className="label-text">Homologué</span>
        <input name="valid" type="checkbox" className="checkbox ml-2" checked={form.valid} onChange={e => setForm(f => ({ ...f, valid: e.target.checked }))} />
      </label>
      <button className="btn btn-primary" type="submit" disabled={loading}>{loading ? "Ajout..." : "Ajouter"}</button>
      {error && <span className="text-error ml-4">{error}</span>}
    </form>
  );
} 