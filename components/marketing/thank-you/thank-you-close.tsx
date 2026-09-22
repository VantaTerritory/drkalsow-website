"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { SITE_PAGES } from "@/lib/seo/pages";

/**
 * The X in the corner. It returns to the page the form was on (?source=,
 * checked against the registry so the URL can never point anyone off-site)
 * and falls back to the home page. Reads the query on the client, so the
 * page itself stays static; the server renders the fallback <CloseLink>.
 */
export function ThankYouClose() {
  const source = useSearchParams().get("source");
  const target = SITE_PAGES.find((p) => p.path === source && p.group !== "utility");
  return <CloseLink href={target?.path ?? "/"} label={target ? `Back to ${target.label}` : "Back to home"} />;
}

export function CloseLink({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} className="thanks-close" aria-label={label} title={label}>
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
        <path d="M4 4 L14 14 M14 4 L4 14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    </Link>
  );
}
