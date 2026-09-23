/* ============================================================
   PROCEDURE CONTENT — one entry per procedure page.
   Copy is the client's own, taken from the live drkalsow.com procedure
   pages, edited only for grammar and to drop production placeholders.
   Titles / descriptions / H1s do NOT live here: they come from the SEO
   migration map in lib/seo/pages.ts.
   All 12 pages render the same template (components/marketing/procedure),
   so a template change applies everywhere at once.
   ============================================================ */

import { siteConfig } from "@/lib/site-config";

export type ProcedureFaq = { q: string; a: string };
export type ProcedureCase = { image: string; alt: string };
export type ProcedureFact = { value: string; label: string; detail?: string };
export type ProcedurePhilosophy = {
  heading: string;
  body: string[];
  principles: string[];
  closing: string;
};

/* The practice publishes its procedure videos two ways, so the template
   handles both:
   - "file": self-hosted mp4, from the pages that use a Squarespace-hosted
     video block. Plays inline with native controls.
   - "youtube": embedded from the doctor's channel. Plays inline behind a
     click-to-load facade, so YouTube's player is only fetched on demand.
   - "youtube-restricted": also from his channel, but age-restricted on
     YouTube, which blocks embedded playback outright (the iframe renders
     "this content is age-restricted" instead of the video). These open on
     YouTube in a new tab, which is the only way they can be watched. */
export type ProcedureVideo =
  | { kind: "file"; src: string; poster: string; caption: string }
  | { kind: "youtube"; id: string; poster: string; title: string; caption: string }
  | { kind: "youtube-restricted"; id: string; title: string; caption: string };

export type ProcedureContent = {
  /** Intro block: "About the procedure" */
  intro: { heading: string; lead?: string; body: string[] };
  /** Surgery video (only some procedures have one of their own on the live site) */
  video?: ProcedureVideo;
  /** Up to 3 before/after cases */
  cases: ProcedureCase[];
  /** Optional point-of-view section for procedures with a defined planning philosophy */
  philosophy?: ProcedurePhilosophy;
  /** Questions specific to this procedure, appended before the shared set */
  faq?: ProcedureFaq[];
  /**
   * Figures shown under the intro copy (StatBento). Omitted: the shared
   * PROCEDURE_FACTS. `false`: none (non-surgical pages).
   */
  facts?: readonly ProcedureFact[] | false;
};

/* Shared figures under "About the procedure", all from published copy: the
   approved surgery count, the surgeon-led care the FAQ describes and the
   consultation fee from siteConfig. */
export const PROCEDURE_FACTS: readonly ProcedureFact[] = [
  { value: "5,000+", label: "Surgeries performed", detail: "Broad operative experience across cosmetic procedures." },
  { value: "1 surgeon", label: "Start to finish", detail: "Evaluation, surgical plan, surgery and follow-up with Dr. Kalsow." },
  { value: siteConfig.consultation.inPersonFee, label: "In-person consultation", detail: "Applied toward your surgery." },
];

/* Answers below are quoted or condensed from copy the practice already
   publishes (procedure pages, the body-sculpting section, the About page).
   Nothing clinical is invented: questions the site never answers are tracked
   separately and need the doctor's input before they go live. */
export const SHARED_FAQ: ProcedureFaq[] = [
  {
    q: "Will I be awake, or under general anesthesia?",
    a: "Dr. Kalsow performs cosmetic surgery under both local and general anesthesia. The right approach depends on the procedure, its extent, your anatomy, medical considerations, comfort and goals. The operation is selected for the patient, not the patient for the only operation the surgeon performs.",
  },
  {
    q: "Who performs my surgery and my follow-up?",
    a: "Dr. Kalsow personally evaluates his patients, develops their surgical plan, performs their surgery, and stays personally involved in postoperative follow-up. The team handles consultation, scheduling, medical preparation, travel coordination and postoperative guidance.",
  },
  {
    q: "How does the consultation work?",
    // Fees come from siteConfig so this answer and the final CTA never disagree.
    a: `Consultations are ${siteConfig.consultation.inPersonFee} in person and ${siteConfig.consultation.virtualFee} virtual, and the fee is applied toward your surgery. You meet one on one with Dr. Kalsow to discuss your goals, understand your options and receive a surgical plan shaped around your anatomy. The office is at 635 Madison Avenue, 17th floor, with clinic hours Wednesday and Saturday.`,
  },
  {
    q: "Can I travel to New York for surgery?",
    a: "Yes. The practice offers virtual consultations and can help you understand scheduling and medical preparation for care in New York. The appropriate length of stay and follow-up plan depend on your procedure and individual care needs.",
  },
];

/* Body-contouring pages also carry these, all answered from published copy. */
const BODY_FAQ: ProcedureFaq[] = [
  {
    q: "Can I get an hourglass shape without a BBL?",
    a: "Often, yes. One of the goals of Dr. Kalsow's approach is to improve the waist to hip relationship through liposuction itself: by sculpting the abdomen, waist, flanks and back, the apparent relationship between waist and hips can change significantly. Fat transfer may be appropriate for selected patients, but adding volume should not be the only way a surgeon knows how to create an hourglass.",
  },
  {
    q: "Can Dr. Kalsow revise liposuction performed somewhere else?",
    a: "Dr. Kalsow evaluates patients who previously had liposuction elsewhere. Revision work is not simply another round of the same operation: it requires understanding what has already changed, what can realistically be improved, and what tissue should not be treated further.",
  },
];

export const PROCEDURE_CONTENT: Record<string, ProcedureContent> = {
  "/breast-augmentation": {
    intro: {
      heading: "Breast Augmentation Surgery in NYC",
      lead: "The best available breast augmentation surgical procedures, to give you the best possible result in the safest way possible.",
      body: [
        "During your consultation we go over your goals, and you try on different implant sizes to choose the one you like best.",
        "During the procedure, silicone or saline filled implants are placed into your chest.",
        "The surgery can be performed under either local or general anesthesia. With pre-emptive analgesia you feel less pain after surgery and recover faster.",
      ],
    },
    video: {
      kind: "file",
      src: "/video/procedures/breast-augmentation.mp4",
      poster: "/video/procedures/breast-augmentation-poster.jpg",
      caption: "Inside a breast augmentation with Dr. Kalsow",
    },
    cases: [
      { image: "/img/ba/breast-augmentation-1.jpg", alt: "Breast augmentation before and after, profile view" },
      { image: "/img/ba/breast-augmentation-2.jpg", alt: "Breast augmentation before and after, profile view" },
      { image: "/img/ba/breast-augmentation-3.jpg", alt: "Breast augmentation before and after, front view" },
    ],
  },

  "/breast-lift-and-reduction-1": {
    intro: {
      heading: "Breast Lift and Reduction",
      lead: "Breast lift surgery, also called mastopexy, tightens and removes excess tissue to raise sagging breasts.",
      body: [
        "The procedure also restores the areolas to a more perky position, and it may involve areola and nipple reduction.",
        "Breasts often sag due to a loss of skin elasticity caused by factors like age, pregnancy and weight fluctuations. Sagging is one of the most common concerns treated by plastic surgeons.",
        "A breast lift alone will make you slightly smaller, since excess tissue and skin are resected. Patients who want to stay the same size or go larger often combine a lift with breast augmentation, using implants or a fat transfer to restore lost volume.",
      ],
    },
    video: {
      kind: "youtube-restricted",
      id: "uaekqhWzh6w",
      title: "Breast implant exchange and breast lift",
      caption: "Breast implant exchange and breast lift, from Dr. Kalsow's channel",
    },
    cases: [
      { image: "/img/ba/breast-lift-and-reduction-1-1.jpg", alt: "Breast lift and reduction before and after, profile view" },
      { image: "/img/ba/breast-lift-and-reduction-1-2.jpg", alt: "Breast lift and reduction before and after, profile view" },
      { image: "/img/ba/breast-lift-and-reduction-1-3.jpg", alt: "Breast lift and reduction before and after, profile view" },
    ],
  },

  "/awake-fat-transfer-to-breast": {
    intro: {
      heading: "Awake Fat Transfer to Breast",
      lead: "Breast enhancement using your own fat, performed awake under local anesthesia.",
      body: [
        "Fat is taken from another area of the body through liposuction and transferred to the breast, so the result emphasizes your natural proportions.",
        "We will be happy to go over what works best for you during your consultation.",
      ],
    },
    video: {
      kind: "youtube",
      id: "nnFmGPNoJvc",
      poster: "/img/procedures/awake-fat-transfer-to-breast-video.jpg",
      title: "Revision BBL and breast augmentation",
      caption: "Revision BBL and breast augmentation, from Dr. Kalsow's channel",
    },
    cases: [
      { image: "/img/ba/awake-fat-transfer-to-breast-1.jpg", alt: "Awake fat transfer to breast before and after, profile view" },
      { image: "/img/ba/awake-fat-transfer-to-breast-2.jpg", alt: "Awake fat transfer to breast before and after, profile view" },
      { image: "/img/ba/awake-fat-transfer-to-breast-3.jpg", alt: "Awake fat transfer to breast before and after, profile view" },
    ],
  },

  "/lipo-360-bbl": {
    intro: {
      heading: "What a Lipo 360 and BBL can achieve",
      lead: "Liposuction removes stubborn fat from targeted areas where diet and exercise have not been effective.",
      body: [
        "A cannula with small holes is passed through the area containing the fat, and a vacuum removes it, so that area becomes smaller. Lipo 360 treats the abdomen, waist, flanks and back as one continuous shape rather than isolated spots.",
        "One of the goals of Dr. Kalsow's approach is to improve the waist to hip relationship through the liposuction itself. Fat transfer may then be appropriate for selected patients.",
        "Patients report higher self esteem and an increase in body confidence following the surgery.",
      ],
    },
    philosophy: {
      heading: "The shape you are trying to create may already be there.",
      body: [
        "Underneath excess fat is your natural frame: your rib cage, waist, musculature, pelvis and individual proportions.",
        "Dr. Kalsow's approach is not to impose the same manufactured shape on every patient. The surgical plan looks for the most balanced version of the anatomy that is already there.",
      ],
      principles: [
        "Remove with intention",
        "Preserve what creates balance",
        "Reveal the natural waist-to-hip relationship",
      ],
      closing: "The objective is not simply to make you smaller. It is to reveal your shape.",
    },
    faq: BODY_FAQ,
    video: {
      kind: "file",
      src: "/video/procedures/lipo-360-bbl.mp4",
      poster: "/video/procedures/lipo-360-bbl-poster.jpg",
      caption: "Inside a Lipo 360 with Dr. Kalsow",
    },
    cases: [
      { image: "/img/ba/lipo-360-bbl-1.jpg", alt: "Lipo 360 and BBL before and after, back view" },
      { image: "/img/ba/lipo-360-bbl-2.jpg", alt: "Lipo 360 and BBL before and after, back view" },
      { image: "/img/ba/lipo-360-bbl-3.jpg", alt: "Lipo 360 and BBL before and after, back view" },
    ],
  },

  "/skinny-bbl": {
    intro: {
      heading: "What is a Skinny BBL?",
      lead: "A subtle modification to the buttocks for slender, active patients.",
      body: [
        "Most patients who want this procedure are slender, physically active and fit, with hip dips, flat buttocks, or no natural curvature between the waistline and the buttocks. A Skinny BBL fills out hip dips, shapes and rounds the buttocks, and creates a natural transition between waist and buttocks.",
        "The procedure involves extracting fat from other areas such as the abdomen, thighs or waist through liposuction, then injecting it into the hips and buttocks to enhance volume, curvature and overall shape.",
      ],
    },
    philosophy: {
      heading: "An hourglass does not have to begin with added volume.",
      body: [
        "A meaningful change in the waist-to-hip relationship can begin with strategic contouring of the abdomen, waist, flanks and back.",
        "Fat transfer may be appropriate for selected patients, but the plan begins with the proportions of your own frame and the amount of donor fat safely available.",
      ],
      principles: ["Find the waist", "Respect the natural frame", "Add volume only when it serves the proportion"],
      closing: "Your anatomy determines what can appropriately be achieved.",
    },
    faq: BODY_FAQ,
    video: {
      kind: "file",
      src: "/video/procedures/skinny-bbl.mp4",
      poster: "/video/procedures/skinny-bbl-poster.jpg",
      caption: "Inside a Skinny BBL with Dr. Kalsow",
    },
    cases: [
      { image: "/img/ba/skinny-bbl-1.jpg", alt: "Skinny BBL before and after, back view" },
      { image: "/img/ba/skinny-bbl-2.jpg", alt: "Skinny BBL before and after, back view" },
      { image: "/img/ba/skinny-bbl-3.jpg", alt: "Skinny BBL before and after, side view" },
    ],
  },

  "/arm-lipo-1": {
    intro: {
      heading: "Arm Liposuction and Arm Lift",
      lead: "An upper arm lift, also known as a brachioplasty, removes excess fat and loose skin on the underarms.",
      body: [
        "It is the most effective way to address what are commonly called bat wings. Aging, genetics and significant weight fluctuations, particularly after weight loss surgery, all contribute to sagging arm skin, which cannot be tightened by exercise and diet alone.",
        "Usually performed as an outpatient surgery, an arm lift is the most effective and lasting way to remove extra skin and recontour the arms.",
        "It can be combined with other body contouring procedures such as liposuction, to remove excess fat and give the arms a more toned, sculpted look. It may also be performed as part of a more extensive body lift for patients who have lost a significant amount of weight.",
      ],
    },
    faq: BODY_FAQ,
    video: {
      kind: "youtube-restricted",
      id: "_86uYuepynE",
      title: "Lipo 360, arm lift and breast asymmetry correction",
      caption: "Lipo 360, arm lift and breast asymmetry correction, from Dr. Kalsow's channel",
    },
    cases: [
      { image: "/img/ba/arm-lipo-1-1.jpg", alt: "Arm liposuction before and after, back view" },
      { image: "/img/ba/arm-lipo-1-2.jpg", alt: "Arm liposuction before and after, back view" },
      { image: "/img/ba/arm-lipo-1-3.jpg", alt: "Arm liposuction before and after, back view" },
    ],
  },

  "/facelift": {
    intro: {
      heading: "Facelift",
      lead: "Facelift surgery, also called a rhytidectomy, is a facial rejuvenation procedure that can create transformative results.",
      body: [
        "It is the most effective way to address significant sagging and to smooth deep wrinkles and folds, with results that last a decade or more.",
        "The technique is customized for each patient's anatomy and aesthetic goals, but the procedure usually involves lifting tissues, tightening the underlying muscles, removing excess skin, and re-draping the remaining skin, to give the face and neck a more youthful appearance.",
        "We will be happy to go over what works best for you during your consultation.",
      ],
    },
    video: {
      kind: "file",
      src: "/video/procedures/facelift.mp4",
      poster: "/video/procedures/facelift-poster.jpg",
      caption: "Inside a facelift with Dr. Kalsow",
    },
    cases: [
      { image: "/img/ba/facelift-1.jpg", alt: "Facelift before and after, front view" },
      { image: "/img/ba/facelift-2.jpg", alt: "Facelift before and after, front view" },
      { image: "/img/ba/facelift-3.jpg", alt: "Facelift before and after, front view" },
    ],
  },

  "/rhinoplasty": {
    intro: {
      heading: "Rhinoplasty",
      lead: "Rhinoplasty is nose reshaping surgery that can change the size, shape and structure of the nose.",
      body: [
        "The medical name for a nose job comes from the Greek: rhinos means nose and plassein means to shape.",
        "This surgery is sometimes combined, and often confused, with septoplasty: the surgical correction of a deviated septum, where the dividing wall between the nasal passages is crooked. A septoplasty is intended to improve breathing, while a rhinoplasty is usually performed for aesthetic reasons.",
      ],
    },
    video: {
      kind: "youtube-restricted",
      id: "MQwG4tIN7vA",
      title: "Open Rhinoplasty (Nose Job)",
      caption: "Open Rhinoplasty (Nose Job), from Dr. Kalsow's channel",
    },
    cases: [
      { image: "/img/ba/rhinoplasty-1.jpg", alt: "Rhinoplasty before and after, front view" },
      { image: "/img/ba/rhinoplasty-2.jpg", alt: "Rhinoplasty before and after, front view" },
      { image: "/img/ba/rhinoplasty-3.jpg", alt: "Rhinoplasty before and after, profile view" },
    ],
  },

  "/blepharoplasty": {
    intro: {
      heading: "Blepharoplasty",
      lead: "Eyelid surgery that tightens and lifts sagging eyelid skin.",
      body: [
        "In some cases it also includes the removal or redistribution of the fat pockets of the lower eyelid, also called fat transposition.",
        "It can be done on the upper lids, to raise hooded or droopy eyelids, and on the lower lids, to remove eye bags and tighten loose skin. These procedures can be performed separately or at the same time.",
        "We will be happy to go over what works best for you during your consultation.",
      ],
    },
    video: {
      kind: "youtube",
      id: "OCcyKjpFXmA",
      poster: "/img/procedures/blepharoplasty-video.jpg",
      title: "Lower Blepharoplasty",
      caption: "Lower Blepharoplasty, from Dr. Kalsow's channel",
    },
    cases: [
      { image: "/img/ba/blepharoplasty-1.jpg", alt: "Blepharoplasty before and after, eyelid close-up" },
      { image: "/img/ba/blepharoplasty-2.jpg", alt: "Blepharoplasty before and after, eyelid close-up" },
      { image: "/img/ba/blepharoplasty-3.jpg", alt: "Blepharoplasty before and after, full face" },
    ],
  },

  "/chin-lipo": {
    intro: {
      heading: "Chin and Neck Liposuction",
      lead: "Chin liposuction removes excess fat from the chin, neck and jowls through a thin tube called a cannula.",
      body: [
        "Even if you are naturally slim or have worked hard to lose weight, unwanted fat under the chin can resist diet and exercise, which is why even fit people can have a double chin. That is where lipo comes in.",
        "Chin lipo is frequently combined with a chin implant to create a more defined neck contour. If your concern is skin sagging, it can also be combined with skin tightening procedures.",
        "The downtime is minimal and the recovery is not painful.",
      ],
    },
    faq: BODY_FAQ,
    video: {
      kind: "youtube",
      id: "ry7SMn56mF8",
      poster: "/img/procedures/chin-lipo-video.jpg",
      title: "Chin liposuction under local anesthesia",
      caption: "Chin liposuction under local anesthesia, from Dr. Kalsow's channel",
    },
    cases: [
      { image: "/img/ba/chin-lipo-1.jpg", alt: "Chin liposuction before and after, front view" },
      { image: "/img/ba/chin-lipo-2.jpg", alt: "Chin liposuction before and after, front view" },
      { image: "/img/ba/chin-lipo-3.jpg", alt: "Chin liposuction before and after, front view" },
    ],
  },

  "/lip-augmentation": {
    // Fillers, not surgery: the surgical figures do not belong here.
    facts: false,
    intro: {
      heading: "Lip Augmentation",
      lead: "Lip fillers add volume, correct uneven lips and refine the shape of the mouth.",
      body: [
        "Fillers can be injected into the upper and lower lips to add volume, correct uneven lips, lift the corners of the mouth, define the Cupid's bow, enhance the lip border, and smooth lip lines and wrinkles. Several materials are used for lip augmentation, and the most popular choices are made of hyaluronic acid.",
        "Administered by a board-certified provider with expertise in injection technique, lip fillers can give either very natural, subtle results or a more dramatic change that still works in harmony with your features.",
      ],
    },
    video: {
      kind: "file",
      src: "/video/procedures/lip-augmentation.mp4",
      poster: "/video/procedures/lip-augmentation-poster.jpg",
      caption: "Inside a lip augmentation with Dr. Kalsow",
    },
    cases: [
      { image: "/img/ba/lip-augmentation-1.jpg", alt: "Lip augmentation before and after, close-up" },
      { image: "/img/ba/lip-augmentation-2.jpg", alt: "Lip augmentation before and after, close-up" },
      { image: "/img/ba/lip-augmentation-3.jpg", alt: "Lip augmentation before and after, close-up" },
    ],
  },

  "/hair-transplant": {
    intro: {
      heading: "Hair Transplant",
      lead: "Hair restoration performed by a board-certified plastic surgeon in Midtown Manhattan.",
      body: [
        "We will be happy to go over what works best for you during your consultation.",
      ],
    },
    video: {
      kind: "file",
      src: "/video/procedures/hair-transplant.mp4",
      poster: "/video/procedures/hair-transplant-poster.jpg",
      caption: "Inside a hair transplant with Dr. Kalsow",
    },
    cases: [
      { image: "/img/ba/hair-transplant-1.jpg", alt: "Hair transplant before and after, crown" },
      { image: "/img/ba/hair-transplant-2.jpg", alt: "Hair transplant before and after, hairline" },
      { image: "/img/ba/hair-transplant-3.jpg", alt: "Grafted hairline immediately after a hair transplant" },
    ],
  },
};

export function procedureContent(path: string) {
  return PROCEDURE_CONTENT[path];
}
