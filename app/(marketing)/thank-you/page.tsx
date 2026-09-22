import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo/pages";
import { ThankYouHero, ThankYouExplore } from "@/components/marketing/thank-you/thank-you-sections";

export const metadata: Metadata = pageMetadata("/thank-you");

/**
 * /thank-you: where the consultation form sends the browser after a
 * successful submission. It is a full navigation on purpose, so GTM, GA4 and
 * the Meta Pixel register a real page view and the lead conversion can hang
 * off this URL. The origin page arrives as ?source=<path> for the tag
 * manager; the page itself is static and does not read it. noindex comes
 * from the registry; no JSON-LD, this is not a content page.
 */
export default function Page() {
  return (
    <>
      <ThankYouHero />
      <ThankYouExplore />
    </>
  );
}
