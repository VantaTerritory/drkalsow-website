import Image from "next/image";
import Link from "next/link";
import { ALL_PROCEDURES, PROCEDURE_CATEGORIES } from "@/lib/seo/pages";

const CATEGORY_LABEL = Object.fromEntries(PROCEDURE_CATEGORIES.map((c) => [c.key, c.label]));

/* Curated B/A composites (from the client's own galleries: drkalsow.com
   procedure pages + the facelift one from dreamsplasticsurgery.com/procedures).
   Breast/body picks are the most clinical of each set (side/back views). */
const BA_IMAGES: Record<string, string> = {
  "/facelift": "/img/ba/facelift.jpg",
  "/rhinoplasty": "/img/ba/rhinoplasty.jpg",
  "/blepharoplasty": "/img/ba/blepharoplasty.jpg",
  "/chin-lipo": "/img/ba/chin-lipo.jpg",
  "/lip-augmentation": "/img/ba/lip-augmentation.jpg",
  "/hair-transplant": "/img/ba/hair-transplant.jpg",
  "/arm-lipo-1": "/img/ba/arm-lipo-1.jpg",
  "/breast-augmentation": "/img/ba/breast-augmentation.jpg",
  "/breast-lift-and-reduction-1": "/img/ba/breast-lift-and-reduction-1.jpg",
  "/awake-fat-transfer-to-breast": "/img/ba/awake-fat-transfer-to-breast.jpg",
  "/lipo-360-bbl": "/img/ba/lipo-360-bbl.jpg",
  "/skinny-bbl": "/img/ba/skinny-bbl.jpg",
};

/* One full set of cards. The marquee renders it twice (second copy is
   aria-hidden and untabbable) and slides the track -50% for a seamless loop. */
function CardRow({ clone = false }: { clone?: boolean }) {
  return (
    <div className="ba-marquee-group" aria-hidden={clone || undefined}>
      {ALL_PROCEDURES.map((p) => (
        <Link key={p.path} href={p.path} className="ba-card" tabIndex={clone ? -1 : undefined}>
          <div className="ba-card-media" data-cat={p.category}>
            {BA_IMAGES[p.path] && (
              <Image
                src={BA_IMAGES[p.path]}
                alt={clone ? "" : `${p.label} before and after result`}
                fill
                sizes="(max-width: 900px) 70vw, 22vw"
                loading="lazy"
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
 * Infinite marquee of before/after cards (same pattern as the membership
 * strip): linear auto-scroll, pauses on hover. Under prefers-reduced-motion
 * it degrades to a plain scrollable row with the clone hidden.
 */
export function BaCarousel() {
  return (
    <div className="ba-marquee">
      <div className="ba-marquee-track">
        <CardRow />
        <CardRow clone />
      </div>
    </div>
  );
}
