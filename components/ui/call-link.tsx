import { siteConfig } from "@/lib/site-config";

/** Plain tel: link. (No ad tracking on the organic site — unlike the LP.) */
export function CallLink({
  className,
  children,
  "aria-label": ariaLabel,
}: {
  className?: string;
  children: React.ReactNode;
  "aria-label"?: string;
}) {
  return (
    <a href={`tel:${siteConfig.phone.tel}`} className={className} aria-label={ariaLabel}>
      {children}
    </a>
  );
}
