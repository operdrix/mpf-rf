"use client";
import React from "react";
import { useRouter } from "next/navigation";

type Props = React.ComponentProps<"a"> & {
  href: string;
  children: React.ReactNode;
};

export default function ClientLinkButton({ href, children, ...props }: Props) {
  const router = useRouter();
  const isExternal = href.startsWith("http");
  if (isExternal) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  }
  return (
    <button type="button" {...props} onClick={() => router.push(href)}>
      {children}
    </button>
  );
} 