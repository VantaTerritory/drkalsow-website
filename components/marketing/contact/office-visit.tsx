import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { Eyebrow } from "@/components/ui/eyebrow";
import { CallLink } from "@/components/ui/call-link";
import { Reveal } from "@/components/motion/reveal";

/** Where to come: map, address, clinic hours and the direct line. */
export function OfficeVisit() {
  const loc = siteConfig.locations[0];

  return (
    <section className="bg-white section-py-lg" id="visit">
      <div className="container">
        <div className="section-header">
          <Eyebrow>Visit us</Eyebrow>
          <h2 className="h-sec">
            635 Madison Avenue, <em>Midtown.</em>
          </h2>
        </div>

        <Reveal className="visit-grid">
          <div className="visit-map">
            <iframe
              className="location-map"
              src={`https://www.google.com/maps?q=${encodeURIComponent(`${loc.address}, ${loc.cityState}`)}&output=embed`}
              title={`Map to the ${loc.name} office`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <div className="visit-info">
            <p className="location-detail-value">
              <span className="location-detail-label">ADDRESS</span>
              <br />
              {loc.address}
              <br />
              {loc.cityState}
            </p>

            <p className="location-detail-value">
              <span className="location-detail-label">CLINIC HOURS</span>
              <br />
              {loc.schedule.map((slot) => (
                <span className="visit-hour" key={slot.day}>
                  {slot.day} <span>{slot.hours}</span>
                </span>
              ))}
            </p>

            <p className="location-detail-value">
              <span className="location-detail-label">PHONE</span>
              <br />
              <CallLink className="text-link">{loc.phoneDisplay}</CallLink>
            </p>

            <div className="visit-actions">
              <a
                className="btn-secondary"
                href={loc.directions}
                target="_blank"
                rel="noopener noreferrer"
              >
                Get directions <span aria-hidden>↗</span>
              </a>
              <Link className="link-arrow" href="/beforeafter">
                See patient results <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
