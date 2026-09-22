import type { Metadata } from "next";
import { ShortHelpGuidePage } from "@/components/support/ShortHelpGuidePage";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Umrah eSIM: Install Before You Fly | NoorLink",
  description:
    "Short guide for pilgrims: buy an Umrah eSIM or Hajj eSIM, install at home, and turn data on when you land in Makkah or Madinah.",
  path: "/help/umrah-esim-before-you-fly",
});

export default function Page() {
  return (
    <ShortHelpGuidePage
      breadcrumbLabel="Umrah eSIM before you fly"
      title="Umrah eSIM: install before you fly"
      intro="Do the calm work at home so maps, WhatsApp, and family updates work when you arrive in Makkah or Madinah — not at the airport kiosk."
      sections={[
        {
          title: "1. Confirm your phone first",
          body: "Your phone needs eSIM support and must be carrier-unlocked. Use our free phone check before you buy so you are not stuck after checkout.",
        },
        {
          title: "2. Buy your Umrah or Hajj eSIM",
          body: "Choose a Saudi Arabia pilgrimage plan sized for your trip — fixed data or day-pass unlimited. Your QR arrives by email after payment.",
        },
        {
          title: "3. Install on Wi‑Fi at home",
          body: "Scan the QR and add the travel line before you fly. Keep your home number for calls and SMS if needed; use the travel line for data abroad.",
        },
        {
          title: "4. At landing in Saudi Arabia",
          body: "Turn the travel line on, enable Data Roaming for that line, and set Cellular / Mobile Data to the travel eSIM. Do not delete the eSIM if something looks off — message WhatsApp support instead.",
        },
      ]}
      primaryCta={{
        href: "/hajj-umrah",
        label: "View Umrah & Hajj eSIM plans",
      }}
      secondaryCta={{
        href: "/#device-checker",
        label: "Free phone check",
      }}
    />
  );
}
