export type OutreachTemplateId =
  | "gifted_collab"
  | "follow_up"
  | "group_trip_code"
  | "thank_you_posted";

export type OutreachMessageTemplate = {
  id: OutreachTemplateId;
  label: string;
  description: string;
  subject: string;
  /** Use {{name}}, {{handle}}, {{code}}, {{content}} */
  body: string;
  eyebrow: string;
  title: string;
  ctaLabel?: string;
  ctaHref?: string;
};

export const OUTREACH_MESSAGE_TEMPLATES: OutreachMessageTemplate[] = [
  {
    id: "gifted_collab",
    label: "Gifted eSIM + affiliate code",
    description: "First outreach — free KSA pass + commission.",
    subject: "Gifted KSA eSIM + custom code for your followers",
    eyebrow: "Creator partnership",
    title: "A free Saudi eSIM for your next trip",
    ctaLabel: "See NoorLink plans",
    ctaHref: "https://noorlink.co/hajj-umrah",
    body: `Hi {{name}},

I love your content{{content_ref}}!

I'm Jorge, Founder of NoorLink (noorlink.co). We built a travel eSIM for Umrah and Hajj pilgrims — instant data on Saudi networks as soon as they land, so they don't wait in airport SIM lines or pay roaming fees.

We'd love to gift you a free high-speed Saudi data pass to try, plus a custom promo code for your followers (10–15% on sales).

If that sounds useful, reply with the best email for the gift QR and the code name you'd like (e.g. {{code_hint}}).

Warm regards,
Jorge
Founder, NoorLink`,
  },
  {
    id: "follow_up",
    label: "Friendly follow-up",
    description: "Short bump if they didn't reply.",
    subject: "Quick follow-up — gifted Saudi eSIM from NoorLink",
    eyebrow: "Friendly follow-up",
    title: "Just checking in",
    ctaLabel: "View Hajj & Umrah plans",
    ctaHref: "https://noorlink.co/hajj-umrah",
    body: `Hi {{name}},

Following up on my note about a gifted Saudi eSIM + affiliate code for your audience.

Happy to keep it simple: free pass for you to test, and a code your followers can use. No pressure either way — just reply yes if you'd like me to set it up.

Jorge
NoorLink`,
  },
  {
    id: "group_trip_code",
    label: "Group / trip leader code",
    description: "For communities and retreat organizers.",
    subject: "Group promo code for your next trip travelers",
    eyebrow: "Group partnership",
    title: "A code your travelers can use",
    ctaLabel: "Browse pilgrim plans",
    ctaHref: "https://noorlink.co/hajj-umrah",
    body: `Hi {{name}},

I'm Jorge from NoorLink. We help pilgrims get Saudi eSIM data before they fly — install once, connect on landing.

If you lead group trips or retreats, we can set up a dedicated promo code for your attendees (and a commission share for you). Travelers skip airport SIM queues; you share one simple link.

Reply with your preferred code name and the trip date if you have one, and I'll set it up.

Jorge
NoorLink · noorlink.co`,
  },
  {
    id: "thank_you_posted",
    label: "Thanks after they post",
    description: "After a Story/Reel goes live.",
    subject: "Thank you — your NoorLink mention means a lot",
    eyebrow: "Thank you",
    title: "Appreciate you",
    ctaLabel: "Your dashboard / plans",
    ctaHref: "https://noorlink.co",
    body: `Hi {{name}},

Thank you for sharing NoorLink with your community. It means a lot coming from someone people trust for real travel advice.

Your code {{code}} is live — we'll keep an eye on it and are happy to top up your gifted plan or adjust the offer anytime.

If you ever need anything for an upcoming Umrah or trip video, just reply here.

Jorge
NoorLink`,
  },
];

export type OutreachTemplateVars = {
  name: string;
  handle: string;
  code: string;
  contentUrl: string;
};

export function fillOutreachTemplate(
  template: string,
  vars: OutreachTemplateVars,
): string {
  const firstName = vars.name.trim().split(/\s+/)[0] || "there";
  const handle = vars.handle.trim() || firstName;
  const code =
    vars.code.trim() ||
    `${firstName.replace(/[^a-zA-Z0-9]/g, "").toUpperCase().slice(0, 10) || "CREATOR"}10`;
  const contentRef = vars.contentUrl.trim()
    ? " — especially the piece I linked in our notes"
    : "";

  return template
    .replaceAll("{{name}}", firstName)
    .replaceAll("{{handle}}", handle)
    .replaceAll("{{code}}", code)
    .replaceAll("{{code_hint}}", code)
    .replaceAll("{{content}}", vars.contentUrl.trim())
    .replaceAll("{{content_ref}}", contentRef);
}

export function getOutreachTemplate(
  id: string,
): OutreachMessageTemplate | undefined {
  return OUTREACH_MESSAGE_TEMPLATES.find((t) => t.id === id);
}
