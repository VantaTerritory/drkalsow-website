import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { PROCEDURE_CATEGORIES, type SitePage } from "@/lib/seo/pages";
import type { ProcedureContent } from "@/lib/procedures/content";
import { Eyebrow, Divider } from "@/components/ui/eyebrow";
import { CallLink } from "@/components/ui/call-link";
import { ProcedureVideoCard } from "@/components/marketing/procedure/procedure-video";

/**
 * Procedure hero: category eyebrow, H1 from the SEO migration map, the lead
 * from the procedure copy, and the surgery video where the practice has one.
 * Pages without their own video fall back to the surgeon portrait.
 */
export function ProcedureHero({ page, content }: { page: SitePage; content: ProcedureContent }) {
  const category = PROCEDURE_CATEGORIES.find((c) => c.key === page.category);

  return (
    <section className="proc-hero-section">
      <div className="container">
        <div className="proc-hero">
          <div className="proc-hero-copy">
            <Eyebrow>{category ? category.label : "Procedures"}</Eyebrow>
            <h1 className="h-display" style={{ marginBottom: "var(--space-3)" }}>
              {page.h1}
            </h1>

            <Divider />

            {content.intro.lead && (
              <p className="proc-hero-lead" style={{ marginTop: "var(--space-3)" }}>
                {content.intro.lead}
              </p>
            )}

            <div className="hero-cta-group" style={{ marginTop: "var(--space-4)" }}>
              <Link href="/call-our-office" className="btn-primary">
                {siteConfig.cta.primary} <span aria-hidden>→</span>
              </Link>
              <CallLink className="btn-secondary" aria-label={`Call ${siteConfig.phone.display}`}>
                {siteConfig.cta.call}
              </CallLink>
            </div>
          </div>

          {content.video ? (
            <ProcedureVideoCard video={content.video} />
          ) : (
            <div className="proc-hero-portrait">
              <Image
                src="/img/portrait/dr-kalsow-suit.webp"
                alt={`${siteConfig.surgeon}, ${siteConfig.credentials}`}
                fill
                sizes="(max-width: 900px) 100vw, 42vw"
                priority
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
