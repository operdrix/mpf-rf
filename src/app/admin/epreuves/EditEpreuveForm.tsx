"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Epreuve } from "./types";

export default function EditEpreuveForm({ epreuve, onClose }: { epreuve: Epreuve, onClose: () => void }) {
  const [form, setForm] = useState({ ...epreuve, poolLength: String(epreuve.poolLength) });
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
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, id: epreuve.id }),
    });
    setLoading(false);
    if (!res.ok) {
      setError("Erreur lors de la modification");
      return;
    }
    router.refresh();
    onClose();
  };

  return (
    <form className="flex flex-wrap gap-4 items-end" onSubmit={handleSubmit}>
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
      <button className="btn btn-primary" type="submit" disabled={loading}>{loading ? "Enregistrement..." : "Enregistrer"}</button>
      <button className="btn btn-ghost" type="button" onClick={onClose}>Annuler</button>
      {error && <span className="text-error ml-4">{error}</span>}
    </form>
  );
} 