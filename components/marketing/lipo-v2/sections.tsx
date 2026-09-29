import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { Eyebrow, Divider } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/motion/reveal";
import { SwipeCarousel } from "@/components/ui/swipe-carousel";
import { LoopVideo, VideoFacade } from "@/components/marketing/lipo-v2/media";
import { NearImageRow } from "@/components/marketing/lipo-v2/deferred";
import type {
  Lv2Link,
  Lv2Video,
  Lv2Tone,
  Lv2HeroBlock,
  Lv2WhyBlock,
  Lv2CalloutBlock,
  Lv2ProcedureBlock,
  Lv2ExperienceBlock,
  Lv2TestimonialsBlock,
  Lv2DestinationBlock,
  Lv2FaqBlock,
  Lv2ClosingBlock,
  Lv2ConsultationBlock,
} from "@/lib/landings/lipo-360-v2";

/* ============================================================
   Awake Lipo 360, variant B: its own sections (the results are in
   results.tsx, the long-form sections of draft 2 in guide.tsx).
   Layout only: the copy comes from lib/landings/lipo-360-v2.ts (and
   siteConfig for the phone and the address). Styled by the lv2-* rules
   between LV2-SECTIONS-START / END in lipo-v2.css plus the shared
   primitives (h-display, h-sec, eyebrow, buttons, faq, form intro), so
   nothing here reaches variant A.
   Media frames: each LoopVideo / VideoFacade gets a sized .lv2-frame and
   the .lv2-fill class, which pins its root to the frame's box.
   Tel links carry data-cta-location for the page's click_to_call event.
   ============================================================ */

const pad = (n: number) => String(n).padStart(2, "0");

/** Intrinsic ratio of an image or clip, for the frame that holds it. */
const ratio = (m: { width: number; height: number }): CSSProperties => ({ aspectRatio: `${m.width} / ${m.height}` });

/** Section background for a light tone (lavender is B's own, see LV2 · SHARED). */
export const toneClass = (tone: Lv2Tone | undefined, fallback: Lv2Tone): string =>
  ({ white: "bg-white", cream: "bg-cream", lavender: "lv2-lavender" })[tone ?? fallback];

function CallCta({ link, location, className }: { link: Lv2Link; location: string; className: string }) {
  return (
    <a href={link.href} className={className} data-cta-location={location}>
      {link.label}
    </a>
  );
}

function RequestCta({ link, className }: { link: Lv2Link; className: string }) {
  return (
    <a href={link.href} className={className}>
      {link.label}
      <span aria-hidden> →</span>
    </a>
  );
}

/** "Areas included in …: upper and lower abdomen …" with the lead-in set in bold. */
function LeadIn({ text }: { text: string }) {
  const at = text.indexOf(": ");
  if (at < 0) return <>{text}</>;
  return (
    <>
      <strong>{text.slice(0, at + 1)}</strong>
      {text.slice(at + 1)}
    </>
  );
}

/** Name and detail under a clip (testimonials, the reel). */
function ClipCaption({ video }: { video: Lv2Video }) {
  return (
    <figcaption className="lv2-media-cap">
      <strong>{video.title}</strong>
      {video.caption && <span>{video.caption}</span>}
    </figcaption>
  );
}

/* ---------------- hero ---------------- */

/** "Awake Lipo 360 by Sergei Kalsow, MD": the procedure, then his name on its own line. */
function HeroTitle({ text }: { text: string }) {
  const at = text.lastIndexOf(" by ");
  if (at < 0) return <>{text}</>;
  return (
    <>
      <span className="lv2-hero-title-main">{text.slice(0, at)}</span>{" "}
      <span className="lv2-hero-title-by">{text.slice(at + 1)}</span>
    </>
  );
}

export function HeroBlock({ block, h1 }: { block: Lv2HeroBlock; h1: string }) {
  const { photos, video } = block;
  const [first, second] = photos;
  // The media row is sized from these ratios (see LV2 · HERO in lipo-v2.css).
  const frames = {
    "--lv2-photo-r": String(first.frame ?? first.width / first.height),
    ...(second && { "--lv2-photo2-r": String(second.frame ?? second.width / second.height) }),
    "--lv2-clip-r": String(video.width / video.height),
  } as CSSProperties;

  return (
    <section className="lv2-hero lv2-dark lv2-sec" id={block.id}>
      <div className="container lv2-hero-grid">
        <div className="lv2-hero-head">
          <Eyebrow dark>{block.eyebrow}</Eyebrow>
          <h1 className="h-display lv2-hero-title">
            <HeroTitle text={h1} />
          </h1>
        </div>

        <div className="lv2-hero-media">
          <div className="lv2-hero-frames" style={frames} data-photos={photos.length}>
            {photos.slice(0, 2).map((p, i) => (
              <div className={`lv2-hero-photo lv2-hero-photo--${i}`} key={p.src}>
                {/* the first is the LCP: eager + high priority (Next 16 advises this over
                    `preload`); the second is not shown on phones, so it waits (lazy) */}
                <Image
                  src={p.src}
                  alt={p.alt}
                  fill
                  loading={i === 0 ? "eager" : "lazy"}
                  fetchPriority={i === 0 ? "high" : undefined}
                  sizes={i === 0 ? "(max-width: 767px) calc(57vw - 23px), (max-width: 899px) 35vw, 240px" : "(max-width: 899px) 31vw, 210px"}
                />
              </div>
            ))}
            <figure className="lv2-hero-clip">
              <div className="lv2-frame">
                <LoopVideo video={video} start="load" className="lv2-fill" />
              </div>
              {video.caption && <figcaption>{video.caption}</figcaption>}
            </figure>
          </div>
        </div>

        <HeroDetails hero={block} placement="desktop" />
      </div>
    </section>
  );
}

/**
 * The hero's lead, figures and CTAs. placement="desktop" renders inside the
 * hero (hidden on phones); placement="mobile" is rendered by the page after
 * the block named in hero.mobileDetailsAfter (hidden from tablet up).
 */
export function HeroDetails({ hero, placement }: { hero: Lv2HeroBlock; placement: "desktop" | "mobile" }) {
  const lead = (
    <p className="lv2-lead">
      {hero.lead.before}
      <strong>{hero.lead.bold}</strong>
      {hero.lead.after}
    </p>
  );
  const stats = (
    <ul className="lv2-stats">
      {hero.stats.map((s) => (
        <li className="lv2-stat" key={`${s.value} ${s.label}`}>
          <strong className="lv2-stat-value">{s.value}</strong>
          <span className="lv2-stat-label">{s.label}</span>
        </li>
      ))}
    </ul>
  );
  const ctas = (location: string) => (
    <div className="lv2-ctas">
      <CallCta link={hero.call} location={location} className="btn-light" />
      <RequestCta link={hero.primary} className="lv2-btn-ghost" />
    </div>
  );

  if (placement === "desktop") {
    // from tablet up this wrapper dissolves (see LV2 · HERO): its three parts are cells of the hero grid
    return (
      <div className="lv2-details lv2-details--desktop">
        {lead}
        {ctas("hero")}
        {stats}
      </div>
    );
  }
  return (
    <div className="lv2-details lv2-details--mobile lv2-dark lv2-sec">
      <div className="container">
        {/* phones: the white-coat photo, not in the hero there, as a small arch beside his name */}
        <div className="lv2-details-id">
          {hero.avatar && (
            <span className="lv2-details-avatar">
              <Image src={hero.avatar.src} alt={hero.avatar.alt} width={hero.avatar.width} height={hero.avatar.height} sizes="56px" />
            </span>
          )}
          <Eyebrow dark>{siteConfig.surgeon}</Eyebrow>
        </div>
        {lead}
        {stats}
        {ctas("hero_mobile")}
      </div>
    </div>
  );
}

/* ---------------- why patients choose him ---------------- */
export function WhyBlock({ block }: { block: Lv2WhyBlock }) {
  // the row's total ratio, so from 900px it can scale down until all four fit (LV2 · WHY)
  const shots = {
    "--lv2-shots-r": block.messages.reduce((sum, m) => sum + m.width / m.height, 0).toFixed(4),
    "--lv2-shots-n": String(block.messages.length),
  } as CSSProperties;
  return (
    <section className="bg-cream section-py-lg lv2-why lv2-sec" id={block.id}>
      <div className="container">
        <div className="section-header lv2-sec-head">
          <Eyebrow>{block.eyebrow}</Eyebrow>
          <h2 className="h-sec">{block.heading}</h2>
        </div>
        <Reveal as="ol" className="lv2-ruled lv2-why-reasons">
          {block.reasons.map((r, i) => (
            <li key={r.title}>
              <span className="lv2-ruled-num" aria-hidden>
                {pad(i + 1)}
              </span>
              <h3>{r.title}</h3>
              <p>{r.body}</p>
            </li>
          ))}
        </Reveal>
        {/* The patients' messages: pictures only, they do not open (the client's call).
            Each at its own ratio on one row height; wider than the row, it scrolls sideways.
            Mounted near the viewport (see deferred.tsx): on phones they sit just under the
            first screen and would load with the hero photo. */}
        <NearImageRow
          images={block.messages}
          className="lv2-why-msgs"
          itemClassName="lv2-why-msg"
          label="Messages from Dr. Kalsow’s patients"
          sizes="(max-width: 767px) 250px, 300px"
          style={shots}
        />
      </div>
    </section>
  );
}

/* ---------------- a statement on a tinted tile ---------------- */
export function CalloutBlock({ block }: { block: Lv2CalloutBlock }) {
  return (
    <section className={`${toneClass(block.tone, "white")} section-py-lg lv2-callout lv2-sec`} id={block.id}>
      <div className="container">
        <Reveal className="lv2-callout-tile">
          <Eyebrow>{block.eyebrow}</Eyebrow>
          <h2 className="h-sec">{block.heading}</h2>
          <p>{block.body}</p>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- what Lipo 360 is, the diagrams, the incisions ---------------- */
export function ProcedureBlock({ block }: { block: Lv2ProcedureBlock }) {
  const { marking, diagrams, incisions } = block;
  return (
    <section className="bg-cream section-py-lg lv2-procedure lv2-sec" id={block.id}>
      <div className="container">
        <div className="lv2-proc-intro">
          <div className="lv2-proc-copy">
            <Eyebrow>{block.eyebrow}</Eyebrow>
            <h2 className="h-sec">{block.heading}</h2>
            <Divider />
            {block.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <p className="lv2-proc-support">{block.support}</p>
          </div>
          <figure className="lv2-proc-still">
            <div className="lv2-frame lv2-frame--bubble" style={ratio(marking.image)}>
              <Image
                src={marking.image.src}
                alt={marking.image.alt}
                fill
                sizes="(max-width: 479px) 92vw, 440px"
              />
            </div>
            <figcaption className="lv2-cap">{marking.caption}</figcaption>
          </figure>
        </div>

        {block.diagramsIntro && (
          <div className="lv2-diagrams-intro">
            <h3 className="lv2-h3">{block.diagramsIntro.heading}</h3>
            <p>{block.diagramsIntro.body}</p>
          </div>
        )}

        {/* the three diagrams back to back, in the doctor's order: nothing goes between them */}
        <Reveal className="lv2-diagrams">
          {diagrams.map((d) => (
            <figure className="lv2-diagram" key={d.src}>
              <div className="lv2-diagram-frame">
                <Image
                  src={d.src}
                  alt={d.alt}
                  width={d.width}
                  height={d.height}
                  sizes="(max-width: 767px) 92vw, (max-width: 1199px) 31vw, 360px"
                />
              </div>
              <figcaption className="lv2-cap">
                <LeadIn text={d.caption} />
              </figcaption>
            </figure>
          ))}
        </Reveal>

        <div className="lv2-incisions" id={incisions.id}>
          <div className="lv2-inc-copy">
            <Eyebrow>{incisions.eyebrow}</Eyebrow>
            <h3 className="lv2-h3">{incisions.heading}</h3>
            <p>{incisions.body}</p>
            {/* point data in a tile; the explanation stays text */}
            <p className="lv2-figure-tile">
              <strong>{incisions.figure.value}</strong>
              <span>{incisions.figure.label}</span>
            </p>
          </div>
          <figure className="lv2-inc-media">
            <div className="lv2-frame" style={ratio(incisions.video)}>
              <LoopVideo video={incisions.video} start="visible" className="lv2-fill" />
            </div>
            {incisions.video.caption && <figcaption className="lv2-cap">{incisions.video.caption}</figcaption>}
          </figure>
          <ul className="lv2-facts">
            {incisions.facts.map((f) => (
              <li key={f.title}>
                <strong>{f.title}</strong>
                <span>{f.body}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ---------------- experience ---------------- */
export function ExperienceBlock({ block }: { block: Lv2ExperienceBlock }) {
  return (
    <section className={`${toneClass(block.tone, "white")} section-py-lg lv2-experience lv2-sec`} id={block.id}>
      <div className="container">
        <div className="section-header lv2-sec-head">
          <Eyebrow>{block.eyebrow}</Eyebrow>
          <h2 className="h-sec">{block.heading}</h2>
        </div>
        <Reveal as="ol" className="lv2-ruled">
          {block.cards.map((c, i) => (
            <li key={c.title}>
              <span className="lv2-ruled-num" aria-hidden>
                {pad(i + 1)}
              </span>
              <h3>{c.title}</h3>
              <p>{c.body}</p>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- testimonials ---------------- */
export function TestimonialsBlock({ block }: { block: Lv2TestimonialsBlock }) {
  return (
    <section className={`${toneClass(block.tone, "cream")} section-py-lg lv2-testimonials lv2-sec`} id={block.id}>
      <div className="container lv2-tst">
        <div className="lv2-tst-head">
          <Eyebrow>{block.eyebrow}</Eyebrow>
          <h2 className="h-sec">{block.heading}</h2>
          <p className="lv2-intro">{block.intro}</p>
        </div>
        <Link href={block.more.href} className="btn-secondary lv2-tst-more">
          {block.more.label}
        </Link>
        {/* a grid from tablet up, one swipe track with dots on phones */}
        <Reveal className="lv2-tst-reveal">
          <SwipeCarousel
            className="lv2-tst-track"
            count={block.videos.length}
            label={block.heading}
            itemNoun="video"
          >
            {block.videos.map((v) => (
              <figure className="lv2-tst-item" key={v.src}>
                <div className="lv2-frame" style={ratio(v)}>
                  <VideoFacade video={v} className="lv2-fill" />
                </div>
                <ClipCaption video={v} />
              </figure>
            ))}
          </SwipeCarousel>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- destination practice ---------------- */
export function DestinationBlock({ block }: { block: Lv2DestinationBlock }) {
  const { approach, portrait, images, reel, call } = block;
  return (
    <section className={`${toneClass(block.tone, "white")} section-py-lg lv2-destination lv2-sec`} id={block.id}>
      <div className="container">
        <div className="lv2-dest-intro">
          <div className="lv2-dest-copy">
            <Eyebrow>{block.eyebrow}</Eyebrow>
            <h2 className="h-sec">{block.heading}</h2>
            <Divider />
            {block.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <aside className="lv2-approach">
            <h3 className="lv2-approach-title">{approach.title}</h3>
            <ul className="lv2-dots">
              {approach.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </aside>
        </div>

        {/* one mosaic, no holes: portrait | practice and team over the call panel | reel */}
        <Reveal className="lv2-dest-grid" data-images={images.length}>
          <div className="lv2-dest-portrait">
            <Image
              src={portrait.src}
              alt={portrait.alt}
              fill
              sizes="(max-width: 767px) 92vw, (max-width: 1023px) 30vw, 270px"
            />
          </div>
          {images.map((img, i) => (
            <figure className={`lv2-dest-img lv2-dest-img--${i}`} key={img.src}>
              <div className="lv2-frame lv2-frame--photo">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 767px) 46vw, (max-width: 1023px) 36vw, 270px"
                />
              </div>
              <figcaption className="lv2-cap">{img.caption}</figcaption>
            </figure>
          ))}
          <figure className="lv2-dest-reel">
            {/* 9:16 from CSS (lv2-frame--reel), so the mosaic can let it stretch */}
            <div className="lv2-frame lv2-frame--reel">
              <VideoFacade video={reel} className="lv2-fill" />
            </div>
            <ClipCaption video={reel} />
          </figure>
          <div className="lv2-dest-call lv2-dark">
            <div>
              <h3>{call.heading}</h3>
              <p>{call.body}</p>
            </div>
            <CallCta link={call.link} location="destination" className="btn-light" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- FAQ (native details: opens without JavaScript) ---------------- */
export function FaqBlock({ block }: { block: Lv2FaqBlock }) {
  return (
    <section className={`${toneClass(block.tone, "cream")} section-py-lg lv2-faq lv2-sec`} id={block.id}>
      <div className="container-tight">
        <div className="section-header lv2-faq-head">
          <Eyebrow>{block.eyebrow}</Eyebrow>
          <h2 className="h-sec">{block.heading}</h2>
        </div>
        <Reveal className="lv2-faq-groups">
          {block.groups.map((group, gi) => (
            <div className="lv2-faq-group" key={group.title ?? gi}>
              {group.title && <h3 className="lv2-faq-group-title">{group.title}</h3>}
              <div className="faq-list">
                {group.items.map((item) => (
                  <details className="faq-item" key={item.q}>
                    <summary className="faq-question">
                      {item.q}
                      <span className="faq-marker" aria-hidden />
                    </summary>
                    <p className="faq-answer">{item.a}</p>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- closing (dark) ---------------- */
export function ClosingBlock({ block }: { block: Lv2ClosingBlock }) {
  return (
    <section className="section-py-lg lv2-closing lv2-dark lv2-sec" id={block.id}>
      <div className="container lv2-closing-grid">
        <div className="lv2-closing-copy">
          <Eyebrow dark>{block.eyebrow}</Eyebrow>
          <h2 className="h-sec">{block.heading}</h2>
          <p className="lv2-closing-body">{block.body}</p>
          <div className="lv2-ctas">
            <CallCta link={block.call} location="closing" className="btn-light" />
            <RequestCta link={block.primary} className="lv2-btn-ghost" />
          </div>
          <p className="lv2-disclaimer">{block.disclaimer}</p>
        </div>
        <div className="lv2-closing-media">
          <Image src={block.image.src} alt={block.image.alt} fill sizes="(max-width: 479px) 92vw, 440px" />
        </div>
      </div>
    </section>
  );
}

/** Left column of the consultation form (same markup as variant A's form intro). */
export function ConsultationIntro({ block }: { block: Lv2ConsultationBlock }) {
  const loc = siteConfig.locations[0];
  return (
    <div className="contact-form-intro">
      <Eyebrow>{block.eyebrow}</Eyebrow>
      <h2 className="h-sec">{block.heading}</h2>
      <p className="form-helper">{block.body}</p>
      <p className="form-helper">
        Prefer to speak to someone?{" "}
        <a href={`tel:${siteConfig.phone.tel}`} className="text-link" data-cta-location="consultation_intro">
          {siteConfig.phone.display}
        </a>
      </p>
      <p className="form-helper ld-muted">
        {loc.address} · {loc.cityState}
      </p>
    </div>
  );
}
