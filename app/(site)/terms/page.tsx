import type { Metadata } from "next";
import "@/styles/content-pages.css";
import { PolicyPageShell } from "@/components/content/PolicyPageShell";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Terms of Service | NoorLink",
  description: "Terms governing use of NoorLink travel eSIM services and website.",
  path: "/terms",
});

export default function Page() {
  return (
    <PolicyPageShell
      title="Terms of Service"
      badge="Last updated: September 4, 2026"
      sections={[
        {
          title: "1. Introduction",
          body: [
            "By accessing NoorLink and purchasing our digital services, including eSIMs and mobile top-ups, you agree to these Terms of Service.",
          ],
        },
        {
          title: "2. Nature of services",
          body: [
            "NoorLink resells travel eSIM data connectivity from authorized wholesale partners. We deliver valid install credentials (such as a QR code) so you can use partner networks abroad.",
            "NoorLink is not a licensed Saudi telecom operator, and we do not provide a local Saudi phone number (+966) with these travel plans. We are not a mobile network operator; coverage and speed depend on local partner networks in each destination (for example STC, Mobily, or Zain in Saudi Arabia).",
            "Plans are data-only travel eSIMs for personal travel use unless a product page clearly states otherwise.",
          ],
        },
        {
          title: "3. Data plans, allowance, and validity",
          body: [
            "Fixed data plans include a specific data allowance (for example, 3 GB, 10 GB, or 20 GB) and a validity period (for example, 7, 15, or 30 days) shown at checkout.",
            "Day-pass or “unlimited” style plans may include a daily high-speed allowance and then continue at a reduced speed, as shown on the product page and at checkout. Always read the throttle or fair-use details before you buy.",
            "Your allowance begins according to the plan terms — typically from activation or first use, as stated on your order confirmation and install email.",
            "When your validity period ends, any unused data expires automatically. Plans do not roll over to a future trip unless we explicitly state otherwise.",
            "You may track estimated data remaining and days left in My eSIMs on noorlink.co after purchase.",
          ],
        },
        {
          title: "4. Fair use",
          body: [
            "Plans are for personal travel use on compatible devices. Excessive usage, resale, or activity that violates carrier fair-use policies may result in throttling or suspension without refund.",
          ],
        },
        {
          title: "5. User responsibilities",
          body: ["You agree to:"],
          bullets: [
            "Provide an accurate email address for delivery.",
            "Confirm that your device is eSIM-compatible and unlocked before purchase.",
            "Use the service in compliance with local laws and regulations.",
          ],
        },
        {
          title: "6. Payments and delivery",
          body: [
            "All prices are in USD. Payment is processed securely through third-party gateways. Digital goods are typically delivered by email after successful payment confirmation.",
          ],
        },
        {
          title: "7. Refunds",
          body: [
            "Refunds follow our Refund Policy. In short: we may refund or replace when activation fails for a technical reason on our side or the provider’s side. Change-of-mind and incompatible or locked devices are not refundable once a working QR has been delivered. See /refund for full details.",
          ],
        },
        {
          title: "8. Limitation of liability",
          body: [
            "NoorLink is not liable for network outages, speed fluctuations, or coverage gaps caused by local carriers such as STC, Mobily, Zain, Vodafone, Orange, or AT&T.",
          ],
        },
        {
          title: "9. Contact us",
          body: [
            "Email: support@noorlink.co",
            "Address: MOUNTAIN ROAD PL NE, Suite R, ALBUQUERQUE, NM 87110, USA",
          ],
        },
      ]}
    />
  );
}
