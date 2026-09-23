import { siteConfig } from "@/lib/site-config";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/motion/reveal";

/**
 * "How to begin your journey": the three routes the live page offers, with
 * the same prices and the same split (two go through the form below, the
 * photo review goes to the practice's existing Google Form). Laid out as
 * the site's figures bento: the fee is the number patients decide on, so
 * it leads each tile, and the in-person consult (the one the doctor
 * recommends for New York) takes the dark lead tile across the top.
 */
const OPTIONS = [
  {
    key: "in-person",
    fee: siteConfig.consultation.inPersonFee,
    title: "In-person consult",
    body: "Meet Dr. Kalsow at the Madison Avenue office, examine your anatomy in person and leave with a surgical plan. The best option if you are in or near New York.",
    action: { label: "Request this consult", href: "#request", external: false },
  },
  {
    key: "e-consult",
    fee: "Photos",
    title: "E-consult",
    body: "Living far away? Submit photos through the practice's e-consult form and Dr. Kalsow will review them and come back with a quote before you travel.",
    action: { label: "Open the e-consult form", href: siteConfig.consultation.eConsultUrl, external: true },
  },
  {
    key: "facetime",
    fee: siteConfig.consultation.virtualFee,
    title: "FaceTime consult",
    body: "A live video appointment with Dr. Kalsow personally, for patients who want to talk through the plan before booking travel to New York.",
    action: { label: "Request this consult", href: "#request", external: false },
  },
] as const;

export function ConsultationOptions() {
  return (
    <section className="bg-white section-py-lg">
      <div className="container">
        <div className="section-header">
          <Eyebrow>How to begin</Eyebrow>
          <h2 className="h-sec">
            Three ways to <em>start.</em>
          </h2>
          <p className="locations-subtitle">
            Consultation fees are applied toward your surgery.
          </p>
        </div>

        <Reveal as="ul" className="stat-bento consult-bento">
          {OPTIONS.map((option, index) => {
            const lead = index === 0;
            const linkClass = lead ? "ld-link-on-dark" : "link-arrow";
            return (
              <li className={lead ? "stat-tile stat-tile--lead" : "stat-tile"} key={option.key}>
                <strong className="stat-tile-value">{option.fee}</strong>
                <div className="stat-tile-copy">
                  <h3>{option.title}</h3>
                  <span className="stat-tile-detail">{option.body}</span>
                  {option.action.external ? (
                    <a className={linkClass} href={option.action.href} target="_blank" rel="noopener noreferrer">
                      {option.action.label} <span aria-hidden>↗</span>
                    </a>
                  ) : (
                    <a className={linkClass} href={option.action.href}>
                      {option.action.label} <span aria-hidden>↓</span>
                    </a>
                  )}
                </div>
              </li>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
