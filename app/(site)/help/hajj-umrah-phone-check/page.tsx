import type { Metadata } from "next";
import { ShortHelpGuidePage } from "@/components/support/ShortHelpGuidePage";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Free Phone Check for Hajj & Umrah eSIM | NoorLink",
  description:
    "Free eSIM phone compatibility check for Hajj and Umrah travelers. Confirm your device supports eSIM and is unlocked before you buy Saudi Arabia data.",
  path: "/help/hajj-umrah-phone-check",
});

export default function Page() {
  return (
    <ShortHelpGuidePage
      breadcrumbLabel="Hajj & Umrah phone check"
      title="Free phone check for Hajj & Umrah eSIM"
      intro="Most install problems are not network issues — they are locked phones or devices without eSIM. Check once, then buy with confidence."
      sections={[
        {
          title: "What “compatible” means",
          body: "Your phone must support eSIM hardware and be unlocked from your home carrier. Both matter for a travel eSIM in Saudi Arabia.",
        },
        {
          title: "Quick free check on NoorLink",
          body: "Enter your model (for example iPhone 14 or Samsung S23) on our free checker, or use the device picker. It takes less than a minute and does not require purchase.",
        },
        {
          title: "If your phone is not ready",
          body: "A locked phone cannot use a third-party travel eSIM until your carrier unlocks it. Ask your home provider, or travel with a second unlocked eSIM phone if you already have one.",
        },
        {
          title: "Ready? Choose your pilgrimage plan",
          body: "After the free check, pick an Umrah eSIM or Hajj eSIM for Makkah and Madinah. Install before you fly so connectivity stays in the background of your journey.",
        },
      ]}
      primaryCta={{
        href: "/hajj-umrah",
        label: "Shop Umrah & Hajj eSIM plans",
      }}
      secondaryCta={{
        href: "/#device-checker",
        label: "Run free phone check",
      }}
    />
  );
}
