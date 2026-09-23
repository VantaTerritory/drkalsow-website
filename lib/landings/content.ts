/* ============================================================
   LANDING PAGE CONTENT — SEO + paid landings built from the SEO team's
   HTML drafts (Dr_Kalsow_Awake_Lipo_360_SEO_Paid_v14.html and
   Dr_Kalsow_Breast_Reduction_NYC_SEO_Paid_v2.html, Sep 2026).

   Copy is theirs, edited only to: drop the production notes they left
   inline, replace em dashes (banned by the client), unify "MD", and
   remove links to cluster pages that do not exist yet. Claims stay inside
   the SEO team's claims register (no procedure-specific counts, no
   "pain-free", no comparative safety claims).

   Titles / descriptions / H1s come from lib/seo/pages.ts, as everywhere.
   Both pages render components/marketing/landing/landing-template.tsx;
   each one lists its own section order in `sections`.
   ============================================================ */

export type LandingLink = { label: string; href: string; external?: boolean };
export type LandingCard = { title: string; body: string };
export type LandingStep = { title: string; body: string };
export type LandingFaq = { q: string; a: string };
export type LandingMetric = { value: string; label: string };
export type LandingFigure = {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
};
export type LandingHeroMedia =
  | { kind: "figure"; figure: LandingFigure }
  | { kind: "portrait"; src: string; alt: string };

/**
 * One patient photo card. Before | after composites are the default; a
 * single close-up (a healed incision, for instance) sets `paired: false`
 * so the card drops the Before / After tags. Cards are numbered on the
 * page in array order; the doctor's own pair numbers stay in `source`.
 */
export type LandingCase = {
  image: string;
  alt: string;
  /** Shown under the card, e.g. "Back view". */
  view: string;
  paired?: boolean;
  /**
   * "side": before | after halves (default). "stacked": before above after,
   * used for torso bands, which are wide (front views cropped to the treated
   * area so the paid landing stays at underwear level).
   */
  layout?: "side" | "stacked";
  /** Source files in the doctor's Drive drop, for traceability. Never rendered. */
  source?: string;
};

/**
 * Self-hosted clip shown as a tile next to the photo cards. Plays on tap
 * behind a poster, or loops muted with a pause control when `ambient`.
 * `caseNumber` ties it to the card of the same patient (1-based, as
 * printed on the page).
 */
export type LandingVideo = {
  src: string;
  poster: string;
  title: string;
  caption: string;
  caseNumber?: number;
  /** Short silent clip: loops muted on its own instead of waiting for a tap. */
  ambient?: boolean;
};

/** A figure the surgeon stands behind: value, what it counts, one qualifier. */
export type LandingStat = { value: string; label: string; detail?: string };

/**
 * Section order is data, one list per landing. Both pages started from the
 * SEO team's procedure-first order; Awake Lipo 360 was restructured after
 * the client review of 21 Sep 2026: the surgeon and his cases first, the
 * form mid-page, the procedure detail for whoever wants to read on.
 */
export type LandingSectionKey =
  | "quicknav"
  | "pillars"
  | "surgeon-spotlight"
  | "results"
  | "scars"
  | "consultation"
  | "details-intro"
  | "what-is-it"
  | "goals"
  | "how-it-works"
  | "insurance"
  | "approach"
  | "candidacy"
  | "recovery"
  | "safety"
  | "secondary"
  | "travel"
  | "surgeon"
  | "faq"
  | "closing";

export type LandingContent = {
  path: string;
  sections: LandingSectionKey[];
  hero: {
    eyebrow: string;
    lead: string;
    trust: string[];
    primary: LandingLink;
    secondary: LandingLink;
    note?: string;
    media: LandingHeroMedia;
  };
  quickNav: LandingLink[];
  /** Dark band of four short promises under the nav (procedure-first order only). */
  pillars?: LandingCard[];
  whatIsIt: {
    eyebrow: string;
    heading: string;
    body: string[];
    highlight: { title: string; body?: string; items?: string[] };
  };
  goals: {
    eyebrow: string;
    heading: string;
    intro: string;
    cards: LandingCard[];
    extraCards?: LandingCard[];
    note?: string;
    figure?: LandingFigure;
    figureNote?: string;
  };
  results: {
    eyebrow: string;
    heading: string;
    intro: string;
    /** Empty on pages where inline before/after media is not appropriate for a paid landing. */
    cases: LandingCase[];
    videos?: LandingVideo[];
    gallery: LandingLink;
    disclaimer: string;
  };
  /** Scars and incisions: the fear patients name most often with liposuction. */
  scars?: {
    eyebrow: string;
    heading: string;
    intro: string;
    facts: LandingCard[];
    cases: LandingCase[];
    videos?: LandingVideo[];
    note?: string;
  };
  howItWorks: {
    id: string;
    eyebrow: string;
    heading: string;
    intro: string;
    caution?: string;
    steps: LandingStep[];
  };
  insurance?: {
    eyebrow: string;
    heading: string;
    intro: string;
    steps: LandingStep[];
    cta: LandingLink;
    disclaimer: string;
  };
  approach: {
    eyebrow: string;
    heading: string;
    body: string[];
    metrics: LandingMetric[];
    links: LandingLink[];
  };
  candidacy: {
    eyebrow: string;
    heading: string;
    intro: string;
    items: string[];
    closing: string;
    quote?: string;
  };
  recovery: {
    eyebrow: string;
    heading: string;
    intro: string;
    cards: LandingCard[];
  };
  safety?: {
    eyebrow: string;
    heading: string;
    intro?: string;
    cards: LandingCard[];
  };
  /** Secondary topic: fat transfer (lipo) or the awake option (breast). */
  secondary?: {
    id: string;
    eyebrow: string;
    heading: string;
    body: string[];
    figure?: LandingFigure;
  };
  travel: {
    eyebrow: string;
    heading: string;
    intro: string;
    items: string[];
  };
  surgeon: {
    eyebrow: string;
    heading: string;
    lead: string;
    body: string[];
    /** Spotlight variant: the surgeon's own figures, shown before the copy. */
    stats?: LandingStat[];
    /** Spotlight variant: portrait for this page; SURGEON_PORTRAIT otherwise. */
    photo?: { src: string; alt: string };
    pointsHeading?: string;
    points: LandingCard[];
    closing?: string;
  };
  /** Marks where the conversion path ends and the reference material begins. */
  detailsIntro?: { eyebrow: string; heading: string; body?: string };
  faq: LandingFaq[];
  faqTone?: "white" | "cream";
  /** Left column of the consultation form. */
  finalCta: { eyebrow: string; heading: string; body: string };
  /** Dark band before the footer when the form sits mid-page. */
  closing?: { heading: string; body: string };
  schema: { name: string; bodyLocation: string; description: string };
};

const DREAMS_URL = "https://dreamsplasticsurgery.com/";
const ABOUT = "/about-dr-sergei-kalsow";

/* ------------------------------------------------------------
   AWAKE LIPO 360 — the pillar page and main Google Ads landing.
   Restructured 22 Sep 2026 after the client's review (meeting notes of
   21 Sep): the doctor wants patients to meet him first and associate him
   with the cases, so the page runs surgeon → numbered cases → scars →
   form, with the SEO team's procedure copy underneath. His figures
   (5,000 awake liposuction procedures, 8,000 awake procedures, 10,000+
   surgeries) come from that meeting, relayed by Andrés.
   ------------------------------------------------------------ */
export const AWAKE_LIPO_360: LandingContent = {
  path: "/awake-lipo-360-nyc",
  sections: [
    "quicknav",
    "surgeon-spotlight",
    "results",
    "scars",
    "consultation",
    "details-intro",
    "what-is-it",
    "goals",
    "how-it-works",
    "approach",
    "candidacy",
    "recovery",
    "safety",
    "secondary",
    "travel",
    "faq",
    "closing",
  ],
  hero: {
    eyebrow: "Awake body contouring · New York City",
    lead:
      "A 360° approach to contouring the abdomen, waist, flanks and back, using an awake, local-anesthesia approach when appropriate, with a treatment plan designed around your anatomy.",
    trust: ["Dr. Sergei Kalsow, MD", "5,000+ awake liposuction procedures", "Madison Avenue, NYC"],
    primary: { label: "Request a Consultation", href: "#consultation" },
    secondary: { label: "See Patient Results", href: "#results" },
    media: {
      kind: "figure",
      figure: {
        src: "/img/landing/awake-lipo-360/treatment-area.png",
        alt: "Diagram of the Lipo 360 treatment area from the front and back: abdomen, waist, flanks and back",
        width: 1046,
        height: 1100,
      },
    },
  },
  quickNav: [
    { label: "Dr. Kalsow", href: "#meet-kalsow" },
    { label: "Results", href: "#results" },
    { label: "Scars", href: "#scars" },
    { label: "Consultation", href: "#consultation" },
    { label: "What it is", href: "#what-is-it" },
    { label: "How awake lipo works", href: "#awake" },
    { label: "Candidacy", href: "#candidate" },
    { label: "Recovery", href: "#recovery" },
    { label: "Traveling to NYC", href: "#travel" },
    { label: "FAQ", href: "#faq" },
  ],
  surgeon: {
    eyebrow: "The surgeon behind the procedure",
    heading: "Meet Dr. Sergei Kalsow, MD",
    lead:
      "A New York plastic surgeon who has made awake liposuction, Lipo 360 and body contouring the center of his practice.",
    // The first figure leads the bento; the facts below it stay readable text.
    stats: [
      {
        value: "5,000+",
        label: "Awake liposuction procedures",
        detail: "Awake Lipo 360 and related liposuction under local anesthesia, planned around each patient's anatomy.",
      },
      {
        value: "8,000+",
        label: "Awake procedures in total",
        detail: "Every procedure performed with the awake, local-anesthesia approach.",
      },
      {
        value: "10,000+",
        label: "Surgeries performed",
        detail: "Across all the procedures in his practice.",
      },
    ],
    body: [],
    photo: {
      src: "/img/team/dr-kalsow-whitecoat.jpg",
      alt: "Dr. Sergei Kalsow, MD, in a white coat at his New York City practice",
    },
    points: [
      {
        title: "Founder of Dreams Plastic Surgery",
        body: "The New York City practice he founded, where he is one of the surgeons.",
      },
      {
        title: "635 Madison Avenue",
        body: "A private practice in New York City that also sees patients traveling in from across the U.S. and abroad.",
      },
      {
        title: "One surgeon, start to finish",
        body: "Consultation, standing markings, the procedure and every follow-up visit with Dr. Kalsow.",
      },
      {
        title: "Revision experience",
        body: "Patients also come to him after liposuction elsewhere. Revision work follows its own strategy.",
      },
    ],
    closing: "Liposuction is not a side service here. It is one of the procedures the practice is built around.",
  },
  results: {
    eyebrow: "Real patients",
    heading: "Awake Lipo 360 Results",
    intro:
      "Each case shows the same patient before and after Awake Lipo 360, photographed from the same angle. More views of these and other patients are in the full gallery.",
    // From the doctor's Sep 2026 photo drop, underwear level only so the paid
    // landing stays PG: back views in full, front views cropped to the treated
    // torso (no chest, no buttocks). The full set is in the gallery.
    cases: [
      {
        image: "/img/ba/awake-lipo-360-1.jpg",
        alt: "Awake Lipo 360 before and after, back view. Before: fullness across the lower back and flanks. After: a smoother back and a more defined waist.",
        view: "Back view",
        source: "back_before5 / back_after5",
      },
      {
        image: "/img/ba/awake-lipo-360-2.jpg",
        alt: "Awake Lipo 360 before and after, back view. Before: rolls across the mid and lower back. After: a flatter back and a narrower waistline.",
        view: "Back view",
        source: "set6_back_before / set6_back_after",
      },
      {
        image: "/img/ba/awake-lipo-360-3.jpg",
        alt: "Awake Lipo 360 before and after, upper back. Before: rolls below the shoulder blades and at the bra line. After: a smooth upper back.",
        view: "Upper back",
        source: "set1_before / set1_after",
      },
      {
        image: "/img/ba/awake-lipo-360-4.jpg",
        alt: "Awake Lipo 360 before and after, front view of the abdomen and waist. Before: a rounded lower abdomen with surgical markings. After: a flatter abdomen and a defined waist.",
        view: "Front view, abdomen and waist",
        layout: "stacked",
        source: "front_before5 / front_after5, torso band",
      },
      {
        image: "/img/ba/awake-lipo-360-5.jpg",
        alt: "Awake Lipo 360 before and after, front view of the abdomen and waist. Before: fullness around the navel and flanks. After: a flatter abdomen with a narrower waistline.",
        view: "Front view, abdomen and waist",
        layout: "stacked",
        source: "set6_front_before / set6_front_after, torso band",
      },
      {
        image: "/img/ba/awake-lipo-360-6.jpg",
        alt: "Awake Lipo 360 before and after, front view of the abdomen and waist. Before: a full midsection with the treatment plan drawn on. After: a flatter abdomen and a more even contour.",
        view: "Front view, abdomen and waist",
        layout: "stacked",
        source: "front_before4 / front_after4, torso band",
      },
    ],
    gallery: { label: "View the Full Gallery", href: "/beforeafter" },
    disclaimer: "Before-and-after photographs show individual outcomes and do not guarantee a particular result.",
  },
  scars: {
    eyebrow: "Scars and incisions",
    heading: "What about scars?",
    intro:
      "Liposuction does not require long incisions. Fat is removed through small access points, and where they go is part of the plan.",
    facts: [
      {
        title: "A few millimeters each",
        body: "Awake Lipo 360 is performed through small access incisions, typically a few millimeters long, rather than a continuous cut.",
      },
      {
        title: "Placed with clothing in mind",
        body: "Where anatomy allows, access points are planned in natural creases or in areas usually covered by underwear.",
      },
      {
        title: "They fade over time",
        body: "Incision marks are most visible in the first months and keep softening as they mature. Healing and final appearance vary by patient and skin type.",
      },
    ],
    // Scar photographs are on their way from the doctor (asked 21 Sep 2026).
    cases: [],
    // IMG_2164.MOV from the doctor's Drive: a 6-second macro of one healed
    // access incision, cropped square and muted. Loops on its own.
    videos: [
      {
        src: "/video/landing/awake-lipo-360-incision.mp4",
        poster: "/video/landing/awake-lipo-360-incision-poster.jpg",
        title: "A healed access incision",
        caption: "A few millimeters wide, on a patient's flank, filmed at the practice.",
        ambient: true,
      },
    ],
    note: "More photographs of healed incisions can be reviewed during your consultation.",
  },
  finalCta: {
    eyebrow: "Request a consultation",
    heading: "Tell Dr. Kalsow about your goals.",
    body:
      "Consultations are held in person at 635 Madison Avenue or by FaceTime. Share a few details and the office will be in touch to schedule.",
  },
  detailsIntro: {
    eyebrow: "In detail",
    heading: "The procedure, in detail.",
    body:
      "How Awake Lipo 360 works, who it is for, what recovery looks like and what to expect if you are traveling to New York.",
  },
  whatIsIt: {
    eyebrow: "Start with the procedure",
    heading: "What Is Awake Lipo 360?",
    body: [
      "Awake Lipo 360 is circumferential liposuction of the torso performed with local, tumescent anesthesia and an individualized comfort plan when an awake approach is appropriate.",
      "Instead of treating the abdomen as a single isolated area, Lipo 360 approaches the midsection as one continuous contour, typically including the abdomen, waist, flanks and back.",
      "The objective is body contouring, not weight loss. The exact treatment areas, anesthesia plan and amount of fat that can be removed safely are determined after an in-person or virtual evaluation.",
    ],
    highlight: {
      title: "One continuous contour",
      items: ["Abdomen", "Waist", "Flanks", "Back"],
    },
  },
  goals: {
    eyebrow: "Treatment goals",
    heading: "What Can Awake Lipo 360 Achieve?",
    intro:
      "The goal is to improve the shape and transitions of the torso, especially the waistline, while respecting the patient's natural frame.",
    cards: [
      {
        title: "Define the waist",
        body: "Reduce localized fullness around the abdomen, sides and lower back to reveal a clearer waistline.",
      },
      {
        title: "Improve 360° proportion",
        body: "Treat the torso as a connected shape so transitions between the front, sides and back look more balanced.",
      },
      {
        title: "Personalize the contour",
        body: "Adapt treatment areas to body frame, fat distribution, skin quality and realistic aesthetic goals.",
      },
    ],
    note: "Individual results vary. Lipo 360 is not a weight-loss procedure and may not be appropriate for every patient.",
    figure: {
      src: "/img/landing/awake-lipo-360/additional-areas.png",
      alt: "Diagram of additional body contouring areas that may be treated with liposuction, front and back views",
      width: 1046,
      height: 1100,
    },
    figureNote:
      "Additional contouring areas can be discussed during consultation when they are relevant to the patient's anatomy and goals.",
  },
  howItWorks: {
    id: "awake",
    eyebrow: "The how",
    heading: "How Awake Lipo 360 Works",
    intro:
      "“Awake” does not mean that comfort is ignored. The anesthesia and medication plan is individualized based on the procedure and patient.",
    caution:
      "Awake does not mean sensation-free. Patients can experience pressure, movement and periods of discomfort, and the procedure should not be described as pain-free.",
    steps: [
      {
        title: "Consultation and planning",
        body: "Review anatomy, goals, medical history, skin quality and the areas that may benefit from contouring.",
      },
      {
        title: "Standing markings",
        body: "Dr. Kalsow maps the treatment areas and transitions before the procedure begins.",
      },
      {
        title: "Local, tumescent anesthesia",
        body: "The treatment areas are numbed according to the individualized anesthesia and comfort plan.",
      },
      {
        title: "360° contouring",
        body: "The torso is treated circumferentially, with attention to symmetry and transitions rather than isolated fat pockets.",
      },
      {
        title: "Garment and follow-up plan",
        body: "Patients receive individualized instructions for garments, activity, medication and postoperative visits.",
      },
    ],
  },
  approach: {
    eyebrow: "A liposuction-first practice",
    heading: "The Kalsow Approach to Awake Lipo 360",
    body: [
      "Liposuction and body contouring are the center of Dr. Kalsow's practice, with 360° planning that treats the torso as one connected shape rather than a collection of isolated areas.",
      "Each patient is evaluated individually for anatomy, skin quality, fat distribution, goals and the anesthesia approach that may be appropriate. Dr. Kalsow stays directly involved in planning, surgery and postoperative care.",
    ],
    metrics: [
      { value: "360°", label: "The abdomen, waist, flanks and back planned as one continuous contour" },
      { value: "Awake", label: "Local, tumescent anesthesia with an individualized comfort plan when appropriate" },
      { value: "1 surgeon", label: "Planning, markings, procedure and follow-up with Dr. Kalsow himself" },
    ],
    links: [
      { label: "Meet Dr. Kalsow", href: "#meet-kalsow" },
      { label: "Explore Dreams Plastic Surgery", href: DREAMS_URL, external: true },
    ],
  },
  candidacy: {
    eyebrow: "Candidacy",
    heading: "Is Awake Lipo 360 Right for You?",
    intro:
      "Awake Lipo 360 may be considered for adults who want to improve localized torso contour and who are appropriate candidates for liposuction and the proposed anesthesia plan.",
    items: [
      "You are in appropriate overall health for the procedure.",
      "Your weight is reasonably stable.",
      "You have localized fat that has not responded as desired to diet and exercise.",
      "You understand that liposuction contours the body; it is not a substitute for weight loss.",
      "You have realistic expectations about shape, skin retraction and recovery.",
      "You can follow preoperative and postoperative instructions.",
    ],
    closing:
      "Final candidacy is determined after medical evaluation. Some patients may be better suited to another procedure, a staged plan, or a different anesthesia approach.",
  },
  recovery: {
    eyebrow: "Set expectations early",
    heading: "Recovery After Awake Lipo 360",
    intro:
      "Recovery varies with the extent of treatment, the patient's health, the amount of liposuction performed and individual healing.",
    cards: [
      { title: "Compression", body: "Compression garments may be recommended to support the early recovery period." },
      { title: "Swelling and bruising", body: "These are expected during early healing and improve gradually over time." },
      { title: "Activity", body: "Walking is often encouraged, while strenuous activity is restricted until cleared." },
      { title: "Final contour", body: "Results evolve as swelling resolves and tissues settle; final timing varies by patient." },
    ],
  },
  safety: {
    eyebrow: "Trust through clarity",
    heading: "Safety, Limits and Informed Decision-Making",
    intro: "Every surgical procedure has risks, and the safest plan is the one built for the individual patient.",
    cards: [
      {
        title: "Risks are reviewed openly",
        body: "The right plan depends on the patient, the treatment areas, the total procedure, medical history, the facility and the anesthesia approach.",
      },
      {
        title: "No promises on volume, comfort or shape",
        body: "No specific amount of fat removal, pain-free experience, guaranteed skin tightening or predetermined shape can be promised.",
      },
      {
        title: "Decided in consultation",
        body: "Dr. Kalsow reviews the expected benefits, limitations, alternatives, recovery plan and procedure-specific risks so the decision is individualized.",
      },
    ],
  },
  secondary: {
    id: "fat-transfer",
    eyebrow: "Optional combined planning",
    heading: "Can Fat Transfer Be Combined With Lipo 360?",
    body: [
      "In selected patients, fat collected during liposuction may be considered for contour enhancement in another area. Whether this is appropriate depends on anatomy, available donor fat, goals and safety considerations.",
      "Awake Lipo 360 remains the primary procedure. The exact treatment plan is individualized after consultation, and not every patient is a candidate for combined fat transfer.",
    ],
    figure: {
      src: "/img/landing/awake-lipo-360/fat-transfer-areas.png",
      alt: "Diagram of possible fat transfer areas: face, breasts, hips and buttocks",
      width: 1046,
      height: 1100,
    },
  },
  travel: {
    eyebrow: "Destination patients",
    heading: "Traveling to New York for Awake Lipo 360",
    intro:
      "Patients traveling to New York need more than a procedure description. They need to understand how consultation, arrival, postoperative visits and clearance to travel home fit together.",
    items: [
      "Virtual consultation before travel when appropriate.",
      "Pre-arrival instructions and required medical documentation.",
      "Guidance on where to stay and how long to remain in New York.",
      "Transportation planning for the day of the procedure.",
      "Postoperative visits before returning home.",
    ],
  },
  faq: [
    {
      q: "What does “awake” Lipo 360 mean?",
      a: "It refers to performing Lipo 360 with a local, tumescent anesthesia approach and an individualized comfort plan when appropriate, rather than automatically using general anesthesia.",
    },
    {
      q: "What areas are treated with Lipo 360?",
      a: "Lipo 360 commonly includes the abdomen, waist, flanks and back. Exact treatment boundaries depend on the patient's anatomy and goals.",
    },
    {
      q: "Is Awake Lipo 360 painful?",
      a: "The numbing process and parts of the procedure can be uncomfortable. Patients may feel pressure or movement. Comfort varies, and the procedure should not be described as pain-free.",
    },
    {
      q: "Is Lipo 360 a weight-loss procedure?",
      a: "No. Lipo 360 is a body-contouring procedure designed to reduce localized fat and improve shape. It is not a substitute for weight loss.",
    },
    {
      q: "How long is recovery?",
      a: "Recovery varies based on the extent of treatment and individual healing. Swelling and bruising are expected early, and activity is gradually increased according to postoperative instructions.",
    },
    {
      q: "Can I travel to NYC for surgery?",
      a: "Potentially, yes. Destination patients need a plan for consultation, preoperative clearance, local accommodation, transportation, postoperative visits and safe timing for travel home.",
    },
    {
      q: "How much does Awake Lipo 360 cost?",
      a: "Pricing depends on the treatment plan, number of areas, complexity and other clinical factors. A consultation is needed for an individualized quote.",
    },
    {
      q: "Can fat transfer be combined with Lipo 360?",
      a: "In selected patients, harvested fat may be used for contour enhancement. Whether fat transfer is appropriate depends on anatomy, goals, available donor fat and safety considerations.",
    },
  ],
  faqTone: "cream",
  closing: {
    heading: "Start with a conversation.",
    body:
      "Request a consultation with Dr. Sergei Kalsow in New York City, in person or by FaceTime. Your anatomy, goals and medical history come first; the plan follows.",
  },
  schema: {
    name: "Awake Lipo 360",
    bodyLocation: "Abdomen, waist, flanks and back",
    description:
      "Circumferential liposuction of the torso performed with an awake, local-anesthesia approach when medically appropriate.",
  },
};

/* ------------------------------------------------------------
   BREAST REDUCTION — SEO + paid landing with the insurance angle.
   No inline before/after media: the doctor's Ads account is restricted
   for nudity, so the paid landing stays PG and links to the gallery.
   ------------------------------------------------------------ */
export const BREAST_REDUCTION: LandingContent = {
  path: "/breast-reduction-nyc",
  // The SEO team's original order, unchanged until the client reviews this page.
  sections: [
    "quicknav",
    "pillars",
    "what-is-it",
    "goals",
    "results",
    "how-it-works",
    "insurance",
    "approach",
    "candidacy",
    "recovery",
    "secondary",
    "travel",
    "surgeon",
    "faq",
    "consultation",
  ],
  hero: {
    eyebrow: "Reduction Mammoplasty · New York City",
    lead:
      "Reduce excess breast size and weight, reshape and lift the breasts, and create a lighter, more proportionate result with Dr. Sergei Kalsow, MD.",
    trust: [
      "Board-Certified Plastic Surgeon",
      "Madison Avenue, NYC",
      "5,000+ surgeries performed",
      "Out-of-network benefits reviewed",
    ],
    primary: { label: "Request a Consultation", href: "#consultation" },
    secondary: { label: "Check Insurance Benefits", href: "#insurance" },
    note: "Insurance coverage depends on your individual plan, medical necessity, authorization requirements and insurer determination.",
    media: {
      kind: "portrait",
      src: "/img/team/dr-kalsow-whitecoat.jpg",
      alt: "Dr. Sergei Kalsow, MD, in a white coat at his New York City practice",
    },
  },
  quickNav: [
    { label: "What it is", href: "#what-is-it" },
    { label: "What it can help", href: "#goals" },
    { label: "Results", href: "#results" },
    { label: "How it works", href: "#how-it-works" },
    { label: "Insurance", href: "#insurance" },
    { label: "Dr. Kalsow's approach", href: "#approach" },
    { label: "Candidacy", href: "#candidate" },
    { label: "Recovery", href: "#recovery" },
    { label: "Awake option", href: "#awake" },
    { label: "Why Dr. Kalsow", href: "#meet-kalsow" },
    { label: "FAQ", href: "#faq" },
  ],
  pillars: [
    { title: "Comfort and proportion", body: "The goal is not only a smaller breast, but a lighter and more balanced shape." },
    { title: "Lift is part of the plan", body: "Reduction usually includes reshaping and elevating the remaining breast tissue." },
    { title: "Insurance pathway", body: "Applicable out-of-network benefits may be reviewed when medical necessity is involved." },
    { title: "Surgeon-led care", body: "Consultation, surgical planning and follow-up remain directly connected to Dr. Kalsow." },
  ],
  whatIsIt: {
    eyebrow: "Start with the procedure",
    heading: "What Is Breast Reduction Surgery?",
    body: [
      "Breast reduction, also called reduction mammoplasty, is a surgical procedure that reduces the size and weight of the breasts by removing excess skin, fat and glandular tissue.",
      "The remaining breast tissue is then reshaped and elevated to create a smaller, lighter and more proportionate breast contour.",
      "For many patients, the goal is both functional and aesthetic: improve physical comfort while creating a breast size and shape that better fits the body.",
    ],
    highlight: {
      title: "Smaller. Lighter. Lifted.",
      body: "A reduction changes more than volume. It also changes shape, breast position and proportion.",
    },
  },
  goals: {
    eyebrow: "What patients are trying to solve",
    heading: "What Can Breast Reduction Help With?",
    intro:
      "Disproportionately large or heavy breasts can affect comfort, physical activity, clothing fit and body proportion.",
    cards: [
      {
        title: "Physical discomfort",
        body: "May help improve neck, back or shoulder discomfort associated with excessive breast weight.",
      },
      {
        title: "Exercise and daily activity",
        body: "A lighter breast size may make movement, exercise and certain activities more comfortable.",
      },
      {
        title: "Shape and proportion",
        body: "The remaining breast tissue is reshaped and lifted to create a size that better matches the patient's frame.",
      },
    ],
    extraCards: [
      { title: "Bra-strap grooving", body: "Heavy breasts can contribute to persistent pressure from bra straps." },
      { title: "Skin irritation", body: "Some patients experience irritation or rashes beneath the breasts." },
      { title: "Clothing fit", body: "Reducing breast volume can make it easier to dress in proportion to the rest of the body." },
    ],
  },
  results: {
    eyebrow: "Real patient outcomes",
    heading: "Breast Reduction Results",
    intro:
      "Breast reduction is not only about becoming smaller. Look at breast position, shape, symmetry and how the result relates to the patient's overall frame.",
    cases: [],
    gallery: { label: "View Before and After Cases", href: "/beforeafter" },
    disclaimer: "Individual results vary. Images show individual patient outcomes and do not guarantee a specific result.",
  },
  howItWorks: {
    id: "how-it-works",
    eyebrow: "The how",
    heading: "How Breast Reduction Works",
    intro:
      "Every reduction is planned around breast size, symptoms, skin quality, nipple position, symmetry, body proportions and the patient's goals.",
    steps: [
      {
        title: "Consultation and planning",
        body: "Dr. Kalsow reviews symptoms, medical history, breast anatomy, goals and realistic size options.",
      },
      {
        title: "Reduce excess tissue",
        body: "Excess skin, fat and glandular tissue are removed according to the surgical plan.",
      },
      {
        title: "Reshape and lift",
        body: "The remaining tissue is reshaped and elevated to create a smaller and more balanced contour.",
      },
      {
        title: "Reposition when appropriate",
        body: "Nipple and areola position may be adjusted as part of the reshaping process.",
      },
      {
        title: "Recovery and follow-up",
        body: "Postoperative instructions are individualized based on the operation and the patient's healing.",
      },
    ],
  },
  insurance: {
    eyebrow: "Insurance",
    heading: "Could Out-of-Network Insurance Benefits Apply?",
    intro:
      "Breast reduction may qualify for insurance benefits when it meets the medical-necessity requirements of the patient's health plan. If you have PPO or other applicable out-of-network benefits, Dr. Kalsow's team can review the available benefit information with you.",
    steps: [
      {
        title: "Send your plan information",
        body: "You do not need to know whether you have out-of-network benefits before contacting the office.",
      },
      {
        title: "Benefits are reviewed",
        body: "The team reviews available out-of-network benefits, deductibles, coinsurance and authorization requirements.",
      },
      {
        title: "Meet Dr. Kalsow",
        body: "Your symptoms, anatomy, history and surgical goals are evaluated personally.",
      },
      {
        title: "Documentation and next steps",
        body: "When applicable, the office assists with clinical information requested by the insurer.",
      },
    ],
    cta: { label: "Check My Insurance Benefits", href: "#consultation" },
    disclaimer:
      "Verification of benefits or prior authorization does not guarantee payment. Coverage and patient responsibility depend on the individual policy and insurer determination.",
  },
  approach: {
    eyebrow: "More than tissue removal",
    heading: "Dr. Kalsow's Approach to Breast Reduction",
    body: [
      "A breast reduction is not simply an exercise in removing the maximum amount of tissue. The operation changes breast size, shape, lift, nipple position, symmetry and the relationship between the breasts and the rest of the body.",
      "Dr. Kalsow's planning balances the functional goal of reducing excess breast weight with the aesthetic goal of creating a breast contour that feels appropriate for the patient's anatomy.",
    ],
    metrics: [
      { value: "5,000+", label: "Surgeries performed" },
      { value: "Shape", label: "Reduction and reshaping are planned together" },
      { value: "1 plan", label: "Functional concerns and aesthetic goals are evaluated together" },
    ],
    links: [{ label: "Meet Dr. Kalsow", href: "#meet-kalsow" }],
  },
  candidacy: {
    eyebrow: "Candidacy",
    heading: "Is Breast Reduction Right for You?",
    intro:
      "You may be a candidate for breast reduction if your breasts feel disproportionately large for your body, contribute to physical discomfort, interfere with exercise or make clothing fit difficult.",
    items: [
      "You want a smaller, lighter breast size.",
      "You experience symptoms related to breast weight or size.",
      "You want breast reshaping and lift as part of the reduction.",
      "You are in appropriate overall health for surgery.",
      "You understand that scars are part of breast reduction surgery.",
      "You have realistic expectations about size, shape and healing.",
    ],
    closing: "Final candidacy and the appropriate surgical plan are determined after medical evaluation.",
    quote:
      "The question is not only “How much smaller?” It is also “What size and shape make sense for your body?”",
  },
  recovery: {
    eyebrow: "Set expectations clearly",
    heading: "Recovery After Breast Reduction",
    intro:
      "Recovery varies by patient and surgical plan. Swelling, bruising, incision care and activity restrictions are normal parts of the early healing period.",
    cards: [
      { title: "Support garment", body: "A supportive postoperative bra or garment may be recommended during early healing." },
      { title: "Swelling", body: "Breast shape changes as swelling decreases and the tissues settle over time." },
      { title: "Activity", body: "Walking is generally encouraged while strenuous exercise and heavy lifting are restricted until cleared." },
      { title: "Scars", body: "Incisions are an expected part of breast reduction and mature gradually with time." },
    ],
  },
  secondary: {
    id: "awake",
    eyebrow: "An additional option for selected patients",
    heading: "Awake Breast Reduction",
    body: [
      "Dr. Kalsow also offers an awake, local-anesthesia-based breast reduction approach for appropriately selected patients.",
      "The anesthesia plan is individualized according to the patient, the extent of the procedure, medical considerations and comfort. An awake option is not automatically appropriate for every breast reduction.",
      "Insurance eligibility for medically necessary breast reduction is evaluated separately from the anesthesia technique. The appropriate anesthesia plan should follow the patient and the operation, not a marketing label.",
    ],
  },
  travel: {
    eyebrow: "New York and beyond",
    heading: "Traveling to NYC for Breast Reduction",
    intro:
      "Patients traveling to New York need a clear plan for consultation, preoperative requirements, local accommodation, postoperative visits and safe timing for travel home.",
    items: [
      "Virtual consultation when appropriate.",
      "Pre-arrival medical and scheduling instructions.",
      "Guidance on how long to remain in New York.",
      "Postoperative follow-up before returning home.",
    ],
  },
  surgeon: {
    eyebrow: "The surgeon behind the procedure",
    heading: "Meet Dr. Sergei Kalsow, MD",
    lead:
      "A board-certified plastic surgeon in New York City whose practice includes breast surgery, body contouring and cosmetic procedures performed with individualized surgical and anesthesia planning.",
    body: [
      "Dr. Kalsow has performed more than 5,000 surgeries. For breast reduction patients, that experience is applied to both sides of the operation: reducing excess breast weight and creating a breast shape that remains proportionate to the patient's body.",
    ],
    pointsHeading: "What breast reduction patients can expect",
    points: [
      { title: "Board-certified", body: "Plastic and reconstructive surgery in New York City." },
      { title: "5,000+ surgeries", body: "Broad operative experience across cosmetic procedures." },
      { title: "Breast surgery focus", body: "Reduction, lift, augmentation and individualized breast planning." },
      { title: "Direct involvement", body: "Consultation, surgical planning and postoperative care." },
    ],
  },
  faq: [
    {
      q: "What is breast reduction surgery?",
      a: "Breast reduction, or reduction mammoplasty, removes excess fat, skin and glandular tissue to reduce breast size and weight, then reshapes the remaining tissue.",
    },
    {
      q: "Does breast reduction also lift the breasts?",
      a: "Yes. Breast reduction generally includes reshaping and elevating the remaining breast tissue, which can create a more lifted breast position.",
    },
    {
      q: "Can breast reduction help with back, neck or shoulder discomfort?",
      a: "It may help improve discomfort associated with disproportionately large or heavy breasts. Outcomes vary by patient and the source of the symptoms.",
    },
    {
      q: "Can insurance cover breast reduction?",
      a: "It may. Coverage depends on the medical-necessity criteria and terms of the patient's specific health plan.",
    },
    {
      q: "How do I know whether I have out-of-network benefits?",
      a: "The office can review your insurance information and help determine whether applicable out-of-network benefits appear to be available.",
    },
    {
      q: "Does checking my benefits mean surgery is approved?",
      a: "No. Benefit verification does not guarantee authorization, medical-necessity determination or final claim payment.",
    },
    {
      q: "Can breast reduction be performed awake?",
      a: "For selected patients, an awake, local-anesthesia-based approach may be considered. The appropriate anesthesia plan depends on the patient and surgical plan.",
    },
    {
      q: "How long does breast reduction recovery take?",
      a: "Recovery varies. Your activity, garment use, incision care and follow-up schedule are individualized based on the operation and healing.",
    },
    {
      q: "Will I have scars after breast reduction?",
      a: "Yes. Breast reduction requires incisions, and scars are an expected part of the operation. Their location and extent depend on the surgical technique and anatomy.",
    },
  ],
  finalCta: {
    eyebrow: "The next step",
    heading: "Find Out What Breast Reduction Could Change for You",
    body:
      "Request a consultation with Dr. Sergei Kalsow in New York City. If insurance coverage is part of your decision, the office can also review available out-of-network benefit information.",
  },
  schema: {
    name: "Breast Reduction (Reduction Mammoplasty)",
    bodyLocation: "Breasts",
    description:
      "Breast reduction surgery removes excess skin, fat and glandular tissue and reshapes the remaining breast tissue to reduce size and improve proportion.",
  },
};

export const LANDINGS: Record<string, LandingContent> = {
  [AWAKE_LIPO_360.path]: AWAKE_LIPO_360,
  [BREAST_REDUCTION.path]: BREAST_REDUCTION,
};

export function landingContent(path: string): LandingContent {
  const content = LANDINGS[path];
  if (!content) throw new Error(`No landing content registered for ${path}`);
  return content;
}

/** Surgeon portrait shared by both landings' "Meet Dr. Kalsow" section. */
export const SURGEON_PORTRAIT = {
  src: "/img/portrait/dr-kalsow-dreams.jpg",
  alt: "Dr. Sergei Kalsow, MD, founder of Dreams Plastic Surgery, at the practice",
};

export { ABOUT as ABOUT_PATH };
