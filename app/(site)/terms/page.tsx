import "@/styles/content-pages.css";
import { PolicyPageShell } from "@/components/content/PolicyPageShell";

export default function Page() {
  return (
    <PolicyPageShell
      title="Terms of Service"
      badge="Last updated: August 26, 2026"
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
            "NoorLink facilitates global telecommunication services. We do not own the underlying carrier infrastructure, but we deliver valid credentials from authorized providers.",
          ],
        },
        {
          title: "3. Data plans, allowance, and validity",
          body: [
            "Fixed data plans include a specific data allowance (for example, 3 GB, 10 GB, or 20 GB) and a validity period (for example, 7, 15, or 30 days) shown at checkout.",
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
          title: "7. Limitation of liability",
          body: [
            "NoorLink is not liable for network outages, speed fluctuations, or coverage gaps caused by local carriers such as Vodafone, Orange, or AT&T.",
          ],
        },
        {
          title: "8. Contact us",
          body: [
            "Email: support@noorlink.co",
            "Address: MOUNTAIN ROAD PL NE, Suite R, ALBUQUERQUE, NM 87110, USA",
          ],
        },
      ]}
    />
  );
}
