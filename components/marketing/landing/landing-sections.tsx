import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import type { SitePage } from "@/lib/seo/pages";
import { Eyebrow, Divider } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/motion/reveal";
import { CallLink } from "@/components/ui/call-link";
import { SwipeCarousel } from "@/components/ui/swipe-carousel";
import { StatBento } from "@/components/ui/stat-bento";
import { LandingVideoTile } from "@/components/marketing/landing/video-tile";
import {
  ABOUT_PATH,
  SURGEON_PORTRAIT,
  type LandingCase,
  type LandingContent,
  type LandingFigure,
  type LandingLink,
  type LandingVideo,
} from "@/lib/landings/content";

/* ============================================================
   Landing page sections (Awake Lipo 360, Breast Reduction). All copy
   comes from lib/landings/content.ts; this file is layout only, on the
   Aubergine system: reuses proc-hero, value-card, section-header,
   faq and form classes, plus the ld-* additions in globals.css.
   Which sections render, and in what order, is each page's `sections`.
   ============================================================ */

type Props = { content: LandingContent };

const pad = (n: number) => String(n).padStart(2, "0");

/** Anchor for hashes and external URLs, Link for internal routes. */
function Cta({ link, className }: { link: LandingLink; className: string }) {
  const arrow = className.includes("btn-primary") ? <span aria-hidden> →</span> : null;
  if (link.external) {
    return (
      <a href={link.href} className={className} target="_blank" rel="noopener noreferrer">
        {link.label}
        {arrow}
      </a>
    );
  }
  if (link.href.startsWith("#")) {
    return (
      <a href={link.href} className={className}>
        {link.label}
        {arrow}
      </a>
    );
  }
  return (
    <Link href={link.href} className={className}>
      {link.label}
      {arrow}
    </Link>
  );
}

function FigureCard({ figure, priority = false }: { figure: LandingFigure; priority?: boolean }) {
  return (
    <figure className="ld-figure-card">
      <Image
        src={figure.src}
        alt={figure.alt}
        width={figure.width}
        height={figure.height}
        sizes="(max-width: 900px) 90vw, 44vw"
        preload={priority}
      />
      {figure.caption && <figcaption>{figure.caption}</figcaption>}
    </figure>
  );
}

function Check() {
  return (
    <span className="ld-check" aria-hidden>
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
        <path d="M5 12.5 L10 17.5 L19 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      </svg>
    </span>
  );
}

/** Numbered patient card: the composite, its case number and Before / After tags. */
function CaseCard({ item, index }: { item: LandingCase; index: number }) {
  const paired = item.paired ?? true;
  const stacked = item.layout === "stacked";
  return (
    <figure className={stacked ? "ld-case ld-case--stacked" : "ld-case"}>
      <div className="ld-case-media">
        <Image src={item.image} alt={item.alt} fill sizes="(max-width: 768px) 86vw, 30vw" />
        <span className="ld-tag ld-case-num">Case {pad(index + 1)}</span>
        {paired && (
          <span className="ld-case-tags" aria-hidden>
            <span className="ld-tag">Before</span>
            <span className="ld-tag">After</span>
          </span>
        )}
      </div>
      <figcaption>{item.view}</figcaption>
    </figure>
  );
}

/** Photo cards first, then the clips, one swipe track on phones. */
function CaseGrid({
  cases,
  videos,
  label,
  className = "ld-cases",
}: {
  cases: LandingCase[];
  videos: LandingVideo[];
  label: string;
  className?: string;
}) {
  const total = cases.length + videos.length;
  return (
    <SwipeCarousel className={className} data-count={total} count={total} label={label} itemNoun="case">
      {cases.map((c, i) => (
        <CaseCard item={c} index={i} key={c.image} />
      ))}
      {videos.map((v) => (
        <LandingVideoTile
          key={v.src}
          video={v}
          label={v.caseNumber ? `Case ${pad(v.caseNumber)} · Video` : "Video"}
        />
      ))}
    </SwipeCarousel>
  );
}

/* ---------------- hero ---------------- */
export function LandingHero({ page, content }: Props & { page: SitePage }) {
  const { hero } = content;
  return (
    <section className="proc-hero-section ld-hero-section">
      <div className="container">
        <div className="proc-hero ld-hero">
          <div className="proc-hero-copy">
            <Eyebrow>{hero.eyebrow}</Eyebrow>
            <h1 className="h-display">
              {page.h1.endsWith(" in NYC") ? <>{page.h1.slice(0, -7)} <em>in NYC</em></> : page.h1}
            </h1>
            <Divider />
            <p className="proc-hero-lead" style={{ marginTop: "var(--space-3)" }}>
              {hero.lead}
            </p>
            <ul className="hero-chips ld-chips">
              {hero.trust.map((t) => (
                <li className="trust-chip" key={t}>
                  {t}
                </li>
              ))}
            </ul>
            <div className="hero-cta-group">
              <Cta link={hero.primary} className="btn-primary" />
              <Cta link={hero.secondary} className="btn-secondary" />
            </div>
            {hero.note && <p className="ld-hero-note">{hero.note}</p>}
          </div>

          <div className={`ld-hero-media ld-hero-media--${hero.media.kind}`}>
          {hero.media.kind === "figure" ? (
            <FigureCard figure={hero.media.figure} priority />
          ) : (
            <div className="ld-hero-portrait">
              <Image
                src={hero.media.src}
                alt={hero.media.alt}
                fill
                sizes="(max-width: 900px) 100vw, 44vw"
                preload
              />
            </div>
          )}
          <div className="ld-media-caption">
            <span>{hero.media.kind === "figure" ? "A considered, 360° approach" : "Dr. Sergei Kalsow, MD"}</span>
            <span>{hero.media.kind === "figure" ? "Designed around your anatomy" : "New York City"}</span>
          </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- in-page nav ---------------- */
export function LandingQuickNav({ content }: Props) {
  return (
    <nav className="ld-quicknav" aria-label="On this page">
      <div className="container">
        <ul className="ld-quicknav-list">
          {content.quickNav.map((l) => (
            <li key={l.href}>
              <a className="ld-pill" href={l.href}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

/* ---------------- trust pillars (dark band) ---------------- */
export function LandingPillars({ content }: Props) {
  if (!content.pillars) return null;
  return (
    <section className="ld-pillars-section">
      <div className="container">
        <Reveal className="ld-pillars">
          {content.pillars.map((p) => (
            <div className="ld-pillar" key={p.title}>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- the surgeon, first (authority-first order) ---------------- */
export function LandingSurgeonSpotlight({ content }: Props) {
  const s = content.surgeon;
  const photo = s.photo ?? SURGEON_PORTRAIT;
  const loc = siteConfig.locations[0];
  return (
    <section className="bg-white section-py-lg" id="meet-kalsow">
      <div className="container">
        <div className="ld-spotlight">
          <Reveal className="ld-spotlight-media">
            <div className="ld-portrait">
              <Image src={photo.src} alt={photo.alt} fill sizes="(max-width: 900px) 90vw, 40vw" />
            </div>
            <div className="ld-media-caption">
              <span>{siteConfig.surgeon}</span>
              <span>{loc.address.split(",")[0]}, New York City</span>
            </div>
          </Reveal>

          <div className="ld-split-copy ld-spotlight-copy">
            <Eyebrow>{s.eyebrow}</Eyebrow>
            <h2 className="h-sec">{s.heading}</h2>
            <Divider />
            <p className="ld-lead">{s.lead}</p>

            {s.body.map((p) => (
              <p key={p.slice(0, 40)}>{p}</p>
            ))}

            {/* only the figures go in tiles (the first one leads); the facts stay readable text */}
            {s.stats && <StatBento stats={s.stats} className="ld-spotlight-figures" />}

            <ul className="ld-points">
              {s.points.map((p) => (
                <li key={p.title}>
                  <strong>{p.title}</strong>
                  <span>{p.body}</span>
                </li>
              ))}
            </ul>
            {s.closing && <p className="ld-closing">{s.closing}</p>}

            <div className="hero-cta-group">
              <Cta link={{ label: "Request a Consultation", href: "#consultation" }} className="btn-primary" />
              <Link href={ABOUT_PATH} className="btn-secondary">
                More About Dr. Kalsow
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- what is it ---------------- */
export function LandingWhatIsIt({ content }: Props) {
  const s = content.whatIsIt;
  return (
    <section className="bg-cream section-py-lg" id="what-is-it">
      <div className="container">
        <Reveal className="ld-split">
          <div className="ld-split-copy">
            <Eyebrow>{s.eyebrow}</Eyebrow>
            <h2 className="h-sec">{s.heading}</h2>
            <Divider />
            {s.body.map((p) => (
              <p key={p.slice(0, 40)}>{p}</p>
            ))}
          </div>
          <aside className="ld-highlight">
            <p className="ld-highlight-title">{s.highlight.title}</p>
            {s.highlight.body && <p>{s.highlight.body}</p>}
            {s.highlight.items && (
              <ul className="ld-highlight-list">
                {s.highlight.items.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            )}
          </aside>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- "the details start here" marker ---------------- */
export function LandingDetailsIntro({ content }: Props) {
  const s = content.detailsIntro;
  if (!s) return null;
  return (
    <section className="bg-cream ld-details-intro" id="details">
      <div className="container">
        <Eyebrow>{s.eyebrow}</Eyebrow>
        <h2 className="h-sec">{s.heading}</h2>
        {s.body && <p>{s.body}</p>}
      </div>
    </section>
  );
}

/* ---------------- goals / benefits ---------------- */
export function LandingGoals({ content }: Props) {
  const s = content.goals;
  return (
    <section className="bg-white section-py-lg" id="goals">
      <div className="container ld-goals-layout">
        <div className="section-header ld-goals-intro" style={{ marginBottom: 0 }}>
          <Eyebrow>{s.eyebrow}</Eyebrow>
          <h2 className="h-sec">{s.heading}</h2>
          <p className="locations-subtitle">{s.intro}</p>
        </div>

        <Reveal className="ld-benefits">
          {s.cards.map((c, i) => (
            <article className="ld-benefit" key={c.title}>
              <span className="ld-benefit-index" aria-hidden>
                {pad(i + 1)}
              </span>
              <div>
                <h3>{c.title}</h3>
                <p>{c.body}</p>
              </div>
            </article>
          ))}
        </Reveal>

        {s.extraCards && (
          <Reveal className="ld-grid-3" delay={100}>
            {s.extraCards.map((c) => (
              <article className="value-card" key={c.title}>
                <div className="value-card-body">
                  <h3>{c.title}</h3>
                  <p>{c.body}</p>
                </div>
              </article>
            ))}
          </Reveal>
        )}

        {s.note && <p className="ld-note">{s.note}</p>}

        {s.figure && (
          <Reveal className="ld-figure-wide" delay={120}>
            <FigureCard figure={{ ...s.figure, caption: s.figureNote }} />
          </Reveal>
        )}
      </div>
    </section>
  );
}

/* ---------------- results ---------------- */
export function LandingResults({ content }: Props) {
  const s = content.results;
  const videos = s.videos ?? [];

  // No inline media (Breast Reduction): the section is the invitation to the gallery.
  if (s.cases.length === 0 && videos.length === 0) {
    return (
      <section className="bg-white section-py-lg" id="results">
        <div className="container">
          <div className="ld-results-panel">
            <div className="section-header" style={{ marginBottom: "var(--space-5)" }}>
              <Eyebrow>{s.eyebrow}</Eyebrow>
              <h2 className="h-sec">{s.heading}</h2>
              <p className="locations-subtitle">{s.intro}</p>
            </div>
            <div className="ld-results-actions">
              <div className="ld-results-footer">
                <Cta link={s.gallery} className="btn-secondary" />
                <Cta link={{ label: "Discuss My Goals", href: "#consultation" }} className="btn-primary" />
              </div>
              <p className="ld-disclaimer">{s.disclaimer}</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Numbered cases: the proof the client wants read right after meeting him.
  return (
    <section className="bg-white section-py-lg" id="results">
      <div className="container">
        <div className="ld-cases-head">
          <div className="section-header">
            <Eyebrow>{s.eyebrow}</Eyebrow>
            <h2 className="h-sec">{s.heading}</h2>
            <p className="locations-subtitle">{s.intro}</p>
          </div>
          <div className="ld-cases-actions">
            <Cta link={s.gallery} className="btn-secondary" />
            <Cta link={{ label: "Discuss My Goals", href: "#consultation" }} className="btn-primary" />
          </div>
        </div>

        <Reveal>
          <CaseGrid cases={s.cases} videos={videos} label={`${content.schema.name} before and after cases`} />
        </Reveal>

        <p className="ld-disclaimer">{s.disclaimer}</p>
      </div>
    </section>
  );
}

/* ---------------- scars and incisions ---------------- */
export function LandingScars({ content }: Props) {
  const s = content.scars;
  if (!s) return null;
  const videos = s.videos ?? [];
  const hasMedia = s.cases.length + videos.length > 0;

  return (
    <section className="bg-white section-py-lg" id="scars">
      <div className="container">
        <div className={hasMedia ? "ld-scars" : "ld-scars ld-scars--solo"}>
          <div className="ld-split-copy ld-scars-copy">
            <Eyebrow>{s.eyebrow}</Eyebrow>
            <h2 className="h-sec">{s.heading}</h2>
            <Divider />
            <p className="ld-lead">{s.intro}</p>
            {!hasMedia && s.note && <p className="ld-muted">{s.note}</p>}
          </div>

          <Reveal as="ul" className="ld-points ld-points--stack ld-scars-facts">
            {s.facts.map((f) => (
              <li key={f.title}>
                <strong>{f.title}</strong>
                <span>{f.body}</span>
              </li>
            ))}
          </Reveal>

          {hasMedia && (
            <Reveal className="ld-scars-media" delay={100}>
              <CaseGrid
                cases={s.cases}
                videos={videos}
                label="Healed incisions after liposuction"
                className="ld-cases ld-cases--compact"
              />
              {s.note && <p className="ld-disclaimer">{s.note}</p>}
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}

/* ---------------- how it works (steps) ---------------- */
export function LandingSteps({ content }: Props) {
  const s = content.howItWorks;
  return (
    <section className="bg-cream section-py-lg" id={s.id}>
      <div className="container ld-process-layout">
        <div className="ld-steps-head">
          <Eyebrow>{s.eyebrow}</Eyebrow>
          <h2 className="h-sec">{s.heading}</h2>
          <p>{s.intro}</p>
          {s.caution && <p className="ld-caution">{s.caution}</p>}
        </div>
        <Reveal as="ol" className="ld-steps">
          {s.steps.map((st, i) => (
            <li className="ld-step" key={st.title}>
              <span className="ld-step-num" aria-hidden>
                {pad(i + 1)}
              </span>
              <h3>{st.title}</h3>
              <p>{st.body}</p>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- insurance (breast reduction) ---------------- */
export function LandingInsurance({ content }: Props) {
  const s = content.insurance;
  if (!s) return null;
  return (
    <section className="bg-white section-py-lg" id="insurance">
      <div className="container">
        <div className="ld-split ld-split-top">
          <div className="ld-split-copy">
            <Eyebrow>{s.eyebrow}</Eyebrow>
            <h2 className="h-sec">{s.heading}</h2>
            <Divider />
            <p>{s.intro}</p>
            <div className="hero-cta-group">
              <Cta link={s.cta} className="btn-primary" />
            </div>
            <p className="ld-disclaimer">{s.disclaimer}</p>
          </div>
          <Reveal as="ol" className="ld-timeline" delay={100}>
            {s.steps.map((st, i) => (
              <li key={st.title}>
                <span className="ld-timeline-step">Step {pad(i + 1)}</span>
                <h3>{st.title}</h3>
                <p>{st.body}</p>
              </li>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------------- the approach (dark) ---------------- */
export function LandingApproach({ content }: Props) {
  const s = content.approach;
  return (
    <section className="bg-aubergine section-py-lg" id="approach">
      <div className="container">
        <div className="ld-split ld-split-top">
          <Reveal className="ld-split-copy ld-on-dark">
            <Eyebrow dark>{s.eyebrow}</Eyebrow>
            <h2 className="h-sec">{s.heading}</h2>
            {s.body.map((p) => (
              <p key={p.slice(0, 40)}>{p}</p>
            ))}
            <div className="hero-cta-group" style={{ marginTop: "var(--space-4)" }}>
              {s.links.map((l, i) => (
                <Cta key={l.href} link={l} className={i === 0 ? "btn-light" : "ld-link-on-dark"} />
              ))}
            </div>
          </Reveal>
          <Reveal delay={120}>
            <StatBento stats={s.metrics} lead="light" className="ld-approach-figures" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------------- candidacy ---------------- */
export function LandingCandidacy({ content }: Props) {
  const s = content.candidacy;
  return (
    <section className="bg-white section-py-lg" id="candidate">
      <div className="container">
        <div className="ld-split ld-split-top">
          <div className="ld-split-copy">
            <Eyebrow>{s.eyebrow}</Eyebrow>
            <h2 className="h-sec">{s.heading}</h2>
            <Divider />
            <p>{s.intro}</p>
            {s.quote && <blockquote className="abt-quote">{s.quote}</blockquote>}
            <p className="ld-muted">{s.closing}</p>
          </div>
          <Reveal as="ul" className="ld-checklist" delay={100}>
            {s.items.map((i) => (
              <li key={i}>
                <Check />
                {i}
              </li>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------------- recovery ---------------- */
export function LandingRecovery({ content }: Props) {
  const s = content.recovery;
  return (
    <section className="bg-cream section-py-lg" id="recovery">
      <div className="container">
        <div className="section-header">
          <Eyebrow>{s.eyebrow}</Eyebrow>
          <h2 className="h-sec">{s.heading}</h2>
          <p className="locations-subtitle">{s.intro}</p>
        </div>
        <Reveal className="ld-grid-4 ld-ruled-grid">
          {s.cards.map((c) => (
            <article className="value-card" key={c.title}>
              <div className="value-card-body">
                <h3>{c.title}</h3>
                <p>{c.body}</p>
              </div>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- safety ---------------- */
export function LandingSafety({ content }: Props) {
  const s = content.safety;
  if (!s) return null;
  return (
    <section className="bg-white section-py-lg" id="safety">
      <div className="container">
        <div className="section-header">
          <Eyebrow>{s.eyebrow}</Eyebrow>
          <h2 className="h-sec">{s.heading}</h2>
          {s.intro && <p className="locations-subtitle">{s.intro}</p>}
        </div>
        <Reveal className="ld-grid-3 ld-ruled-grid">
          {s.cards.map((c) => (
            <article className="value-card" key={c.title}>
              <div className="value-card-body">
                <h3>{c.title}</h3>
                <p>{c.body}</p>
              </div>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- secondary topic (fat transfer / awake option) ---------------- */
export function LandingSecondary({ content }: Props) {
  const s = content.secondary;
  if (!s) return null;
  const copy = (
    <div className={s.figure ? "ld-split-copy" : "ld-prose"}>
      <Eyebrow>{s.eyebrow}</Eyebrow>
      <h2 className="h-sec">{s.heading}</h2>
      <Divider />
      {s.body.map((p) => (
        <p key={p.slice(0, 40)}>{p}</p>
      ))}
    </div>
  );
  return (
    <section className="bg-cream section-py-lg" id={s.id}>
      <div className={s.figure ? "container" : "container-tight"}>
        {s.figure ? (
          <Reveal className="ld-split">
            <FigureCard figure={s.figure} />
            {copy}
          </Reveal>
        ) : (
          <Reveal>{copy}</Reveal>
        )}
      </div>
    </section>
  );
}

/* ---------------- travel ---------------- */
export function LandingTravel({ content }: Props) {
  const s = content.travel;
  const loc = siteConfig.locations[0];
  return (
    <section className="bg-white section-py-lg" id="travel">
      <div className="container">
        <div className="ld-split ld-split-top">
          <div className="ld-split-copy">
            <Eyebrow>{s.eyebrow}</Eyebrow>
            <h2 className="h-sec">{s.heading}</h2>
            <Divider />
            <p>{s.intro}</p>
            <ul className="ld-checklist">
              {s.items.map((i) => (
                <li key={i}>
                  <Check />
                  {i}
                </li>
              ))}
            </ul>
          </div>
          <Reveal className="ld-visit" delay={100}>
            <div className="ld-office-image">
              <Image src="/img/office/office-reception.jpg" alt="Reception at the New York City practice" fill sizes="(max-width: 900px) 90vw, 44vw" />
            </div>
            <div className="ld-address-card">
            <p className="location-eyebrow">NEW YORK CITY</p>
            <p className="location-name">Madison Avenue</p>
            <p className="ld-address">
              {loc.address}
              <br />
              {loc.cityState}
            </p>
            <p className="ld-address">
              <CallLink className="text-link">{siteConfig.phone.display}</CallLink>
            </p>
            <a href={loc.directions} className="btn-secondary" target="_blank" rel="noopener noreferrer">
              Get Directions
            </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------------- meet the surgeon (procedure-first order, near the end) ---------------- */
export function LandingSurgeon({ content }: Props) {
  const s = content.surgeon;
  return (
    <section className="bg-cream section-py-lg" id="meet-kalsow">
      <div className="container">
        <div className="ld-split ld-split-top">
          <Reveal className="ld-portrait">
            <Image
              src={SURGEON_PORTRAIT.src}
              alt={SURGEON_PORTRAIT.alt}
              fill
              sizes="(max-width: 900px) 90vw, 44vw"
              loading="lazy"
            />
          </Reveal>
          <div className="ld-split-copy">
            <Eyebrow>{s.eyebrow}</Eyebrow>
            <h2 className="h-sec">{s.heading}</h2>
            <Divider />
            <p className="ld-lead">{s.lead}</p>
            {s.body.map((p) => (
              <p key={p.slice(0, 40)}>{p}</p>
            ))}
            {s.pointsHeading && <h3 className="ld-sub">{s.pointsHeading}</h3>}
            <ul className="ld-points">
              {s.points.map((p) => (
                <li key={p.title}>
                  <strong>{p.title}</strong>
                  <span>{p.body}</span>
                </li>
              ))}
            </ul>
            {s.closing && <p className="ld-closing">{s.closing}</p>}
            <div className="hero-cta-group">
              <Link href={ABOUT_PATH} className="btn-secondary">
                Learn More About Dr. Kalsow
              </Link>
              <Cta link={{ label: "Request a Consultation", href: "#consultation" }} className="btn-primary" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- consultation form intro (left column of the form section) ---------------- */
export function LandingCtaIntro({ content }: Props) {
  const s = content.finalCta;
  const loc = siteConfig.locations[0];
  return (
    <div className="contact-form-intro">
      <Eyebrow>{s.eyebrow}</Eyebrow>
      <h2 className="h-sec">{s.heading}</h2>
      <p className="form-helper">{s.body}</p>
      <p className="form-helper">
        Prefer to speak to someone?{" "}
        <CallLink className="text-link">{siteConfig.phone.display}</CallLink>
      </p>
      <p className="form-helper ld-muted">
        {loc.address} · {loc.cityState}
      </p>
    </div>
  );
}

/* ---------------- closing band (when the form sits mid-page) ---------------- */
export function LandingClosingCta({ content }: Props) {
  const s = content.closing;
  if (!s) return null;
  return (
    <section className="final-cta section-py-lg ld-closing-band">
      <div className="container-tight">
        <h2 className="h-sec">{s.heading}</h2>
        <p className="final-cta-sub">{s.body}</p>
        <div className="final-cta-actions">
          <a href="#consultation" className="btn-light">
            Request a Consultation <span aria-hidden>→</span>
          </a>
          <CallLink className="btn-secondary" aria-label={`Call ${siteConfig.phone.display}`}>
            {siteConfig.cta.call} · {siteConfig.phone.display}
          </CallLink>
        </div>
      </div>
    </section>
  );
}

/* ---------------- mobile sticky CTA ---------------- */
export function LandingStickyCta() {
  return (
    <div className="ld-sticky-cta" aria-label="Quick contact">
      <CallLink className="ld-sticky-call" aria-label={`Call ${siteConfig.phone.display}`}>
        Call
      </CallLink>
      <a href="#consultation" className="ld-sticky-book">
        Request Consultation
      </a>
    </div>
  );
}
