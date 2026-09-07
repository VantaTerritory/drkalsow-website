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

export type ReferralSource = (typeof REFERRAL_SOURCES)[number];
export type ConsultType = (typeof CONSULT_TYPES)[number];
