import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/lib/site-config";
import { NAV_PAGES, NAV_PROCEDURES } from "@/lib/seo/pages";
import { CallLink } from "@/components/ui/call-link";
import { SocialLinks } from "@/components/ui/social-links";

/** Site footer: brand (+ social icon row) + explore/procedures/contact columns. */
export function Footer() {
  const nyc = siteConfig.locations[0];
  return (
    <footer className="footer-main-bg">
        <div className="container">
          <div className="footer-main">
            <div className="footer-brand-block">
              {/* the signature carries the name and credential, so the old
                  "SK" mark and the DR. SERGEI KALSOW line under it are gone */}
              <Image
                src="/img/logo/sk-logo.png"
                alt={siteConfig.surgeon}
                width={1213}
                height={554}
                className="footer-brand-logo"
              />
              <p className="footer-tagline">
                Awake Lipo 360 &amp; Body Contouring in New York City. Board-Certified Plastic Surgeon.
              </p>
              <SocialLinks className="footer-socials" linkClassName="footer-social" />
            </div>

            <nav aria-label="Footer explore">
              <p className="footer-col-title">EXPLORE</p>
              <ul className="footer-col-list">
                {NAV_PAGES.map((p) => (
                  <li key={p.path}>
                    <Link href={p.path}>{p.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-label="Footer procedures">
              <p className="footer-col-title">PROCEDURES</p>
              <ul className="footer-col-list">
                {NAV_PROCEDURES.slice(0, 6).map((p) => (
                  <li key={p.path}>
                    <Link href={p.path}>{p.label}</Link>
                  </li>
                ))}
                <li>
                  <Link href="/beforeafter">View all results</Link>
                </li>
              </ul>
            </nav>

            <nav aria-label="Footer contact">
              <p className="footer-col-title">CONTACT</p>
              <ul className="footer-col-list">
                <li>
                  <CallLink>{siteConfig.phone.display}</CallLink>
                </li>
                <li>
                  <a href={nyc.directions} target="_blank" rel="noopener noreferrer">
                    {nyc.address}
                  </a>
                </li>
                <li>{nyc.cityState}</li>
                <li>
                  <Link href="/call-our-office">{siteConfig.cta.primary}</Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
    </footer>
  );
}
