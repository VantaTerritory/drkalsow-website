import Link from "next/link";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/motion/reveal";
import { ALL_PROCEDURES } from "@/lib/seo/pages";

/**
 * "Before And After Gallery" block from the live home: one link per procedure
 * plus the gallery CTA. Text cards for now — real thumbnails come later with
 * the imagery review (some live assets are explicit and must be re-curated).
 */
export function GalleryLinks() {
  return (
    <section className="bg-aubergine section-py-lg" id="gallery">
      <div className="container">
        <div className="section-header" style={{ marginBottom: 0 }}>
          <Eyebrow ornament="star" dark>
            Over 5,000 Surgeries Performed
          </Eyebrow>
          <h2 className="h-sec">
            Before and after <em>gallery.</em>
          </h2>
        </div>

        <div className="ba-links-grid">
          {ALL_PROCEDURES.map((p, i) => (
            <Reveal key={p.path} delay={(i % 3) * 60}>
              <Link href={p.path} className="ba-link-card">
                {p.label} <span className="arrow" aria-hidden>→</span>
              </Link>
            </Reveal>
          ))}
        </div>

        <div className="ba-cta-wrapper">
          <Link href="/beforeafter" className="btn-light">
            View Full Gallery <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
