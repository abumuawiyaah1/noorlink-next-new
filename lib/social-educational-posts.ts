/**
 * Ready-to-publish educational posts for Instagram + Facebook.
 * Same caption works on both; pair with the matching square image.
 */

export type EducationalSocialPost = {
  id: string;
  title: string;
  topic: string;
  /** Square creative in /public */
  imagePath: string;
  imageAlt: string;
  /** Suggested Facebook / IG feed caption */
  caption: string;
  /** Optional shorter line for Stories / pin comment */
  storyLine: string;
  ctaUrl: string;
};

export const EDUCATIONAL_SOCIAL_POSTS: EducationalSocialPost[] = [
  {
    id: "install_before_fly",
    title: "Install before you fly",
    topic: "Setup habit",
    imagePath: "/images/social/edu-install-before-fly.png",
    imageAlt: "NoorLink tip — install your eSIM before you fly",
    caption: `The calmest travel eSIM habit:

Install at home — not in the airport queue.

1. Buy your plan early
2. Scan the QR on home Wi‑Fi
3. Keep the line off until you land
4. Turn data roaming on for the travel eSIM when you arrive

Maps, messages, and rides work when you need them.

Guide → noorlink.co/help/before-you-fly
Plans → noorlink.co/destinations

#eSIM #TravelTips #InstallBeforeYouFly #NoorLink #StayConnected`,
    storyLine: "Install on home Wi‑Fi. Land ready. → noorlink.co/help/before-you-fly",
    ctaUrl: "https://noorlink.co/help/before-you-fly",
  },
  {
    id: "hotspot_included",
    title: "Hotspot included",
    topic: "Sharing data",
    imagePath: "/images/social/edu-hotspot-included.png",
    imageAlt: "NoorLink tip — hotspot included on travel eSIM plans",
    caption: `Traveling with family or a laptop?

Hotspot matters more than “unlimited” marketing.

On NoorLink, hotspot is included — so you can share maps, tickets, or a quick call without buying a second SIM on day one.

Always check the plan page for your destination, then install before you fly.

Browse plans → noorlink.co/destinations

#eSIM #TravelTips #Hotspot #FamilyTravel #NoorLink`,
    storyLine: "Hotspot included — share maps without a second SIM. → noorlink.co/destinations",
    ctaUrl: "https://noorlink.co/destinations",
  },
  {
    id: "umrah_on_arrival",
    title: "Umrah data on arrival",
    topic: "Pilgrimage",
    imagePath: "/images/social/edu-umrah-on-arrival.png",
    imageAlt: "NoorLink tip — Umrah eSIM data that works on arrival",
    caption: `Umrah is smoother when data works on landing.

Dedicated pilgrimage plans for Makkah and Madinah — with hotspot — so group chats, maps, and family updates aren’t stuck in an airport SIM line.

• Install before you fly
• Free phone check if you’re unsure
• WhatsApp support if you need a hand

Plans → noorlink.co/hajj-umrah
Phone check → noorlink.co/help/hajj-umrah-phone-check

#Umrah #Hajj #eSIM #Makkah #Madinah #NoorLink`,
    storyLine: "Umrah data ready on arrival. Install at home. → noorlink.co/hajj-umrah",
    ctaUrl: "https://noorlink.co/hajj-umrah",
  },
];
