"use client";

import { useId, useState } from "react";
import { siteConfig } from "@/lib/site-config";
import { Eyebrow } from "@/components/ui/eyebrow";
import { CallLink } from "@/components/ui/call-link";
import { CONSULT_TYPES, REFERRAL_SOURCES } from "@/lib/contact/form-options";

type Status = "idle" | "sending" | "error";
type Errors = Partial<Record<"firstName" | "lastName" | "email" | "phone" | "referral", string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Consultation request form. Fields mirror the live Squarespace form (name,
 * email, phone, "how did you first hear about us", message) plus the consult
 * type, which the live page could not capture because options 1 and 3 shared
 * one form. Submissions go to /api/consultation; on success the browser is
 * sent to /thank-you.
 */
export function ConsultationForm({
  id: sectionId = "request",
  source,
  intro,
}: {
  /** Section id (anchor target). The landing pages use "consultation". */
  id?: string;
  /** Page the lead came from; travels with the submission into the email. */
  source?: string;
  /** Replaces the default left column (eyebrow, heading, helper copy). */
  intro?: React.ReactNode;
} = {}) {
  const id = useId();
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});
  const [failure, setFailure] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;

    const next: Errors = {};
    if (!data.firstName?.trim()) next.firstName = "Please enter your first name.";
    if (!data.lastName?.trim()) next.lastName = "Please enter your last name.";
    if (!EMAIL.test(data.email?.trim() ?? "")) next.email = "Please enter a valid email address.";
    // Loose on purpose: patients travel in, so international formats must pass.
    if ((data.phone?.replace(/\D/g, "") ?? "").length < 7) next.phone = "Please enter a phone number.";
    if (!data.referral) next.referral = "Please choose an option.";

    setErrors(next);
    if (Object.keys(next).length > 0) {
      form.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
      return;
    }

    setStatus("sending");
    setFailure("");
    try {
      const res = await fetch("/api/consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(body.error || "We could not send your request.");
      }
      // Hand off to the confirmation page with a full navigation, not
      // router.replace(): GTM, GA4 and the Meta Pixel only register a page
      // view on a real document load, and /thank-you is the URL the lead
      // conversion hangs off. replace() keeps the filled-in form out of the
      // back-button history. Status stays "sending" until the page unloads.
      const from = source ?? window.location.pathname;
      window.location.replace(`/thank-you?source=${encodeURIComponent(from)}`);
    } catch (error) {
      setStatus("error");
      setFailure(error instanceof Error ? error.message : "We could not send your request.");
    }
  }

  return (
    <section className="bg-cream section-py-lg" id={sectionId}>
      <div className="container contact-form-layout">
        {intro ?? (
        <div className="contact-form-intro">
          <Eyebrow>Request a consultation</Eyebrow>
          <h2 className="h-sec">
            Tell us about <em>your goals.</em>
          </h2>
          <p className="form-helper">
            For the in-person and FaceTime consults. Photo reviews go through the{" "}
            <a
              href={siteConfig.consultation.eConsultUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-link"
            >
              e-consult form
            </a>
            . Everything you send stays between you and the practice.
          </p>
          <p className="form-helper">
            Prefer to speak to someone?{" "}
            <CallLink className="text-link">{siteConfig.phone.display}</CallLink>
          </p>
        </div>
        )}

        <form className="contact-form" onSubmit={onSubmit} noValidate>
          <div className="form-fields">
            {source && <input type="hidden" name="source" value={source} />}
            <div className="form-row">
              <div className="form-field">
                <label className="form-field-label" htmlFor={`${id}-first`}>
                  First name
                </label>
                <input
                  className="form-input"
                  id={`${id}-first`}
                  name="firstName"
                  autoComplete="given-name"
                  aria-invalid={errors.firstName ? "true" : undefined}
                  aria-describedby={errors.firstName ? `${id}-first-err` : undefined}
                />
                {errors.firstName && (
                  <p className="form-error" id={`${id}-first-err`}>
                    {errors.firstName}
                  </p>
                )}
              </div>

              <div className="form-field">
                <label className="form-field-label" htmlFor={`${id}-last`}>
                  Last name
                </label>
                <input
                  className="form-input"
                  id={`${id}-last`}
                  name="lastName"
                  autoComplete="family-name"
                  aria-invalid={errors.lastName ? "true" : undefined}
                  aria-describedby={errors.lastName ? `${id}-last-err` : undefined}
                />
                {errors.lastName && (
                  <p className="form-error" id={`${id}-last-err`}>
                    {errors.lastName}
                  </p>
                )}
              </div>
            </div>

            <div className="form-row">
              <div className="form-field">
                <label className="form-field-label" htmlFor={`${id}-email`}>
                  Email
                </label>
                <input
                  className="form-input"
                  id={`${id}-email`}
                  name="email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  aria-invalid={errors.email ? "true" : undefined}
                  aria-describedby={errors.email ? `${id}-email-err` : undefined}
                />
                {errors.email && (
                  <p className="form-error" id={`${id}-email-err`}>
                    {errors.email}
                  </p>
                )}
              </div>

              <div className="form-field">
                <label className="form-field-label" htmlFor={`${id}-phone`}>
                  Phone number
                </label>
                <input
                  className="form-input"
                  id={`${id}-phone`}
                  name="phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  aria-invalid={errors.phone ? "true" : undefined}
                  aria-describedby={errors.phone ? `${id}-phone-err` : undefined}
                />
                {errors.phone && (
                  <p className="form-error" id={`${id}-phone-err`}>
                    {errors.phone}
                  </p>
                )}
              </div>
            </div>

            <div className="form-field">
              <label className="form-field-label" htmlFor={`${id}-type`}>
                Which consult are you requesting?
              </label>
              <select className="form-select" id={`${id}-type`} name="consultType" defaultValue={CONSULT_TYPES[0]}>
                {CONSULT_TYPES.map((type) => (
                  <option key={type}>{type}</option>
                ))}
              </select>
            </div>

            <div className="form-field">
              <label className="form-field-label" htmlFor={`${id}-referral`}>
                How did you first hear about us?
              </label>
              <select
                className="form-select"
                id={`${id}-referral`}
                name="referral"
                defaultValue=""
                aria-invalid={errors.referral ? "true" : undefined}
                aria-describedby={errors.referral ? `${id}-referral-err` : undefined}
              >
                <option value="" disabled>
                  Select one
                </option>
                {REFERRAL_SOURCES.map((source) => (
                  <option key={source}>{source}</option>
                ))}
              </select>
              {errors.referral && (
                <p className="form-error" id={`${id}-referral-err`}>
                  {errors.referral}
                </p>
              )}
            </div>

            <div className="form-field">
              <label className="form-field-label" htmlFor={`${id}-message`}>
                Any questions you would like to ask, or how else can we help?
              </label>
              <textarea className="form-textarea" id={`${id}-message`} name="message" rows={4} />
            </div>

            {/* bots fill this; people never see it */}
            <div className="honeypot" aria-hidden>
              <label htmlFor={`${id}-company`}>Company</label>
              <input id={`${id}-company`} name="company" tabIndex={-1} autoComplete="off" />
            </div>

            <p className="form-consent">
              By sending this form you agree to be contacted about your consultation. Please do
              not include medical details you would not want sent by email.
            </p>

            {status === "error" && (
              <p className="form-error" role="alert">
                {failure} Please call{" "}
                <CallLink className="text-link">{siteConfig.phone.display}</CallLink> and the
                office will take your request directly.
              </p>
            )}

            <button type="submit" className="form-submit" disabled={status === "sending"}>
              {status === "sending" ? "Sending…" : "Request my consultation"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
