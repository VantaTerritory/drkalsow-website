/* ============================================================
   AWAKE LIPO 360 · VARIANT B — the long-form sections of the doctor's
   "Awake lipo 360. draft 2" (Drive, 23 Sep), added in round 2 (29 Sep)
   at the client's request: Andrés asked for every section of the draft,
   in its order, "and if the page gets too long, we keep them for other
   pages". Each block is placed in LIPO_360_V2.blocks
   (lipo-360-v2.ts) and rendered by components/marketing/lipo-v2/guide.tsx.

   The copy is the draft's, word for word, except: its em dashes as
   commas (client rule), typos corrected, its source notes in brackets
   removed, and the edits noted inline.

   Stock images: the client's choice (Andrés, 29 Sep), taken from his old
   site and draft 2, license unknown; Nico accepted the copyright and Ads
   risk. Each one carries "Illustrative image. Not a patient." so no
   reader takes them for results, except where the doctor says otherwise
   (the candidacy photo, round 3).

   Round 3 (8 Oct, the doctor's edit of the page): "The Name Is Newer
   Than The Procedure" and "How Is Lipo 360 Performed?" left the page,
   candidacy became his list of goals, and his lessons sit under three
   photos of him at work.
   ============================================================ */

import type {
  Lv2DisclosureBlock,
  Lv2LessonsBlock,
  Lv2PointsBlock,
  Lv2ProseBlock,
  Lv2RevisionBlock,
} from "@/lib/landings/lipo-360-v2";

const NOT_A_PATIENT = "Illustrative image. Not a patient.";

/** "Am I a Candidate for Lipo 360?" */
export const CANDIDATE_BLOCK: Lv2ProseBlock = {
  kind: "prose",
  id: "candidate",
  tone: "white",
  eyebrow: "Candidacy",
  // round 3: the doctor's list of goals in place of draft 2's text and points
  heading: "Am I a Candidate for Lipo360?",
  body: [],
  bullets: [
    // his em dash as a colon (client rule)
    "You want more shape: a smaller waist and more curves.",
    "You have tried diet and exercise, but stubborn fat deposits remain.",
    "You want a flatter stomach.",
    "You want to reduce bra rolls and create a smoother contour in that area.",
    "You want a sculpted back and smaller love handles.",
    "You want to remove fullness above your buttocks to reveal a more defined curve.",
    "If your goal is a more sculpted shape, Lipo 360 may be the procedure for you.",
  ],
  // Draft 2's own image (upscaled x4, Real-ESRGAN). The doctor's round 3
  // caption says she is his patient: TO CONFIRM with him before this
  // publishes (the image came from his old site as stock, license unknown).
  image: {
    src: "/img/lipo-v2/stock/sunset-dress.jpg",
    alt: "A woman in a fitted beige dress on a beach at sunset",
    width: 900,
    height: 1597,
    caption: "Dr. Kalsow’s real patient",
    captionLead: true,
  },
  imageSide: "end",
};

/** "Why Stay Awake for Lipo 360?", with "Are There Alternatives to Lipo 360?" beside it. */
export const CHOICES_BLOCK: Lv2ProseBlock = {
  kind: "prose",
  id: "why-awake",
  tone: "white",
  eyebrow: "Awake surgery",
  heading: "Why Stay Awake for Lipo 360?",
  body: [
    "Awake liposuction gives patients who are good candidates an alternative to general anesthesia. You remain aware and in control, and you may avoid some effects of general anesthesia, such as grogginess, nausea, and vomiting. It can also make a smaller touch-up procedure simpler, without going under general anesthesia again.",
    "Dr. Kalsow can perform thorough Lipo 360 while you are awake. The right anesthesia choice depends on the areas being treated, your health, and your comfort, not on whether the surgeon can sculpt a complete result.",
  ],
  aside: {
    title: "Are There Alternatives to Lipo 360?",
    body: "You can choose liposuction of specific areas, such as the abdomen, flanks, or back, instead of treating the full midsection. The trade-off is that an untreated area may interrupt the transition in your contour. Fat transfer or fillers add volume rather than remove it. If loose skin or separated abdominal muscles are the main concern, a tummy tuck may be more appropriate. In some cases, a tummy tuck and liposuction are combined.",
  },
  // round 3: the doctor's photo of him and his team in the operating room
  image: {
    src: "/img/lipo-v2/or-team.jpg",
    alt: "Dr. Kalsow with two people in the operating room",
    width: 1536,
    height: 2048,
  },
  imageSide: "start",
};

/** "Limitations of Lipo 360" */
export const LIMITATIONS_BLOCK: Lv2PointsBlock = {
  kind: "points",
  id: "limitations",
  tone: "cream",
  eyebrow: "Realistic expectations",
  heading: "Limitations of Lipo 360",
  columns: 3,
  numbered: true,
  items: [
    {
      title: "Hip dips",
      body: "Fat transfer may soften their appearance, but it may not fill them completely. The result depends on your anatomy, skin, and how much fat is available.",
    },
    { title: "Diastasis recti", body: "Liposuction removes fat but does not repair separated abdominal muscles." },
    {
      title: "Loose skin",
      body: "Skin on the abdomen, bra rolls, or other areas may not tighten enough after fat removal. Excess skin may need a separate procedure.",
    },
    { title: "Waist size", body: "The rib cage and underlying bone structure limit how narrow the waist can become." },
    {
      title: "Amount of fat",
      body: "If more treatment is needed than can safely be completed in one operation, Dr. Kalsow may recommend two stages. If very little removable fat remains, because of a low BMI or previous liposuction, the visible change may be small. Large-volume liposuction is generally defined by total aspirate over 5 liters, which includes fat and fluid.",
    },
    {
      title: "Scarring from previous liposuction",
      body: "Repeated procedures can leave firm scar tissue. After several rounds, some fullness that looks like fat may actually be scar tissue that liposuction cannot remove. Further passes with a cannula may create more scarring without meaningfully improving the contour.",
    },
  ],
  // from the old drkalsow.com, upscaled x4 (Real-ESRGAN); round 3 moved it here from "Why stay awake"
  image: {
    src: "/img/lipo-v2/stock/black-lingerie.jpg",
    alt: "A woman in black lace lingerie",
    width: 1400,
    height: 1400,
    caption: NOT_A_PATIENT,
  },
};

/** "Why Are Some Patients Unhappy After Liposuction?" */
export const UNHAPPY_BLOCK: Lv2DisclosureBlock = {
  kind: "disclosure",
  id: "why-unhappy",
  tone: "white",
  eyebrow: "Before you decide",
  heading: "Why Are Some Patients Unhappy After Liposuction?",
  groups: [
    {
      title: "The most common reasons",
      items: [
        {
          title: "They expected something different",
          body: "The patient may not have understood what liposuction could change, or its limitations, before surgery.",
        },
        {
          title: "They did not fully consider the scars",
          body: "Every incision leaves a scar. Dr. Kalsow can show you the planned locations, but their exact placement may change based on where the cannula needs to reach. For example, a longer torso may require a lower abdominal incision to be placed slightly higher than expected.",
        },
        {
          title: "The surgeon could have done better",
          body: "Sometimes a better result was possible, but the surgeon did not achieve it. Choose a board-certified plastic surgeon who performs this procedure frequently and can show results on patients with bodies similar to yours.",
        },
        {
          // the draft's verb is a synonym of "corrected" here
          title: "The problem cannot be corrected with liposuction",
          body: "More liposuction will not repair separated abdominal muscles, remove significant loose skin, or eliminate cellulite. It also cannot guarantee perfect symmetry.",
        },
        {
          title: "The hip dips were not completely filled",
          body: "Fat transfer may soften hip dips, but it cannot always create large, round hips, particularly when the patient has a narrow frame, tight tissues, or very little fat available for transfer.",
        },
        {
          title: "The abdomen is not flat",
          body: "Separated muscles or fat inside the abdomen can cause fullness that liposuction cannot remove. A tummy tuck can repair separated muscles and remove excess skin, but it does not remove fat from inside the abdomen.",
        },
        {
          title: "There is extra skin",
          body: "Skin may tighten after liposuction, but how much it tightens is unpredictable. If you expect the skin removal and tightening of a tummy tuck, liposuction alone may not meet that goal.",
        },
        {
          title: "A friend or an online photo had a better result",
          body: "Two people who look similar can have different fat, skin, and underlying anatomy. Online images may also be edited or filtered, making them a poor standard for your own result.",
        },
        {
          title: "Someone else criticized the result",
          body: "Comments from friends or family can affect how you feel about a result. If something concerns you, bring it to your surgeon so you can assess it together.",
        },
        {
          title: "A complication occurred",
          body: "Every surgery carries risk. Some complications resolve; others may require treatment or leave a lasting change. Understanding those possibilities is part of deciding whether surgery is right for you.",
        },
      ],
    },
    {
      title: "What patients say, and what it can mean",
      items: [
        {
          title: "“I see no difference.”",
          body: "It may be too early to judge because swelling can hide the change. In other cases, the amount of removable fat or the condition of the skin and underlying tissues limited what surgery could achieve. Comparing consistent before-and-after photos can help you see what changed.",
        },
        {
          title: "“He missed a spot.”",
          body: "Fullness can come from remaining fat, swelling, loose skin, scar tissue, or another structure. An examination is needed to determine whether a touch-up would help.",
        },
        {
          title: "“The scars are too high” or “in the wrong place.”",
          body: "Incisions are planned to reach the areas being treated and placed as discreetly as possible. Discuss the likely range of locations before surgery if scar placement is especially important to you.",
        },
        {
          title: "“I asked for a smaller waist.”",
          body: "Liposuction can remove fat around the waist, but it cannot make the rib cage or pelvis narrower. The result is limited by your underlying structure.",
        },
        {
          title: "“I expected a better result.”",
          body: "Sometimes the concern is a correctable contour issue. Sometimes it reflects a result that could not realistically be achieved for that body. The first step is to identify which it is.",
        },
        {
          title: "“If I had known about the scars, I would not have had surgery.”",
          body: "Scars are permanent. Review their expected locations with your surgeon, ask questions, and make sure you understand them before deciding, not just when signing the consent paperwork.",
        },
        {
          title: "“He didn’t tell me about this.”",
          body: "Before surgery, ask specifically about scars, loose skin, asymmetry, swelling, complications, and what may remain unchanged. Dr. Kalsow will discuss the limitations relevant to your body.",
        },
        {
          title: "“I have fibrosis.”",
          body: "Firmness after liposuction, often around the lower abdomen or belly button, can have several causes, including swelling and healing tissue. It does not automatically mean permanent fibrosis. An examination over time can help determine what it is and whether treatment would help.",
        },
        {
          title: "“I’m one week out and need a revision.”",
          body: "One week is far too early to judge the final contour. Swelling and firmness change over months, and some results continue settling for six months to a year. Bring concerns to your surgeon early, but allow adequate healing before deciding whether a revision is needed.",
        },
      ],
    },
  ],
};

/** "Possible Complications and Concerns After Liposuction" */
export const COMPLICATIONS_BLOCK: Lv2DisclosureBlock = {
  kind: "disclosure",
  id: "complications",
  tone: "cream",
  eyebrow: "Safety",
  heading: "Possible Complications and Concerns After Liposuction",
  intro: "Any surgery carries risk. Here are the problems and recovery changes patients most often ask about.",
  groups: [
    {
      items: [
        {
          title: "Irregularities and dents",
          body: "The surface may look uneven after healing. This can happen when the fat layer is thin or the skin does not contract well, particularly on the lower abdomen.",
        },
        {
          title: "Firmness or “fibrosis”",
          body: "Treated areas can feel hard or lumpy during healing. Some firmness improves with time; persistent scar tissue or contour changes need an examination to determine whether treatment would help.",
        },
        {
          title: "Skin injury or burns",
          body: "Skin injury is uncommon but possible. Its cause matters: a thermal injury from an energy device is different from pressure injury caused by a garment. We should not assume every mark is a “lipo burn.”",
        },
        {
          title: "Seroma",
          body: "Fluid can collect beneath the skin after liposuction, sometimes despite compression. A small collection may resolve; a larger or persistent one may need drainage with a needle, sometimes more than once.",
        },
        {
          title: "Loose skin",
          body: "Liposuction removes fat, but it is not a tummy tuck. Loose skin on the abdomen, bra rolls, or love handles can remain, even when a skin-tightening treatment is used.",
        },
        {
          title: "Remaining fat or less change than expected",
          body: "Safe limits, the amount of removable fat, and your anatomy may limit the result. A touch-up is sometimes possible, but only after healing and reassessment.",
        },
        {
          title: "Asymmetry",
          body: "Most bodies have some asymmetry before surgery. Liposuction may improve it, but perfect symmetry is not possible.",
        },
        {
          title: "Numbness, tingling, or burning sensations",
          body: "These can occur as the tissues and small nerves heal, including along the sides and lower back. They often improve over months; persistent or severe symptoms should be evaluated.",
        },
        {
          title: "Pain",
          body: "Pain varies. Some patients need little medication, while others are quite sore during the first week. Pain generally improves, but pain that worsens or lasts longer than expected needs evaluation.",
        },
        {
          title: "Skin that feels unfamiliar",
          body: "Numbness and swelling may make the skin feel as though it “isn’t mine.” This sensation usually changes as healing progresses.",
        },
        {
          title: "Red drainage on the first day",
          body: "Fluid may drain from the small incisions and look bloody because it contains some blood. Your team will explain what to expect. Heavy bleeding, rapidly increasing swelling, marked weakness, or fainting is not something to dismiss as normal drainage.",
        },
        {
          title: "Lightheadedness or fainting",
          body: "Pain medication, dehydration, or a drop in blood pressure can contribute, but fainting can also signal a serious problem. Contact the surgical team promptly rather than assuming it is a medication reaction. Follow your walking instructions during recovery; do not try to “walk off” dizziness.",
        },
        {
          title: "Local-anesthetic toxicity",
          body: "This is rare but serious. Because tumescent lidocaine can be absorbed over several hours, symptoms may begin after the procedure. Your team will explain which symptoms require urgent care.",
        },
        {
          title: "Temporary hard nodules near the sides of the breasts",
          body: "Tissue in areas sculpted close to the ribs may feel firm as it heals. A persistent or growing lump should be examined.",
        },
        {
          title: "Fullness around the belly button or after a prior tummy tuck",
          body: "It may reflect swelling, remaining fat, separated muscles, a hernia, or contour changes and scarring from the earlier surgery. An examination is needed before deciding whether more liposuction would help.",
        },
      ],
    },
  ],
};

/** "A Word from Dr. Kalsow: What I’ve Learned from 10,000 Cases" */
export const LESSONS_BLOCK: Lv2LessonsBlock = {
  kind: "lessons",
  id: "a-word-from-dr-kalsow",
  eyebrow: "A word from Dr. Kalsow",
  heading: "What I’ve Learned from 10,000 Cases",
  items: [
    {
      title: "“Natural” means different things to different people.",
      body: "Show me what you mean by it. Wish pictures help me understand your expectations, but they cannot tell us what is possible for your anatomy.",
    },
    { title: "No surgery is scarless.", body: "Even small liposuction incisions leave scars." },
    {
      title: "You can tell me what you want; I will tell you what is possible.",
      body: "Requesting a specific procedure or result does not mean it is the best or safest way to reach your goal. Every additional request may involve a trade-off.",
    },
    {
      title: "Be wary of brand names.",
      body: "Water, air, lasers, and other tools do not sculpt a body on their own. What matters is the surgeon’s judgment and skill.",
    },
    {
      title: "Some concerns do not have a reliable surgical fix.",
      body: "Cellulite, loose inner-thigh skin, and natural asymmetry may remain after liposuction.",
    },
    {
      title: "You may examine your body more closely after surgery.",
      body: "Small differences that were always there can become more noticeable when you are looking for changes.",
    },
    {
      title: "Repeated surgeries have diminishing returns.",
      body: "After each procedure, there may be less fat to remove and more scar tissue to work through. Another operation does not always mean another meaningful improvement.",
    },
    {
      title: "Be wary of promises of perfection.",
      body: "Every body has limits, and every operation has risks. Social media shows only a small selection of a surgeon’s work; use it as a starting point for questions, not a guarantee of your result.",
    },
  ],
  // round 3: the doctor's three photos at work, in place of his cutout
  photos: [
    {
      src: "/img/lipo-v2/or-1.jpg",
      alt: "Dr. Kalsow in the operating room, behind two canisters of removed fat",
      width: 1125,
      height: 2000,
    },
    { src: "/img/lipo-v2/or-2.jpg", alt: "Dr. Kalsow in surgical gown and cap during liposuction", width: 1125, height: 2000 },
    { src: "/img/lipo-v2/or-3.jpg", alt: "Dr. Kalsow in scrubs, sitting in his operating room", width: 1536, height: 2048 },
  ],
};

/** "Revision Liposuction", with the draft's "[Before-and-after photos: a patient treated by Dr. Kalsow after liposuction elsewhere]": patient 06. */
export const REVISION_BLOCK: Lv2RevisionBlock = {
  kind: "revision",
  id: "revision",
  tone: "lavender",
  eyebrow: "Revision",
  heading: "Revision Liposuction",
  body: "Patients from around the world come to Dr. Kalsow after having liposuction elsewhere. Before recommending a revision, he considers three things:",
  questions: [
    "Can he make a visible improvement?",
    "Can he do it safely?",
    "Does the patient understand what the revision can realistically achieve?",
  ],
  patient: "06",
  link: { label: "See All Seven Patients", href: "#results" },
};

/** Draft 2's "Additional Procedures", "Skin Tightening" and "Areas That Need Extra Caution". */
export const MORE_BLOCK: Lv2PointsBlock = {
  kind: "points",
  id: "additional-procedures",
  tone: "white",
  eyebrow: "Planning your procedure",
  heading: "Additional Procedures",
  columns: 3,
  items: [
    {
      title: "Combining procedures",
      body: "For the right patient, combining procedures can mean one recovery and may save time and cost. Depending on your goals and what can be done safely, Dr. Kalsow may recommend fat grafting or a procedure to remove excess skin along with Lipo 360.",
    },
    {
      // The draft says "FR treatment" (RF?): named generically until the
      // practice confirms which device, as in its complications list.
      title: "Skin tightening",
      body: "Skin can contract after liposuction, although the amount varies from person to person. When appropriate, Dr. Kalsow may also use a skin-tightening treatment. It can improve the result, but it cannot replace surgical skin removal when there is significant excess skin.",
    },
    {
      title: "Areas that need extra caution",
      body: "Patients often ask about liposuction above the knees, along the front of the legs, or on the inner thighs. These areas can be difficult to contour smoothly, and the inner thighs are particularly sensitive to loose skin. Dr. Kalsow will assess whether treating them is likely to give you a worthwhile result.",
    },
  ],
};

/**
 * Every block of this module. They all sit below the first screens, so the
 * page mounts them on the client after hydration (lazy-guide.tsx): with
 * their text in the initial HTML the document doubled and pushed the hero
 * photo's LCP past variant A's in Lighthouse.
 */
export const GUIDE_BLOCKS = [
  CANDIDATE_BLOCK,
  CHOICES_BLOCK,
  LIMITATIONS_BLOCK,
  UNHAPPY_BLOCK,
  COMPLICATIONS_BLOCK,
  LESSONS_BLOCK,
  REVISION_BLOCK,
  MORE_BLOCK,
];

/** Ids of GUIDE_BLOCKS, for the page to tell them apart without shipping their copy. */
export const GUIDE_IDS: ReadonlySet<string> = new Set(GUIDE_BLOCKS.map((b) => b.id));
