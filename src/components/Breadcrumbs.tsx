"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Breadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  const crumbs = segments.map((seg, idx) => {
    const href = "/" + segments.slice(0, idx + 1).join("/");
    const label = seg.charAt(0).toUpperCase() + seg.slice(1);
    const isLast = idx === segments.length - 1;
    return (
      <li key={href}>
        {isLast ? (
          <span>{label}</span>
        ) : (
          <Link href={href}>{label}</Link>
        )}
      </li>
    );
  });

  return (
    <>
      {pathname !== "/" && (
        <div className="breadcrumbs text-sm mb-4">
          <ul>
            <li><Link href="/">Accueil</Link></li>
            {crumbs}
          </ul>
        </div>
      )}
    </>
  );
} 