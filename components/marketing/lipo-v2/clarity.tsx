import Script from "next/script";

/** Terra's Microsoft Clarity project. Kept here, not in siteConfig.tracking: that module
 *  reaches variant A's client chunks, and A must download the same bytes as before. */
const CLARITY_ID = "yqes2j85p9";

/*
 * Microsoft Clarity (heatmaps and session recordings) on /lipo-360-v2 only,
 * added on 30 Sep 2026 at Terra's request; variant A stays as it is. Like
 * the site's other tags it renders only in production, and the snippet
 * starts only on drkalsow.com, so dev servers and local QA builds never send
 * sessions. lazyOnload: it loads after the page, never competing with the
 * hero photo. The two consultation forms are masked (data-clarity-mask on
 * their wrappers in lipo-v2-page.tsx): recordings never show what a patient
 * types.
 */
export function Clarity() {
  if (process.env.NODE_ENV !== "production") return null;
  const id = CLARITY_ID;
  return (
    <Script id="ms-clarity" strategy="lazyOnload">
      {`(function(c,l,a,r,i,t,y){if(!/(^|\\.)drkalsow\\.com$/.test(l.location.hostname))return;c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${id}");`}
    </Script>
  );
}
