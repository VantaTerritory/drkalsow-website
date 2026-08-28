import { Eyebrow, Divider } from "@/components/ui/eyebrow";
import type { SitePage } from "@/lib/seo/pages";
import { buildPageJsonLd, JsonLd } from "@/lib/seo/schema";

/**
 * Blank-page scaffold marker. Every route renders this until its real content
 * is built page by page. Metadata + H1 + JSON-LD are already final (from the
 * SEO team's migration map); only the body content is a stub.
 */
export function PagePlaceholder({ page }: { page: SitePage }) {
  return (
    <section className="placeholder-section bg-cream">
      <JsonLd nodes={buildPageJsonLd(page)} />
      <Eyebrow>Dr. Sergei Kalsow, MD</Eyebrow>
      <h1 className="h-display">{page.h1}</h1>
      <Divider center />
      <p className="placeholder-note">Page scaffolded — content coming soon.</p>
    </section>
  );
}
