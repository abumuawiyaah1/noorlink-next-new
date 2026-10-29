/**
 * Educational social drafts for Meta (FB/IG) and LinkedIn.
 * Status "review" means: do not post until a human approves.
 */

export type EducationalPlatform = "meta" | "linkedin";

export type EducationalDraftStatus = "review" | "approved" | "posted";

export type EducationalDraft = {
  id: string;
  topic: string;
  platform: EducationalPlatform;
  status: EducationalDraftStatus;
  /** Short hook for carousels / first line */
  hook: string;
  body: string;
  cta: string;
  hashtags: string[];
  notes?: string;
};

export const EDUCATIONAL_DRAFT_STATUS_LABELS: Record<
  EducationalDraftStatus,
  string
> = {
  review: "For review",
  approved: "Approved — ready to post",
  posted: "Posted",
};

/** Human review gate before anything goes live. */
export const EDUCATIONAL_REVIEW_WORKFLOW = [
  "Write or pick an educational draft below (status starts as For review).",
  "Read Meta and LinkedIn versions side by side — same lesson, different length/tone.",
  "Edit copy in this PR or Social Hub notes until the tone feels calm and accurate.",
  "Mark approved only after a teammate signs off — then copy into Meta / LinkedIn.",
  "Do not post while status is For review.",
] as const;

/**
 * First batch of educational posts.
 * All start as "review" so nothing is treated as ready to publish.
 */
export const EDUCATIONAL_DRAFTS: EducationalDraft[] = [
  {
    id: "esim-explained-meta",
    topic: "What is an eSIM?",
    platform: "meta",
    status: "review",
    hook: "An eSIM is a digital SIM — no plastic card to swap.",
    body: `An eSIM is a digital SIM built into your phone.

Instead of popping out a plastic card abroad, you scan a QR code (or tap to install), turn the line on, and use local data when you land.

Your regular number can stay on for WhatsApp and calls. The travel eSIM is for data.

Calm tip: install before you fly — airport Wi‑Fi is slower and more stressful.`,
    cta: "Browse destinations → noorlink.co/destinations",
    hashtags: ["#eSIM", "#TravelTech", "#StayConnected", "#NoorLink"],
    notes: "Carousel idea: 1) what it is 2) keep WhatsApp 3) install at home 4) CTA",
  },
  {
    id: "esim-explained-linkedin",
    topic: "What is an eSIM?",
    platform: "linkedin",
    status: "review",
    hook: "Travel connectivity does not have to mean swapping SIMs at the airport.",
    body: `An eSIM is a digital SIM profile on your phone — no physical card to buy or swap when you travel.

For teams and frequent travelers, that usually means:
• Install at home with a QR or one-tap setup
• Keep your primary line for WhatsApp and calls
• Use destination data on arrival without roaming surprises

NoorLink covers 190+ destinations. The practical rule we share with customers: install before you fly.`,
    cta: "Plans and destinations: https://noorlink.co/destinations",
    hashtags: ["#eSIM", "#BusinessTravel", "#TravelTech", "#NoorLink"],
    notes: "LinkedIn prefers slightly longer, professional framing — avoid emoji spam.",
  },
  {
    id: "install-before-fly-meta",
    topic: "Install before you fly",
    platform: "meta",
    status: "review",
    hook: "Install your travel eSIM at home — not in the boarding queue.",
    body: `The easiest eSIM installs happen before you leave.

At home you have:
• Steady Wi‑Fi
• Time to find the QR in email
• A quiet minute to turn the travel line on

After you land: set Cellular / Mobile Data to the travel line, turn Data Roaming on for that line, and you are ready.

Picture guide → noorlink.co/help/before-you-fly`,
    cta: "Shop plans → noorlink.co/destinations",
    hashtags: ["#eSIM", "#TravelTips", "#NoorLink"],
    notes: "Pair with before-you-fly help page screenshot if available.",
  },
  {
    id: "install-before-fly-linkedin",
    topic: "Install before you fly",
    platform: "linkedin",
    status: "review",
    hook: "Airport connectivity fails are usually a process problem, not a product problem.",
    body: `Most “my eSIM does not work” moments happen when someone waits until the boarding gate — or after landing — to install.

A simple travel routine that works:
1. Install the eSIM at home on Wi‑Fi
2. Leave the travel line ready (on) before departure
3. On arrival, select that line for mobile data and enable data roaming for it

It takes a few minutes and avoids scrambling for airport Wi‑Fi while coordinating pickups or meetings.

We walk customers through this at https://noorlink.co/help/before-you-fly`,
    cta: "Explore NoorLink destinations: https://noorlink.co/destinations",
    hashtags: ["#BusinessTravel", "#eSIM", "#TravelTips", "#NoorLink"],
  },
  {
    id: "phone-check-meta",
    topic: "Does my phone support eSIM?",
    platform: "meta",
    status: "review",
    hook: "Quick check: can your phone add an eSIM?",
    body: `Most phones from iPhone XR / XS, Samsung Galaxy S20, Google Pixel 3, and newer support eSIM.

Fast check:
• iPhone → Settings → Cellular → Add eSIM
• Android → Settings → look for “SIMs”, “Mobile network”, or “Add eSIM”

Carrier-locked phones can block install. If “Add eSIM” is missing, contact your carrier or try another unlocked device.

Questions? support@noorlink.co`,
    cta: "Find a plan → noorlink.co/destinations",
    hashtags: ["#eSIM", "#TravelTech", "#NoorLink"],
  },
  {
    id: "phone-check-linkedin",
    topic: "Does my phone support eSIM?",
    platform: "linkedin",
    status: "review",
    hook: "Before you buy a travel eSIM for a trip or team, confirm the handset supports it.",
    body: `eSIM works on most recent flagship and mid-range phones — typically iPhone XR/XS and later, Samsung Galaxy S20+, Google Pixel 3+, and many newer Androids.

Two checks that save refunds and delays:
• Settings shows an “Add eSIM” (or equivalent) option
• The device is unlocked (carrier locks often block install)

NoorLink is data-only, so travelers keep WhatsApp on their primary line while using destination data on the eSIM.

Compatibility questions: support@noorlink.co`,
    cta: "Destinations: https://noorlink.co/destinations",
    hashtags: ["#eSIM", "#BusinessTravel", "#MobileConnectivity", "#NoorLink"],
  },
  {
    id: "whatsapp-number-meta",
    topic: "Keep WhatsApp on your number",
    platform: "meta",
    status: "review",
    hook: "Travel eSIM = data. Your WhatsApp number stays yours.",
    body: `NoorLink is data-only.

That means:
• Keep your physical SIM / main line for WhatsApp and calls
• Use the NoorLink eSIM for maps, chat data, and browsing abroad

You do not need a new WhatsApp account when you travel — just working data on arrival.

Install before you fly → noorlink.co/help/before-you-fly`,
    cta: "Browse plans → noorlink.co/destinations",
    hashtags: ["#eSIM", "#WhatsApp", "#TravelTips", "#NoorLink"],
  },
  {
    id: "whatsapp-number-linkedin",
    topic: "Keep WhatsApp on your number",
    platform: "linkedin",
    status: "review",
    hook: "A travel eSIM should not force a new WhatsApp identity.",
    body: `NoorLink plans are data-only. Travelers keep their primary line for WhatsApp and voice, and use the eSIM for destination data.

That split is useful for family trips and work travel alike: contacts stay on the number people already know, while maps and messaging ride on local data instead of expensive roaming.

Practical setup notes: https://noorlink.co/help/before-you-fly`,
    cta: "https://noorlink.co/destinations",
    hashtags: ["#eSIM", "#BusinessTravel", "#NoorLink"],
  },
];

export function formatEducationalPost(draft: EducationalDraft): string {
  const tags = draft.hashtags.join(" ");
  return `${draft.body}

${draft.cta}

${tags}`.trim();
}

export function educationalDraftsByTopic(): {
  topic: string;
  drafts: EducationalDraft[];
}[] {
  const map = new Map<string, EducationalDraft[]>();
  for (const draft of EDUCATIONAL_DRAFTS) {
    const list = map.get(draft.topic) ?? [];
    list.push(draft);
    map.set(draft.topic, list);
  }
  return Array.from(map.entries()).map(([topic, drafts]) => ({ topic, drafts }));
}
