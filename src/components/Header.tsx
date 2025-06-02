"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

type UserWithRole = { name?: string | null; email?: string | null; image?: string | null; role?: string };

export default function Header() {
  const { data: session } = useSession();
  return (
    <header className="navbar bg-base-100 shadow mb-8">
      <div className="flex-1">
        <Link href="/" className="btn btn-ghost normal-case text-xl">MPF & RF FFESSM</Link>
      </div>
      <div className="flex-none gap-2">
        <Link href="/records" className="btn btn-ghost">Records</Link>
        <Link href="/competiteurs" className="btn btn-ghost">Compétiteurs</Link>
        <Link href="/epreuves" className="btn btn-ghost">Épreuves</Link>
        {session?.user ? (
          <div className={`dropdown dropdown-end`}>
            <label tabIndex={0} role="button" className="btn btn-ghost rounded-field">
              {session.user.name || session.user.email}
            </label>
            <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
              {(session.user as UserWithRole).role === "admin" && (
                <li><Link href="/admin"><button onClick={() => document.activeElement?.blur()}>Espace Admin</button></Link></li>
              )}
              <li><button onClick={() => signOut({ callbackUrl: "/" })}>Déconnexion</button></li>
            </ul>
          </div>
        ) : (
          <Link href="/login" className="btn btn-primary">Connexion</Link>
        )}
      </div>
    </header>
  );
}