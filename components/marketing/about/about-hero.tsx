import Image from "next/image";
import { siteConfig } from "@/lib/site-config";
import { getPage } from "@/lib/seo/pages";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/motion/reveal";

/* Stats from the live site's About ("Meet Dr. Kalsow" block). */
const STATS = [
  { value: "5,000+", label: "Awake Lipo 360 Procedures Personally Performed", numeric: true },
  { value: "Board-Certified", label: "Plastic Surgeon", numeric: false },
  { value: "International", label: "Patients & Surgical Observers", numeric: false },
  { value: "Specialized Team", label: "Built Around Awake Cosmetic Surgery", numeric: false },
];

/**
 * About page hero, integrated panel style: tinted section with rounded
 * bottom corners, copy + signature on the left, the white-coat portrait
 * flush to the section's top edge, and the stats row inside the panel.
 */
export function AboutHero() {
  return (
    <section className="abt-hero-section">
      <div className="container">
        <div className="abt-hero">
          <div className="abt-hero-copy">
            <Eyebrow>About</Eyebrow>
            <h1 className="h-display" style={{ marginBottom: "var(--space-3)" }}>
              {getPage("/about-1").h1}
            </h1>

            <p className="abt-lead" style={{ marginTop: "var(--space-3)" }}>
              Dr. Kalsow founded his plastic surgery private practice in Manhattan. He enjoys
              operating on the whole body, but especially on the face.
            </p>
            <p className="abt-lead" style={{ marginTop: "var(--space-3)" }}>
              He maintains a commitment to exceptional care, providing his patients with
              aesthetically beautiful and natural results.
            </p>

            <p className="abt-signature">Dr. Sergei Kalsow</p>
          </div>

          <div className="abt-hero-media">
            <Image
              src="/img/team/dr-kalsow-whitecoat.jpg"
              alt={`${siteConfig.surgeon}, ${siteConfig.credentials}`}
              fill
              sizes="(max-width: 900px) 100vw, 42vw"
              priority
            />
          </div>
        </div>

        <Reveal className="trust-bar abt-stats">
          {STATS.map((s) => (
            <div className="stat" key={s.label}>
              {s.numeric ? (
                <p className="stat-number">{s.value}</p>
              ) : (
                <p className="stat-word">{s.value}</p>
              )}
              <p className="stat-label">{s.label.toUpperCase()}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
