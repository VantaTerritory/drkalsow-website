import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { Reveal } from "@/components/motion/reveal";
import { Eyebrow } from "@/components/ui/eyebrow";
import { CallLink } from "@/components/ui/call-link";

/** Editorial appointment bento using the practical details from the live About page. */
export function MeetDoctor() {
  const location = siteConfig.locations[0];

  return (
    <section className="meet-doctor section-py-lg" aria-labelledby="meet-doctor-title">
      <div className="container">
        <Reveal className="meet-bento">
          <div className="meet-photo-shell">
            <div className="meet-photo">
              <Image
                src="/img/portrait/dr-kalsow-home.jpg"
                alt="Dr. Sergei Kalsow at his Manhattan practice"
                fill
                sizes="(max-width: 768px) 100vw, 38vw"
                loading="lazy"
              />
            </div>
          </div>

          <div className="meet-bento-main">
            <Eyebrow dark>Meet Dr. Kalsow</Eyebrow>
            <h2 className="h-sec" id="meet-doctor-title">
              A private conversation, <em>centered on you.</em>
            </h2>
            <p>
              Meet one-on-one with Dr. Kalsow to discuss your goals, understand your options and
              receive a surgical plan shaped around your anatomy.
            </p>

            <div className="meet-meta">
              <div>
                <span>Consultations</span>
                <strong>
                  {siteConfig.consultation.inPerson} · {siteConfig.consultation.virtual}
                </strong>
                <small>{siteConfig.consultation.note}</small>
              </div>
              <div>
                <span>Clinic hours</span>
                {location.schedule.map((slot) => (
                  <strong key={slot.day}>
                    {slot.day} · {slot.hours}
                  </strong>
                ))}
              </div>
            </div>
          </div>

          <div className="meet-action-card meet-call-card">
            <span className="meet-card-label">Speak with the office</span>
            <div>
              <p>{siteConfig.phone.display}</p>
              <CallLink className="btn-primary" aria-label={`Call ${siteConfig.phone.display}`}>
                Call now <span aria-hidden>→</span>
              </CallLink>
            </div>
          </div>

          <div className="meet-action-card meet-contact-card">
            <span className="meet-card-label">Prefer to write?</span>
            <div>
              <p>Tell us what you would like to discuss.</p>
              <Link className="btn-secondary" href="/call-our-office">
                Contact us <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
