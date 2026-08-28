import Image from "next/image";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/motion/reveal";

/** "Our NYC Office": clinic photos + copy describing the private space. */
export function OfficeShowcase() {
  return (
    <section className="bg-white section-py-lg" id="practice">
      <div className="container">
        <div className="office-grid">
          <Reveal className="office-copy">
            <Eyebrow ornament="diamond">Our NYC Office</Eyebrow>
            <h2 className="h-sec" style={{ marginBottom: "var(--space-3)" }}>
              A private practice on <em>Madison Avenue.</em>
            </h2>
            <p style={{ fontFamily: "var(--font-sans)", color: "var(--text-secondary)", lineHeight: 1.75, margin: "0 0 var(--space-3)", fontSize: 15, maxWidth: "46ch" }}>
              Step into a discreet, fully private practice designed for comfort and confidentiality.
              In the heart of Midtown Manhattan, you are cared for in a calm, modern setting, never
              a crowded clinic.
            </p>
            <p style={{ fontFamily: "var(--font-sans)", color: "var(--text-secondary)", lineHeight: 1.75, margin: 0, fontSize: 15, maxWidth: "46ch" }}>
              From your first consultation through recovery, you are looked after by Dr. Kalsow and a
              dedicated team in an accredited, state-of-the-art facility.
            </p>
          </Reveal>

          <Reveal className="office-gallery" delay={80}>
            <div className="office-cell office-cell-tall">
              <Image src="/img/office/office-lounge.jpg" alt="Private patient lounge" fill sizes="(max-width:768px) 100vw, 30vw" loading="lazy" />
            </div>
            <div className="office-cell">
              <Image src="/img/office/office-reception.jpg" alt="Reception lounge at the Madison Avenue practice" fill sizes="(max-width:768px) 50vw, 25vw" loading="lazy" />
            </div>
            <div className="office-cell">
              <Image src="/img/office/office-suite.jpg" alt="Comfortable consultation lounge" fill sizes="(max-width:768px) 50vw, 25vw" loading="lazy" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
