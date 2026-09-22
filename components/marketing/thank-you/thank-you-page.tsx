import { Suspense } from "react";
import Image from "next/image";
import { siteConfig } from "@/lib/site-config";
import { Eyebrow } from "@/components/ui/eyebrow";
import { CallLink } from "@/components/ui/call-link";
import { SocialLinks } from "@/components/ui/social-links";
import { ThankYouBack, BackLink } from "@/components/marketing/thank-you/thank-you-back";

/**
 * One screen, no site chrome: a single white card floating on the soft
 * aubergine page, centred. Logo, eyebrow, headline, one line, two actions
 * (back to the page the form was on, call) and the social row. Copy is
 * deliberately short and promises no response time. H1 text as registered
 * in lib/seo/pages.ts.
 */
export function ThankYouPage() {
  return (
    <main className="thanks-page">
      <section className="thanks-card" aria-labelledby="thanks-title">
        <Image
          src="/img/logo/sk-logo.png"
          alt={siteConfig.surgeon}
          width={1213}
          height={554}
          className="thanks-logo"
          priority
        />
        <Eyebrow>Request received</Eyebrow>
        <h1 className="thanks-title" id="thanks-title">
          Thank you for{" "}
          <br />
          <em>reaching out.</em>
        </h1>
        <p className="thanks-text">
          Your request was sent successfully. Dr. Kalsow’s office will be in touch shortly.
        </p>

        <div className="thanks-actions">
          <Suspense fallback={<BackLink href="/" label="Back to home" />}>
            <ThankYouBack />
          </Suspense>
          <CallLink className="btn-secondary" aria-label={`Call ${siteConfig.phone.display}`}>
            Call {siteConfig.phone.display}
          </CallLink>
        </div>

        <div className="thanks-follow">
          <p className="thanks-follow-label">Follow us</p>
          <SocialLinks className="thanks-socials" linkClassName="thanks-social" />
        </div>
      </section>
    </main>
  );
}
