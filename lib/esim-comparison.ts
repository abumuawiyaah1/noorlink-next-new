/**
 * Competitive comparison for /compare.
 * Keep claims conservative — competitor features change; prefer Yes / Limited / Varies
 * over precise prices that go stale.
 */

export type CompareCellKind = "yes" | "limited" | "no" | "text";

export type CompareCell = {
  kind: CompareCellKind;
  label: string;
  note?: string;
};

export type CompareProvider = {
  id: string;
  name: string;
  highlight?: boolean;
  blurb: string;
};

export type CompareRow = {
  id: string;
  label: string;
  hint?: string;
  cells: Record<string, CompareCell>;
};

export const ESIM_COMPARE_PROVIDERS: CompareProvider[] = [
  {
    id: "noorlink",
    name: "NoorLink",
    highlight: true,
    blurb: "Travel eSIM with pilgrimage plans, hotspot, and WhatsApp help.",
  },
  {
    id: "airalo",
    name: "Airalo",
    blurb: "Large global marketplace with local, regional, and global packs.",
  },
  {
    id: "holafly",
    name: "Holafly",
    blurb: "Known for unlimited-style plans with fair-use policies.",
  },
  {
    id: "nomad",
    name: "Nomad",
    blurb: "App-led packs with hotspot on plans and strong country coverage.",
  },
  {
    id: "saily",
    name: "Saily",
    blurb: "Nord Security–backed travel eSIM with simple country packs.",
  },
  {
    id: "gigsky",
    name: "GigSky",
    blurb: "Long-running travel data brand with app install and top-ups.",
  },
  {
    id: "maya",
    name: "Maya Mobile",
    blurb: "Destination and unlimited-style options with clear speed policies.",
  },
];

const yes = (label = "Yes"): CompareCell => ({ kind: "yes", label });
const limited = (label: string, note?: string): CompareCell => ({
  kind: "limited",
  label,
  note,
});
const text = (label: string, note?: string): CompareCell => ({
  kind: "text",
  label,
  note,
});

export const ESIM_COMPARE_ROWS: CompareRow[] = [
  {
    id: "hajj_umrah",
    label: "Hajj & Umrah plans",
    hint: "A pilgrimage profile, or only a generic Saudi country pack.",
    cells: {
      noorlink: yes("Pilgrim plans"),
      airalo: text("Saudi country pack"),
      holafly: text("Saudi country pack"),
      nomad: text("Saudi country pack"),
      saily: text("Saudi country pack"),
      gigsky: text("Saudi country pack"),
      maya: text("Saudi country pack"),
    },
  },
  {
    id: "hotspot",
    label: "Hotspot",
    hint: "Confirm the exact plan page. Unlimited-style offers often limit sharing.",
    cells: {
      noorlink: yes("Included"),
      airalo: text("Usually allowed"),
      holafly: limited(
        "Often limited",
        "Unlimited-style plans commonly limit hotspot. Confirm before you buy.",
      ),
      nomad: text("On plans"),
      saily: text("On supported plans"),
      gigsky: text("On plans"),
      maya: text("On plans"),
    },
  },
  {
    id: "support",
    label: "How you get help",
    hint: "The channel you message when install or timing is confusing.",
    cells: {
      noorlink: yes("WhatsApp"),
      airalo: text("In-app chat"),
      holafly: text("Chat"),
      nomad: text("In-app / email"),
      saily: text("In-app chat"),
      gigsky: text("App support"),
      maya: text("Chat / email"),
    },
  },
  {
    id: "before_fly",
    label: "Install before you fly",
    hint: "Where a traveler can learn the steps before leaving home.",
    cells: {
      noorlink: yes("Guides + phone check"),
      airalo: text("App install steps"),
      holafly: text("App install steps"),
      nomad: text("App install steps"),
      saily: text("App install steps"),
      gigsky: text("App install steps"),
      maya: text("App install steps"),
    },
  },
  {
    id: "coverage",
    label: "Destination reach",
    hint: "Approximate catalog size. Counts change as plans are added.",
    cells: {
      noorlink: text("190+ destinations"),
      airalo: text("200+ destinations"),
      holafly: text("160+ destinations"),
      nomad: text("100+ destinations"),
      saily: text("150+ destinations"),
      gigsky: text("190+ destinations"),
      maya: text("100+ destinations"),
    },
  },
  {
    id: "focus",
    label: "Best fit",
    cells: {
      noorlink: text("Pilgrims & practical travelers"),
      airalo: text("Wide catalog"),
      holafly: text("Unlimited-style plans"),
      nomad: text("Value + hotspot"),
      saily: text("Simple country packs"),
      gigsky: text("App top-ups"),
      maya: text("Clear speed policies"),
    },
  },
];

export const ESIM_COMPARE_DISCLAIMER =
  "Feature summaries are directional and can change by destination and plan. Always confirm hotspot rules, fair-use limits, and refund terms on each provider’s site before purchasing.";

/** Visible freshness signal for SEO + trust. Update when the chart is reviewed. */
export const ESIM_COMPARE_UPDATED_ISO = "2026-09-25";
export const ESIM_COMPARE_UPDATED_LABEL = "September 25, 2026";

export type EsimCompareGuideSection = {
  id: string;
  title: string;
  body: string;
  links: { href: string; label: string }[];
};

export const ESIM_COMPARE_GUIDES: EsimCompareGuideSection[] = [
  {
    id: "vs-airalo",
    title: "NoorLink vs Airalo",
    body: "Airalo is a large eSIM marketplace with a wide catalog. NoorLink is built around traveler support and trip-ready prep — including dedicated Hajj and Umrah plans, hotspot included, WhatsApp help, and clear install-before-you-fly guidance. If you want a huge self-serve catalog, Airalo is strong. If you want pilgrimage packaging and human help when something goes wrong, start with NoorLink.",
    links: [
      { href: "/hajj-umrah", label: "Hajj & Umrah plans" },
      { href: "/destinations", label: "Browse destinations" },
      { href: "/faq", label: "FAQ" },
    ],
  },
  {
    id: "unlimited-vs-hotspot",
    title: "Unlimited-style eSIM vs hotspot-friendly plans",
    body: "Unlimited marketing often comes with fair-use throttling and capped hotspot. Holafly-style plans can be convenient if you stay on one phone and accept daily hotspot limits. If you need to share data with a laptop or travel companion, prefer providers that include honest hotspot on the plan — NoorLink includes hotspot, and Nomad is another hotspot-friendly option in the chart above.",
    links: [
      { href: "/destinations", label: "Find a destination plan" },
      { href: "/help/before-you-fly", label: "Before you fly guide" },
    ],
  },
  {
    id: "hajj-umrah",
    title: "Best eSIM for Umrah and Hajj",
    body: "Most travel eSIM brands list Saudi Arabia as a country pack. Pilgrims usually need more than that: data between Makkah and Madinah, hotspot for family, and someone to message if install fails before the flight. NoorLink’s pilgrimage profiles are framed for that trip — pair a plan with the free phone check and install guide so you land connected.",
    links: [
      { href: "/hajj-umrah", label: "Pilgrimage plans" },
      {
        href: "/help/hajj-umrah-phone-check",
        label: "Free Umrah / Hajj phone check",
      },
      {
        href: "/help/umrah-esim-before-you-fly",
        label: "Umrah eSIM before you fly",
      },
    ],
  },
  {
    id: "before-you-buy",
    title: "What to check before you buy any travel eSIM",
    body: "Confirm your phone is unlocked and eSIM-compatible, read the hotspot rules on the exact plan page, and install on home Wi‑Fi before you fly — not in an airport queue. Keep your primary number for WhatsApp and calls; travel eSIMs are usually data-only. If activation fails for a technical reason, know the refund policy before you need it.",
    links: [
      { href: "/help/before-you-fly", label: "Install before you fly" },
      { href: "/help/hajj-umrah-phone-check", label: "Device compatibility check" },
      { href: "/refund", label: "Refund policy" },
      { href: "/support", label: "Support" },
    ],
  },
];

export type EsimCompareFaq = { q: string; a: string };

export const ESIM_COMPARE_FAQS: EsimCompareFaq[] = [
  {
    q: "How is NoorLink different from Airalo or Holafly?",
    a: "Airalo focuses on a large self-serve catalog. Holafly is known for unlimited-style plans that may limit hotspot. NoorLink emphasizes dedicated Hajj and Umrah plans, hotspot included, WhatsApp support, and install-before-you-fly education — backed by independent Trustpilot reviews from real travelers.",
  },
  {
    q: "Does NoorLink include hotspot?",
    a: "Yes. Hotspot sharing is included so you can share data with a laptop or travel companion. Always confirm details on the plan page for your destination.",
  },
  {
    q: "Is there a dedicated Umrah or Hajj eSIM on NoorLink?",
    a: "Yes. NoorLink offers pilgrimage-focused plans for Makkah and Madinah (and selected Saudi + regional options), not only a generic Saudi country listing. See /hajj-umrah.",
  },
  {
    q: "Can I install my eSIM before I fly?",
    a: "Yes — and you should. Buy early, install on home Wi‑Fi, then turn on the travel line and data roaming when you land. Use the before-you-fly guide and free phone check if you are unsure.",
  },
  {
    q: "Do I keep my WhatsApp number with a travel eSIM?",
    a: "Yes. NoorLink plans are data-only. Keep your primary line active for WhatsApp and calls while using the travel eSIM for mobile data.",
  },
  {
    q: "What if the eSIM fails to activate?",
    a: "If activation fails due to a technical error on our side or the provider’s side, we review quickly and refund or replace when eligible. Change-of-mind and incompatible or locked phones are not refundable after a working QR is delivered. See the Refund Policy.",
  },
  {
    q: "Which eSIM is best for sharing data with family on Umrah?",
    a: "Choose a plan with honest hotspot included. NoorLink pilgrimage plans include hotspot, which helps when a companion needs maps or messaging without buying a second eSIM immediately.",
  },
];

export function esimCompareFaqJsonLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: ESIM_COMPARE_FAQS.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };
}

export function esimCompareItemListJsonLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Travel eSIM provider comparison",
    itemListElement: ESIM_COMPARE_PROVIDERS.map((provider, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: provider.name,
      description: provider.blurb,
    })),
  };
}
