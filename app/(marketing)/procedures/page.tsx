import type { Metadata } from "next";
import Link from "next/link";
import { ALL_PROCEDURES, PROCEDURE_CATEGORIES, pageMetadata, proceduresByCategory } from "@/lib/seo/pages";
import { buildProceduresHubJsonLd, JsonLd } from "@/lib/seo/schema";
import { Eyebrow } from "@/components/ui/eyebrow";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = pageMetadata("/procedures");

/**
 * Procedures hub — launch-critical per the SEO migration map: the live
 * /procedures was a 302 to Breast Augmentation despite ranking (pos. 2.28);
 * it must ship as a real 200 hub organized by Face / Breast / Body / Hair.
 */
export default function ProceduresPage() {
  return (
    <section className="bg-cream section-py-lg">
      <JsonLd nodes={buildProceduresHubJsonLd(ALL_PROCEDURES)} />
      <div className="container">
        <div className="section-header">
          <Eyebrow ornament="compass">Face · Breast · Body · Hair</Eyebrow>
          <h1 className="h-display">
            Plastic Surgery Procedures in <em>NYC</em>
          </h1>
          <p className="locations-subtitle">
            Explore the procedures offered by {siteConfig.surgeon} at his Madison Avenue practice.
            Every plan starts with a private, one-on-one consultation.
          </p>
        </div>

        <div className="proc-menu-grid">
          {PROCEDURE_CATEGORIES.map((cat) => (
            <div key={cat.key}>
              <h2 className="proc-menu-col-title">{cat.label}</h2>
              <ul className="proc-menu-list">
                {proceduresByCategory(cat.key).map((p) => (
                  <li key={p.path}>
                    <Link href={p.path} className="proc-menu-link">
                      {p.label} <span className="arrow">→</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="procedures-more">
          <p className="procedures-more-text">
            Not sure which procedure fits your goals? Book a consultation and build a personalized
            plan with Dr. Kalsow.
          </p>
          <Link href="/call-our-office" className="btn-primary">
            {siteConfig.cta.primary} <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
