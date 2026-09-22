"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { SITE_PAGES } from "@/lib/seo/pages";

/**
 * Primary action of the card: back to the page the form was on (?source=,
 * checked against the registry so the URL can never point anyone off-site),
 * falling back to the home page. Reads the query on the client so the page
 * itself stays static; the server renders the home fallback <BackLink>.
 */
export function ThankYouBack() {
  const source = useSearchParams().get("source");
  const target = SITE_PAGES.find((p) => p.path === source && p.group !== "utility");
  const label = target && target.path !== "/" ? `Back to ${target.label}` : "Back to home";
  return <BackLink href={target?.path ?? "/"} label={label} />;
}

export function BackLink({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} className="btn-primary thanks-back">
      {label} <span aria-hidden>→</span>
    </Link>
  );
}
