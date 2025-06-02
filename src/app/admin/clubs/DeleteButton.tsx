"use client";
export default function DeleteButton({ id }: { id: number }) {
  const handleDelete = async () => {
    if (!confirm("Supprimer ce club ?")) return;
    const apiUrl = process.env.NEXT_PUBLIC_BASE_URL;
    await fetch(`${apiUrl}/api/admin/clubs?id=${id}`, { method: "DELETE" });
    window.location.reload();
  };
  return <button className="btn btn-error btn-xs" onClick={handleDelete}>Supprimer</button>;
} 