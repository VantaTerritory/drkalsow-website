import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo/pages";
import { ThankYouPage } from "@/components/marketing/thank-you/thank-you-page";

export const metadata: Metadata = pageMetadata("/thank-you");

/**
 * /thank-you lives outside app/(marketing) on purpose: no site header or
 * footer, a single screen. The consultation form sends the browser here
 * after a successful submission as a full navigation, so GTM, GA4 and the
 * Meta Pixel register a real page view and the lead conversion can hang off
 * this URL. ?source=<path> carries the origin page and the X returns there.
 * noindex comes from the registry; no JSON-LD, this is not a content page.
 */
export default function Page() {
  return <ThankYouPage />;
}
