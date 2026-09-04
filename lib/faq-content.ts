export type FaqItem = { q: string; a: string };
export type FaqGroup = { title: string; items: FaqItem[] };

export const FAQ_GROUPS: FaqGroup[] = [
  {
    title: "Delivery & install",
    items: [
      {
        q: "Where is my QR code?",
        a: "You receive a checkout confirmation first. The QR code is in a second email after payment confirms. Check spam/junk if it is missing.",
      },
      {
        q: "When does my plan start?",
        a: "Typically when you install the eSIM and connect to a supported network in the destination country.",
      },
    ],
  },
  {
    title: "Compatibility",
    items: [
      {
        q: "Will this work on my phone?",
        a: "Most phones from iPhone XR / XS, Samsung Galaxy S20, Google Pixel 3, and newer support eSIM. Check Settings for “Add eSIM”.",
      },
      {
        q: "Do I keep my WhatsApp number?",
        a: "Yes. NoorLink is data-only. Keep your physical SIM or main line on for WhatsApp and calls.",
      },
    ],
  },
  {
    title: "Refunds",
    items: [
      {
        q: "Can I get a refund?",
        a: "If the eSIM fails to activate due to a technical error on our side or the provider’s side, we can refund or replace. Change-of-mind and phones that are not eSIM-compatible or are carrier-locked are not refundable after a working QR is delivered. See our Refund Policy.",
      },
    ],
  },
];

export function faqPageJsonLd(): Record<string, unknown> {
  const mainEntity = FAQ_GROUPS.flatMap((group) =>
    group.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  );

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity,
  };
}
