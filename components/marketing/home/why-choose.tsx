import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { Eyebrow } from "@/components/ui/eyebrow";
import { StatBento } from "@/components/ui/stat-bento";

/* ============================================================
   "Why patients choose Dr. Kalsow for Awake Lipo 360" (home).
   Requested by the doctor on 11 Sep 2026; the five reasons are his:
   experience, results, revision expertise, philosophy, destination
   practice. Copy is condensed from his own Awake Lipo 360 page and kept
   inside the SEO team's claims register (no procedure counts, no
   "surgeons observe", no "no drains", no comparative safety claims).
   He owes final copy; swap the strings when it lands.

   Text-first layout: five fully visible reasons with a short heading and
   a comfortable reading measure. No media or disclosure interaction.
   Between the intro and the reasons, three figures as a bento (Nico,
   22 Sep 2026: colour and point data to break the text). All three are
   already published: the approved surgery count, the anesthesia approach
   and the virtual consult for destination patients.
   ============================================================ */
const FIGURES = [
  { value: "5,000+", label: "Surgeries performed", detail: "Broad operative experience across cosmetic procedures." },
  { value: "Awake", label: "Local, tumescent anesthesia", detail: "With an individualized comfort plan when appropriate." },
  { value: "Virtual", label: "Consultation before travel", detail: "For patients coming to New York from across the U.S. and abroad." },
] as const;

const REASONS = [
  {
    reason: "Experience",
    body:
      "High-volume experience with circumferential contouring lets subtle differences in torso shape, fat distribution, skin quality and prior surgery be recognized before treatment begins.",
  },
  {
    reason: "Results",
    body:
      "The objective is a defined, natural-looking waist and a smoother contour from the front, side and back. Not a maximum-volume number, and not one shape imposed on every patient.",
  },
  {
    reason: "Revision expertise",
    body:
      "Patients also come to Dr. Kalsow after liposuction elsewhere. Revision work follows a different strategy: preserving what is good, correcting imbalance and working around scarred tissue.",
  },
  {
    reason: "Philosophy",
    body:
      "Treatment is planned around the individual frame rather than a standardized pattern: finding the underlying structure, reducing what obscures it and sculpting the transitions between areas.",
  },
  {
    reason: "Destination practice",
    body:
      "Patients travel to New York from across the U.S. and internationally. Virtual consultations and a team that coordinates travel, surgery and follow-up make the trip straightforward.",
  },
] as const;

export function WhyChoose() {
  return (
    <section className="why-section bg-white" id="why-dr-kalsow" aria-labelledby="why-heading">
      <div className="container-tight">
        <header className="why-heading">
          <Eyebrow>Why Dr. Kalsow</Eyebrow>
          <h2 className="h-sec" id="why-heading">
            Why patients choose Dr. Kalsow for <em>Awake Lipo 360.</em>
          </h2>
          <p className="why-intro">
            A body contouring practice in New York City built around one idea: the abdomen,
            waist, flanks and back planned as a single shape.
          </p>
        </header>

        <StatBento stats={FIGURES} className="why-figures" />

        <div className="why-reasons">
          {REASONS.map((r) => (
            <article className="why-reason" key={r.reason}>
              <h3>{r.reason}</h3>
              <p>{r.body}</p>
            </article>
          ))}
        </div>

        <footer className="why-footer">
          <p className="why-founder">
            Founder of{" "}
            <a href={siteConfig.dreams.url} className="text-link" target="_blank" rel="noopener noreferrer">
              {siteConfig.dreams.name}
            </a>
            , a New York City practice where he is one of the surgeons. This is his personal
            practice site.
          </p>
          <Link href="/call-our-office" className="text-link why-consult">
            {siteConfig.cta.primary} <span aria-hidden>→</span>
          </Link>
          <p className="why-note">
            Individual results vary. A consultation determines candidacy and the right plan.
          </p>
        </footer>
      </div>
    </section>
  );
}
