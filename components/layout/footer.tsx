import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { NAV_PAGES, NAV_PROCEDURES } from "@/lib/seo/pages";
import { CallLink } from "@/components/ui/call-link";

/** Site footer: brand + explore/procedures/contact columns. */
export function Footer() {
  const nyc = siteConfig.locations[0];
  return (
    <>
      <footer className="footer-main-bg">
        <div className="container">
          <div className="footer-main" style={{ gridTemplateColumns: "1.6fr 1fr 1fr 1fr" }}>
            <div className="footer-brand-block">
              <p className="footer-brand-mark">SK</p>
              <p className="footer-brand-name">DR. SERGEI KALSOW</p>
              <p className="footer-tagline">
                Board-Certified Plastic &amp; Reconstructive Surgery. Refined results, naturally.
              </p>
              <div className="footer-socials">
                <a
                  href={siteConfig.social.instagram}
                  className="footer-social"
                  aria-label="Instagram"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  IG
                </a>
              </div>
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

      <div className="footer-legal-bg">
        <div className="container">
          <div className="footer-legal">
            <span>
              © {new Date().getFullYear()} {siteConfig.surgeonShort}. All rights reserved.
            </span>
            {/* TODO: Privacy/Terms/Accessibility links once those pages exist. */}
          </div>
        </div>
      </div>
    </>
  );
}
