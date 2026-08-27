/**
 * NoorLink Insider — Year 2 issue catalog (Sep 2027 – Aug 2028).
 */

import type { InsiderIssue } from "@/lib/insider-types";

const IMG = "/images/insider";

export const INSIDER_ISSUES_YEAR2: InsiderIssue[] = [
  {
    slug: "2027-09-morocco-maghreb",
    issueNumber: 13,
    monthLabel: "September 2027",
    subject: "Maghreb autumn — Morocco, calm cities, clear data habits",
    preview: "Morocco corridors, install-before-fly, and early pilgrimage planning.",
    heroImage: `${IMG}/insider-2027-09-morocco.jpg`,
    heroAlt: "Warm Maghreb city light at dusk",
    destinationFocus: "Morocco · Maghreb",
    promoCode: "INSIDER-SEP27",
    promoPercent: 10,
    promoEndsLabel: "30 Sep 2027",
    ctaPrimary: { label: "Browse destinations", href: "/destinations" },
    ctaSecondary: { label: "Hajj & Umrah Connect", href: "/hajj-umrah" },
    sections: {
      opener:
        "Year two of Insider opens in the Maghreb. Autumn trips reward travelers who land ready — maps, ride apps, and family messages without roaming surprises.",
      destinationTitle: "Destination guide — Morocco",
      destinationBody: [
        "Medina navigation and intercity travel work best with local data already installed. Keep hotspot available if a travel companion shares your plan.",
      ],
      tips: [
        "Install at home, enable the eSIM data line on landing.",
        "Offline maps help inside dense medinas; live data helps between cities.",
        "If Umrah is later this year, run the device check now — not the week you fly.",
      ],
      connectivityTitle: "Connectivity tip — Name your travel line",
      connectivityBody:
        "In Settings, rename the eSIM so you never toggle the wrong line. Small habit, fewer airport mistakes.",
      hajjTitle: "Hajj & Umrah note — Early window",
      hajjBody:
        "Fall is when many families sketch winter Umrah dates. Compatibility first, plan second, install before departure.",
      dealBody:
        "Insider deal: INSIDER-SEP27 for 10% off through 30 Sep 2027.",
      closing: "Travel updates, not inbox noise. See you next month.",
    },
  },
  {
    slug: "2027-10-balkans",
    issueNumber: 14,
    monthLabel: "October 2027",
    subject: "Balkans city breaks — light bags, reliable signal",
    preview: "Short European hops, regional data, and a light Umrah note.",
    heroImage: `${IMG}/insider-2027-10-balkans.jpg`,
    heroAlt: "European old-town rooftops in soft autumn light",
    destinationFocus: "Balkans · Europe",
    promoCode: "INSIDER-OCT27",
    promoPercent: 10,
    promoEndsLabel: "31 Oct 2027",
    ctaPrimary: { label: "Europe regional plans", href: "/plans/europe" },
    ctaSecondary: { label: "Hajj & Umrah Connect", href: "/hajj-umrah" },
    sections: {
      opener:
        "October weekends are for cities that reward walking and good maps. Pack light — and keep data ready before you board.",
      destinationTitle: "Destination guide — Balkans / Southeast Europe",
      destinationBody: [
        "Cross-border weekends are common. A Europe regional plan often beats buying a new SIM in every city.",
      ],
      tips: [
        "Install before you fly; switch data on landing.",
        "Hotspot helps a tablet for tickets and boarding passes.",
        "Screenshot hotel addresses for offline use.",
      ],
      connectivityTitle: "Connectivity tip — Regional over one-off",
      connectivityBody:
        "If your trip spans two or three countries, start with regional coverage. It removes the ‘which SIM today?’ question.",
      hajjTitle: "Hajj & Umrah note — Pack-light mindset",
      hajjBody:
        "Short leisure trips teach the same habit pilgrimage needs: install early, keep the phone simple, save battery for what matters.",
      dealBody:
        "Insider deal: INSIDER-OCT27 for 10% off through 31 Oct 2027.",
      closing: "Short trips. Clear signal.",
    },
  },
  {
    slug: "2027-11-egypt-nile",
    issueNumber: 15,
    monthLabel: "November 2027",
    subject: "Egypt & winter sun — Nile trips with steady data",
    preview: "Egypt corridors, winter-sun habits, and pre-winter Umrah tips.",
    heroImage: `${IMG}/insider-2027-11-egypt.jpg`,
    heroAlt: "Warm desert-city light along a winter travel corridor",
    destinationFocus: "Egypt",
    promoCode: "INSIDER-NOV27",
    promoPercent: 10,
    promoEndsLabel: "30 Nov 2027",
    ctaPrimary: { label: "Browse Egypt plans", href: "/plans/egypt" },
    ctaSecondary: { label: "Hajj & Umrah Connect", href: "/hajj-umrah" },
    sections: {
      opener:
        "November pulls travelers toward warmer light — Egypt included. Stay online for guides, transfers, and family check-ins without airport SIM stress.",
      destinationTitle: "Destination guide — Egypt",
      destinationBody: [
        "City days and site days both benefit from maps and messaging that already work. Install before departure; enable on arrival.",
      ],
      tips: [
        "Power banks matter on long site days.",
        "Hotspot for a second device beats last-minute shopping.",
        "If Umrah follows soon after, keep your pilgrimage checklist in the same notes app.",
      ],
      connectivityTitle: "Connectivity tip — One checklist, two trips",
      connectivityBody:
        "Compatibility → buy → install → land → enable. Same sequence for leisure Egypt and for Makkah later.",
      hajjTitle: "Hajj & Umrah note — Pre-winter window",
      hajjBody:
        "Winter Umrah traffic builds through late autumn. Confirm phone compatibility now if dates are firm.",
      dealBody:
        "Insider deal: INSIDER-NOV27 for 10% off through 30 Nov 2027.",
      closing: "Warm routes. Calm habits.",
    },
  },
  {
    slug: "2027-12-southeast-asia",
    issueNumber: 16,
    monthLabel: "December 2027",
    subject: "Year-end Asia — holidays, islands, data that behaves",
    preview: "Southeast Asia holiday habits and a quiet Makkah checklist.",
    heroImage: `${IMG}/insider-2027-12-sea.jpg`,
    heroAlt: "Tropical coastline in soft late-year light",
    destinationFocus: "Southeast Asia",
    promoCode: "INSIDER-DEC27",
    promoPercent: 10,
    promoEndsLabel: "31 Dec 2027",
    ctaPrimary: { label: "Asia-Pacific plans", href: "/destinations" },
    ctaSecondary: { label: "Hajj & Umrah Connect", href: "/hajj-umrah" },
    sections: {
      opener:
        "December trips fill calendars fast. This Insider keeps the advice short: install early, hotspot when needed, and keep pilgrimage prep quiet but ready.",
      destinationTitle: "Destination guide — Southeast Asia holidays",
      destinationBody: [
        "Island hops and city stops both punish travelers who wait for airport Wi‑Fi. Land with a plan already on the phone.",
      ],
      tips: [
        "Install before the holiday rush, not in the departure lounge.",
        "Name the eSIM line clearly.",
        "Keep a short offline list: hotel, transfer, emergency contact.",
      ],
      connectivityTitle: "Connectivity tip — Holiday battery discipline",
      connectivityBody:
        "Long photo days drain phones. Lower brightness outdoors and use hotspot in bursts.",
      hajjTitle: "Hajj & Umrah note — Quiet checklist",
      hajjBody:
        "Even in holiday month: compatibility, pilgrimage plan with hotspot, install-before-fly. No noise — just readiness.",
      dealBody:
        "Insider deal: INSIDER-DEC27 for 10% off through 31 Dec 2027.",
      closing: "Year-end calm. Clear signal.",
    },
  },
  {
    slug: "2028-01-gulf-leisure",
    issueNumber: 17,
    monthLabel: "January 2028",
    subject: "Gulf leisure month — cities, family visits, clear signal",
    preview: "Gulf travel habits and post-holiday Umrah notes.",
    heroImage: `${IMG}/insider-2028-01-gulf.jpg`,
    heroAlt: "Modern Gulf skyline in soft winter light",
    destinationFocus: "Gulf · UAE corridor",
    promoCode: "INSIDER-JAN28",
    promoPercent: 10,
    promoEndsLabel: "31 Jan 2028",
    ctaPrimary: { label: "Browse UAE plans", href: "/plans/uae" },
    ctaSecondary: { label: "Hajj & Umrah Connect", href: "/hajj-umrah" },
    sections: {
      opener:
        "January is for family visits and city days in the Gulf. Keep messaging and maps ready before you leave home Wi‑Fi.",
      destinationTitle: "Destination guide — Gulf leisure",
      destinationBody: [
        "Ride apps, hotel logistics, and group chats work best when local data is already installed.",
      ],
      tips: [
        "Install before departure; enable on landing.",
        "Hotspot for tablets on family trips.",
        "If Umrah is next, keep Saudi plans bookmarked.",
      ],
      connectivityTitle: "Connectivity tip — Dual-line calm",
      connectivityBody:
        "Keep your primary number for SMS/calls if needed; use NoorLink for data abroad. Toggle intentionally.",
      hajjTitle: "Hajj & Umrah note — After the holidays",
      hajjBody:
        "Post-holiday Umrah bookings pick up. Treat connectivity like a boarding pass: done early.",
      dealBody:
        "Insider deal: INSIDER-JAN28 for 10% off through 31 Jan 2028.",
      closing: "New year. Steady habits.",
    },
  },
  {
    slug: "2028-02-umrah-window",
    issueNumber: 18,
    monthLabel: "February 2028",
    subject: "Umrah window — connectivity that stays in the background",
    preview: "Pilgrimage checklist, hotspot for family, Hajj & Umrah Connect.",
    heroImage: `${IMG}/insider-2028-02-umrah.jpg`,
    heroAlt: "Respectful warm light suggesting pilgrimage travel",
    destinationFocus: "Saudi · Umrah",
    promoCode: "INSIDER-FEB28",
    promoPercent: 10,
    promoEndsLabel: "29 Feb 2028",
    ctaPrimary: { label: "Hajj & Umrah Connect", href: "/hajj-umrah" },
    ctaSecondary: { label: "Saudi Arabia plans", href: "/plans/saudi-arabia" },
    sections: {
      opener:
        "February is when many families finalize spring Umrah. This month’s Insider stays practical: checklist first, deal second.",
      destinationTitle: "Destination guide — Makkah & Madinah",
      destinationBody: [
        "You’re not there to hunt SIM shops. Choose a pilgrimage plan with hotspot, install before you fly, and keep group coordination simple.",
      ],
      tips: [
        "Confirm eSIM compatibility.",
        "Install on home Wi‑Fi.",
        "Enable data roaming for the eSIM on arrival.",
        "Keep hotspot ready for family sharing.",
      ],
      connectivityTitle: "Connectivity tip — Pilgrimage settings",
      connectivityBody:
        "Name the line, screenshot plan details, charge a power bank, download offline maps for day-one areas.",
      hajjTitle: "Hajj & Umrah note — This month’s priority",
      hajjBody:
        "If Umrah is in the next 4–8 weeks, treat connectivity like a boarding pass. Visit Hajj & Umrah Connect for pilgrimage-focused plans.",
      dealBody:
        "Insider deal: INSIDER-FEB28 for 10% off through 29 Feb 2028.",
      closing: "May your journey be smooth and your connection steady.",
    },
  },
  {
    slug: "2028-03-uk-spring",
    issueNumber: 19,
    monthLabel: "March 2028",
    subject: "UK spring city days — pack light, stay online",
    preview: "United Kingdom weekends, Europe habits, light pilgrimage note.",
    heroImage: `${IMG}/insider-2028-03-uk.jpg`,
    heroAlt: "European city street in soft spring light",
    destinationFocus: "United Kingdom",
    promoCode: "INSIDER-MAR28",
    promoPercent: 10,
    promoEndsLabel: "31 Mar 2028",
    ctaPrimary: { label: "UK / Europe plans", href: "/plans/europe" },
    ctaSecondary: { label: "Hajj & Umrah Connect", href: "/hajj-umrah" },
    sections: {
      opener:
        "March brings longer days and short city breaks. Keep data ready so trains, maps, and meetups stay simple.",
      destinationTitle: "Destination guide — United Kingdom",
      destinationBody: [
        "Transit apps and walking navigation work best with a plan installed before you land.",
      ],
      tips: [
        "Install before you fly.",
        "Use hotspot for a travel companion’s device when needed.",
        "Screenshot booking confirmations.",
      ],
      connectivityTitle: "Connectivity tip — Airport calm",
      connectivityBody:
        "Do the confusing part at home. At the gate you should only enable a line you already trust.",
      hajjTitle: "Hajj & Umrah note — Final install reminders",
      hajjBody:
        "If spring Umrah is close, finish install now. Peak weeks are for worship — not troubleshooting.",
      dealBody:
        "Insider deal: INSIDER-MAR28 for 10% off through 31 Mar 2028.",
      closing: "Spring light. Clear signal.",
    },
  },
  {
    slug: "2028-04-turkey-spring",
    issueNumber: 20,
    monthLabel: "April 2028",
    subject: "Turkey in spring — cities, coast, ready data",
    preview: "Turkey shoulder season, multi-city tips, post-Umrah rest trips.",
    heroImage: `${IMG}/insider-2028-04-turkey.jpg`,
    heroAlt: "Istanbul skyline in soft spring dawn light",
    destinationFocus: "Turkey",
    promoCode: "INSIDER-APR28",
    promoPercent: 10,
    promoEndsLabel: "30 Apr 2028",
    ctaPrimary: { label: "Browse Turkey plans", href: "/plans/turkey" },
    ctaSecondary: { label: "Hajj & Umrah Connect", href: "/hajj-umrah" },
    sections: {
      opener:
        "April is a strong Turkey window — cities and coast without peak-summer heat. Land ready.",
      destinationTitle: "Destination guide — Turkey spring",
      destinationBody: [
        "Istanbul walking days and domestic hops both benefit from local data and hotspot for a second device.",
      ],
      tips: [
        "Install before departure.",
        "Offline maps help; live navigation is smoother with data.",
        "Post-Umrah rest trips pair well with calm connectivity habits.",
      ],
      connectivityTitle: "Connectivity tip — Multi-city rhythm",
      connectivityBody:
        "One plan, one install, then enable when you land each segment. Avoid shopping SIMs mid-trip.",
      hajjTitle: "Hajj & Umrah note — After the rush",
      hajjBody:
        "If you just returned from Umrah, keep the same install-before-fly habit for leisure travel — it compounds.",
      dealBody:
        "Insider deal: INSIDER-APR28 for 10% off through 30 Apr 2028.",
      closing: "Shoulder season. Steady habits.",
    },
  },
  {
    slug: "2028-05-iberia",
    issueNumber: 21,
    monthLabel: "May 2028",
    subject: "Iberia in late spring — Spain, Portugal, one Europe eSIM",
    preview: "Iberian city breaks, family hotspot, summer corridor prep.",
    heroImage: `${IMG}/insider-2028-05-iberia.jpg`,
    heroAlt: "Sunlit European plaza in late spring",
    destinationFocus: "Spain · Portugal",
    promoCode: "INSIDER-MAY28",
    promoPercent: 10,
    promoEndsLabel: "31 May 2028",
    ctaPrimary: { label: "Europe regional plans", href: "/plans/europe" },
    ctaSecondary: { label: "Hajj & Umrah Connect", href: "/hajj-umrah" },
    sections: {
      opener:
        "May is for Iberian light and walking cities. One Europe plan often covers the whole loop.",
      destinationTitle: "Destination guide — Iberia",
      destinationBody: [
        "Trains, plazas, and day trips are smoother when maps and tickets already work offline and online.",
      ],
      tips: [
        "Choose regional Europe if you cross borders.",
        "Hotspot for family tablets.",
        "Install before you fly.",
      ],
      connectivityTitle: "Connectivity tip — Family sharing",
      connectivityBody:
        "Agree who carries the hotspot phone. One clear plan beats three confused SIMs.",
      hajjTitle: "Hajj & Umrah note — Summer corridor prep",
      hajjBody:
        "Summer leisure and later pilgrimage both need the same foundation: compatible phone, early install, honest plan sizing.",
      dealBody:
        "Insider deal: INSIDER-MAY28 for 10% off through 31 May 2028.",
      closing: "Late spring. Clear maps.",
    },
  },
  {
    slug: "2028-06-alps-north",
    issueNumber: 22,
    monthLabel: "June 2028",
    subject: "Alpine & northern summer — groups, hotspot, clear signal",
    preview: "Central Europe summer tips and a short Hajj-season glance.",
    heroImage: `${IMG}/insider-2028-06-alps.jpg`,
    heroAlt: "Mountain valley town in bright summer light",
    destinationFocus: "Alps · Central Europe",
    promoCode: "INSIDER-JUN28",
    promoPercent: 10,
    promoEndsLabel: "30 Jun 2028",
    ctaPrimary: { label: "Europe regional plans", href: "/plans/europe" },
    ctaSecondary: { label: "Hajj & Umrah Connect", href: "/hajj-umrah" },
    sections: {
      opener:
        "June fills trains and mountain towns. Groups need hotspot more than slogans — pick capacity that matches your trip.",
      destinationTitle: "Destination guide — Alps / Central Europe",
      destinationBody: [
        "Navigation in valleys and cities both benefit from data that works on arrival, not after a SIM hunt.",
      ],
      tips: [
        "Install before departure.",
        "Hotspot for group coordination.",
        "Power banks for long outdoor days.",
      ],
      connectivityTitle: "Connectivity tip — Group discipline",
      connectivityBody:
        "One shared hotspot phone, clear naming, and a charged battery beat four half-working plans.",
      hajjTitle: "Hajj & Umrah note — Season glance",
      hajjBody:
        "Hajj timing stays on many family calendars by midsummer. If you’re going, start the compatibility check early.",
      dealBody:
        "Insider deal: INSIDER-JUN28 for 10% off through 30 Jun 2028.",
      closing: "Peak summer. Steady signal.",
    },
  },
  {
    slug: "2028-07-caribbean",
    issueNumber: 23,
    monthLabel: "July 2028",
    subject: "Caribbean & Americas summer — road trips, reliable hotspot",
    preview: "Island and Americas habits, summer data tips, light Umrah note.",
    heroImage: `${IMG}/insider-2028-07-caribbean.jpg`,
    heroAlt: "Bright coastal travel light over warm water",
    destinationFocus: "Caribbean · Americas",
    promoCode: "INSIDER-JUL28",
    promoPercent: 10,
    promoEndsLabel: "31 Jul 2028",
    ctaPrimary: { label: "Browse destinations", href: "/destinations" },
    ctaSecondary: { label: "Hajj & Umrah Connect", href: "/hajj-umrah" },
    sections: {
      opener:
        "July is for long daylight and shared plans. Hotspot and install-before-fly remain the two habits that prevent most stress.",
      destinationTitle: "Destination guide — Caribbean / Americas summer",
      destinationBody: [
        "Transfers, maps, and family chats work best when local data is ready before you leave the airport lounge.",
      ],
      tips: [
        "Install early; enable on landing.",
        "Heat drains batteries — power banks matter.",
        "Size data for hotspot days, not just solo browsing.",
      ],
      connectivityTitle: "Connectivity tip — Heat + battery",
      connectivityBody:
        "Lower brightness outdoors, use hotspot in short bursts, carry a power bank for map-heavy days.",
      hajjTitle: "Hajj & Umrah note — Light touch",
      hajjBody:
        "Leisure season still overlaps pilgrimage planning for many households. Keep compatibility done so you’re never blocked later.",
      dealBody:
        "Insider deal: INSIDER-JUL28 for 10% off through 31 Jul 2028.",
      closing: "Long days. Clear signal.",
    },
  },
  {
    slug: "2028-08-pilgrimage-prep",
    issueNumber: 24,
    monthLabel: "August 2028",
    subject: "Late summer + pilgrimage prep — connectivity done honestly",
    preview: "Pilgrimage timing, install-before-fly, and a Year 2 wrap.",
    heroImage: `${IMG}/insider-2028-08-pilgrimage.jpg`,
    heroAlt: "Respectful dusk skyline with warm pilgrimage light",
    destinationFocus: "Saudi · pilgrimage prep",
    promoCode: "INSIDER-AUG28",
    promoPercent: 10,
    promoEndsLabel: "31 Aug 2028",
    ctaPrimary: { label: "Hajj & Umrah Connect", href: "/hajj-umrah" },
    ctaSecondary: { label: "Browse destinations", href: "/destinations" },
    sections: {
      opener:
        "August closes summer trips and raises pilgrimage focus again. Late-summer habits and honest connectivity guidance — together.",
      destinationTitle: "Destination guide — Saudi focus + late summer",
      destinationBody: [
        "If pilgrimage is near: worship and logistics first. Choose a plan with hotspot, install before you fly, keep group coordination simple.",
      ],
      tips: [
        "Night-before ritual: confirm install, screenshot details, charge power bank.",
        "Download offline maps for day-one areas.",
        "Buy connectivity when you buy flights.",
      ],
      connectivityTitle: "Connectivity tip — Day-before-departure",
      connectivityBody:
        "Confirm eSIM installed, plan details saved, devices charged. Guessing at the gate is optional stress.",
      hajjTitle: "Hajj & Umrah note — Honest season guidance",
      hajjBody:
        "Demand and conditions change. Clear plans, hotspot on pilgrimage options, and support when install gets confusing — that’s the promise.",
      dealBody:
        "Insider deal: INSIDER-AUG28 for 10% off through 31 Aug 2028.",
      closing:
        "That’s two years of Insider notes. Travel tips, real timing, occasional deals, no noise.",
    },
  },
];
