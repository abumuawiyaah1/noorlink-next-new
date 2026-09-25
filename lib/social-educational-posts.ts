/**
 * October 2026 — Week 1 lead post (copy for publish review).
 * Format: problem → mechanism → fix → checklist → soft landing.
 * Educate first. Soft help close. No hard eSIM sales pitch.
 */

export type EducationalSocialPost = {
  id: string;
  title: string;
  topic: string;
  weekLabel: string;
  imagePath: string;
  imageAlt: string;
  brandWhy: string;
  caption: string;
  /** Slightly shorter version if Facebook prefers less length */
  captionShort?: string;
  storyLine: string;
  ctaUrl: string;
  productWeight: "none" | "soft" | "light";
};

export const EDUCATIONAL_SOCIAL_POSTS: EducationalSocialPost[] = [
  {
    id: "oct_w1_battery_drain",
    title: "Why your battery dies faster abroad — here's how to fix it",
    topic: "Phone literacy",
    weekLabel: "October · Week 1 · Post 1",
    imagePath: "/images/social/oct-w1-shoulder-reel.png",
    imageAlt: "Why phone battery drains faster when traveling",
    brandWhy:
      "Travel phone literacy in our lane — calm expert tone, soft help close.",
    productWeight: "soft",
    caption: `Why your battery dies faster abroad — here's how to fix it

If you're planning a fall trip — or Umrah later this season — you might notice something frustrating:

Your phone battery dies much faster abroad… even when you aren't using it much.

It isn't only photos and maps.
There's a technical reason your phone works overtime in unfamiliar cities — and a few simple fixes.

1) The “cell tower hunting” loop
Abroad, your phone keeps searching for signal across towers it doesn't know well. If the local signal is weak or patchy, the cellular modem raises power to stay connected.

The fix:
When you're moving a lot (train, bus, dense sightseeing), turn on Low Power Mode. It reduces how often the phone aggressively polls for signal and can save a lot of battery.

2) Background sync in crowded places
Airports, stations, and busy tourist spots are congested. When speeds drop, background tasks (photo backup, email sync) take longer — so the processor stays busy in your pocket.

The fix:
Turn off Background App Refresh for non-essential apps while you're out exploring.
• iPhone: Settings → General → Background App Refresh
• Android: Settings → Connections / Network → Data usage (or Battery → Background usage, depending on device)

3) Silent data-roaming drain
If your home line still has Data Roaming ON without a usable local data plan, the phone may keep trying to handshake with local networks. That loop burns power — and can risk unexpected roaming charges.

The fix:
• If you're not using home-network roaming, turn Data Roaming OFF on your primary line before takeoff.
• If you still need the primary line for SMS / verification codes, keep it for Voice & SMS only, and use a separate travel data line for internet.

Quick checklist before you fly
1. Download offline maps (hotel + airport area) on Wi‑Fi
2. Confirm your phone is carrier-unlocked
3. Dial *#06# — if you see an EID, your phone supports eSIM profiles
4. Turn on Low Power Mode during long transit days
5. Switch off background refresh for apps you don't need abroad

Save this so it's handy when you land.

Questions about checking eSIM compatibility before you fly? Comment or message us — we're happy to help you prepare. Calm arrival days start at home.`,
    captionShort: `Why your battery dies faster abroad — here's how to fix it

It isn't only maps and photos. Abroad, your phone often:
1) Hunts unfamiliar cell towers harder
2) Burns power on slow background sync in crowded places
3) Keeps trying data roaming handshakes on your home line

Fixes:
• Low Power Mode while moving
• Turn off Background App Refresh for non-essential apps
• Data Roaming OFF on your primary line (keep Voice/SMS if needed; use travel data separately)

Before you fly: offline maps, unlocked phone, dial *#06# to check for an EID (eSIM support).

Save this for landing day. Questions on device readiness? Message us — we're happy to help.`,
    storyLine:
      "Why your battery dies faster abroad — and how to fix it. Save our latest post.",
    ctaUrl: "https://noorlink.co/help/hajj-umrah-phone-check",
  },
];
