/**
 * Shared between the form UI and the route handler that validates the
 * submission, so the accepted values cannot drift apart.
 * Referral list is verbatim from the live Squarespace form.
 */
export const REFERRAL_SOURCES = [
  "Patient Referral",
  "Doctor Referral",
  "Instagram",
  "Facebook",
  "Google Search",
  "YouTube",
  "TikTok",
  "RealSelf",
  "Billboard",
  "Friends",
  "Other",
] as const;

export const CONSULT_TYPES = [
  "In-person consult",
  "FaceTime consult",
  "Not sure yet",
] as const;

/**
 * Invisible anti-bot input. Its name and label must mean nothing to browser
 * autofill or password managers. It used to be "company", which autofill can
 * fill from a saved address, and the route then threw the real request away
 * as a bot (suspected cause of the doctor's lost tests, Nov 2026).
 */
export const HONEYPOT_FIELD = "hp_x7q2";

export type ReferralSource = (typeof REFERRAL_SOURCES)[number];
export type ConsultType = (typeof CONSULT_TYPES)[number];
