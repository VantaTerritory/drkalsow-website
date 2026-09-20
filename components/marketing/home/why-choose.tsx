import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/motion/reveal";

/* ============================================================
   "Why patients choose Dr. Kalsow for Awake Lipo 360" (home).
   Requested by the doctor on 11 Sep 2026; the five reasons are his:
   experience, results, revision expertise, philosophy, destination
   practice. Copy is condensed from his own Awake Lipo 360 page and kept
   inside the SEO team's claims register (no procedure counts, no
   "surgeons observe", no "no drains", no comparative safety claims).
   He owes final copy; swap the strings when it lands.
   ============================================================ */
const REASONS = [
  {
    kicker: "Experience",
    title: "Pattern recognition",
    body:
      "High-volume experience with circumferential contouring lets subtle differences in torso shape, fat distribution, skin quality and prior surgery be recognized before treatment begins.",
  },
  {
    kicker: "Results",
    title: "A consistent aesthetic",
    body:
      "The objective is a defined, natural-looking waist and a smoother contour from the front, side and back. Not a maximum-volume number, and not one shape imposed on every patient.",
  },
  {
    kicker: "Revision expertise",
    title: "Revision judgment",
    body:
      "Patients also come to Dr. Kalsow after liposuction elsewhere. Revision work follows a different strategy: preserving what is good, correcting imbalance and working around scarred tissue.",
  },
  {
    kicker: "Philosophy",
    title: "Your anatomy determines the plan",
    body:
      "Treatment is planned around the individual frame rather than a standardized pattern: finding the underlying structure, reducing what obscures it and sculpting the transitions between areas.",
  },
  {
    kicker: "Destination practice",
    title: "Patients travel to New York",
    body:
      "Patients travel to New York from across the U.S. and internationally. Virtual consultations and a team that coordinates travel, surgery and follow-up make the trip straightforward.",
  },
] as const;

export function WhyChoose() {
  return (
    <section className="bg-cream section-py-lg" id="why-dr-kalsow">
      <div className="container">
        <div className="section-header">
          <Eyebrow>Why Dr. Kalsow</Eyebrow>
          <h2 className="h-sec">
            Why patients choose Dr. Kalsow for <em>Awake Lipo 360.</em>
          </h2>
          <p className="locations-subtitle">
            A body contouring practice in New York City built around one idea: the abdomen,
            waist, flanks and back planned as a single shape.
          </p>
        </div>

        <Reveal className="why-grid">
          {REASONS.map((r, i) => (
            <article className="value-card why-card" key={r.title}>
              <span className="why-index" aria-hidden>
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="value-card-body">
                <p className="why-kicker">{r.kicker}</p>
                <h3>{r.title}</h3>
                <p>{r.body}</p>
              </div>
            </article>
          ))}
        </Reveal>

        <Reveal className="why-footer" delay={120}>
          <p className="why-founder">
            Dr. Kalsow is the founder of{" "}
            <a
              href={siteConfig.dreams.url}
              className="text-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              {siteConfig.dreams.name}
            </a>
            , a New York City practice where he is one of the surgeons. This is his personal
            practice site. Individual results vary; a consultation determines candidacy and the
            right plan.
          </p>
          <div className="hero-cta-group why-cta">
            <Link href="/call-our-office" className="btn-primary">
              {siteConfig.cta.primary} <span aria-hidden>→</span>
            </Link>
            <Link href="/beforeafter" className="btn-secondary">
              View Before &amp; After
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
