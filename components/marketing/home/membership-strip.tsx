import Image from "next/image";
import { siteConfig } from "@/lib/site-config";

/** Infinite auto-scrolling strip of board/society logos, under the hero. */
export function MembershipStrip() {
  // Repeat the 4 memberships so each half of the track fills the viewport,
  // then duplicate the whole set for a seamless -50% loop.
  const half = [...siteConfig.memberships, ...siteConfig.memberships, ...siteConfig.memberships];
  const items = [...half, ...half];

  return (
    <section className="bg-cream membership-section" aria-label="Memberships and certifications">
      <div className="marquee">
        <div className="membership-track">
          {items.map((m, i) => (
            <div
              className="membership-item"
              key={`${m.short}-${i}`}
              title={m.label}
              aria-hidden={i >= siteConfig.memberships.length}
            >
              <Image
                src={m.logo}
                alt={i < siteConfig.memberships.length ? m.label : ""}
                width={100}
                height={100}
                loading="lazy"
              />
              <span className="membership-name">{m.short}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
