"use client";
import { Club } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AddClubForm() {
  const [form, setForm] = useState<Partial<Club>>({
    name: "",
    shortName: "",
    city: "",
    license: "",
  });
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
    try {
      console.log(form);
      const apiUrl = process.env.NEXT_PUBLIC_BASE_URL;
      const res = await fetch(`${apiUrl}/api/admin/clubs`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setLoading(false);
      if (!res.ok) {
        const data = await res.json();
        setError("Erreur lors de l'ajout");
        console.error(data.error);
        return;
      }
      setForm({ license: "", name: "", shortName: "", city: "" });
      router.refresh();
    } catch (error) {
      setError(error instanceof Error ? error.message : "Erreur lors de l'ajout");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="mb-6 flex flex-wrap gap-4 items-end" onSubmit={handleSubmit}>
      <fieldset className="fieldset">
        <legend className="fieldset-legend">Numéro de licence</legend>
        <input
          name="license"
          value={form.license}
          onChange={handleChange}
          className="input input-bordered"
          placeholder="Licence"
          required
        />
      </fieldset>
      <fieldset className="fieldset">
        <legend className="fieldset-legend">Nom du club</legend>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          className="input input-bordered"
          placeholder="Nom du club"
          required
        />
      </fieldset>
      <fieldset className="fieldset">
        <legend className="fieldset-legend">Nom court</legend>
        <input
          name="shortName"
          value={form.shortName}
          onChange={handleChange}
          className="input input-bordered"
          placeholder="Nom court"
          required
        />
      </fieldset>
      <fieldset className="fieldset">
        <legend className="fieldset-legend">Ville</legend>
        <input
          name="city"
          value={form.city}
          onChange={handleChange}
          className="input input-bordered"
          placeholder="Ville"
          required
        />
      </fieldset>
      <button className="btn btn-primary" type="submit" disabled={loading}>
        {loading ? "Ajout..." : "Ajouter"}
      </button>
      {error && <span className="text-error ml-4">{error}</span>}
    </form>
  );
} 