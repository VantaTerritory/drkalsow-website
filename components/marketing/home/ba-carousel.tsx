import Image from "next/image";
import Link from "next/link";
import { ALL_PROCEDURES, PROCEDURE_CATEGORIES, getPage } from "@/lib/seo/pages";
import { HorizontalScroller } from "@/components/ui/horizontal-scroller";

const CATEGORY_LABEL = Object.fromEntries(PROCEDURE_CATEGORIES.map((c) => [c.key, c.label]));

/* Curated B/A composites (from the client's own galleries: drkalsow.com
   procedure pages + the facelift one from dreamsplasticsurgery.com/procedures).
   Breast/body picks are the most clinical of each set (side/back views). */
const BA_IMAGES: Record<string, string> = {
  "/awake-lipo-360-nyc": "/img/ba/awake-lipo-360-1.jpg",
  "/facelift": "/img/ba/facelift-1.jpg",
  "/rhinoplasty": "/img/ba/rhinoplasty-1.jpg",
  "/blepharoplasty": "/img/ba/blepharoplasty-1.jpg",
  "/chin-lipo": "/img/ba/chin-lipo-1.jpg",
  "/lip-augmentation": "/img/ba/lip-augmentation-1.jpg",
  "/hair-transplant": "/img/ba/hair-transplant-1.jpg",
  "/arm-lipo-1": "/img/ba/arm-lipo-1-1.jpg",
  "/breast-augmentation": "/img/ba/breast-augmentation-1.jpg",
  "/breast-lift-and-reduction-1": "/img/ba/breast-lift-and-reduction-1-1.jpg",
  "/awake-fat-transfer-to-breast": "/img/ba/awake-fat-transfer-to-breast-1.jpg",
  "/lipo-360-bbl": "/img/ba/lipo-360-bbl-1.jpg",
  "/skinny-bbl": "/img/ba/skinny-bbl-1.jpg",
};

/* Display order for the home: everything liposuction first (the doctor's
   emphasis, Sep 2026), then breast, face and hair. The track opens at the
   left edge, so the first cards are what a visitor sees. Anything not listed
   here falls in after, in registry order. */
const ORDER = [
  "/lipo-360-bbl",
  "/skinny-bbl",
  "/arm-lipo-1",
  "/chin-lipo",
  "/awake-fat-transfer-to-breast",
  "/breast-augmentation",
  "/breast-lift-and-reduction-1",
  "/facelift",
  "/rhinoplasty",
  "/blepharoplasty",
  "/lip-augmentation",
  "/hair-transplant",
];
const rank = (path: string) => {
  const i = ORDER.indexOf(path);
  return i === -1 ? ORDER.length : i;
};
/* The Awake Lipo 360 landing is not a procedure page (it lives outside the
   Procedures menu), but it is the doctor's flagship, so it opens the carousel. */
const AWAKE_LIPO = { ...getPage("/awake-lipo-360-nyc"), category: "body" as const };
const CARDS = [AWAKE_LIPO, ...[...ALL_PROCEDURES].sort((a, b) => rank(a.path) - rank(b.path))];

/* One set of cards. The loop renders it three times; the clones are
   aria-hidden and untabbable so screen readers and the tab order see one set. */
function CardRow({ clone = false }: { clone?: boolean }) {
  return (
    <div className="ba-group" aria-hidden={clone || undefined}>
      {CARDS.map((p) => (
        <Link key={p.path} href={p.path} className="ba-card" tabIndex={clone ? -1 : undefined}>
          <div className="ba-card-media" data-cat={p.category}>
            {BA_IMAGES[p.path] && (
              <Image
                src={BA_IMAGES[p.path]}
                alt={clone ? "" : `${p.label} before and after result`}
                fill
                sizes="(max-width: 900px) 70vw, 22vw"
                loading="lazy"
                draggable={false}
                style={{ objectFit: "cover" }}
              />
            )}
            {p.category && <span className="ba-card-chip">{CATEGORY_LABEL[p.category]}</span>}
          </div>
          <div className="ba-card-body">
            <h3 className="ba-card-title">{p.label}</h3>
            <span className="ba-card-cta">
              Before &amp; After <span aria-hidden>→</span>
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}

/**
 * Before/after cards: drifts on its own like the old marquee, and the visitor
 * can take over any time (swipe on touch, wheel or click-and-drag on desktop);
 * it resumes a moment after they let go. Seamless loop in both directions.
 * Full-bleed track whose first card lines up with the section's container edge.
 */
export function BaCarousel() {
  return (
    <HorizontalScroller
      className="ba-scroller"
      autoScroll={42}
      loop
      role="group"
      aria-label="Before and after results by procedure"
    >
      <CardRow clone />
      <CardRow />
      <CardRow clone />
    </HorizontalScroller>
  );
}
