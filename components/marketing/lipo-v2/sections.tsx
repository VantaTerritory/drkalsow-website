import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { Eyebrow, Divider } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/motion/reveal";
import { SwipeCarousel } from "@/components/ui/swipe-carousel";
import { LoopRail } from "@/components/marketing/lipo-v2/loop-rail";
import { RowArrows } from "@/components/marketing/lipo-v2/row-arrows";
import { FaqFlowAside, type FlowPanel } from "@/components/marketing/lipo-v2/faq-flow";
import { LazyGuide } from "@/components/marketing/lipo-v2/lazy-guide";
import { GUIDE_BLOCKS } from "@/lib/landings/lipo-360-v2-guide";
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
  Lv2DiagramsBlock,
  Lv2IncisionsBlock,
  Lv2TestimonialsBlock,
  Lv2DestinationBlock,
  Lv2InstagramBlock,
  Lv2FaqBlock,
  Lv2DisclosureBlock,
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

/**
 * The first photo's rendered width, for next/image to pick a sharp enough
 * file: the square portrait covers its frame by height, so it is drawn as
 * wide as the frame is tall (see LV2 · HERO for the heights).
 */
function heroPhotoSizes(layout: "single" | "pair" | "bento"): string {
  // phones: drawn about 125vw wide (its 3:4 crop is taller than the screen is wide); 100vw keeps the LCP file light
  if (layout === "single") return "(max-width: 767px) 100vw, (max-width: 899px) 540px, 500px";
  if (layout === "bento") return "(max-width: 767px) calc(76vw - 30px), (max-width: 899px) 540px, 440px";
  return "(max-width: 767px) calc(76vw - 30px), (max-width: 899px) 45vw, 460px";
}

export function HeroBlock({ block, h1 }: { block: Lv2HeroBlock; h1: string }) {
  const { photos, video } = block;
  const [first, second] = photos;
  // his portrait alone, portrait + clip, or the bento of two photos and the clip
  const layout = !video ? "single" : second ? "bento" : "pair";
  // The media row is sized from these ratios (see LV2 · HERO in lipo-v2.css).
  const frames = {
    "--lv2-photo-r": String(first.frame ?? first.width / first.height),
    ...(second && { "--lv2-photo2-r": String(second.frame ?? second.width / second.height) }),
    ...(video && { "--lv2-clip-r": String(video.width / video.height) }),
  } as CSSProperties;

  // His portrait alone (12 Oct, Nico): the backdrop of the whole first screen,
  // fading into the aubergine where the copy sits (see LV2 · HERO BACKDROP)
  if (layout === "single") {
    return (
      <section className="lv2-hero lv2-hero--backdrop lv2-dark lv2-sec" id={block.id}>
        <div className="lv2-hero-bg">
          <Image
            src={first.src}
            alt={first.alt}
            fill
            loading="eager"
            fetchPriority="high"
            sizes="(max-width: 899px) 100vw, 62vw"
          />
        </div>
        <div className="container lv2-hero-inner">
          <div className="lv2-hero-head">
            <Eyebrow dark>{block.eyebrow}</Eyebrow>
            <h1 className="h-display lv2-hero-title">
              <HeroTitle text={h1} />
            </h1>
          </div>
          <HeroDetails hero={block} placement="desktop" />
        </div>
      </section>
    );
  }

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
          <div className="lv2-hero-frames" style={frames} data-photos={photos.length} data-layout={layout}>
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
                  sizes={i === 0 ? heroPhotoSizes(layout) : "(max-width: 899px) 280px, 240px"}
                />
              </div>
            ))}
            {video && (
              <figure className="lv2-hero-clip">
                <div className="lv2-frame">
                  <LoopVideo video={video} start="load" className="lv2-fill" />
                </div>
                {video.caption && <figcaption>{video.caption}</figcaption>}
              </figure>
            )}
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
  // the lead's slot (grid area "lead" from tablet up) holds the lead or the figures' heading
  const lead = hero.statsHeading ? (
    <h2 className="lv2-lead lv2-stats-heading">{hero.statsHeading}</h2>
  ) : (
    hero.lead && (
      <p className="lv2-lead">
        {hero.lead.before}
        <strong>{hero.lead.bold}</strong>
        {hero.lead.after}
      </p>
    )
  );
  const stats = (
    <ul className="lv2-stats">
      {hero.stats.map((s) => (
        <li className="lv2-stat" key={`${s.value} ${s.label}`}>
          <strong className={s.word ? "lv2-stat-value lv2-stat-value--word" : "lv2-stat-value"}>{s.value}</strong>
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
        {block.heading && (
          <div className="section-header lv2-sec-head">
            {block.eyebrow && <Eyebrow>{block.eyebrow}</Eyebrow>}
            <h2 className="h-sec">{block.heading}</h2>
          </div>
        )}
        {block.reasons && (
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
        )}
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

/* ---------------- what Lipo 360 is, beside the marking clip ---------------- */
export function ProcedureBlock({ block }: { block: Lv2ProcedureBlock }) {
  const { marking } = block;
  return (
    <section className="bg-cream section-py-lg lv2-procedure lv2-sec" id={block.id}>
      <div className="container">
        <div className="lv2-proc-intro">
          <div className="lv2-proc-copy">
            <Eyebrow>{block.eyebrow}</Eyebrow>
            <h2 className="h-sec">{block.heading}</h2>
            <Divider />
            {/* the section's first subtitle (12 Oct), as the philosophy's lead that follows */}
            <p className="lv2-proc-support">{block.support}</p>
            {block.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <figure className="lv2-proc-still">
            {marking.video ? (
              <div className="lv2-frame lv2-frame--bubble lv2-proc-clip" style={ratio(marking.video)}>
                <LoopVideo video={marking.video} start="visible" className="lv2-fill" />
              </div>
            ) : (
              marking.image && (
                <div className="lv2-frame lv2-frame--bubble" style={ratio(marking.image)}>
                  <Image
                    src={marking.image.src}
                    alt={marking.image.alt}
                    fill
                    sizes="(max-width: 479px) 92vw, 440px"
                  />
                </div>
              )
            )}
            <figcaption className="lv2-cap">{marking.caption}</figcaption>
          </figure>
        </div>

      </div>
    </section>
  );
}

/* ---------------- the three diagrams ---------------- */
export function DiagramsBlock({ block }: { block: Lv2DiagramsBlock }) {
  return (
    <section className="bg-cream section-py-lg lv2-procedure lv2-sec" id={block.id}>
      <div className="container">
        <div className="lv2-diagrams-intro">
          <h2 className="lv2-h3">{block.heading}</h2>
          <p>{block.body}</p>
        </div>

        {/* the three diagrams back to back, in the doctor's order: nothing goes between them.
            Phones and tablets swipe them (12 Oct); desktops with a pointer turn each card over
            on hover to read its areas, the caption under it kept for screen readers (LV2 · DIAGRAM CARDS) */}
        <Reveal className="lv2-diagrams-wrap">
          <SwipeCarousel className="lv2-diagrams" count={block.diagrams.length} label="Lipo 360 area diagrams" itemNoun="diagram">
            {block.diagrams.map((d) => (
              <figure className="lv2-diagram" key={d.src}>
                <div className="lv2-diagram-card" tabIndex={0}>
                  <div className="lv2-diagram-inner">
                    <div className="lv2-diagram-frame">
                      <Image
                        src={d.src}
                        alt={d.alt}
                        width={d.width}
                        height={d.height}
                        sizes="(max-width: 767px) 82vw, (max-width: 899px) 46vw, (max-width: 1199px) 31vw, 360px"
                      />
                    </div>
                    <div className="lv2-diagram-back" aria-hidden="true">
                      <p>
                        <LeadIn text={d.caption} />
                      </p>
                    </div>
                  </div>
                </div>
                <figcaption className="lv2-cap">
                  <LeadIn text={d.caption} />
                </figcaption>
              </figure>
            ))}
          </SwipeCarousel>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- scars and incisions ---------------- */
export function IncisionsBlock({ block }: { block: Lv2IncisionsBlock }) {
  return (
    <section className="bg-cream section-py-lg lv2-procedure lv2-sec" id={block.id}>
      <div className="container">
        <div className="lv2-incisions">
          <div className="lv2-inc-copy">
            <Eyebrow>{block.eyebrow}</Eyebrow>
            <h2 className="lv2-h3">{block.heading}</h2>
            <p>{block.body}</p>
            {/* 12 Oct (Nico): the figure and the three facts as one row of same-size cards, scrolled sideways */}
            <div className="lv2-row-wrap">
            <RowArrows track=".lv2-inc-row" label="card" />
            <SwipeCarousel className="lv2-inc-row" count={block.facts.length + 1} label={block.heading} itemNoun="card">
              <div className="lv2-inc-card lv2-inc-card--figure">
                <strong>{block.figure.value}</strong>
                <span>{block.figure.label}</span>
              </div>
              {block.facts.map((f) => (
                <div className="lv2-inc-card" key={f.title}>
                  <strong>{f.title}</strong>
                  <span>{f.body}</span>
                </div>
              ))}
            </SwipeCarousel>
            </div>
          </div>
          <figure className="lv2-inc-media">
            <div className="lv2-frame" style={ratio(block.video)}>
              <LoopVideo video={block.video} start="visible" className="lv2-fill" />
            </div>
            {block.video.caption && <figcaption className="lv2-cap">{block.video.caption}</figcaption>}
          </figure>
        </div>
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
      </div>
      {/* an endless row from the container's left edge off the right of the screen (12 Oct) */}
      <Reveal className="lv2-tst-reveal">
        <LoopRail label={block.heading}>
          {block.videos.map((v) => (
            <figure className="lv2-tst-item" key={v.src}>
              <div className="lv2-frame" style={ratio(v)}>
                <VideoFacade video={v} className="lv2-fill" />
              </div>
              <ClipCaption video={v} />
            </figure>
          ))}
        </LoopRail>
      </Reveal>
      {/* phones: the button after the videos (the one in the head shows from tablet up) */}
      <div className="container lv2-tst-more-foot">
        <Link href={block.more.href} className="btn-secondary lv2-tst-more">
          {block.more.label}
        </Link>
      </div>
    </section>
  );
}

/* ---------------- destination practice ---------------- */
export function DestinationBlock({ block }: { block: Lv2DestinationBlock }) {
  const { intro, mosaic } = block;
  return (
    <section className={`${toneClass(block.tone, "white")} section-py-lg lv2-destination lv2-sec`} id={block.id}>
      <div className="container">
        {intro && (
          <div className="lv2-dest-intro">
            <div className="lv2-dest-copy">
              <Eyebrow>{intro.eyebrow}</Eyebrow>
              <h2 className="h-sec">{intro.heading}</h2>
              <Divider />
              {intro.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <aside className="lv2-approach">
              <h3 className="lv2-approach-title">{intro.approach.title}</h3>
              <ul className="lv2-dots">
                {intro.approach.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </aside>
          </div>
        )}

        {/* one mosaic, no holes: portrait | practice and team over the call panel | reel */}
        {mosaic && (
          <Reveal className="lv2-dest-grid" data-images={mosaic.images.length} data-reel={mosaic.reel ? undefined : "none"}>
            <div className="lv2-dest-portrait">
              <Image
                src={mosaic.portrait.src}
                alt={mosaic.portrait.alt}
                fill
                sizes="(max-width: 767px) 92vw, (max-width: 1023px) 30vw, 270px"
              />
            </div>
            {mosaic.images.map((img, i) => (
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
            {mosaic.reel && (
              <figure className="lv2-dest-reel">
                {/* 9:16 from CSS (lv2-frame--reel), so the mosaic can let it stretch */}
                <div className="lv2-frame lv2-frame--reel">
                  <VideoFacade video={mosaic.reel} className="lv2-fill" />
                </div>
                <ClipCaption video={mosaic.reel} />
              </figure>
            )}
            <div className="lv2-dest-call lv2-dark">
              <div>
                <h3>{mosaic.call.heading}</h3>
                <p>{mosaic.call.body}</p>
              </div>
              <CallCta link={mosaic.call.link} location="destination" className="btn-light" />
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}

/* ---------------- Instagram: the reel, then photos that open his profile ---------------- */
export function InstagramBlock({ block }: { block: Lv2InstagramBlock }) {
  return (
    <section className={`${toneClass(block.tone, "white")} section-py-lg lv2-ig lv2-sec`} id={block.id}>
      <div className="container">
        <div className="lv2-ig-head">
          <div>
            <Eyebrow>{block.eyebrow}</Eyebrow>
            <h2 className="h-sec">{block.heading}</h2>
            <p className="lv2-intro">{block.intro}</p>
          </div>
          <a className="btn-secondary" href={block.follow.href} target="_blank" rel="noopener noreferrer">
            {block.follow.label}
          </a>
        </div>
        {/* a feed bento (12 Oct): the reel plays on its own, muted, with a sound control;
            the photos and the loop around it, each photo opening his profile (LV2 · IG BENTO) */}
        <div className="lv2-ig-bento" data-posts={block.posts.length}>
          <figure className="lv2-ig-tile lv2-ig-reel">
            <LoopVideo video={block.reel} start="visible" sound className="lv2-fill" />
            <figcaption className="lv2-ig-cap">
              <strong>{block.reel.title}</strong>
            </figcaption>
          </figure>
          {block.posts.map((post, i) => (
            <a
              className={`lv2-ig-tile lv2-ig-post lv2-ig-post--${i}`}
              href={block.follow.href}
              target="_blank"
              rel="noopener noreferrer"
              key={post.src}
            >
              <Image src={post.src} alt={post.alt} fill sizes="(max-width: 767px) 40vw, 280px" />
              <span className="lv2-ig-cap">
                <strong>{post.caption}</strong>
              </span>
            </a>
          ))}
          {block.loop && (
            <figure className="lv2-ig-tile lv2-ig-loop">
              <LoopVideo video={block.loop} start="visible" className="lv2-fill" />
            </figure>
          )}
        </div>
        <p className="lv2-ig-hint">{block.hint}</p>
      </div>
    </section>
  );
}

/* ---------------- FAQ (native details: opens without JavaScript) ---------------- */
export function FaqBlock({ block }: { block: Lv2FaqBlock }) {
  // the question sets that continue it (12 Oct): their titles and photos for the pinned panel
  const sets = (block.continues ?? [])
    .map((id) => GUIDE_BLOCKS.find((b): b is Lv2DisclosureBlock => b.id === id && b.kind === "disclosure"))
    .filter((b): b is Lv2DisclosureBlock => !!b);
  const panels: FlowPanel[] = [
    { id: block.id, eyebrow: block.eyebrow, heading: block.heading, photo: block.photo },
    ...sets.map((s) => ({ id: s.id, eyebrow: s.eyebrow, heading: s.heading, photo: s.photo })),
  ];
  const groups = (
    <div className="lv2-faq-groups" tabIndex={0} role="region" aria-label={`${block.heading}. Scroll for more questions.`}>
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
    </div>
  );

  if (!sets.length) {
    return (
      <section className={`${toneClass(block.tone, "cream")} section-py-lg lv2-faq lv2-sec`} id={block.id}>
        <div className="container-tight">
          <div className="section-header lv2-faq-head">
            <Eyebrow>{block.eyebrow}</Eyebrow>
            <h2 className="h-sec">{block.heading}</h2>
          </div>
          <Reveal>{groups}</Reveal>
        </div>
      </section>
    );
  }

  // one section: the sets run down the right, the pinned panel on the left follows them (LV2 · FAQ FLOW)
  return (
    <section className={`${toneClass(block.tone, "cream")} section-py-lg lv2-faq lv2-flow lv2-sec`} id={block.id}>
      <div className="container lv2-flow-grid">
        <FaqFlowAside panels={panels} />
        <div className="lv2-flow-sets">
          <div className="lv2-flow-set" data-flow-set={block.id}>
            <div className="lv2-flow-head">
              <Eyebrow>{block.eyebrow}</Eyebrow>
              <h2 className="h-sec">{block.heading}</h2>
            </div>
            {groups}
          </div>
          {sets.map((s) => (
            <LazyGuide id={s.id} key={s.id} />
          ))}
        </div>
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
        {block.assessment ? (
          // his promise as the band's second voice (12 Oct): a large statement, not a side note
          <figure className="lv2-assessment">
            <figcaption>{block.assessment.title}</figcaption>
            <blockquote>
              <p>{block.assessment.body}</p>
            </blockquote>
            <span className="lv2-assessment-sign">Dr. Sergei Kalsow, MD</span>
          </figure>
        ) : (
          block.image && (
            <div className="lv2-closing-media">
              <Image src={block.image.src} alt={block.image.alt} fill sizes="(max-width: 479px) 92vw, 440px" />
            </div>
          )
        )}
      </div>
    </section>
  );
}

/** Left column of the consultation form (same markup as variant A's form intro). */
export function ConsultationIntro({ block }: { block: Lv2ConsultationBlock }) {
  const loc = siteConfig.locations[0];
  return (
    <div className="contact-form-intro">
      {/* a small result floated beside the heading (round 3) */}
      {block.photo && (
        <span className="lv2-consult-photo">
          <Image src={block.photo.src} alt={block.photo.alt} fill sizes="144px" />
        </span>
      )}
      <Eyebrow>{block.eyebrow}</Eyebrow>
      <h2 className="h-sec">{block.heading}</h2>
      <p className="form-helper">{block.body}</p>
      <p className="form-helper">
        Prefer to speak to someone?{" "}
        <a
          href={`tel:${siteConfig.phone.tel}`}
          className="text-link"
          data-cta-location={block.id === "consultation" ? "consultation_intro" : `${block.id.replace(/-/g, "_")}_intro`}
        >
          {siteConfig.phone.display}
        </a>
      </p>
      <p className="form-helper ld-muted">
        {loc.address} · {loc.cityState}
      </p>
      {block.teamPhoto && (
        <span className="lv2-consult-team" style={ratio(block.teamPhoto)}>
          <Image src={block.teamPhoto.src} alt={block.teamPhoto.alt} fill sizes="(max-width: 899px) 92vw, 480px" />
        </span>
      )}
      {/* the patients' messages (12 Oct): a swipe row, pictures and not links (client's wish) */}
      {block.messages && (
        <div className="lv2-row-wrap">
        <RowArrows track=".lv2-consult-msgs" label="message" />
        <SwipeCarousel className="lv2-consult-msgs" count={block.messages.length} label="Messages from Dr. Kalsow's patients" itemNoun="message">
          {block.messages.map((m) => (
            <span className="lv2-consult-msg" style={ratio(m)} key={m.src}>
              <Image src={m.src} alt={m.alt} fill sizes="220px" />
            </span>
          ))}
        </SwipeCarousel>
        </div>
      )}
    </div>
  );
}
