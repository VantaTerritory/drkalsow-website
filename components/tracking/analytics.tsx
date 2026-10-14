import Script from "next/script";
import { siteConfig } from "@/lib/site-config";

/* ============================================================
   THIRD-PARTY TAGS — ported 1:1 from the Squarespace site.

   The old site loaded three tags on every page, unconditionally:
     - Google Tag Manager container (code injection, head + noscript)
     - GA4 via gtag.js (Squarespace's native Analytics integration)
     - Meta Pixel with a PageView (Squarespace's Marketing integration)
   IDs live in siteConfig.tracking. Nothing else was found on the
   old site (no Ads, Hotjar, Clarity, CallRail, chat widgets).

   Only rendered in production so `next dev` never pollutes GA4/Meta,
   and each snippet starts only on drkalsow.com: the staging Web App
   (Hostinger, `development` branch) runs a production build too, and
   a test lead there would count as a real /thank-you conversion.
   ============================================================ */

const { gtmId, ga4Id, metaPixelId } = siteConfig.tracking;
const enabled = process.env.NODE_ENV === "production";
const onSite = `if(!/(^|\\.)drkalsow\\.com$/.test(location.hostname))return;`;

/** Script tags. Render once in the root layout (inside <body>). */
export function Analytics() {
  if (!enabled) return null;
  return (
    <>
      {/* Google Tag Manager */}
      <Script id="gtm" strategy="afterInteractive">
        {`(function(w,d,s,l,i){${onSite}w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtmId}');`}
      </Script>

      {/* GA4 (direct, as Squarespace loaded it alongside GTM) */}
      <Script id="ga4" strategy="afterInteractive">
        {`(function(d){${onSite}var j=d.createElement('script');j.async=true;j.src='https://www.googletagmanager.com/gtag/js?id=${ga4Id}';d.head.appendChild(j);window.dataLayer=window.dataLayer||[];window.gtag=function(){dataLayer.push(arguments);};gtag('js',new Date());gtag('config','${ga4Id}');})(document);`}
      </Script>

      {/* Meta Pixel */}
      <Script id="meta-pixel" strategy="afterInteractive">
        {`!function(f,b,e,v,n,t,s){${onSite}if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${metaPixelId}');fbq('track','PageView');`}
      </Script>
    </>
  );
}

/** No-JS fallbacks. Render as the first child of <body>. */
export function AnalyticsNoScript() {
  if (!enabled) return null;
  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
        title="gtm"
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        height="1"
        width="1"
        style={{ display: "none" }}
        alt=""
        src={`https://www.facebook.com/tr?id=${metaPixelId}&ev=PageView&noscript=1`}
      />
    </noscript>
  );
}
