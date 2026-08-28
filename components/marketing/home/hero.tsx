import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { Eyebrow, Divider } from "@/components/ui/eyebrow";
import { CallLink } from "@/components/ui/call-link";

/**
 * Home hero: eyebrow = doctor's name, H1 = descriptive heading required by
 * the SEO migration map (must match getPage("/").h1 in lib/seo/pages.ts),
 * with the arched portrait panel.
 */
export function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-content">
        <Eyebrow ornament="star">Dr. Sergei Kalsow, MD</Eyebrow>
        <h1 className="h-hero">
          Board-Certified Plastic Surgeon in <em>New York City</em>
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
        <Image
          className="hero-image"
          src={siteConfig.hero.portrait}
          alt={`${siteConfig.surgeon}, ${siteConfig.credentials}`}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
        <div className="hero-meta">
          <span>MADISON AVENUE</span>
          <span>NEW YORK CITY</span>
        </div>
      </div>
    </section>
  );
}
