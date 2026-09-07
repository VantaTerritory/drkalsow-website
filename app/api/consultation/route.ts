import { NextResponse } from "next/server";
import { siteConfig } from "@/lib/site-config";
import { CONSULT_TYPES, REFERRAL_SOURCES } from "@/lib/contact/form-options";

/**
 * Consultation requests from /call-our-office.
 *
 * Delivery is Resend over plain HTTP, so no dependency and no SDK to keep in
 * step with. Three env vars have to be set for the form to work in production:
 *
 *   RESEND_API_KEY      key from resend.com
 *   CONTACT_TO_EMAIL    inbox that receives the requests (the practice)
 *   CONTACT_FROM_EMAIL  sender on a domain verified in Resend
 *
 * Without them the route answers 503 and the form tells the patient to call,
 * which is the honest failure: a lead is never silently swallowed.
 */

export const runtime = "nodejs";

const MAX = { name: 80, email: 160, phone: 40, message: 4000 } as const;

function clean(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

// Values land in an email header/body, so strip anything that could break out.
function header(value: string) {
  return value.replace(/[\r\n]+/g, " ");
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(request: Request) {
  let payload: Record<string, unknown>;
  try {
    payload = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Malformed request." }, { status: 400 });
  }

  // Honeypot: answer 200 so the bot believes it succeeded and moves on.
  if (clean(payload.company, 200)) {
    return NextResponse.json({ ok: true });
  }

  const firstName = clean(payload.firstName, MAX.name);
  const lastName = clean(payload.lastName, MAX.name);
  const email = clean(payload.email, MAX.email);
  const phone = clean(payload.phone, MAX.phone);
  const message = clean(payload.message, MAX.message);
  const referralInput = clean(payload.referral, 60);
  const consultInput = clean(payload.consultType, 60);

  const referral = (REFERRAL_SOURCES as readonly string[]).includes(referralInput)
    ? referralInput
    : "";
  const consultType = (CONSULT_TYPES as readonly string[]).includes(consultInput)
    ? consultInput
    : CONSULT_TYPES[2];

  const invalid =
    !firstName ||
    !lastName ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) ||
    phone.replace(/\D/g, "").length < 7 ||
    !referral;

  if (invalid) {
    return NextResponse.json({ error: "Please check the form and try again." }, { status: 422 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !to || !from) {
    console.error("[consultation] delivery not configured: set RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL");
    return NextResponse.json(
      { error: "Our request form is temporarily unavailable." },
      { status: 503 },
    );
  }

  const name = header(`${firstName} ${lastName}`);
  const rows: [string, string][] = [
    ["Name", name],
    ["Email", email],
    ["Phone", phone],
    ["Consult", consultType],
    ["Heard about us", referral],
  ];

  const html = [
    `<h2 style="font-family:Georgia,serif">${escapeHtml(consultType)} request</h2>`,
    "<table cellpadding='6' style=\"font-family:Arial,sans-serif;font-size:14px\">",
    ...rows.map(
      ([label, value]) =>
        `<tr><td style="color:#666">${label}</td><td><strong>${escapeHtml(value)}</strong></td></tr>`,
    ),
    "</table>",
    message ? `<p style="font-family:Arial,sans-serif;font-size:14px;white-space:pre-wrap">${escapeHtml(message)}</p>` : "",
    `<p style="color:#888;font-size:12px">Sent from ${siteConfig.meta.url}/call-our-office</p>`,
  ].join("");

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `${consultType}: ${name}`,
        html,
      }),
    });

    if (!res.ok) {
      console.error("[consultation] resend responded", res.status, await res.text());
      return NextResponse.json({ error: "We could not send your request." }, { status: 502 });
    }
  } catch (error) {
    console.error("[consultation] delivery failed", error);
    return NextResponse.json({ error: "We could not send your request." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
