import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { NAV_PAGES, NAV_PROCEDURES } from "@/lib/seo/pages";
import { CallLink } from "@/components/ui/call-link";

/** Site footer: brand (+ social icon row) + explore/procedures/contact columns. */
export function Footer() {
  const nyc = siteConfig.locations[0];
  return (
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
                <a href={siteConfig.social.email} className="footer-social" aria-label="Email">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <rect x="3" y="5.5" width="18" height="13" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
                    <path d="M3.5 7 L12 13 L20.5 7" stroke="currentColor" strokeWidth="1.2" />
                  </svg>
                </a>
                <a
                  href={siteConfig.social.instagram}
                  className="footer-social"
                  aria-label="Instagram"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" stroke="currentColor" strokeWidth="1.2" />
                    <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.2" />
                    <circle cx="17" cy="7" r="1.1" fill="currentColor" />
                  </svg>
                </a>
                <a
                  href={siteConfig.social.youtube}
                  className="footer-social"
                  aria-label="YouTube"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <rect x="2.5" y="5.5" width="19" height="13" rx="3.5" stroke="currentColor" strokeWidth="1.2" />
                    <path d="M10 9 L15.5 12 L10 15 Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
                  </svg>
                </a>
                <a
                  href={siteConfig.social.linkHub}
                  className="footer-social"
                  aria-label="All links"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M10 14 L14 10" stroke="currentColor" strokeWidth="1.2" />
                    <path d="M12.5 7.5 L14.5 5.5 A 3.53 3.53 0 0 1 19.5 10.5 L17.5 12.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                    <path d="M11.5 16.5 L9.5 18.5 A 3.53 3.53 0 0 1 4.5 13.5 L6.5 11.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                  </svg>
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
  );
}
