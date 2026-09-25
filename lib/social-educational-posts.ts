/**
 * October 2026 — Week 1 educational posts (copy for review; no creatives yet).
 * Lane: traveler / Umrah literacy. Educate first. No eSIM sales pitch.
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
  storyLine: string;
  ctaUrl: string;
  productWeight: "none" | "soft" | "light";
};

export const EDUCATIONAL_SOCIAL_POSTS: EducationalSocialPost[] = [
  {
    id: "oct_w1_first_hour",
    title: "What usually goes wrong in the first hour after landing",
    topic: "Arrival literacy",
    weekLabel: "October · Week 1",
    imagePath: "/images/social/oct-w1-shoulder-season.png",
    imageAlt: "What usually goes wrong in the first hour after landing",
    brandWhy: "Our founding problem — taught as prevention, not a product pitch.",
    productWeight: "none",
    caption: `What usually goes wrong in the first hour after landing

Most trip stress isn’t the destination.
It’s the first 60 minutes.

Common failures:
1. No working maps when you leave the airport
2. Can’t message family that you arrived
3. Hotel address only saved in email (no offline copy)
4. Pickup driver can’t reach you
5. Phone battery dies before you exit arrivals

Prevention (do these before you fly):
• Screenshot hotel name + address
• Save the pickup number in your phone
• Download offline maps for the airport → hotel area
• Pack a charger / power bank in your carry-on
• Confirm your phone can use data abroad (unlocked)

This applies to a city break — and to Umrah arrival too.

Save this. Arrival day gets easier when the first hour is planned.

#TravelEducation #ArrivalDay #TravelTips #FamilyTravel #UmrahPrep`,
    storyLine:
      "First hour after landing: maps, family message, offline hotel address, pickup contact, battery.",
    ctaUrl: "https://noorlink.co/newsletter",
  },
  {
    id: "oct_w1_umrah_checklist",
    title: "Umrah prep: the non-spiritual checklist people skip",
    topic: "Umrah literacy",
    weekLabel: "October · Week 1",
    imagePath: "/images/social/oct-w1-paris-neighborhoods.png",
    imageAlt: "Umrah prep non-spiritual checklist",
    brandWhy: "Pilgrim ops education — our core audience, no fiqh overreach.",
    productWeight: "none",
    caption: `Umrah prep: the non-spiritual checklist people skip

Worship is the purpose.
Logistics still decide whether the first day feels calm or chaotic.

Before you fly, check these:
1. Passport validity + visas / permits as required for your route
2. Hotel names in Makkah and Madinah saved offline
3. Group chat created (family / fellow pilgrims)
4. Phone unlocked with your home carrier
5. Emergency contacts written somewhere not only in your head
6. Power bank + medicines in carry-on
7. Meeting point agreed if anyone gets separated

You can be spiritually ready and still lose half a day to avoidable logistics.

Screenshot this for winter / pre-Ramadan Umrah planning.

#Umrah #UmrahPrep #Hajj #TravelEducation #FamilyTravel`,
    storyLine:
      "Umrah ops checklist: docs, offline hotels, group chat, unlocked phone, contacts, power bank, meeting point.",
    ctaUrl: "https://noorlink.co/hajj-umrah",
  },
  {
    id: "oct_w1_family_coordination",
    title: "Family travel: how to stay coordinated without stress",
    topic: "Family literacy",
    weekLabel: "October · Week 1",
    imagePath: "/images/social/oct-w1-london-bases.png",
    imageAlt: "Family travel coordination without stress",
    brandWhy: "Family reachability — brand promise without selling data plans.",
    productWeight: "none",
    caption: `Family travel: how to stay coordinated without stress

When several people travel together, confusion usually comes from one thing: nobody knows the plan.

Use this simple system:
1. One group chat for the trip (only trip messages)
2. One shared note with hotel addresses
3. One meeting point per place (example: hotel lobby)
4. One person shares live location when moving between points
5. Agree a “if we get separated” rule before you leave home

This works for family city breaks.
It works even better for Umrah groups.

Coordination is a skill — not luck.

#FamilyTravel #TravelEducation #UmrahPrep #TravelTips #GroupTravel`,
    storyLine:
      "Family trip system: one chat, shared hotel note, meeting point, live location, separation rule.",
    ctaUrl: "https://noorlink.co/newsletter",
  },
  {
    id: "oct_w1_phone_readiness",
    title: "Before you fly abroad: phone readiness in plain language",
    topic: "Phone literacy",
    weekLabel: "October · Week 1",
    imagePath: "/images/social/oct-w1-shoulder-reel.png",
    imageAlt: "Phone readiness before flying abroad",
    brandWhy: "Tech literacy education; product not named as the hero.",
    productWeight: "none",
    caption: `Before you fly abroad: phone readiness in plain language

Your phone is how you navigate, message family, and stay safe.
Treat it like part of trip prep — not an afterthought.

Check these 5 things at home:
1. Is the phone carrier-unlocked?
2. Does it support eSIM / dual lines? (Settings → search “eSIM” or “Add cellular plan”)
3. Will WhatsApp still use your normal number? (Usually yes — keep your main line on for WhatsApp)
4. Do you have offline copies of hotel details?
5. Is your battery healthy enough for a long travel day?

If any answer is “I’m not sure,” fix it before the airport — not after landing.

Education first. Scrambling later helps no one.

#TravelEducation #PhoneTips #TravelTech #UmrahPrep #FamilyTravel`,
    storyLine:
      "Phone readiness: unlocked, eSIM/dual-line capable, WhatsApp number, offline hotel info, battery.",
    ctaUrl: "https://noorlink.co/help/hajj-umrah-phone-check",
  },
];
