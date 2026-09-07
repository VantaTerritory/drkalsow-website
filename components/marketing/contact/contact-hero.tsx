import Image from "next/image";
import { siteConfig } from "@/lib/site-config";
import { Eyebrow } from "@/components/ui/eyebrow";
import { CallLink } from "@/components/ui/call-link";
import type { SitePage } from "@/lib/seo/pages";

/**
 * Contact hero: H1 from the SEO registry, the phone as the primary action
 * (the live page leads with "Call Us"), and the note Dr. Kalsow signs on the
 * live page about which consultation format suits which patient.
 */
export function ContactHero({ page }: { page: SitePage }) {
  const loc = siteConfig.locations[0];

  return (
    <section className="contact-hero">
      <div className="container contact-hero-inner">
        <div className="contact-hero-copy">
          <Eyebrow>Contact</Eyebrow>
          <h1 className="h-display">{page.h1}</h1>
          <p className="contact-hero-lead">
            Every consultation is with Dr. Kalsow personally. Call the office, or send the form
            below and the team will come back to you with appointment options.
          </p>

          <div className="contact-hero-actions">
            <CallLink className="btn-primary" aria-label={`Call ${siteConfig.phone.display}`}>
              Call {siteConfig.phone.display}
            </CallLink>
            <a href="#request" className="btn-secondary">
              Send a request <span aria-hidden>↓</span>
            </a>
          </div>

          <dl className="contact-hero-facts">
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

        <div className="contact-hero-aside">
          <div className="contact-hero-photo">
            <Image
              src="/img/office/office-lounge.jpg"
              alt="Patient lounge at the Madison Avenue practice"
              fill
              sizes="(max-width: 900px) 100vw, 42vw"
              priority
            />
          </div>

          <blockquote className="contact-note">
            <p>
              If you live in New York, an in-person consult with me is the best option. If you
              live far away you can either send me photos to get a quote, or set up a FaceTime
              appointment with me personally. Hope to see you soon!
            </p>
            <footer>Dr. Kalsow</footer>
          </blockquote>
        </div>
      </div>
    </section>
  );
}
