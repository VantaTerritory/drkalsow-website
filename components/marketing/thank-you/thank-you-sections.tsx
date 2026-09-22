import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { getPage } from "@/lib/seo/pages";
import { Eyebrow } from "@/components/ui/eyebrow";
import { CallLink } from "@/components/ui/call-link";
import { Reveal } from "@/components/motion/reveal";

/**
 * Sections of /thank-you. The copy repeats what the contact page already
 * states (every consultation is with Dr. Kalsow personally, fees applied
 * toward surgery, office address and clinic hours) so nothing new has to be
 * vetted, and it makes no promise about response times.
 */

const NEXT_STEPS = [
  {
    title: "The office receives your request",
    body: "Your details, including the consultation type you selected, go straight to Dr. Kalsow’s team.",
  },
  {
    title: "A coordinator reaches out",
    body: "The team contacts you by phone or email to confirm availability and answer your first questions.",
  },
  {
    title: "You meet Dr. Kalsow",
    body: "In person at the Madison Avenue office or over FaceTime. Every consultation is with Dr. Kalsow personally.",
  },
] as const;

/** Confirmation hero: H1 (text as registered in lib/seo/pages.ts), expectations, office facts and the next-steps card. */
export function ThankYouHero() {
  const loc = siteConfig.locations[0];

  return (
    <section className="thanks-hero">
      <div className="container thanks-hero-inner">
        <div className="thanks-hero-copy">
          <Eyebrow>Request received</Eyebrow>
          <h1 className="h-display">
            Thank you, <em>we have your request.</em>
          </h1>
          <p className="thanks-lead">
            Dr. Kalsow’s team will review it and reach out to confirm your consultation and
            appointment options. If you would like to speak with someone sooner, call the office
            directly.
          </p>

          <div className="thanks-actions">
            <CallLink className="btn-primary" aria-label={`Call ${siteConfig.phone.display}`}>
              Call {siteConfig.phone.display}
            </CallLink>
            <Link href="/" className="btn-secondary">
              Back to home <span aria-hidden>→</span>
            </Link>
          </div>

          <dl className="thanks-facts">
            <div>
              <dt>Office</dt>
              <dd>
                {loc.address}
                <br />
                {loc.cityState}
              </dd>
            </div>
            <div>
              <dt>Clinic hours</dt>
              <dd>
                {loc.schedule.map((slot) => (
                  <span key={slot.day}>
                    {slot.day} {slot.hours}
                  </span>
                ))}
              </dd>
            </div>
          </dl>
        </div>

        <Reveal className="thanks-next" delay={120}>
          <h2 className="thanks-next-title">What happens next</h2>
          <ol className="thanks-steps">
            {NEXT_STEPS.map((step, index) => (
              <li className="thanks-step" key={step.title}>
                <span className="thanks-step-num" aria-hidden>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="thanks-next-note">
            Consultation fees ({siteConfig.consultation.inPersonFee} in person,{" "}
            {siteConfig.consultation.virtualFee} virtual) are {siteConfig.consultation.note}.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

// Liposuction first, per the site-wide priority. Labels come from the registry
// so they match the nav; the blurbs are ours.
const EXPLORE = [
  {
    path: "/awake-lipo-360-nyc",
    body: "How the procedure works, who it suits and what recovery looks like.",
    cta: "Learn about Awake Lipo 360",
  },
  {
    path: "/beforeafter",
    body: "Real patient results, starting with liposuction and body contouring.",
    cta: "View the gallery",
  },
  {
    path: "/testimonials",
    body: "What patients say about their experience with Dr. Kalsow.",
    cta: "Read the reviews",
  },
] as const;

/** "While you wait": three cards that keep the new lead on the site. */
export function ThankYouExplore() {
  return (
    <section className="bg-white section-py-lg">
      <div className="container">
        <div className="section-header">
          <Eyebrow>While you wait</Eyebrow>
          <h2 className="h-sec">
            Keep <em>exploring.</em>
          </h2>
          <p className="locations-subtitle">
            Results, patient stories and the procedure Dr. Kalsow is known for.
          </p>
        </div>

        <Reveal className="thanks-links">
          {EXPLORE.map((item, index) => {
            const page = getPage(item.path);
            return (
              <Link className="thanks-link" href={page.path} key={page.path}>
                <span className="thanks-link-index" aria-hidden>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3>{page.label}</h3>
                <p>{item.body}</p>
                <span className="link-arrow">
                  {item.cta} <span aria-hidden>→</span>
                </span>
              </Link>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
