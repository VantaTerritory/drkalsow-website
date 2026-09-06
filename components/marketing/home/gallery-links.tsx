import Link from "next/link";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/motion/reveal";
import { BaCarousel } from "@/components/marketing/home/ba-carousel";

/**
 * "Before And After Gallery" block from the live home: one card per procedure
 * in a scroll-snap carousel, plus the gallery CTA. Card media are gradient
 * placeholders until the imagery review (some live assets are explicit and
 * must be re-curated with Nico before landing in public/).
 */
export function GalleryLinks() {
  return (
    <section className="bg-aubergine section-py-lg" id="gallery">
      <div className="container">
        <div className="section-header" style={{ marginBottom: 0 }}>
          <Eyebrow ornament="none" dark>
            Over 5,000 Surgeries Performed
          </Eyebrow>
          <h2 className="h-sec">
            Before and after <em>gallery.</em>
          </h2>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: 15,
              lineHeight: 1.7,
              color: "var(--color-primary-100)",
              opacity: 0.85,
              maxWidth: "52ch",
              margin: "14px auto 0",
            }}
          >
            Real patient results, photographed before and after surgery. Choose a procedure to
            explore its full gallery.
          </p>
          <div style={{ marginTop: "var(--space-4)" }}>
            <Link href="/beforeafter" className="btn-light">
              View Full Gallery <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </div>

      {/* full-bleed: the marquee runs edge to edge, outside the container */}
      <Reveal>
        <BaCarousel />
      </Reveal>
    </section>
  );
}
