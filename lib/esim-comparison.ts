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
    id: "coverage",
    label: "Destination reach",
    hint: "Approximate catalog size — exact counts change as plans are added.",
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
    id: "hajj_umrah",
    label: "Dedicated Hajj & Umrah plans",
    hint: "Pilgrim-focused packaging (not only a generic Saudi country pack).",
    cells: {
      noorlink: yes("Yes — pilgrim profiles"),
      airalo: limited("Saudi packs", "Country plans; not pilgrim-framed"),
      holafly: limited("Saudi packs", "Country plans; not pilgrim-framed"),
      nomad: limited("Saudi packs", "Country plans; not pilgrim-framed"),
      saily: limited("Saudi packs", "Country plans; not pilgrim-framed"),
      gigsky: limited("Saudi packs", "Country plans; not pilgrim-framed"),
      maya: limited("Saudi packs", "Country plans; not pilgrim-framed"),
    },
  },
  {
    id: "hotspot",
    label: "Hotspot / tethering",
    hint: "Always confirm the destination plan page before you buy.",
    cells: {
      noorlink: yes("Included"),
      airalo: yes("Usually allowed"),
      holafly: limited("Often capped", "Commonly ~0.5–1 GB/day on unlimited plans"),
      nomad: yes("On plans"),
      saily: yes("On supported plans"),
      gigsky: yes("On plans"),
      maya: yes("On plans"),
    },
  },
  {
    id: "support",
    label: "Human support style",
    cells: {
      noorlink: yes("WhatsApp 24/7"),
      airalo: text("In-app chat"),
      holafly: text("Chat / WhatsApp"),
      nomad: text("In-app / email"),
      saily: text("In-app chat"),
      gigsky: text("App support"),
      maya: text("Chat / email"),
    },
  },
  {
    id: "before_fly",
    label: "Install-before-you-fly guidance",
    hint: "Clear traveler education so setup happens on home Wi‑Fi.",
    cells: {
      noorlink: yes("Guides + device check"),
      airalo: limited("App install help"),
      holafly: limited("App install help"),
      nomad: limited("App install help"),
      saily: limited("App install help"),
      gigsky: limited("App install help"),
      maya: limited("App install help"),
    },
  },
  {
    id: "delivery",
    label: "Instant digital delivery",
    cells: {
      noorlink: yes("QR by email"),
      airalo: yes("App / QR"),
      holafly: yes("App / QR"),
      nomad: yes("App / QR"),
      saily: yes("App / QR"),
      gigsky: yes("App / QR"),
      maya: yes("App / QR"),
    },
  },
  {
    id: "refund",
    label: "Refund if activation fails",
    hint: "Technical failure policies differ — check each provider’s terms.",
    cells: {
      noorlink: yes("Reviewed & refunded when eligible"),
      airalo: limited("Policy-based"),
      holafly: limited("Policy-based"),
      nomad: limited("Policy-based"),
      saily: limited("Policy-based"),
      gigsky: limited("Policy-based"),
      maya: limited("Policy-based"),
    },
  },
  {
    id: "focus",
    label: "Best fit",
    cells: {
      noorlink: text("Pilgrims & practical travelers"),
      airalo: text("Huge catalog shoppers"),
      holafly: text("Unlimited-style users"),
      nomad: text("Value + hotspot"),
      saily: text("Simple Nord-backed packs"),
      gigsky: text("App top-ups & trials"),
      maya: text("Transparent unlimited tiers"),
    },
  },
];

export const ESIM_COMPARE_DISCLAIMER =
  "Feature summaries are directional and can change by destination and plan. Always confirm hotspot rules, fair-use limits, and refund terms on each provider’s site before purchasing.";
