"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/lib/site-config";
import { NAV_PAGES, PROCEDURE_CATEGORIES, proceduresByCategory } from "@/lib/seo/pages";
import { CallLink } from "@/components/ui/call-link";

/**
 * Full-site header: topbar (address + phone + IG) and sticky nav with the
 * Procedures dropdown (desktop) / slide-in panel (mobile).
 * Same visual language as the LP header; nav added for the full site.
 */
export function Header() {
  const pathname = usePathname();
  const [procsOpen, setProcsOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Close the procedures dropdown on outside click / Escape.
  useEffect(() => {
    if (!procsOpen) return;
    const onClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) setProcsOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setProcsOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [procsOpen]);

  // Lock body scroll while the mobile panel is open.
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const current = (path: string) => (pathname === path ? "page" : undefined);

  return (
    <>
      <div className="topbar">
        <div className="topbar-inner">
          <div className="topbar-left">
            <span>635 Madison Ave, NYC</span>
            <span className="topbar-divider">·</span>
            <span>{siteConfig.phone.display}</span>
          </div>
          <div className="topbar-right">
            <span style={{ opacity: 0.7 }}>FOLLOW</span>
            <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer">
              INSTAGRAM
            </a>
          </div>
        </div>
      </div>

      <header className="header">
        <div className="header-inner">
          <Link href="/" className="logo-group" aria-label={siteConfig.surgeon}>
            <Image
              src="/img/logo/sk-logo.png"
              alt={siteConfig.surgeon}
              width={1412}
              height={942}
              className="logo-img"
              priority
            />
          </Link>

          <nav className="header-nav" aria-label="Main">
            {NAV_PAGES.filter((p) => p.path !== "/call-our-office").map((p) => (
              <Link key={p.path} href={p.path} className="nav-link" aria-current={current(p.path)}>
                {p.label}
              </Link>
            ))}

            <div className="nav-dropdown" ref={dropdownRef}>
              <button
                type="button"
                className="nav-link nav-dropdown-trigger"
                aria-expanded={procsOpen}
                onClick={() => setProcsOpen((v) => !v)}
              >
                Procedures
                <svg className="caret" width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden>
                  <path d="M1 1 L5 5 L9 1" stroke="currentColor" strokeWidth="1.2" />
                </svg>
              </button>
              {procsOpen && (
                <div className="nav-dropdown-panel">
                  {PROCEDURE_CATEGORIES.map((cat) => (
                    <div key={cat.key}>
                      <p className="nav-dropdown-col-title">{cat.label}</p>
                      {proceduresByCategory(cat.key).map((p) => (
                        <Link
                          key={p.path}
                          href={p.path}
                          className="proc-menu-link"
                          onClick={() => setProcsOpen(false)}
                        >
                          {p.label} <span className="arrow">→</span>
                        </Link>
                      ))}
                    </div>
                  ))}
                  <Link
                    href="/procedures"
                    className="nav-dropdown-all link-arrow"
                    onClick={() => setProcsOpen(false)}
                  >
                    View all procedures →
                  </Link>
                </div>
              )}
            </div>
          </nav>

          <div className="header-actions">
            <CallLink className="header-phone" aria-label={`Call ${siteConfig.phone.display}`}>
              <span className="phone-text">{siteConfig.phone.display}</span>
            </CallLink>
            <Link href="/call-our-office" className="btn-primary header-cta">
              <span className="header-cta-full">{siteConfig.cta.primary}</span>
              <span className="header-cta-short">{siteConfig.cta.primaryShort}</span>
            </Link>
            <button
              type="button"
              className="nav-toggle"
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen(true)}
            >
              <svg width="18" height="14" viewBox="0 0 18 14" fill="none" aria-hidden>
                <path d="M1 1 H17 M1 7 H17 M1 13 H17" stroke="currentColor" strokeWidth="1.4" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {mobileOpen && (
        <button
          type="button"
          className="mobile-nav-backdrop"
          aria-label="Close menu"
          onClick={() => setMobileOpen(false)}
        />
      )}
      <div className={`mobile-nav${mobileOpen ? " is-open" : ""}`} aria-hidden={!mobileOpen}>
        <div className="mobile-nav-head">
          <p className="footer-brand-name" style={{ margin: 0 }}>
            DR. SERGEI KALSOW
          </p>
          <button type="button" className="nav-toggle" aria-label="Close menu" onClick={() => setMobileOpen(false)}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
              <path d="M1 1 L13 13 M13 1 L1 13" stroke="currentColor" strokeWidth="1.4" />
            </svg>
          </button>
        </div>
        <nav aria-label="Mobile">
          <ul className="mobile-nav-list">
            {NAV_PAGES.map((p) => (
              <li key={p.path}>
                <Link href={p.path} className="mobile-nav-link" onClick={() => setMobileOpen(false)}>
                  {p.label}
                </Link>
              </li>
            ))}
          </ul>
          {PROCEDURE_CATEGORIES.map((cat) => (
            <div key={cat.key}>
              <p className="mobile-nav-group-title">{cat.label}</p>
              <ul className="mobile-nav-sublist">
                {proceduresByCategory(cat.key).map((p) => (
                  <li key={p.path}>
                    <Link href={p.path} className="mobile-nav-sublink" onClick={() => setMobileOpen(false)}>
                      {p.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <Link href="/procedures" className="mobile-nav-sublink" onClick={() => setMobileOpen(false)}>
            View all procedures →
          </Link>
        </nav>
      </div>
    </>
  );
}
