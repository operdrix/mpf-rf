import Link from "next/link";

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Espace gestionnaire</h1>
      <p className="mb-8">Bienvenue dans l&apos;espace réservé aux gestionnaires. Ici, vous pouvez gérer les compétiteurs, les épreuves et les performances (MPF/RF).</p>
      <div className="flex flex-col gap-4 max-w-xs mx-auto">
        <Link href="/admin/competiteurs" className="btn btn-outline btn-primary">Gestion des compétiteurs</Link>
        <Link href="/admin/epreuves" className="btn btn-outline btn-primary">Gestion des épreuves</Link>
        <Link href="/admin/performances" className="btn btn-outline btn-primary">Gestion des performances (MPF/RF)</Link>
      </div>
    </div>
  );
} 