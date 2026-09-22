import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { CallLink } from "@/components/ui/call-link";
import { SocialLinks } from "@/components/ui/social-links";
import { ThankYouClose, CloseLink } from "@/components/marketing/thank-you/thank-you-close";

/**
 * One screen, no site chrome: the signature top left, an X top right that
 * returns to the page the form was on, the message on the right half and the
 * social row at the foot. Copy is deliberately short and promises no
 * response time. H1 text as registered in lib/seo/pages.ts.
 */
export function ThankYouPage() {
  return (
    <main className="thanks-page">
      <header className="thanks-top">
        <Link href="/" className="thanks-logo" aria-label={siteConfig.surgeon}>
          <Image src="/img/logo/sk-logo.png" alt={siteConfig.surgeon} width={1213} height={554} priority />
        </Link>
        <Suspense fallback={<CloseLink href="/" label="Back to home" />}>
          <ThankYouClose />
        </Suspense>
      </header>

      <div className="thanks-message">
        <h1 className="thanks-title">
          Thank you for{" "}
          <br />
          <em>reaching out.</em>
        </h1>
        <p className="thanks-text">
          Your request was sent successfully.
          <br />
          Dr. Kalsow’s office will be in touch shortly.
        </p>
        <p className="thanks-phone">
          Need to reach us sooner? Call{" "}
          <CallLink className="text-link">{siteConfig.phone.display}</CallLink>.
        </p>
      </div>

      <div className="thanks-follow">
        <p className="thanks-follow-label">Follow us</p>
        <SocialLinks className="thanks-socials" linkClassName="thanks-social" iconSize={18} />
      </div>
    </main>
  );
}
