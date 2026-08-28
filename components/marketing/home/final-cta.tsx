import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { CallLink } from "@/components/ui/call-link";

/** Consultation band before the footer: fee + request-a-callback CTA. */
export function FinalCta() {
  return (
    <section className="final-cta section-py-lg">
      <div className="container-tight">
        <h2 className="h-sec">
          Your journey to confidence <em>begins here.</em>
        </h2>
        <p className="final-cta-sub">
          Consultation {siteConfig.consultation.inPerson} · {siteConfig.consultation.virtual},{" "}
          {siteConfig.consultation.note}.
        </p>
        <div className="final-cta-actions">
          <Link href="/call-our-office" className="btn-light">
            Request a Callback <span aria-hidden>→</span>
          </Link>
          <CallLink className="btn-secondary" aria-label={`Call ${siteConfig.phone.display}`}>
            {siteConfig.cta.call} · {siteConfig.phone.display}
          </CallLink>
        </div>
      </div>
    </section>
  );
}
