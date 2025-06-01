"use client";
export default function DeleteButton({ id }: { id: number }) {
  const handleDelete = async () => {
    if (!confirm("Supprimer ce compétiteur ?")) return;
    await fetch(`/api/admin/competiteurs?id=${id}`, { method: "DELETE" });
    window.location.reload();
  };
  return <button className="btn btn-error btn-xs" onClick={handleDelete}>Supprimer</button>;
} 