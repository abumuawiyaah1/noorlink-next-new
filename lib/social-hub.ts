export const NOORLINK_SOCIAL = {
  instagram: "https://www.instagram.com/noorlinkesim/",
  facebookPage: "https://www.facebook.com/profile.php?id=61593708492331",
  website: "https://noorlink.co",
  destinations: "https://noorlink.co/destinations",
  supportEmail: "support@noorlink.co",
} as const;

export const SOCIAL_QUICK_LINKS = [
  {
    href: "https://business.facebook.com/latest/composer/",
    title: "Create post (Business Suite)",
    body: "Best place to post to the NoorLink Facebook Page. Add Instagram here once Business linking works.",
    cta: "Open composer",
  },
  {
    href: "https://business.facebook.com/",
    title: "Meta Business Suite",
    body: "Page insights, scheduled posts, and inbox for your Facebook Page.",
    cta: "Open Suite",
  },
  {
    href: NOORLINK_SOCIAL.instagram,
    title: "Instagram — @noorlinkesim",
    body: "Post photos and reels from the app or instagram.com while IG is not linked in Suite.",
    cta: "Open Instagram",
  },
  {
    href: NOORLINK_SOCIAL.facebookPage,
    title: "Facebook Page — NoorLink",
    body: "View the live Page, comments, and public profile.",
    cta: "Open Page",
  },
  {
    href: "https://accountscenter.facebook.com/profiles",
    title: "Accounts Center",
    body: "Confirm Facebook, Instagram, and Page are connected under one Meta login.",
    cta: "Open Accounts Center",
  },
] as const;

export const SOCIAL_POST_WORKFLOW = [
  "Pick a photo from Brand assets below (or use a destination image).",
  "Copy a caption template and adjust the destination if needed.",
  "Post to Facebook via Business Suite composer (or the Page timeline).",
  "Post the same image + caption on Instagram (@noorlinkesim) until cross-posting is linked.",
  "Reply to comments within 24h — calm, practical tone; point to noorlink.co/destinations when helpful.",
] as const;

export const SOCIAL_CAPTION_TEMPLATES = [
  {
    id: "intro",
    label: "Brand intro",
    text: `Stay connected abroad — without swapping SIMs.

NoorLink eSIM covers 190+ destinations.
Install before you fly, land ready to go.

→ noorlink.co/destinations

#eSIM #TravelTech #StayConnected #NoorLink`,
  },
  {
    id: "destination",
    label: "Destination spotlight",
    text: `Heading to [destination]? Install your eSIM before you fly.

• 190+ destinations on NoorLink
• QR by email — install at home
• Hotspot included on every plan

Browse plans → noorlink.co/destinations

#eSIM #Travel #NoorLink`,
  },
  {
    id: "umrah",
    label: "Umrah / Hajj",
    text: `Pilgrimage travel is easier when data works on arrival.

Install your NoorLink eSIM before you fly so maps, messages, and group coordination work in Makkah and Madinah.

See Umrah & Hajj plans → noorlink.co/hajj-umrah

#Umrah #Hajj #eSIM #NoorLink`,
  },
] as const;

export const SOCIAL_KEY_LINKS = [
  { label: "Homepage", url: NOORLINK_SOCIAL.website },
  { label: "Destinations (main CTA)", url: NOORLINK_SOCIAL.destinations },
  { label: "Support", url: `${NOORLINK_SOCIAL.website}/support` },
  { label: "FAQ", url: `${NOORLINK_SOCIAL.website}/faq` },
  { label: "Umrah & Hajj", url: `${NOORLINK_SOCIAL.website}/hajj-umrah` },
  { label: "Insider newsletter", url: `${NOORLINK_SOCIAL.website}/newsletter` },
] as const;

export const SOCIAL_HASHTAGS = [
  "#eSIM",
  "#TravelTech",
  "#StayConnected",
  "#NoorLink",
  "#Travel",
  "#DigitalNomad",
] as const;

export const SOCIAL_BRAND_ASSETS = [
  {
    path: "/images/logo-profile.png",
    label: "Profile avatar (IG / FB)",
    note: "Square, circle-safe icon for profile photos.",
  },
  {
    path: "/images/logo.png",
    label: "Full logo",
    note: "Wordmark + icon for stories or graphics.",
  },
  {
    path: "/images/og.jpg",
    label: "Share image (1200×630)",
    note: "Link previews and Facebook share cards.",
  },
  {
    path: "/images/traveler.jpg",
    label: "Travel hero photo",
    note: "Lifestyle post background.",
  },
  {
    path: "/images/sim-card.jpg",
    label: "eSIM product photo",
    note: "Product-focused posts.",
  },
  {
    path: "/images/hero.jpg",
    label: "Brand hero",
    note: "Teal travel scene from the site.",
  },
] as const;

export const SOCIAL_PROFILE_COPY = {
  instagramBio: `Stay connected abroad — eSIM for 190+ destinations
Install before you fly · Support when you need it`,
  websiteLine: "noorlink.co",
  category: "Telecommunication company",
} as const;

export const SOCIAL_FOOTER_PROFILES = [
  {
    href: NOORLINK_SOCIAL.instagram,
    label: "NoorLink on Instagram",
    shortLabel: "Instagram",
    network: "instagram" as const,
  },
  {
    href: NOORLINK_SOCIAL.facebookPage,
    label: "NoorLink on Facebook",
    shortLabel: "Facebook",
    network: "facebook" as const,
  },
] as const;
