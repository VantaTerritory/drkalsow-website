import "./lipo-v2-guide.css";
import type { CSSProperties } from "react";
import Image from "next/image";
import { Eyebrow, Divider } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/motion/reveal";
import { BeforeAfterGalleryV2, type BaGalleryPatient } from "@/components/marketing/lipo-v2/ba-gallery";
import { NearImage } from "@/components/marketing/lipo-v2/deferred";
import type {
  Lv2Tone,
  Lv2Picture,
  Lv2TextItem,
  Lv2ProseBlock,
  Lv2PointsBlock,
  Lv2DisclosureBlock,
  Lv2LessonsBlock,
  Lv2RevisionBlock,
} from "@/lib/landings/lipo-360-v2";

/* ============================================================
   Awake Lipo 360, variant B: the long-form sections of the doctor's
   draft 2 (lib/landings/lipo-360-v2-guide.ts, plus the philosophy
   block of lipo-360-v2.ts). Five generic blocks: prose, points,
   disclosure, lessons and revision. Layout only, every word comes from
   the data. Styled by ./lipo-v2-guide.css (lv2-prose-*, lv2-pts-*,
   lv2-disc-*, lv2-lessons-*, lv2-rev-*) on top of the shared pieces of
   lipo-v2.css (lv2-frame, lv2-cap, lv2-intro, lv2-ruled-num, lv2-dark).
   Server components: the client parts are Reveal and the gallery.

   The client's brief for these sections: nobody reads walls of text.
   Text columns stay near 60-65ch, lists run in two or three columns on
   desktop, and the long lists are native details, closed by default.

   Tailwind scans this file: no utility names in comments or strings,
   so variant A never gets a single new rule (see AGENTS.md).
   ============================================================ */

const TONE: Record<Lv2Tone, string> = { white: "bg-white", cream: "bg-cream", lavender: "lv2-lavender" };

const pad = (n: number) => String(n).padStart(2, "0");

/** Headings never break inside the procedure's name or his: "Lipo 360", "Dr. Kalsow" (a no-break space, same words). */
const keep = (text: string) => text.replace(/\bLipo 360\b/g, "Lipo\u00a0360").replace(/\bDr\. Kalsow\b/g, "Dr.\u00a0Kalsow");

const paragraphs = (body: Lv2TextItem["body"]) => (Array.isArray(body) ? body : [body]);

/** Taller than 1.2 times its width: framed as the site's arch, the rest get the message-bubble corner. */
const isTall = (m: { width: number; height: number }) => m.height > m.width * 1.2;

/** The photo's own ratio, for CSS to use or replace (phones crop tall photos to 4:5). */
const ratioVar = (m: { width: number; height: number }) => ({ "--lv2-r": `${m.width} / ${m.height}` }) as CSSProperties;

function sectionClass(tone: Lv2Tone, own: string) {
  return `section-py-lg lv2-sec ${TONE[tone]} ${own}`;
}

/* ---------------- prose ---------------- */

function ProseFigure({ image }: { image: Lv2Picture }) {
  const tall = isTall(image);
  return (
    <figure className="lv2-prose-figure">
      <div
        className={`lv2-frame lv2-prose-frame ${tall ? "lv2-prose-frame--arch" : "lv2-frame--bubble"}`}
        style={ratioVar(image)}
      >
        {/* mounted near the viewport (deferred.tsx): the philosophy photo sits just under the first screen on phones */}
        <NearImage
          src={image.src}
          alt={image.alt}
          fill
          sizes={tall ? "(max-width: 479px) 92vw, 440px" : "(max-width: 599px) 92vw, 560px"}
        />
      </div>
      {image.caption && <figcaption className="lv2-cap">{image.caption}</figcaption>}
    </figure>
  );
}

function ProseAside({ aside }: { aside: NonNullable<Lv2ProseBlock["aside"]> }) {
  return (
    <aside className="lv2-prose-aside">
      <h3 className="lv2-prose-aside-title">{keep(aside.title)}</h3>
      {paragraphs(aside.body).map((p) => (
        <p key={p}>{p}</p>
      ))}
    </aside>
  );
}

/**
 * Heading, text and a photo beside them from 900px (on `imageSide`),
 * stacked on phones as heading, photo, text; the shorter of the two
 * sides is centred on the other. Lead-in points and the closing line run
 * under the pair across the container, so a long list never stretches
 * the text column beside a short photo. The aside rides in the text
 * column, or after the points when there are any, keeping the reading
 * sequence.
 */
export function ProseBlock({ block }: { block: Lv2ProseBlock }) {
  const { image, points, outro, aside } = block;
  const hasPoints = !!points && points.length > 0;
  const media = image ? (isTall(image) ? "tall" : "wide") : "none";

  return (
    <section id={block.id} className={sectionClass(block.tone, "lv2-prose")}>
      <div className="container">
        <div className="lv2-prose-grid" data-media={media} data-side={block.imageSide ?? "end"}>
          <div className="lv2-prose-head">
            <Eyebrow>{block.eyebrow}</Eyebrow>
            <h2 className="h-sec">{keep(block.heading)}</h2>
            <Divider />
          </div>
          {image && <ProseFigure image={image} />}
          <div className="lv2-prose-copy">
            {block.lead && <p className="lv2-prose-lead">{block.lead}</p>}
            {block.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
            {!hasPoints && outro && <p className="lv2-prose-outro">{outro}</p>}
            {!hasPoints && aside && <ProseAside aside={aside} />}
          </div>
        </div>

        {hasPoints && (
          <div className="lv2-prose-more">
            {/* "Lead-in: text" pairs: a term and its description */}
            <Reveal as="dl" className="lv2-prose-points">
              {points.map((pt) => (
                <div className="lv2-prose-point" key={pt.title}>
                  <dt>{pt.title}</dt>
                  <dd>{pt.body}</dd>
                </div>
              ))}
            </Reveal>
            {outro && <p className="lv2-prose-outro">{outro}</p>}
            {aside && <ProseAside aside={aside} />}
          </div>
        )}
      </div>
    </section>
  );
}

/* ---------------- points ---------------- */

/**
 * Titled points in a ruled grid: `columns` from 1024px, two from tablet,
 * one on phones. With a photo, the heading and the photo share the first
 * row from 900px, the heading centred on the photo; the points run below
 * across the container.
 */
export function PointsBlock({ block }: { block: Lv2PointsBlock }) {
  const { image } = block;
  return (
    <section id={block.id} className={sectionClass(block.tone, "lv2-pts")}>
      <div className="container lv2-pts-body" data-media={image ? "" : undefined}>
        <div className="lv2-pts-head" data-media={image ? "" : undefined}>
          <div className="lv2-pts-copy">
            <Eyebrow>{block.eyebrow}</Eyebrow>
            <h2 className="h-sec">{keep(block.heading)}</h2>
            {block.intro && <p className="lv2-intro">{block.intro}</p>}
          </div>
          {image && (
            <figure className="lv2-pts-figure">
              <div className="lv2-frame lv2-frame--bubble lv2-pts-frame">
                <Image src={image.src} alt={image.alt} fill sizes="(max-width: 599px) 92vw, 560px" />
              </div>
              {image.caption && <figcaption className="lv2-cap">{image.caption}</figcaption>}
            </figure>
          )}
        </div>
        <Reveal as={block.numbered ? "ol" : "ul"} className="lv2-pts-list" data-cols={block.columns}>
          {block.items.map((item, i) => (
            <li key={item.title}>
              {block.numbered && (
                <span className="lv2-ruled-num" aria-hidden>
                  {pad(i + 1)}
                </span>
              )}
              <h3>{keep(item.title)}</h3>
              {paragraphs(item.body).map((p) => (
                <p key={p}>{p}</p>
              ))}
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- disclosure ---------------- */

/**
 * Long lists as native details (they open without JavaScript), closed by
 * default. From 900px each group splits into two independent stacks,
 * the first half on the left and the second on the right, so opening an
 * item never shifts the other column. Phones read one stack after the
 * other, in the data's sequence.
 */
export function DisclosureBlock({ block }: { block: Lv2DisclosureBlock }) {
  return (
    <section id={block.id} className={sectionClass(block.tone, "lv2-disc")}>
      <div className="container">
        <div className="lv2-disc-head">
          <div className="lv2-disc-title">
            <Eyebrow>{block.eyebrow}</Eyebrow>
            <h2 className="h-sec">{keep(block.heading)}</h2>
          </div>
          {block.intro && <p className="lv2-intro">{block.intro}</p>}
        </div>
        {block.groups.map((group, gi) => {
          const half = Math.ceil(group.items.length / 2);
          const stacks = half < group.items.length ? [group.items.slice(0, half), group.items.slice(half)] : [group.items];
          return (
            <Reveal className="lv2-disc-group" key={group.title ?? `group-${gi}`}>
              {group.title && <h3 className="lv2-disc-group-title">{keep(group.title)}</h3>}
              <div className="lv2-disc-stacks">
                {stacks.map((items, si) => (
                  <div className="lv2-disc-stack" key={si}>
                    {items.map((item) => (
                      <details className="faq-item lv2-disc-item" key={item.title}>
                        <summary className="faq-question">
                          {item.title}
                          <span className="faq-marker" aria-hidden />
                        </summary>
                        <p className="faq-answer">{item.body}</p>
                      </details>
                    ))}
                  </div>
                ))}
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

/* ---------------- lessons (dark) ---------------- */

/**
 * The doctor's lessons on the dark band. From 1200px the numbered list
 * runs in two columns beside his cutout, which stands in a tall arch that
 * rises from the band's lower edge (the arch clips the photo's cut
 * edges). Below 1200px the list comes first and the arch closes the band
 * with his head and shoulders, centred.
 */
export function LessonsBlock({ block }: { block: Lv2LessonsBlock }) {
  const { portrait } = block;
  return (
    <section id={block.id} className="section-py-lg lv2-sec lv2-dark lv2-lessons">
      <div className="container lv2-lessons-grid">
        <div className="lv2-lessons-head">
          <Eyebrow dark>{block.eyebrow}</Eyebrow>
          <h2 className="h-sec">{keep(block.heading)}</h2>
        </div>
        <Reveal as="ol" className="lv2-lessons-list">
          {block.items.map((item, i) => (
            <li key={item.title}>
              <span className="lv2-lessons-num" aria-hidden>
                {pad(i + 1)}
              </span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </li>
          ))}
        </Reveal>
        <div className="lv2-lessons-figure">
          <Image
            src={portrait.src}
            alt={portrait.alt}
            width={portrait.width}
            height={portrait.height}
            sizes="(max-width: 1199px) 320px, 460px"
          />
        </div>
      </div>
    </section>
  );
}

/* ---------------- revision ---------------- */

/**
 * Revision liposuction: the heading, its sentence and the link to the
 * whole results block beside the three questions he asks himself (from
 * 900px; phones read heading, sentence, questions, link), then the views
 * of one patient of that block, with its lightbox.
 */
export function RevisionBlock({ block, patient }: { block: Lv2RevisionBlock; patient: BaGalleryPatient }) {
  return (
    <section id={block.id} className={sectionClass(block.tone, "lv2-rev")}>
      <div className="container">
        <div className="lv2-rev-head">
          <div className="lv2-rev-copy">
            <Eyebrow>{block.eyebrow}</Eyebrow>
            <h2 className="h-sec">{keep(block.heading)}</h2>
            <p className="lv2-rev-body">{block.body}</p>
          </div>
          <ol className="lv2-rev-questions">
            {block.questions.map((q, i) => (
              <li key={q}>
                <span className="lv2-rev-num" aria-hidden>
                  {pad(i + 1)}
                </span>
                <span>{q}</span>
              </li>
            ))}
          </ol>
          <div className="lv2-rev-more">
            <a href={block.link.href} className="btn-secondary">
              {block.link.label}
            </a>
          </div>
        </div>
        <div className="lv2-rev-gallery">
          <BeforeAfterGalleryV2 patients={[patient]} />
        </div>
      </div>
    </section>
  );
}
