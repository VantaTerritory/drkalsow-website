import { siteConfig } from "@/lib/site-config";

/**
 * The practice's social row (mail, Instagram, YouTube, bio link), the same
 * four the live site shows. Icons are inline strokes in `currentColor`; the
 * caller styles the row and each circle through the two class names.
 */
export function SocialLinks({
  className,
  linkClassName,
  iconSize = 16,
}: {
  className: string;
  linkClassName: string;
  iconSize?: number;
}) {
  const icon = { width: iconSize, height: iconSize, viewBox: "0 0 24 24", fill: "none", "aria-hidden": true } as const;
  return (
    <div className={className}>
      <a href={siteConfig.social.email} className={linkClassName} aria-label="Email">
        <svg {...icon}>
          <rect x="3" y="5.5" width="18" height="13" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
          <path d="M3.5 7 L12 13 L20.5 7" stroke="currentColor" strokeWidth="1.2" />
        </svg>
      </a>
      <a
        href={siteConfig.social.instagram}
        className={linkClassName}
        aria-label="Instagram"
        target="_blank"
        rel="noopener noreferrer"
      >
        <svg {...icon}>
          <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" stroke="currentColor" strokeWidth="1.2" />
          <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.2" />
          <circle cx="17" cy="7" r="1.1" fill="currentColor" />
        </svg>
      </a>
      <a
        href={siteConfig.social.youtube}
        className={linkClassName}
        aria-label="YouTube"
        target="_blank"
        rel="noopener noreferrer"
      >
        <svg {...icon}>
          <rect x="2.5" y="5.5" width="19" height="13" rx="3.5" stroke="currentColor" strokeWidth="1.2" />
          <path d="M10 9 L15.5 12 L10 15 Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
        </svg>
      </a>
      <a
        href={siteConfig.social.linkHub}
        className={linkClassName}
        aria-label="All links"
        target="_blank"
        rel="noopener noreferrer"
      >
        <svg {...icon}>
          <path d="M10 14 L14 10" stroke="currentColor" strokeWidth="1.2" />
          <path d="M12.5 7.5 L14.5 5.5 A 3.53 3.53 0 0 1 19.5 10.5 L17.5 12.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M11.5 16.5 L9.5 18.5 A 3.53 3.53 0 0 1 4.5 13.5 L6.5 11.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      </a>
    </div>
  );
}
