"use client";
import "cally";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Competiteur } from "./types";

export default function EditCompetiteurForm({ competiteur, onClose }: { competiteur: Competiteur, onClose: () => void }) {
  const [form, setForm] = useState({ ...competiteur });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/admin/competiteurs", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
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
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <div className="flex flex-row gap-4">
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Licence</legend>
          <input name="license" value={form.license} onChange={handleChange} className="input input-bordered" placeholder="Licence" required />
        </fieldset>
      </div>
      <div className="flex flex-row gap-4">
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Nom</legend>
          <input name="lastName" value={form.lastName} onChange={handleChange} className="input input-bordered" placeholder="Nom" required />
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Prénom</legend>
          <input name="firstName" value={form.firstName} onChange={handleChange} className="input input-bordered" placeholder="Prénom" required />
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Date de naissance</legend>
          <input name="birthDate" value={form.birthDate.slice(0, 10)} onChange={handleChange} className="input input-bordered" type="date" required />
        </fieldset>
      </div>
      <div className="flex flex-row gap-4">
        <fieldset>
          <legend className="fieldset-legend">Club</legend>
          <input name="club" value={form.club} onChange={handleChange} className="input input-bordered" placeholder="Club" required />
        </fieldset>
      </div>
      <div className="flex flex-row gap-4">
        <button className="btn btn-primary" type="submit" disabled={loading}>{loading ? "Enregistrement..." : "Enregistrer"}</button>
        <button className="btn btn-ghost" type="button" onClick={onClose}>Annuler</button>
        {error && <span className="text-error ml-4">{error}</span>}
      </div>
    </form>
  );
} 