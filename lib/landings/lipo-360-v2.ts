/* ============================================================
   AWAKE LIPO 360 · VARIANT B — Google Ads A/B test (Sep 2026).

   Variant A is /awake-lipo-360-nyc (lib/landings/content.ts), the
   control: it stays exactly as it is. Variant B keeps the site's design
   system and takes the client's content and order (his prototype, his
   "Awake lipo 360. draft 2" document and the meetings of 23 and 24 Sep).
   Round 1 of his changes; a fuller proposal is coming, so the page is a
   list of blocks: reorder, drop or duplicate them here (a duplicate
   needs its own `id`).

   Copy rules: no em dashes (client), and nothing medical beyond what the
   doctor wrote. Where an answer is assembled from several sentences of
   draft 2 it is marked "VALIDATE" below.

   Before/after photos: the doctor's own composites, uncropped, behind a
   veil. In the grid each view is only a blurred field of its colours,
   drawn in CSS (lipo-360-v2-veils.ts); the lightbox builds the original's
   URL (/img/lipo-v2/ba/full/<id>.webp) from the id after a tap, so no
   clinical photo, nor its URL, is in the HTML (Ads review).
   ============================================================ */

import { siteConfig } from "@/lib/site-config";

export type Lv2Link = { label: string; href: string };
export type Lv2Image = { src: string; alt: string; width: number; height: number };
export type Lv2Figure = Lv2Image & { caption: string };
export type Lv2Video = {
  src: string;
  poster: string;
  width: number;
  height: number;
  title: string;
  caption?: string;
};
export type Lv2Stat = { value: string; label: string };
export type Lv2Card = { title: string; body: string };
export type Lv2Faq = { q: string; a: string };

/** One view of a patient: the before | after pair, 2164x1350 as the doctor composed it. */
export type Lv2BaView = {
  /** Veil: BA_VEILS[id] (CSS) · original, after a tap: /img/lipo-v2/ba/full/<id>.webp */
  id: string;
  view: "Front" | "Side" | "Back";
  /** For the original in the lightbox. No clinical detail. */
  alt: string;
  /** Files in the doctor's Drive, for traceability. Never rendered. */
  source: string;
};

export type Lv2Patient = {
  /** "01" … rendered as "Patient 01 – <detail>". */
  number: string;
  detail: string;
  views: Lv2BaView[];
};

export type Lv2HeroBlock = {
  kind: "hero";
  id: string;
  eyebrow: string;
  /** One bold run inside the lead. */
  lead: { before: string; bold: string; after: string };
  stats: Lv2Stat[];
  call: Lv2Link;
  primary: Lv2Link;
  photo: Lv2Image;
  video: Lv2Video;
  /**
   * Phones: the lead, stats and CTAs render after this block instead of in
   * the hero, so the first screen is photo → moving video → before/after
   * (the doctor's brief). The sticky Call / Request bar covers the CTAs.
   */
  mobileDetailsAfter?: string;
};

export type Lv2ResultsBlock = {
  kind: "results";
  id: string;
  eyebrow: string;
  heading: string;
  intro: string;
  veil: { label: string; note: string };
  patients: Lv2Patient[];
  gallery: Lv2Link;
  disclaimer: string;
};

/** What Lipo 360 is, the three diagrams back to back, then incisions: one block so nothing can land between them. */
export type Lv2ProcedureBlock = {
  kind: "procedure";
  id: string;
  eyebrow: string;
  heading: string;
  body: string[];
  support: string;
  marking: { image: Lv2Image; caption: string };
  diagrams: Lv2Figure[];
  incisions: {
    id: string;
    eyebrow: string;
    heading: string;
    body: string;
    figure: Lv2Stat;
    facts: Lv2Card[];
    video: Lv2Video;
  };
};

export type Lv2ExperienceBlock = {
  kind: "experience";
  id: string;
  eyebrow: string;
  heading: string;
  cards: Lv2Card[];
};

export type Lv2TestimonialsBlock = {
  kind: "testimonials";
  id: string;
  eyebrow: string;
  heading: string;
  intro: string;
  videos: Lv2Video[];
  more: Lv2Link;
};

export type Lv2DestinationBlock = {
  kind: "destination";
  id: string;
  eyebrow: string;
  heading: string;
  body: string[];
  approach: { title: string; items: string[] };
  portrait: Lv2Image;
  /** Practice and city. Hotel photos go here when the client sends them. */
  images: Lv2Figure[];
  call: { heading: string; body: string; link: Lv2Link };
  reel: Lv2Video;
};

export type Lv2FaqBlock = {
  kind: "faq";
  id: string;
  eyebrow: string;
  heading: string;
  items: Lv2Faq[];
};

export type Lv2ClosingBlock = {
  kind: "closing";
  id: string;
  eyebrow: string;
  heading: string;
  body: string;
  call: Lv2Link;
  primary: Lv2Link;
  disclaimer: string;
  image: Lv2Image;
};

/** The consultation form (last, before the footer); its intro column. */
export type Lv2ConsultationBlock = {
  kind: "consultation";
  id: string;
  eyebrow: string;
  heading: string;
  body: string;
};

export type Lv2Block =
  | Lv2HeroBlock
  | Lv2ResultsBlock
  | Lv2ProcedureBlock
  | Lv2ExperienceBlock
  | Lv2TestimonialsBlock
  | Lv2DestinationBlock
  | Lv2FaqBlock
  | Lv2ClosingBlock
  | Lv2ConsultationBlock;

export type Lv2Page = {
  path: string;
  /** Pushed to the dataLayer as landing_variant / landing_test. */
  variant: "B";
  test: string;
  blocks: Lv2Block[];
};

/** Veiled preview and original for a before/after view id (client code imports them from the -media module). */
export { BA_FULL_DIR, BA_SIZE } from "@/lib/landings/lipo-360-v2-media";

/** "212-653-8726", the format on the client's call buttons. */
const PHONE = siteConfig.phone.display.replace(/[()]/g, "").replace(" ", "-");
const CALL: Lv2Link = { label: `Call ${PHONE}`, href: `tel:${siteConfig.phone.tel}` };
const REQUEST: Lv2Link = { label: "Request Consultation", href: "#consultation" };

/* Patients as numbered in the doctor's prototype (7 sets, 3 views each).
   Views are the doctor's before | after composites (1080 + 4 px + 1080).
   P05 and P06 only exist as singles in the Drive: composed the same way. */
function views(n: string, sources: Record<Lv2BaView["view"], string>): Lv2BaView[] {
  return (["Front", "Side", "Back"] as const).map((view) => ({
    id: `p${n}-${view.toLowerCase()}`,
    view,
    alt: `Patient ${n}, ${view.toLowerCase()} view, before (left) and after (right) Awake Lipo 360`,
    source: sources[view],
  }));
}

export const LIPO_360_V2: Lv2Page = {
  path: "/lipo-360-v2",
  variant: "B",
  test: "awake_lipo_360",
  blocks: [
    {
      kind: "hero",
      id: "top",
      eyebrow: "New York City · Awake Body Contouring",
      lead: {
        before: "A high-volume, circumferential body-contouring approach developed through more than ",
        bold: "5,000 Awake Lipo 360 procedures",
        after:
          ", with patients traveling from across the United States and internationally for Dr. Kalsow’s technique and aesthetic.",
      },
      stats: [
        { value: "5,000+", label: "Awake Lipo 360 procedures" },
        { value: "360°", label: "Circumferential sculpting" },
        { value: "NYC", label: "Destination practice" },
        { value: "MD", label: "Board-certified plastic surgeon" },
      ],
      call: CALL,
      primary: REQUEST,
      photo: {
        src: "/img/team/dr-kalsow-whitecoat.jpg",
        alt: "Dr. Sergei Kalsow, MD, smiling, in a white coat over surgical scrubs at his New York City practice",
        width: 933,
        height: 1400,
      },
      // IMG_0877.MOV ("087"): the doctor marking a patient. A short muted
      // cut without her face and with as little exposure as possible.
      video: {
        src: "/video/lipo-v2/marking.mp4",
        poster: "/video/lipo-v2/marking-poster.jpg",
        width: 540,
        height: 960,
        title: "Dr. Kalsow marking a patient for Awake Lipo 360",
        // short on purpose: on phones it rides on the clip as a pill
        caption: "Standing markings",
      },
      mobileDetailsAfter: "results",
    },
    {
      kind: "results",
      id: "results",
      eyebrow: "Real patients",
      heading: "Awake Lipo 360 Results",
      intro:
        "Seven of Dr. Kalsow’s Awake Lipo 360 patients, each photographed from the front, the side and the back. The photographs are shown uncropped, as the practice took them.",
      veil: {
        label: "Medical photos · Tap to view",
        note: "These are clinical before-and-after photographs and include partial nudity. Each one opens full size when you tap it.",
      },
      patients: [
        {
          number: "01",
          detail: "Lipo360 – BMI 26",
          views: views("01", {
            Front: "combo2_img7_front.webp",
            Side: "combo2_img7_side.webp",
            Back: "combo2_img7_back.webp",
          }),
        },
        {
          number: "02",
          detail: "Lipo360 – BMI 28 – Complete back sculpting.",
          views: views("02", {
            Front: "combo2_img2_front.webp",
            Side: "combo2_img2_side.webp",
            Back: "combo2_img2_back.webp",
          }),
        },
        {
          number: "03",
          detail: "Lipo360 – BMI 30",
          // Front and back are swapped in the Drive's file names.
          views: views("03", {
            Front: "combo2_img6_back.webp",
            Side: "combo2_img6_side.webp",
            Back: "combo2_img6_front.webp",
          }),
        },
        {
          number: "04",
          detail: "Lipo360 – BMI 29 – Notice how skin tightened with just lipo.",
          views: views("04", {
            Front: "combo_set6_front.webp",
            Side: "combo_set6_side.webp",
            Back: "combo_set6_back.webp",
          }),
        },
        {
          number: "05",
          detail: "Lipo360 – BMI 31 – Great difference only 1 week out.",
          views: views("05", {
            Front: "set2_front_before.webp + set2_front_after.webp",
            Side: "set2_side_before.webp + set2_side_after.webp",
            Back: "set2_back_before.webp + set2_back_after.webp",
          }),
        },
        {
          number: "06",
          detail:
            "Revision Lipo360 after tummy tuck and lipo elsewhere – BMI 26 – Notice improvement in shape and reduction of love handles, resulting in an hourglass silhouette.",
          views: views("06", {
            Front: "set1_front_before.webp + set1_front_after.webp",
            Side: "set1_side_before.webp + set1_side_after.webp",
            Back: "set1_back_before.webp + set1_back_after.webp",
          }),
        },
        {
          number: "07",
          detail: "Lipo360 combined with fat transfer. Notice improved projection.",
          views: views("07", {
            Front: "combo_set4_front.webp",
            Side: "combo_set4_side.webp",
            Back: "combo_set4_back.webp",
          }),
        },
      ],
      gallery: { label: "View the Full Gallery", href: "/beforeafter" },
      disclaimer: "Before-and-after photographs show individual outcomes and do not guarantee a particular result.",
    },
    {
      kind: "procedure",
      id: "what-is-lipo-360",
      // Heading and first paragraphs from the doctor's prototype.
      eyebrow: "A signature procedure",
      heading: "Not Simply Fat Removal. A Deliberate Reshaping Of The Torso.",
      body: [
        "Awake Lipo 360 treats the abdomen, waist, flanks and back as one continuous three-dimensional structure. The goal is not to make each area independently smaller, but to create a cleaner transition from the rib cage through the waist and into the hips.",
        "Dr. Kalsow’s approach is based on finding the patient’s underlying frame, reducing the areas that obscure it, and sculpting the surrounding zones so the waist appears narrower and the torso more balanced from the front, side and back.",
      ],
      support:
        "Because no two frames are identical, treatment is planned around the individual anatomy rather than a standardized pattern.",
      marking: {
        image: {
          src: "/img/lipo-v2/marking-still.jpg",
          alt: "Dr. Kalsow drawing the Lipo 360 treatment markings on a patient",
          width: 800,
          height: 1000,
        },
        caption:
          "Dr. Kalsow marking the patient for Lipo 360. The procedure illustrates the target areas of the Lipo 360 procedure.",
      },
      // The doctor's three diagrams, in his order, back to back (captions
      // from draft 2; the fat transfer list is shortened to the areas the
      // diagram shows plus hands and scars).
      diagrams: [
        {
          src: "/img/landing/awake-lipo-360/treatment-area.png",
          alt: "Diagram of the Lipo 360 treatment area, front and back views: abdomen, waist, flanks and back",
          width: 1046,
          height: 1100,
          caption:
            "Areas included in Dr. Kalsow’s Lipo 360: upper and lower abdomen, flanks, sides of the breasts, bra rolls, lower and mid back, and upper back up to the armpits.",
        },
        {
          src: "/img/landing/awake-lipo-360/additional-areas.png",
          alt: "Diagram of additional body contouring areas that can be added, front and back views",
          width: 1046,
          height: 1100,
          caption:
            "Areas that can be added: chin, arms, inner and outer thighs, anterior and posterior axilla, buffalo hump, inner knees, calves and buttocks.",
        },
        {
          src: "/img/landing/awake-lipo-360/fat-transfer-areas.png",
          alt: "Diagram of possible fat transfer areas: face, breasts, hips and buttocks",
          width: 1046,
          height: 1100,
          caption:
            "Fat transfer areas: buttocks and hips (BBL), breasts (half a cup to a cup size larger only), face, hands and depressed scars.",
        },
      ],
      incisions: {
        id: "incisions",
        eyebrow: "Scars and incisions",
        heading: "Small 4 mm access points.",
        // 4 mm: said by the doctor on the 23 Sep call. Draft 2 says "usually
        // about 3 mm": to confirm with Andrés.
        // the size is in the heading and the figure tile, not a third time here
        body:
          "Fat is removed through small access points. Dr. Kalsow places them where they allow him to reach and sculpt each planned area, choosing natural creases or existing scars when possible.",
        figure: { value: "4 mm", label: "Approximate size of each access point" },
        facts: [
          {
            title: "About 12 small incisions",
            body: "For a typical Lipo 360: three on the lower abdomen, one inside the belly button, one beneath each breast, four along the sides and two on the back. Fat transfer usually adds one beneath each gluteal crease.",
          },
          {
            title: "No routine drains",
            body: "Dr. Kalsow typically leaves the small incisions without sutures so excess fluid can drain. He does not routinely use surgical drains.",
          },
          {
            title: "Small, discreet scars",
            body: "The incisions are designed to leave small, discreet scars, though all incisions leave some degree of scarring.",
          },
        ],
        video: {
          src: "/video/landing/awake-lipo-360-incision.mp4",
          poster: "/video/landing/awake-lipo-360-incision-poster.jpg",
          width: 960,
          height: 960,
          title: "A healed access incision",
          caption: "On a patient’s flank, filmed at the practice.",
        },
      },
    },
    {
      kind: "experience",
      id: "experience",
      eyebrow: "Experience that changes the operation",
      heading: "What Thousands Of Awake Lipo 360 Cases Teach You.",
      cards: [
        {
          title: "Pattern Recognition",
          body: "High-volume experience allows subtle differences in torso shape, fat distribution, skin quality and prior surgical change to be recognized before treatment begins.",
        },
        {
          title: "Revision Judgment",
          body: "Patients also seek Dr. Kalsow after previous liposuction elsewhere. Revision work requires a different strategy: preserving what is good, correcting imbalance and working around scarred tissue.",
        },
        {
          title: "A Consistent Aesthetic",
          // The client's draft has an em dash here; a comma instead.
          body: "The objective is a defined, natural-looking waist and smoother circumferential contour, not simply a maximum-volume number or an identical shape imposed on every patient.",
        },
      ],
    },
    {
      kind: "testimonials",
      id: "testimonials",
      eyebrow: "In their own words",
      heading: "Patients, in their own words.",
      intro: "Video testimonials from Dr. Kalsow’s liposuction patients.",
      // The same real videos as /testimonials. The Instagram screenshots in
      // the doctor's prototype wait for the patients' consent.
      videos: [
        {
          src: "/video/testimonials/alex.mp4",
          poster: "/video/testimonials/alex-poster.webp",
          width: 960,
          height: 540,
          title: "Alex",
          caption: "Lipo 360 + BBL",
        },
        {
          src: "/video/testimonials/lucille.mp4",
          poster: "/video/testimonials/lucille-poster.webp",
          width: 960,
          height: 540,
          title: "Lucille",
          caption: "Lipo 360, BBL + blepharoplasty",
        },
        {
          src: "/video/testimonials/sami.mp4",
          poster: "/video/testimonials/sami-poster.webp",
          width: 960,
          height: 540,
          title: "Sami",
          caption: "Arm + upper back liposuction",
        },
      ],
      more: { label: "More Patient Stories", href: "/testimonials" },
    },
    {
      kind: "destination",
      id: "destination",
      eyebrow: "Why patients travel",
      heading: "A Destination Practice For Awake Lipo 360.",
      body: [
        "Dr. Kalsow treats patients who come to New York from many U.S. states and from outside the United States. A large portion of the practice has grown through patient referrals and patients who specifically seek his approach to waist and back contouring.",
        "Surgeons from outside the United States have also observed his technique. His practice includes both primary cases and complex revision body contouring.",
      ],
      approach: {
        title: "What Defines The Approach",
        items: [
          "Complete circumferential planning rather than isolated-area liposuction",
          "Strong emphasis on waist narrowing and back contour",
          "Strategic fat removal based on the patient’s skeletal frame",
          "Small access points (approx. 4 mm) placed with scar visibility in mind",
          "No drains for routine Awake Lipo 360 in Dr. Kalsow’s technique",
          "Personal surgical planning and follow-up with Dr. Kalsow",
        ],
      },
      portrait: {
        src: "/img/portrait/dr-kalsow-suit.webp",
        alt: "Dr. Sergei Kalsow, MD, smiling, in a blue blazer",
        width: 1312,
        height: 1456,
      },
      images: [
        {
          src: "/img/office/office-exterior.jpg",
          alt: "The entrance of 635 Madison Avenue in Manhattan, home of Dr. Kalsow’s practice",
          width: 1500,
          height: 941,
          caption: "635 Madison Avenue, New York City",
        },
        {
          src: "/img/team/kalsow-team.jpg",
          alt: "Dr. Kalsow with a member of his team at the practice, the Manhattan skyline behind them",
          width: 1280,
          height: 720,
          caption: "Dr. Kalsow and his team",
        },
      ],
      // From draft 2, "For Our Destination Patients".
      call: {
        heading: "Traveling to New York?",
        body: `Once you land in New York, call or text us at ${PHONE} to let us know you’ve arrived. Send us the name of your hotel or the address where you’ll be staying and the best number to reach you while you’re here.`,
        link: CALL,
      },
      reel: {
        src: "/video/lipo-v2/reel-misconception.mp4",
        poster: "/video/lipo-v2/reel-misconception-poster.jpg",
        width: 720,
        height: 1280,
        title: "Dr. Kalsow on a common misconception",
        caption: "From Dr. Kalsow’s Instagram, @doctor.serge.",
      },
    },
    {
      kind: "faq",
      id: "faq",
      eyebrow: "Frequently asked questions",
      heading: "Awake Lipo 360 FAQ",
      // Answers from the doctor's draft 2 or the ones variant A already
      // publishes (#3 verbatim from A, #7 from the brief).
      items: [
        {
          q: "What is Awake Lipo 360?",
          a: "“Lipo 360” means liposuction around the midsection, typically including the abdomen, waist, sides and back; the exact areas vary from person to person. Dr. Kalsow performs Lipo 360 while the patient is awake. He treats each planned area as thoroughly as he safely can, then sculpts the transitions to create the desired shape.",
        },
        {
          q: "What is the difference between Lipo 360 and regular liposuction?",
          a: "Lipo 360 is liposuction. Terms such as “Lipo 360” describe a treatment area; they do not describe a special machine or guarantee a result. You can choose liposuction of specific areas, such as the abdomen, flanks or back, instead of treating the full midsection. The trade-off is that an untreated area may interrupt the transition in your contour.",
        },
        {
          q: "Am I completely pain-free during awake liposuction?",
          a: "The numbing process and parts of the procedure can be uncomfortable. Patients may feel pressure or movement. Comfort varies, and the procedure should not be described as pain-free.",
        },
        {
          // VALIDATE: assembled only from sentences of draft 2 (candidacy
          // and limitations). Nothing added.
          q: "Can Awake Lipo 360 create an hourglass shape without fat transfer?",
          a: "Lipo 360 can target the waist, love handles, abdomen and back to create more curves. The rib cage and underlying bone structure limit how narrow the waist can become. Fat transfer may soften hip dips, but it may not fill them completely; the result depends on your anatomy, skin and how much fat is available. At your consultation, Dr. Kalsow will explain what can realistically change for your body and whether Lipo 360 is the right way to achieve it.",
        },
        {
          q: "Do you use drains?",
          a: "Typically, no. Dr. Kalsow leaves the small liposuction incisions open so excess tumescent fluid can drain during the first day. He does not routinely use separate surgical drains. The red-tinged drainage can look alarming, so his team explains what to expect and when to call.",
        },
        {
          q: "Will I have scars?",
          a: "Yes, small ones. All incisions leave scars, even when they are small. Dr. Kalsow uses small access points of approximately 4 mm, positioned to reach the planned areas, using creases or less visible locations when possible. His typical Lipo 360 plan uses approximately 12 incisions; fat transfer may require two more. He will show you the proposed locations during your consultation.",
        },
        {
          q: "Can you correct liposuction performed somewhere else?",
          a: "Yes, Dr. Kalsow performs revision liposuction to address contour irregularities, asymmetry, or unsatisfactory results from a prior procedure. A consultation will determine the best approach for your specific case.",
        },
        {
          q: "How long do results from Awake Lipo 360 last?",
          a: "The fat cells removed are gone, so the change can last many years. Weight gain can enlarge the fat cells that remain and change your proportions. Pregnancy, aging and changes in skin quality can also alter the result.",
        },
        {
          q: "Can I travel to New York for surgery?",
          // "Potentially, yes." as variant A says it: no source supports an unconditional yes
          a: `Potentially, yes. Dr. Kalsow treats patients who come to New York from many U.S. states and from outside the United States. Destination patients need a plan for consultation, preoperative clearance, local accommodation, transportation, postoperative visits and safe timing for travel home. Once you land, call or text the office at ${PHONE} to let us know you’ve arrived.`,
        },
        {
          q: "How do I know whether I am a candidate?",
          a: "The ideal candidate is generally near a comfortable, stable weight, in good health, and has skin that can adjust to the new contour. Dr. Kalsow also evaluates patients whose circumstances call for a more individualized plan, such as a higher BMI, major weight loss or a previous liposuction. At your consultation, he will explain what can realistically change for your body and whether Lipo 360 is the right way to achieve it.",
        },
      ],
    },
    {
      kind: "closing",
      id: "plan",
      eyebrow: "Consultation",
      heading: "Your Anatomy Determines The Plan.",
      body: "A consultation is the point where the procedure becomes specific: your frame, target waist, prior liposuction, skin quality, candidacy for awake surgery and the contour that can realistically be created for you.",
      call: CALL,
      primary: REQUEST,
      disclaimer:
        "Surgical procedures have risks and results vary. A consultation is required to determine candidacy and the appropriate treatment plan.",
      image: {
        src: "/img/lipo-v2/sk-empire.jpg",
        alt: "The SK monogram of Dr. Sergei Kalsow over the Manhattan skyline and the Empire State Building at dusk",
        width: 1000,
        height: 1000,
      },
    },
    {
      kind: "consultation",
      id: "consultation",
      eyebrow: "Request a consultation",
      heading: "Tell Dr. Kalsow about your goals.",
      body: "Consultations are held in person at 635 Madison Avenue or by FaceTime. Share a few details and the office will be in touch to schedule.",
    },
  ],
};
