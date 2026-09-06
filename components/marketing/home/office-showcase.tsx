import Image from "next/image";
import { siteConfig } from "@/lib/site-config";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/motion/reveal";

/* Hero-cell slideshow: sourced from the live site's office carousel.
   CSS-only crossfade (20s cycle, 4s per slide), pauses on hover. */
const CAROUSEL = [
  { src: "/img/office/office-lounge.jpg", alt: "Private patient lounge" },
  { src: "/img/office/office-skyline.jpg", alt: "Treatment lounge with Midtown skyline views" },
  { src: "/img/office/office-tv-lounge.jpg", alt: "Patient lounge at the Madison Avenue practice" },
  { src: "/img/office/office-wide.jpg", alt: "Reception lounge seating" },
  { src: "/img/office/office-exterior.jpg", alt: "Entrance of 635 Madison Avenue" },
];

/**
 * "Our NYC Office" + "Visit Us" merged into one bento: photo carousel (hero
 * cell), practice copy, treatment-room photo, embedded map and location info.
 */
export function OfficeShowcase() {
  const loc = siteConfig.locations[0];
  return (
    <section className="bg-white section-py-lg" id="practice">
      <div className="container">
        <div className="section-header" style={{ marginBottom: 0 }}>
          <Eyebrow ornament="none">Our NYC Office</Eyebrow>
          <h2 className="h-sec">
            A private practice on <em>Madison Avenue.</em>
          </h2>
          <p className="locations-subtitle">
            Private, personalized care in the heart of Midtown, with the same surgeon from
            consultation to recovery.
          </p>
        </div>

        <Reveal className="office-bento">
          <div className="office-bento-carousel">
            {CAROUSEL.map((img, i) => (
              <Image
                key={img.src}
                className="office-slide"
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 900px) 100vw, 38vw"
                loading="lazy"
                style={{ animationDelay: `${i * 4}s` }}
              />
            ))}
            <span className="ba-card-chip">635 Madison Avenue</span>
          </div>

          <div className="office-bento-copy">
            <p>
              Step into a discreet, fully private practice designed for comfort and
              confidentiality. In the heart of Midtown Manhattan, you are cared for in a calm,
              modern setting, never a crowded clinic.
            </p>
            <p>
              From your first consultation through recovery, you are looked after by Dr. Kalsow
              and a dedicated team in an accredited, state-of-the-art facility.
            </p>
          </div>

          <div className="office-bento-photo">
            <Image
              src="/img/office/office-treatment.jpg"
              alt="Private treatment room"
              fill
              sizes="(max-width: 900px) 100vw, 30vw"
              loading="lazy"
            />
          </div>

          <div className="office-bento-map">
            <iframe
              className="location-map"
              src={`https://www.google.com/maps?q=${encodeURIComponent(`${loc.address}, ${loc.cityState}`)}&output=embed`}
              title={`Map to the ${loc.name} office`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <div className="office-bento-info">
            <h3 className="location-name" style={{ marginBottom: 16 }}>
              {loc.name}
            </h3>
            <p className="location-detail-value">
              <span className="location-detail-label">ADDRESS</span>
              <br />
              {loc.address}
              <br />
              {loc.cityState}
            </p>
            <p className="location-detail-value">
              <span className="location-detail-label">HOURS</span>
              <br />
              {loc.hours}
            </p>
            <p className="location-detail-value" style={{ margin: 0 }}>
              <span className="location-detail-label">PHONE</span>
              <br />
              {loc.phoneDisplay}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
