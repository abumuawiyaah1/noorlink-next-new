import "@/styles/content-pages.css";
import { PolicyPageShell } from "@/components/content/PolicyPageShell";

export default function Page() {
  return (
    <PolicyPageShell
      title="Terms of Service"
      badge="Last updated: January 19, 2026"
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
          title: "3. User responsibilities",
          body: ["You agree to:"],
          bullets: [
            "Provide an accurate email address for delivery.",
            "Confirm that your device is eSIM-compatible and unlocked before purchase.",
            "Use the service in compliance with local laws and regulations.",
          ],
        },
        {
          title: "4. Payments and delivery",
          body: [
            "All prices are in USD. Payment is processed securely through third-party gateways, and digital goods are typically delivered by email after successful payment confirmation.",
          ],
        },
        {
          title: "5. Limitation of liability",
          body: [
            "NoorLink is not liable for network outages, speed fluctuations, or coverage gaps caused by local carriers such as Vodafone, Orange, or AT&T.",
          ],
        },
        {
          title: "6. Contact us",
          body: [
            "Email: support@noorlink.co",
            "Address: MOUNTAIN ROAD PL NE, Suite R, ALBUQUERQUE, NM 87110, USA",
          ],
        },
      ]}
    />
  );
}
