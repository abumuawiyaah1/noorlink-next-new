/**
 * NoorLink Insider — Year 1 issue catalog (web archive + promo metadata).
 * Hero images live in /public/images/insider/ and are served from noorlink.co.
 */

export type InsiderIssue = {
  slug: string;
  issueNumber: number;
  monthLabel: string;
  subject: string;
  preview: string;
  heroImage: string;
  heroAlt: string;
  destinationFocus: string;
  promoCode: string;
  promoPercent: number;
  promoEndsLabel: string;
  ctaPrimary: { label: string; href: string };
  ctaSecondary?: { label: string; href: string };
  sections: {
    opener: string;
    destinationTitle: string;
    destinationBody: string[];
    tips?: string[];
    connectivityTitle: string;
    connectivityBody: string;
    hajjTitle: string;
    hajjBody: string;
    dealBody: string;
    closing: string;
  };
};

const IMG = "/images/insider";

export const INSIDER_ISSUES: InsiderIssue[] = [
  {
    slug: "2026-09-fall-turkey",
    issueNumber: 1,
    monthLabel: "September 2026",
    subject: "Fall trips, Turkey, and a calmer way to stay online",
    preview: "Destination tips, a simple eSIM habit, and early Umrah planning.",
    heroImage: `${IMG}/insider-2026-09-turkey.jpg`,
    heroAlt: "Istanbul skyline at dawn",
    destinationFocus: "Turkey",
    promoCode: "INSIDER-SEP26",
    promoPercent: 10,
    promoEndsLabel: "30 Sep 2026",
    ctaPrimary: { label: "Browse Turkey plans", href: "/plans/turkey" },
    ctaSecondary: { label: "Hajj & Umrah Connect", href: "/hajj-umrah" },
    sections: {
      opener:
        "Fall is when itineraries get interesting — city breaks, family visits, and early pilgrimage planning. This month’s Insider is short and useful: where people are heading, how to stay connected without roaming surprises, and what to think about if Umrah is on your horizon.",
      destinationTitle: "Destination guide — Turkey",
      destinationBody: [
        "Turkey rewards travelers who land ready. Maps, ride apps, and messaging work best when your data plan is already installed.",
      ],
      tips: [
        "Istanbul is two airports and a lot of walking — offline maps help, but live navigation is smoother with local data.",
        "Cross-city trips (Istanbul → Cappadocia / Antalya) are common; keep hotspot available for tablets and travel companions.",
        "Install your eSIM before departure, then turn on data roaming for the eSIM line when you land.",
      ],
      connectivityTitle: "Connectivity tip — One habit that prevents most stress",
      connectivityBody:
        "Buy and install before you fly. At the gate or hotel Wi‑Fi, you’re guessing. At home, you can test install, keep your primary number for calls/SMS if needed, and switch data to NoorLink when you arrive. Quick check: is your phone eSIM-compatible? Use the device checker on noorlink.co before checkout.",
      hajjTitle: "Hajj & Umrah note — Start early, stay calm",
      hajjBody:
        "If Umrah is this fall or winter, start a simple checklist now: confirm phone compatibility, choose a pilgrimage plan with hotspot, install before you fly, and save hotel and group WhatsApp contacts offline as backup. Peak months get busy — early prep beats airport SIM shopping.",
      dealBody:
        "Insider deal this month: 10% off with code INSIDER-SEP26 at checkout (ends 30 Sep 2026). Watch Turkey and Middle East starting prices — and if Europe is also on your list, one regional plan can cover multiple countries.",
      closing: "Travel updates, not inbox noise. See you next month.",
    },
  },
  {
    slug: "2026-10-france-uk",
    issueNumber: 2,
    monthLabel: "October 2026",
    subject: "City weekends in France & the UK — pack light, stay online",
    preview: "Short-trip connectivity, regional Europe, and a light Umrah note.",
    heroImage: `${IMG}/insider-2026-10-france.jpg`,
    heroAlt: "Paris evening street lights",
    destinationFocus: "France & UK",
    promoCode: "INSIDER-OCT26",
    promoPercent: 10,
    promoEndsLabel: "31 Oct 2026",
    ctaPrimary: { label: "Europe regional plans", href: "/plans/regional/europe" },
    ctaSecondary: { label: "Browse destinations", href: "/destinations" },
    sections: {
      opener:
        "October is made for long weekends — Paris, London, and quick hops between them. This Insider keeps connectivity simple for short city trips.",
      destinationTitle: "Destination guide — France & UK",
      destinationBody: [
        "City weekends move fast: trains, rideshares, museum tickets, and last-minute dinner bookings all need data that just works.",
      ],
      tips: [
        "If you’re touching more than one country, prefer Europe regional over single-country SIMs.",
        "Download offline maps for metro stations before you go underground.",
        "Hotspot covers a travel companion’s tablet without a second plan.",
      ],
      connectivityTitle: "Connectivity tip — Regional once, roam less",
      connectivityBody:
        "Border hopping is where single-country plans frustrate people. One Europe regional eSIM means you install once and keep messaging, maps, and tickets working as you move.",
      hajjTitle: "Hajj & Umrah note — Pack-light pilgrimage prep",
      hajjBody:
        "Short Umrah trips benefit from the same habit as city weekends: install before you fly, hotspot for the family, and keep support WhatsApp saved. Connectivity should be quiet background — not a project in Makkah.",
      dealBody:
        "Insider deal: 10% off with INSIDER-OCT26 through 31 Oct 2026. Good window for Europe regional if autumn city breaks are on your calendar.",
      closing: "Short trips. Clear signal. See you next month.",
    },
  },
  {
    slug: "2026-11-winter-sun",
    issueNumber: 3,
    monthLabel: "November 2026",
    subject: "Winter-sun prep — UAE, islands, and reliable data",
    preview: "Warm-weather corridors, hotspot habits, and pre-winter Umrah tips.",
    heroImage: `${IMG}/insider-2026-11-uae.jpg`,
    heroAlt: "Dubai skyline at dusk",
    destinationFocus: "UAE & winter sun",
    promoCode: "INSIDER-NOV26",
    promoPercent: 10,
    promoEndsLabel: "30 Nov 2026",
    ctaPrimary: { label: "Browse destinations", href: "/destinations" },
    ctaSecondary: { label: "Hajj & Umrah Connect", href: "/hajj-umrah" },
    sections: {
      opener:
        "November is when winter-sun bookings lock in — Gulf city breaks and island escapes. Here’s how to stay online without overthinking it.",
      destinationTitle: "Destination guide — UAE & winter-sun mood",
      destinationBody: [
        "Gulf cities run on apps: rides, payments, reservations, and navigation. Landing without data turns a smooth arrival into a scramble.",
      ],
      tips: [
        "Install before departure — airport Wi‑Fi is unreliable for eSIM setup.",
        "Keep hotspot ready for a second device in the hotel.",
        "Save hotel address and booking refs offline as backup.",
      ],
      connectivityTitle: "Connectivity tip — Heat, battery, hotspot",
      connectivityBody:
        "Warm destinations drain phones outdoors. Use hotspot in short bursts, carry a power bank, and keep maps downloaded for the first transfer from airport to hotel.",
      hajjTitle: "Hajj & Umrah note — Pre-winter traffic",
      hajjBody:
        "Pre-winter Umrah seasons get busy. Confirm compatibility early, pick a pilgrimage plan with hotspot, and install days before you fly — not at the departure gate.",
      dealBody:
        "Insider deal: INSIDER-NOV26 for 10% off through 30 Nov 2026. Useful for UAE and winter-sun corridors while tickets are still flexible.",
      closing: "Warm destinations. Calm connectivity.",
    },
  },
  {
    slug: "2026-12-japan-holiday",
    issueNumber: 4,
    monthLabel: "December 2026",
    subject: "Year-end trips — Japan, holidays, and data that behaves",
    preview: "Japan connectivity habits, holiday travel tips, and a quiet Makkah checklist.",
    heroImage: `${IMG}/insider-2026-12-japan.jpg`,
    heroAlt: "Quiet winter temple garden in Japan",
    destinationFocus: "Japan",
    promoCode: "INSIDER-DEC26",
    promoPercent: 10,
    promoEndsLabel: "31 Dec 2026",
    ctaPrimary: { label: "Japan plans", href: "/plans/japan" },
    ctaSecondary: { label: "Device checker", href: "/#device-checker" },
    sections: {
      opener:
        "December mixes holiday travel and once-a-year destinations. Japan rewards travelers who arrive with data already sorted — trains, translations, and maps all depend on it.",
      destinationTitle: "Destination guide — Japan",
      destinationBody: [
        "IC cards, train transfers, and restaurant queues move faster when your phone isn’t hunting for Wi‑Fi.",
      ],
      tips: [
        "Install your eSIM before the long-haul flight.",
        "Offline maps for stations help underground; live data helps above ground.",
        "Hotspot covers a travel partner without buying a second plan.",
      ],
      connectivityTitle: "Connectivity tip — Holiday roaming traps",
      connectivityBody:
        "Holiday weeks are when people accidentally leave home roaming on. Install NoorLink, switch data to the travel line on landing, and keep your primary number for SMS if your bank needs it.",
      hajjTitle: "Hajj & Umrah note — Quiet month checklist",
      hajjBody:
        "If Makkah is after the holidays, use December’s quieter inbox to finish the basics: compatibility check, plan with hotspot, install rehearsal at home.",
      dealBody:
        "Insider deal: INSIDER-DEC26 — 10% off through 31 Dec 2026. A clean year-end gift to your future self: data ready before you fly.",
      closing: "Year-end trips, fewer surprises.",
    },
  },
  {
    slug: "2027-01-north-america",
    issueNumber: 5,
    monthLabel: "January 2027",
    subject: "New year trips — USA, Canada, and clear signal",
    preview: "North America plans, January travel habits, and post-holiday Umrah notes.",
    heroImage: `${IMG}/insider-2027-01-usa.jpg`,
    heroAlt: "City skyline in soft morning light",
    destinationFocus: "USA & Canada",
    promoCode: "INSIDER-JAN27",
    promoPercent: 10,
    promoEndsLabel: "31 Jan 2027",
    ctaPrimary: { label: "Browse destinations", href: "/destinations" },
    sections: {
      opener:
        "January restarts travel calendars — conferences, family visits, and long weekends in North America. Stay useful, stay short.",
      destinationTitle: "Destination guide — USA / Canada",
      destinationBody: [
        "Rides, maps, and work chat dominate these trips. Airport-to-hotel is where roaming bills usually start — unless your travel eSIM is already on.",
      ],
      connectivityTitle: "Connectivity tip — Work trips need reliability",
      connectivityBody:
        "If you’re on calls or Slack, don’t rely on hotel lobby Wi‑Fi alone. A travel eSIM plus hotspot keeps a laptop online when the room network fails.",
      hajjTitle: "Hajj & Umrah note — After the New Year rush",
      hajjBody:
        "Post-holiday Umrah bookings pick up. Same checklist: compatible phone, hotspot plan, install before you fly.",
      dealBody:
        "Insider deal: INSIDER-JAN27 for 10% off through 31 Jan 2027.",
      closing: "New year. Same calm connectivity.",
    },
  },
  {
    slug: "2027-02-umrah-prep",
    issueNumber: 6,
    monthLabel: "February 2027",
    subject: "Umrah prep month — connectivity that stays in the background",
    preview: "Pilgrimage checklist, hotspot for family, and Hajj & Umrah Connect.",
    heroImage: `${IMG}/insider-2027-02-umrah.jpg`,
    heroAlt: "Soft night illumination near the Haram",
    destinationFocus: "Saudi Arabia · Umrah",
    promoCode: "INSIDER-FEB27",
    promoPercent: 10,
    promoEndsLabel: "28 Feb 2027",
    ctaPrimary: { label: "Hajj & Umrah Connect", href: "/hajj-umrah" },
    ctaSecondary: { label: "Device checker", href: "/#device-checker" },
    sections: {
      opener:
        "February is our main Umrah-prep Insider. Worship comes first — connectivity should be quiet, reliable background support for maps, group chats, and family coordination.",
      destinationTitle: "Destination guide — Makkah & Madinah focus",
      destinationBody: [
        "Your priorities are ibadah and logistics. Choose a pilgrimage plan with hotspot, install before you fly, and keep group coordination simple.",
      ],
      tips: [
        "Confirm eSIM compatibility weeks ahead.",
        "Install at home on good Wi‑Fi.",
        "Share hotspot with family devices when needed.",
        "Screenshot hotel and agent contacts.",
      ],
      connectivityTitle: "Connectivity tip — Family without chaos",
      connectivityBody:
        "One strong plan with hotspot often beats four separate SIMs. Agree who hosts hotspot, rotate battery duty, and keep messaging apps logged in before you lose hotel Wi‑Fi.",
      hajjTitle: "Hajj & Umrah note — Honest guidance",
      hajjBody:
        "We won’t pretend every network is perfect everywhere. What we can promise: clear pilgrimage plans, hotspot included on NoorLink options, and support when install gets confusing.",
      dealBody:
        "Insider deal: INSIDER-FEB27 — 10% off through 28 Feb 2027. Use Hajj & Umrah Connect for the dedicated path.",
      closing: "May your journey be easeful. Connectivity, handled.",
    },
  },
  {
    slug: "2027-03-europe-spring",
    issueNumber: 7,
    monthLabel: "March 2027",
    subject: "Spring city breaks — Italy, Spain, and one Europe eSIM",
    preview: "Multi-country Europe tip, spring travel habits, final Umrah install reminders.",
    heroImage: `${IMG}/insider-2027-03-europe.jpg`,
    heroAlt: "Mediterranean coastal town at golden hour",
    destinationFocus: "Europe spring",
    promoCode: "INSIDER-MAR27",
    promoPercent: 10,
    promoEndsLabel: "31 Mar 2027",
    ctaPrimary: { label: "Europe regional", href: "/plans/regional/europe" },
    sections: {
      opener:
        "Spring city breaks are back — Italy, Spain, and long weekends that cross borders. One regional plan keeps the trip simple.",
      destinationTitle: "Destination guide — Southern & Western Europe",
      destinationBody: [
        "Trains, cafés, and last-minute tickets all assume your phone works. Regional Europe is built for that pattern.",
      ],
      connectivityTitle: "Connectivity tip — Install once for the whole loop",
      connectivityBody:
        "If your itinerary lists more than one country, skip stacking single-country SIMs. Install Europe regional before you fly and switch data on landing.",
      hajjTitle: "Hajj & Umrah note — Final install reminders",
      hajjBody:
        "If Umrah is still ahead this spring, finish install rehearsal now. Don’t leave eSIM setup for the airport.",
      dealBody:
        "Insider deal: INSIDER-MAR27 for 10% off through 31 Mar 2027.",
      closing: "Spring light. Clear signal.",
    },
  },
  {
    slug: "2027-04-asia-shoulder",
    issueNumber: 8,
    monthLabel: "April 2027",
    subject: "Shoulder-season Asia — value trips and smart data",
    preview: "Thailand / Asia-Pacific tips, post-Umrah rest trips, Asia starting prices.",
    heroImage: `${IMG}/insider-2027-04-asia.jpg`,
    heroAlt: "Temple and palms in soft dawn mist",
    destinationFocus: "Asia-Pacific",
    promoCode: "INSIDER-APR27",
    promoPercent: 10,
    promoEndsLabel: "30 Apr 2027",
    ctaPrimary: { label: "Browse Asia destinations", href: "/destinations" },
    sections: {
      opener:
        "April is shoulder season for many Asia trips — better value, still warm. Connectivity habits that keep the trip easy.",
      destinationTitle: "Destination guide — Thailand & Asia mood",
      destinationBody: [
        "Ride apps, translations, and island transfers all lean on data. Install before you fly; don’t wait for hotel Wi‑Fi in a new time zone.",
      ],
      connectivityTitle: "Connectivity tip — Islands and weak Wi‑Fi",
      connectivityBody:
        "Resort Wi‑Fi is often slow. Hotspot from your travel eSIM keeps maps and messaging usable when the lobby network stalls.",
      hajjTitle: "Hajj & Umrah note — Post-Umrah rest trips",
      hajjBody:
        "Many families take a rest trip after Umrah. Same rule: buy and install before departure so the first day stays peaceful.",
      dealBody:
        "Insider deal: INSIDER-APR27 — 10% off through 30 Apr 2027. Watch Asia starting prices while shoulder season lasts.",
      closing: "Shoulder season. Smooth landings.",
    },
  },
  {
    slug: "2027-05-summer-planning",
    issueNumber: 9,
    monthLabel: "May 2027",
    subject: "Summer planning — Central Europe and family hotspot",
    preview: "Germany / Central Europe, family travel tips, summer corridor prep.",
    heroImage: `${IMG}/insider-2027-05-germany.jpg`,
    heroAlt: "European river city in soft spring light",
    destinationFocus: "Central Europe",
    promoCode: "INSIDER-MAY27",
    promoPercent: 10,
    promoEndsLabel: "31 May 2027",
    ctaPrimary: { label: "Europe regional", href: "/plans/regional/europe" },
    sections: {
      opener:
        "May is when summer itineraries harden. Central Europe and family trips need plans that cover more than one city — and hotspot that keeps everyone online.",
      destinationTitle: "Destination guide — Germany / Central Europe",
      destinationBody: [
        "Rail days and museum days both eat data. Regional Europe covers the corridor without swapping SIMs at each stop.",
      ],
      connectivityTitle: "Connectivity tip — Family hotspot etiquette",
      connectivityBody:
        "Agree one host device, pack a shared power bank, and download kids’ entertainment on Wi‑Fi before long train segments.",
      hajjTitle: "Hajj & Umrah note — Family travel mindset",
      hajjBody:
        "Whether summer leisure or later pilgrimage, family trips succeed when connectivity is decided early — not negotiated in an airport queue.",
      dealBody:
        "Insider deal: INSIDER-MAY27 for 10% off through 31 May 2027. Lock summer Europe connectivity while plans are still flexible.",
      closing: "Plan now. Travel calm later.",
    },
  },
  {
    slug: "2027-06-peak-summer",
    issueNumber: 10,
    monthLabel: "June 2027",
    subject: "Peak summer in Europe — groups, hotspot, clear signal",
    preview: "Mediterranean tips, sharing data with your group, Hajj timing glance.",
    heroImage: `${IMG}/insider-2027-06-med.jpg`,
    heroAlt: "Santorini cliffs over the Aegean",
    destinationFocus: "Mediterranean Europe",
    promoCode: "INSIDER-JUN27",
    promoPercent: 10,
    promoEndsLabel: "30 Jun 2027",
    ctaPrimary: { label: "Europe regional", href: "/plans/regional/europe" },
    ctaSecondary: { label: "Hajj & Umrah Connect", href: "/hajj-umrah" },
    sections: {
      opener:
        "June is peak planning becoming peak travel. This issue is for groups, couples, and anyone living on maps all day.",
      destinationTitle: "Destination guide — Mediterranean / Southern Europe",
      destinationBody: [
        "Long days, lots of walking, lots of photos. Connectivity matters for beach ↔ town transfers, restaurant queues, and separated group meetups.",
      ],
      connectivityTitle: "Connectivity tip — Groups without chaos",
      connectivityBody:
        "One person hosts hotspot; rotate battery duty. Download offline maps for old-town mazes. Keep messaging apps logged in before you lose Wi‑Fi.",
      hajjTitle: "Hajj & Umrah note — Timing awareness",
      hajjBody:
        "Hajj season awareness starts earlier than people think. If you may travel this cycle, bookmark Hajj & Umrah Connect and confirm your phone is eSIM-ready now.",
      dealBody:
        "Insider deal: INSIDER-JUN27 — 10% off through 30 Jun 2027. Buy when flights are firm; install a few days before departure.",
      closing: "More sun. Fewer roaming surprises.",
    },
  },
  {
    slug: "2027-07-americas",
    issueNumber: 11,
    monthLabel: "July 2027",
    subject: "Americas summer — Mexico, road trips, reliable hotspot",
    preview: "Mexico / Americas guide, summer data habits, light Umrah note.",
    heroImage: `${IMG}/insider-2027-07-mexico.jpg`,
    heroAlt: "Mexican coast at golden hour",
    destinationFocus: "Mexico & Americas",
    promoCode: "INSIDER-JUL27",
    promoPercent: 10,
    promoEndsLabel: "31 Jul 2027",
    ctaPrimary: { label: "Mexico plans", href: "/plans/mexico" },
    ctaSecondary: { label: "Browse destinations", href: "/destinations" },
    sections: {
      opener:
        "July is long-haul and road-trip season. This Insider looks west — Mexico and broader Americas — with practical habits for hot, busy days.",
      destinationTitle: "Destination guide — Mexico / Americas mood",
      destinationBody: [
        "Cities and coastal towns lean on rides, maps, and messaging. Multi-country Americas trips should check regional coverage instead of assuming one country plan covers everything.",
      ],
      connectivityTitle: "Connectivity tip — Heat + battery",
      connectivityBody:
        "Hot days drain phones. Lower brightness outdoors, use hotspot in short bursts, and carry a power bank for map-heavy days.",
      hajjTitle: "Hajj & Umrah note — Light touch",
      hajjBody:
        "Even in summer leisure season, pilgrimage planning continues for many families. Keep your compatibility check done so you’re never blocked later.",
      dealBody:
        "Insider deal: INSIDER-JUL27 for 10% off through 31 Jul 2027.",
      closing: "Long days. Clear signal.",
    },
  },
  {
    slug: "2027-08-hajj-season",
    issueNumber: 12,
    monthLabel: "August 2027",
    subject: "Late summer + Hajj-season connectivity, done honestly",
    preview: "Pilgrimage timing, install-before-fly, and a summer wrap.",
    heroImage: `${IMG}/insider-2027-08-hajj.jpg`,
    heroAlt: "Respectful dusk skyline with warm mosque light",
    destinationFocus: "Saudi · Hajj season",
    promoCode: "INSIDER-AUG27",
    promoPercent: 10,
    promoEndsLabel: "31 Aug 2027",
    ctaPrimary: { label: "Hajj & Umrah Connect", href: "/hajj-umrah" },
    ctaSecondary: { label: "Browse destinations", href: "/destinations" },
    sections: {
      opener:
        "August closes summer trips and raises pilgrimage focus for many households. Late summer habits and honest Hajj-season connectivity guidance — together.",
      destinationTitle: "Destination guide — Saudi focus + late summer",
      destinationBody: [
        "If Hajj is near: worship and logistics first. Choose a pilgrimage plan with hotspot, install before you fly, keep group coordination simple. If you’re still on a leisure trip: install early, enable the travel line on landing, hotspot when a second device needs help.",
      ],
      connectivityTitle: "Connectivity tip — Day-before-departure ritual",
      connectivityBody:
        "Night before you fly: confirm eSIM shows as installed, screenshot plan details, charge your power bank, and download offline maps for day-one areas.",
      hajjTitle: "Hajj & Umrah note — Honest season guidance",
      hajjBody:
        "Hajj demand and travel conditions change. We won’t pretend every network is perfect everywhere. Clear plans, hotspot on pilgrimage options, and support when install gets confusing — that’s the promise.",
      dealBody:
        "Insider deal: INSIDER-AUG27 — 10% off through 31 Aug 2027. Late summer is also when people book autumn Umrah — buy connectivity when you buy flights.",
      closing:
        "That’s a full year of Insider notes. Travel tips, real timing, occasional deals, no noise.",
    },
  },
];

export function getInsiderIssue(slug: string): InsiderIssue | undefined {
  return INSIDER_ISSUES.find((issue) => issue.slug === slug);
}

export function getInsiderIssuePublishAt(issue: InsiderIssue): Date {
  const [year, month] = issue.slug.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, 1));
}

export function isInsiderIssuePublished(
  issue: InsiderIssue,
  now = new Date(),
): boolean {
  return getInsiderIssuePublishAt(issue) <= now;
}

export function getPublishedInsiderIssues(now = new Date()): InsiderIssue[] {
  // Publish on the site from the first of each issue month (UTC).
  return INSIDER_ISSUES.filter((issue) => isInsiderIssuePublished(issue, now));
}

export function getUpcomingInsiderIssues(now = new Date()): InsiderIssue[] {
  return INSIDER_ISSUES.filter((issue) => !isInsiderIssuePublished(issue, now));
}
