/* ============================================================
   SINGLE SOURCE OF TRUTH — practice facts & shared copy.
   Edit here; the whole site reads from this file.
   Page-level SEO (titles/descriptions/H1s) lives in lib/seo/pages.ts.
   ============================================================ */

export const siteConfig = {
  practice: "Dreams Plastic Surgery",
  surgeon: "Dr. Sergei Kalsow, MD",
  surgeonShort: "Dr. Sergei Kalsow",
  credentials: "Board-Certified Cosmetic & Reconstructive Plastic Surgeon",

  // ---- CTA labels ----
  cta: {
    primary: "Book Your Consultation",
    primaryShort: "Book Consult",
    call: "Call Now",
  },

  // ---- Trust ----
  rating: "5.0",
  ratingSource: "RealSelf + Google reviews",
  googleReviewUrl:
    "https://search.google.com/local/writereview?placeid=ChIJCbyVUEBZwokRXTclziR0Y4I",

  // ---- Consultation fees ----
  // Prices as published on the live /call-our-office page (Option 1 / Option 3).
  // NOTE: the LP carried $500 for the virtual consult; the live site says $300.
  // Using the live figure until the client confirms which one is current.
  consultation: {
    inPerson: "$250 in-person",
    virtual: "$300 virtual",
    note: "applied toward your surgery",
    inPersonFee: "$250",
    virtualFee: "$300",
    // Photo review handled off-site on a Google Form the practice already runs.
    eConsultUrl:
      "https://docs.google.com/forms/d/e/1FAIpQLSfMoMT_qtp_3VpFgcz1xEqiP4zjPfqH-ZArMH2qY_sTegImNg/viewform",
  },

  // ---- Contact ----
  phone: {
    display: "(212) 653-8726",
    tel: "+12126538726",
  },

  // ---- Memberships ----
  memberships: [
    { label: "American Board of Plastic Surgery (ABPS)", short: "ABPS", logo: "/img/logo/board-abps.png" },
    { label: "The Aesthetic Society (ASAPS)", short: "ASAPS", logo: "/img/logo/board-asaps.png" },
    { label: "American Society of Plastic Surgeons (ASPS)", short: "ASPS", logo: "/img/logo/board-asps.png" },
    { label: "NY Regional Society of Plastic Surgeons", short: "NY Regional", logo: "/img/logo/board-ny-regional.png" },
  ],

  // ---- Social (mirrors the live site's icon row: mail, IG, YouTube, bio link) ----
  social: {
    email: "mailto:sergeikalsow@gmail.com",
    instagram: "https://www.instagram.com/doctor.serge/",
    youtube: "https://www.youtube.com/channel/UCPMf_MeIsEUtwUHbhELdrAA",
    linkHub: "https://bio.site/drkalsow",
  },

  // ---- Location (NYC only — Miami was ruled out; the client only has the NY office) ----
  locations: [
    {
      id: "nyc",
      name: "New York City",
      region: "Madison Ave",
      badge: "Flagship",
      address: "635 Madison Avenue, 17th Floor",
      cityState: "New York, NY 10022",
      hours: "Open 6 days a week · Clinic hours Wed & Sat",
      schedule: [
        { day: "Wednesday", hours: "10:00 AM – 4:00 PM" },
        { day: "Saturday", hours: "10:00 AM – 3:30 PM" },
      ],
      // same hours, machine-readable for OpeningHoursSpecification
      openingHours: [
        { dayOfWeek: "Wednesday", opens: "10:00", closes: "16:00" },
        { dayOfWeek: "Saturday", opens: "10:00", closes: "15:30" },
      ],
      phoneDisplay: "(212) 653-8726",
      phoneTel: "+12126538726",
      directions:
        "https://www.google.com/maps/search/?api=1&query=635+Madison+Avenue+17th+Floor+New+York+NY+10022",
      image: "/img/team/clinic-01.jpg",
    },
  ],

  // ---- Hero (home) ----
  hero: {
    // Sept 2026 reposition (SEO team roadmap): Awake Lipo 360 authority first,
    // credential kept as trust proof, founder relationship stated plainly.
    lead:
      "Board-certified plastic surgeon and founder of Dreams Plastic Surgery, Dr. Sergei Kalsow has performed over 5,000 surgeries and focuses his New York City practice on Awake Lipo 360 and circumferential body contouring, with natural-looking results and personal follow-up at every step.",
    // transparent bust cutout composited over the aubergine disc (hero)
    portrait: "/img/portrait/dr-kalsow-bust.png",
  },

  // ---- Testimonials (condensed from real 5★ reviews on the live sites) ----
  testimonials: [
    {
      initials: "SM",
      name: "Sarah M.",
      meta: "Lipo 360 + BBL · 2024",
      stars: 5,
      body:
        "Dr. Kalsow truly transformed my confidence. The results feel completely natural and his entire team made me feel safe at every step of the journey.",
    },
    {
      initials: "MD",
      name: "Maria D.",
      meta: "Mommy Makeover · 2023",
      stars: 5,
      body:
        "After two kids I never thought I'd feel like myself again. Dr. Kalsow gave me back my confidence. The results look like me, only better.",
    },
    {
      initials: "AR",
      name: "Anna R.",
      meta: "Breast Augmentation · 2024",
      stars: 5,
      body:
        "A true artist. The level of detail and care that goes into every consultation is unmatched in NYC. I'd recommend him to anyone considering surgery.",
    },
    {
      initials: "LC",
      name: "Lauren C.",
      meta: "Facelift · 2024",
      stars: 5,
      body:
        "Natural, refreshed, never 'done'. People keep asking if I've been on vacation. That's exactly the result I wanted and Dr. Kalsow delivered.",
    },
    {
      initials: "JL",
      name: "Jessica L.",
      meta: "Rhinoplasty · 2024",
      stars: 5,
      body:
        "From the first consultation I felt heard. He took the time to understand exactly what I wanted and the outcome exceeded every expectation I had.",
    },
    {
      initials: "TK",
      name: "Thomas K.",
      meta: "Gynecomastia · 2023",
      stars: 5,
      body:
        "Professional, discreet, and genuinely caring. The whole experience was smooth and the result is exactly what I hoped for. Highly recommend.",
    },
  ],

  meta: {
    siteName: "Dr. Sergei Kalsow, MD",
    // OG image: doctor portrait / neutral brand image — never a before/after.
    ogImage: "/img/portrait/dr-kalsow-home.jpg",
    url: "https://www.drkalsow.com",
  },

  // ---- Related practice (two-entity architecture: this site = the surgeon,
  //      Dreams = the clinic he founded). Links here are editorial, not sitewide.
  dreams: {
    name: "Dreams Plastic Surgery",
    url: "https://dreamsplasticsurgery.com/",
  },

  // ---- Third-party tags (public IDs, ported from the Squarespace site) ----
  // Loaded by components/tracking/analytics.tsx on every page, production only.
  tracking: {
    gtmId: "GTM-PFS393F8",
    ga4Id: "G-BHMK3DX4N1",
    metaPixelId: "1634976034378886",
  },
} as const;

export type SiteConfig = typeof siteConfig;
