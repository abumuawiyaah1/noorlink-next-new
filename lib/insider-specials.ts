/**
 * NoorLink Insider — Special editions (pilgrimage audience only).
 * Sent ~1 month before Ramadan and Hajj; Islamic reminder tone with Quran & Hadith.
 */

import { RAMADAN_GIVING } from "@/lib/giving";
import type { InsiderIssue } from "@/lib/insider-types";

const IMG = "/images/insider";

export const INSIDER_SPECIALS: InsiderIssue[] = [
  {
    slug: "2027-01-ramadan-special",
    issueNumber: 101,
    kind: "special",
    audience: "pilgrimage",
    monthLabel: "Ramadan Special · January 2027",
    subject: "Umrah in Ramadan — a reward like Hajj, with calm connection",
    preview:
      "The Prophet ﷺ taught that Umrah in Ramadan is equivalent to Hajj. Qur’an & Hadith reminders, plus practical Makkah and Madinah connectivity.",
    heroImage: `${IMG}/insider-2027-01-ramadan-special.jpg`,
    heroAlt: "Soft dawn light over the Sacred Mosque in Makkah",
    destinationFocus: "Saudi · Ramadan & Umrah",
    promoCode: "INSIDER-RAMADAN27",
    promoPercent: 10,
    promoEndsLabel: "28 Feb 2027",
    ctaPrimary: { label: "Hajj & Umrah Connect", href: "/hajj-umrah" },
    ctaSecondary: { label: "Saudi Arabia plans", href: "/plans/saudi-arabia" },
    dealGiving: {
      body: `In Ramadan the Prophet ﷺ was more generous than in other months. With this code you receive ${RAMADAN_GIVING.customerDiscountPercent}% off — and NoorLink pledges ${RAMADAN_GIVING.profitSharePercent}% of our profit from eligible purchases to charity.`,
      href: RAMADAN_GIVING.learnMorePath,
      ctaLabel: "Our Ramadan pledge",
    },
    emailBrief: {
      highlight:
        "When Ramadan comes, go for Umrah — for Umrah in Ramadan is equivalent to Hajj.",
      highlightReference: "Bukhari 1782 · Muslim 1256",
      note: "A short reminder, a few du‘ā’s for Makkah and Madinah, and calm connectivity habits — full version on the site.",
    },
    islamicReminders: {
      quran: [
        {
          reference: "Qur’an 2:185",
          text: "The month of Ramadan is that in which was revealed the Qur’an, a guidance for the people and clear proofs of guidance and criterion…",
        },
        {
          reference: "Qur’an 2:186",
          text: "And when My servants ask you concerning Me — indeed I am near. I respond to the invocation of the supplicant when he calls upon Me…",
        },
      ],
      hadith: [
        {
          reference: "Bukhari 1782 · Muslim 1256 — Ibn ‘Abbās",
          text: "When a woman of the Ansar could not join the Hajj, the Prophet ﷺ said: “When Ramadan comes, go for Umrah, for Umrah in Ramadan is equivalent to Hajj.”",
        },
        {
          reference: "Bukhari & Muslim — on generosity in Ramadan",
          text: "The Messenger of Allah ﷺ was the most generous of people, and he was even more generous in Ramadan than in other months.",
        },
        {
          reference: "Bukhari & Muslim — on intention",
          text: "Actions are but by intentions, and every person will have only what they intended.",
        },
        {
          reference: "Tirmidhi — on travel du‘ā’",
          text: "When the Prophet ﷺ would travel, he would say: ‘O Allah, we ask You for righteousness and piety in this journey…’",
        },
      ],
      duas: [
        {
          occasion: "When breaking the fast",
          arabic: "ذَهَبَ الظَّمَأُ وَابْتَلَّتِ الْعُرُوقُ وَثَبَتَ الْأَجْرُ إِنْ شَاءَ اللَّهُ",
          text: "The thirst has gone, the veins are moistened, and the reward is confirmed, if Allah wills.",
          reference: "Abu Dawud",
        },
        {
          occasion: "During ṭawāf (between the Yemeni Corner and the Black Stone)",
          arabic: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
          text: "Our Lord, give us good in this world and good in the Hereafter, and protect us from the punishment of the Fire.",
          reference: "Qur’an 2:201 · practiced in ṭawāf",
        },
        {
          occasion: "Entering the Sacred Mosque (Makkah or Madinah)",
          arabic: "اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ",
          text: "O Allah, open for me the gates of Your mercy.",
          reference: "Muslim — when entering a mosque",
        },
        {
          occasion: "Sending salām upon the Prophet ﷺ in Madinah",
          arabic: "السَّلَامُ عَلَيْكَ يَا رَسُولَ اللَّهِ",
          text: "Peace be upon you, O Messenger of Allah.",
          reference: "Etiquette of visiting the Prophet’s Mosque",
        },
      ],
    },
    sections: {
      opener:
        "Ramadan approaches — a season of mercy and sincere intention. The Prophet ﷺ taught that Umrah in Ramadan is equivalent to Hajj, and he was more generous in this month than in others. This special Insider is for travelers preparing that journey: a short reminder from revelation, then clear connectivity habits so worship and family logistics stay calm.",
      destinationTitle: "Umrah around Ramadan — stay present",
      destinationBody: [
        "If you are traveling to Makkah or Madinah this season, treat connectivity like packing your ihram: decided early, not improvised at the airport. Maps, group messages, and hotel coordination matter — but they should stay in the background of your worship.",
        "Choose a pilgrimage plan with hotspot if family members share one line. Install at home on Wi‑Fi. On arrival, enable the travel eSIM data line and keep your focus where it belongs.",
      ],
      tips: [
        "Confirm eSIM compatibility before you buy flights.",
        "Install NoorLink before departure; name the line clearly in Settings.",
        "Download offline Qur’an apps and maps as backup — live data is for coordination, not dependency.",
        "Hotspot helps a companion device without buying a second plan impulsively.",
      ],
      connectivityTitle: "Connectivity tip — Worship first, signal second",
      connectivityBody:
        "Peak Ramadan nights are busy. A plan that already works beats hunting for Wi‑Fi outside the Haram. Install before you fly, enable data roaming for the eSIM when you land, and keep brightness and hotspot use intentional so battery lasts through long nights.",
      hajjTitle: "",
      hajjBody: "",
      dealBody: `INSIDER-RAMADAN27 · ${RAMADAN_GIVING.customerDiscountPercent}% off through 28 Feb 2027. We also pledge ${RAMADAN_GIVING.profitSharePercent}% of our profit from eligible purchases to charity.`,
      closing:
        "May Allah accept your fasting, your Umrah, your du‘ā’, and your travel. Stay sincere — and stay connected only as much as you need.",
    },
  },
  {
    slug: "2027-04-hajj-special",
    issueNumber: 102,
    kind: "special",
    audience: "pilgrimage",
    monthLabel: "Hajj Special · April 2027",
    subject: "Hajj season reminder — sacred journey, clear intention, steady signal",
    preview:
      "One month before Hajj: Quran & Hadith reminders, plus honest pilgrimage connectivity for a demanding season.",
    heroImage: `${IMG}/insider-2027-04-hajj-special.jpg`,
    heroAlt: "Warm sunset light over pilgrimage tents and mountains",
    destinationFocus: "Saudi · Hajj season",
    promoCode: "INSIDER-HAJJ27",
    promoPercent: 10,
    promoEndsLabel: "31 May 2027",
    ctaPrimary: { label: "Hajj & Umrah Connect", href: "/hajj-umrah" },
    ctaSecondary: { label: "Device compatibility", href: "/device-check" },
    emailBrief: {
      highlight:
        "Whoever performs Hajj for Allah’s sake and does not commit any obscenity or wrongdoing will return as free of sin as the day his mother gave birth to him.",
      highlightReference: "Bukhari & Muslim",
      note: "A respectful pause before the season — Qur’an, Sunnah, and calm install-before-you-fly guidance. Full reminder on the site.",
    },
    islamicReminders: {
      quran: [
        {
          reference: "Qur’an 22:27",
          text: "And proclaim to the people the Hajj; they will come to you on foot and on every lean camel; they will come from every distant pass.",
        },
        {
          reference: "Qur’an 2:197",
          text: "Hajj is in well-known months, so whoever has made Hajj obligatory upon himself therein — there is no sexual relations, no disobedience, and no disputing during Hajj…",
        },
      ],
      hadith: [
        {
          reference: "Bukhari & Muslim — on an accepted Hajj",
          text: "Whoever performs Hajj for Allah’s sake and does not commit any obscenity or wrongdoing will return as free of sin as the day his mother gave birth to him.",
        },
        {
          reference: "Muslim — on ease and kindness",
          text: "Make things easy and do not make them difficult; give glad tidings and do not drive people away.",
        },
      ],
      duas: [
        {
          occasion: "Talbiyah (Ihrām)",
          arabic:
            "لَبَّيْكَ اللَّهُمَّ لَبَّيْكَ، لَبَّيْكَ لَا شَرِيكَ لَكَ لَبَّيْكَ، إِنَّ الْحَمْدَ وَالنِّعْمَةَ لَكَ وَالْمُلْكَ، لَا شَرِيكَ لَكَ",
          text: "Here I am, O Allah, here I am. Here I am, You have no partner, here I am. Indeed all praise, favor, and sovereignty belong to You. You have no partner.",
          reference: "Bukhari & Muslim",
        },
        {
          occasion: "During ṭawāf (between the Yemeni Corner and the Black Stone)",
          arabic: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ",
          text: "Our Lord, give us good in this world and good in the Hereafter, and protect us from the punishment of the Fire.",
          reference: "Qur’an 2:201 · practiced in ṭawāf",
        },
        {
          occasion: "On the Day of ‘Arafah",
          arabic:
            "لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ",
          text: "There is no god but Allah alone, without partner. To Him belongs the dominion and praise, and He is over all things competent.",
          reference: "Tirmidhi — best of du‘ā’ on ‘Arafah",
        },
        {
          occasion: "Sending salām upon the Prophet ﷺ in Madinah",
          arabic: "السَّلَامُ عَلَيْكَ يَا رَسُولَ اللَّهِ",
          text: "Peace be upon you, O Messenger of Allah.",
          reference: "Etiquette of visiting the Prophet’s Mosque",
        },
      ],
    },
    sections: {
      opener:
        "Hajj is near. This special Insider is a respectful pause before the season: words from the Qur’an and Sunnah, then practical guidance so your phone helps your group — without becoming a distraction in the most important days of the year.",
      destinationTitle: "Hajj logistics — honest and calm",
      destinationBody: [
        "Hajj days are physically and spiritually demanding. Coverage and crowds vary by area and hour. We will not promise perfection everywhere — we will promise clear plans, hotspot on pilgrimage options, and support when install feels confusing.",
        "Install before you fly. Keep hotel, group lead, and emergency contacts available offline. Use hotspot for a shared tablet or a family member’s phone when needed.",
      ],
      tips: [
        "Complete the device check at home — not in Mina.",
        "Screenshot plan details and QR/install confirmation before travel Wi‑Fi disappears.",
        "Carry a power bank; map and messaging days drain batteries fast.",
        "Agree a simple group check-in plan so connectivity serves safety, not scrolling.",
      ],
      connectivityTitle: "Connectivity tip — Day-before-departure ritual",
      connectivityBody:
        "Night before departure: confirm the eSIM is installed, charge devices and power banks, download offline maps for key areas, and enable the travel line only when you need local data. Keep your primary number available for calls/SMS if your carrier allows.",
      hajjTitle: "",
      hajjBody: "",
      dealBody:
        "Insider pilgrimage deal: INSIDER-HAJJ27 for 10% off through 31 May 2027 on Hajj & Umrah Connect and related Saudi plans.",
      closing:
        "May Allah grant you an accepted Hajj, safe travel, and a heart at ease. We are here for the signal — you are there for something greater.",
    },
  },
];
