import type { Metadata } from "next";
import "@/styles/content-pages.css";
import { PolicyPageShell } from "@/components/content/PolicyPageShell";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Privacy Policy | NoorLink",
  description: "How NoorLink collects, uses, and protects your personal data.",
  path: "/privacy",
});

export default function Page() {
  return (
    <PolicyPageShell
      title="Privacy Policy"
      subtitle="Your data security is our priority."
      sections={[
        {
          title: "1. Information we collect",
          body: ["To provide our services, we collect minimal necessary information, including:"],
          bullets: [
            "Contact information such as your name and email address for delivery and support.",
            "Transaction data such as purchase history and order IDs.",
            "Device and session data such as IP address and device type for fraud prevention.",
          ],
        },
        {
          title: "2. How we use your data",
          body: ["We use your information solely to:"],
          bullets: [
            "Process your orders and deliver digital products.",
            "Send transactional emails such as receipts and QR codes.",
            "Provide customer support.",
            "Comply with legal obligations, including KYC and AML where required.",
          ],
        },
        {
          title: "3. Payment security",
          body: [
            "NoorLink does not store your credit card information. Payments are processed securely through certified gateways such as Stripe using industry-standard encryption.",
          ],
        },
        {
          title: "4. Third-party sharing",
          body: [
            "We do not sell your personal data. We only share the information needed to activate your service with telecom and payment partners involved in fulfilling your order.",
          ],
        },
        {
          title: "5. Contact us",
          body: ["If you have questions about your data, contact support@noorlink.co."],
        },
      ]}
    />
  );
}
