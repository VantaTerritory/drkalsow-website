import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { Eyebrow, Divider } from "@/components/ui/eyebrow";
import { CallLink } from "@/components/ui/call-link";

/**
 * Home hero: eyebrow = doctor's name, H1 = descriptive heading required by
 * the SEO migration map (must match getPage("/").h1 in lib/seo/pages.ts),
 * with the bust cutout breaking out of the aubergine disc, cropped by the
 * hero's bottom edge (overflow on .hero-image-panel does the cut).
 */
export function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-content">
        <Eyebrow ornament="none">Dr. Sergei Kalsow, MD</Eyebrow>
        <h1 className="h-hero">
          {/* non-breaking spaces force the wrap: "Surgeon in" stays together
              and "New York City" lands alone on the last line */}
          Board-Certified Plastic Surgeon&nbsp;in <em>New&nbsp;York&nbsp;City</em>
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
