import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { Eyebrow, Divider } from "@/components/ui/eyebrow";
import { CallLink } from "@/components/ui/call-link";

/**
 * Home hero. H1 follows the SEO team's Sep 2026 draft (getPage("/").h1 in
 * lib/seo/pages.ts): the doctor's name as the first line, the Awake Lipo 360
 * proposition as the display line. The credential moves to the eyebrow as
 * trust proof. The bust cutout is cropped by the hero's bottom edge
 * (overflow on .hero-image-panel does the cut).
 */
export function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-content">
        <Eyebrow ornament="none">Board-Certified Plastic Surgeon</Eyebrow>
        <h1 className="h-hero">
          <span className="h-hero-name">
            Dr. Sergei Kalsow, MD<span className="sr-only">: </span>
          </span>
          {/* non-breaking spaces keep "Lipo 360" and "in NYC" from splitting */}
          Awake Lipo&nbsp;360 &amp; Body Contouring <em>in&nbsp;NYC</em>
        </h1>

        <Divider />

        <p className="hero-lead">{siteConfig.hero.lead}</p>

        <div className="hero-cta-group">
          <Link href="/call-our-office" className="btn-primary">
            {siteConfig.cta.primary} <span aria-hidden>→</span>
          </Link>
          <CallLink className="btn-secondary" aria-label={`Call ${siteConfig.phone.display}`}>
            {siteConfig.cta.call}
          </CallLink>
        </div>
      </div>

      <div className="hero-image-panel">
        <div className="hero-figure">
          <Image
            className="hero-image"
            src={siteConfig.hero.portrait}
            alt={`${siteConfig.surgeon}, ${siteConfig.credentials}`}
            fill
            sizes="(max-width: 900px) 70vw, 30vw"
            priority
          />
        </div>
      </div>
    </section>
  );
}
