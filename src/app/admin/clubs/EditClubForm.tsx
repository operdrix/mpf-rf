"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Club } from "./types";

export default function EditClubForm({ club, onClose }: { club: Club; onClose: () => void }) {
  const [form, setForm] = useState(club);
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
    const apiUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const res = await fetch(`${apiUrl}/api/admin/clubs`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setLoading(false);
    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "Erreur lors de la modification");
      return;
    }
    router.refresh();
    onClose();
  };

  return (
    <form className="flex flex-wrap gap-4 items-end" onSubmit={handleSubmit}>
      <input
        name="license"
        value={form.license}
        onChange={handleChange}
        className="input input-bordered"
        placeholder="Licence"
        required
      />
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        className="input input-bordered"
        placeholder="Nom du club"
        required
      />
      <input
        name="shortName"
        value={form.shortName || ""}
        onChange={handleChange}
        className="input input-bordered"
        placeholder="Nom court (optionnel)"
      />
      <input
        name="city"
        value={form.city || ""}
        onChange={handleChange}
        className="input input-bordered"
        placeholder="Ville (optionnel)"
      />
      <button className="btn btn-primary" type="submit" disabled={loading}>
        {loading ? "Enregistrement..." : "Enregistrer"}
      </button>
      <button className="btn btn-ghost" type="button" onClick={onClose}>
        Annuler
      </button>
      {error && <span className="text-error ml-4">{error}</span>}
    </form>
  );
} 