"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/lib/site-config";
import {
  NAV_PAGES,
  NAV_PROCEDURES,
  PROCEDURE_CATEGORIES,
  proceduresByCategory,
} from "@/lib/seo/pages";

/**
 * Full-site header: sticky nav with the Procedures dropdown (desktop) /
 * slide-in panel (mobile).
 * Same visual language as the LP header; nav added for the full site.
 */
export function Header() {
  const pathname = usePathname();
  const [procsOpen, setProcsOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileProcsOpen, setMobileProcsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const activeProcedure = NAV_PROCEDURES.find((procedure) => procedure.path === pathname);
  const activeCategory = activeProcedure?.category;

  const clearCloseTimer = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  const openProcedures = () => {
    clearCloseTimer();
    setProcsOpen(true);
  };

  const closeProceduresSoon = () => {
    clearCloseTimer();
    closeTimerRef.current = setTimeout(() => setProcsOpen(false), 180);
  };

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

  useEffect(
    () => () => {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    },
    [],
  );

  // Closing the panel also collapses the procedures accordion, so it always
  // reopens in its default state.
  const closeMobile = () => {
    setMobileOpen(false);
    setMobileProcsOpen(false);
  };

  const current = (path: string) => (pathname === path ? "page" : undefined);

  return (
    <>
      <header className="header">
        <div className="header-inner">
          <Link href="/" className="logo-group" aria-label={siteConfig.surgeon} aria-current={current("/")}>
            <Image
              src="/img/logo/sk-logo.png"
              alt={siteConfig.surgeon}
              width={1213}
              height={554}
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

            <div
              className="nav-dropdown"
              ref={dropdownRef}
              data-open={procsOpen ? "true" : undefined}
              onMouseEnter={openProcedures}
              onMouseLeave={closeProceduresSoon}
              onFocus={openProcedures}
              onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget)) setProcsOpen(false);
              }}
            >
              <button
                type="button"
                className="nav-link nav-dropdown-trigger"
                aria-expanded={procsOpen}
                aria-controls="procedures-navigation"
                aria-haspopup="true"
                data-current={activeProcedure ? "true" : undefined}
                onClick={openProcedures}
              >
                Procedures
                <svg className="caret" width="10" height="6" viewBox="0 0 10 6" fill="none" aria-hidden>
                  <path d="M1 1 L5 5 L9 1" stroke="currentColor" strokeWidth="1.2" />
                </svg>
              </button>
              {procsOpen && (
                <div id="procedures-navigation" className="nav-dropdown-panel" aria-label="Procedures by area">
                  <div className="nav-dropdown-intro">
                    <p className="nav-dropdown-kicker">Explore procedures</p>
                  </div>

                  <div className="nav-dropdown-grid">
                    {PROCEDURE_CATEGORIES.map((cat, index) => (
                      <div
                        key={cat.key}
                        className="nav-dropdown-category"
                        data-active={activeCategory === cat.key ? "true" : undefined}
                      >
                        <div className="nav-dropdown-category-head">
                          <span>{String(index + 1).padStart(2, "0")}</span>
                          <p>{cat.label}</p>
                        </div>
                        <ul className="nav-dropdown-list">
                          {proceduresByCategory(cat.key).map((procedure) => (
                            <li key={procedure.path}>
                              <Link
                                href={procedure.path}
                                className="mega-menu-link"
                                aria-current={current(procedure.path)}
                                onClick={() => setProcsOpen(false)}
                              >
                                <span>{procedure.label}</span>
                                <span className="mega-menu-arrow" aria-hidden>
                                  ↗
                                </span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </nav>

          <div className="header-actions">
            <Link
              href="/call-our-office"
              className="btn-primary header-cta"
              aria-current={current("/call-our-office")}
            >
              <span className="header-cta-full">{siteConfig.cta.primary}</span>
              <span className="header-cta-short">{siteConfig.cta.primaryShort}</span>
            </Link>
            <button
              type="button"
              className="nav-toggle"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-navigation"
              onClick={() => (mobileOpen ? closeMobile() : setMobileOpen(true))}
            >
              {mobileOpen ? (
                <svg width="15" height="15" viewBox="0 0 14 14" fill="none" aria-hidden>
                  <path d="M1 1 L13 13 M13 1 L1 13" stroke="currentColor" strokeWidth="1.4" />
                </svg>
              ) : (
                <svg width="18" height="14" viewBox="0 0 18 14" fill="none" aria-hidden>
                  <path d="M1 1 H17 M1 7 H17 M1 13 H17" stroke="currentColor" strokeWidth="1.4" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Drops from under the header as a floating card, rather than sliding
            in from the edge. Procedures expands in place. */}
        <div
          id="mobile-navigation"
          className={`mobile-nav${mobileOpen ? " is-open" : ""}`}
          aria-hidden={!mobileOpen}
        >
          <nav aria-label="Mobile">
            <ul className="mobile-nav-list">
              {NAV_PAGES.filter((p) => p.path !== "/call-our-office").map((p) => (
                <li key={p.path}>
                  <Link
                    href={p.path}
                    className="mobile-nav-link"
                    aria-current={current(p.path)}
                    tabIndex={mobileOpen ? undefined : -1}
                    onClick={closeMobile}
                  >
                    {p.label}
                  </Link>
                </li>
              ))}

              <li data-open={mobileProcsOpen ? "true" : undefined}>
                <button
                  type="button"
                  className="mobile-nav-link mobile-nav-accordion"
                  aria-expanded={mobileProcsOpen}
                  aria-controls="mobile-procedures"
                  data-current={activeProcedure ? "true" : undefined}
                  tabIndex={mobileOpen ? undefined : -1}
                  onClick={() => setMobileProcsOpen((v) => !v)}
                >
                  Procedures
                  <svg
                    className="mobile-nav-chevron"
                    width="14"
                    height="9"
                    viewBox="0 0 14 9"
                    fill="none"
                    aria-hidden
                  >
                    <path d="M1 1.5 L7 7 L13 1.5" stroke="currentColor" strokeWidth="1.3" />
                  </svg>
                </button>

                {mobileProcsOpen && (
                  <div id="mobile-procedures" className="mobile-nav-drawer">
                    {PROCEDURE_CATEGORIES.map((cat) => (
                      <div
                        key={cat.key}
                        className="mobile-nav-group"
                        data-active={activeCategory === cat.key ? "true" : undefined}
                      >
                        <p className="mobile-nav-group-title">{cat.label}</p>
                        <ul className="mobile-nav-sublist">
                          {proceduresByCategory(cat.key).map((p) => (
                            <li key={p.path}>
                              <Link
                                href={p.path}
                                className="mobile-nav-sublink"
                                aria-current={current(p.path)}
                                onClick={closeMobile}
                              >
                                {p.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </li>
            </ul>

            <Link
              href="/call-our-office"
              className="btn-primary mobile-nav-cta"
              tabIndex={mobileOpen ? undefined : -1}
              onClick={closeMobile}
            >
              {siteConfig.cta.primary} <span aria-hidden>→</span>
            </Link>
          </nav>
        </div>
      </header>

      {mobileOpen && (
        <button
          type="button"
          className="mobile-nav-backdrop"
          aria-label="Close menu"
          onClick={closeMobile}
        />
      )}
    </>
  );
}
