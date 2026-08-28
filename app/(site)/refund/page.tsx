import type { Metadata } from "next";
import "@/styles/content-pages.css";
import { PolicyPageShell } from "@/components/content/PolicyPageShell";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Refund Policy | NoorLink",
  description: "Refund and cancellation policy for NoorLink travel eSIM purchases.",
  path: "/refund",
});

export default function Page() {
  return (
    <PolicyPageShell
      title="Refund & Cancellation Policy"
      badge="Last updated: August 26, 2026"
      alert='Important notice: eSIMs and top-ups are digital goods. Once a QR code has been generated and delivered, standard "return" rights do not apply.'
      sections={[
        {
          title: "1. General policy",
          body: [
            "We can only offer refunds under specific technical conditions. Change-of-mind or accidental purchases are not refundable once the eSIM has been delivered.",
            "Fixed data plans are sold with a defined allowance and validity period. Unused data that expires at the end of your validity period is not refundable — this is standard for prepaid travel data products.",
          ],
        },
        {
          title: "2. Data allowance and expiry",
          body: [
            "Each plan includes a maximum data allowance and a fixed number of days of validity, as shown at checkout.",
            "Data remaining at the end of the validity period expires and cannot be carried over, converted to cash, or transferred to another order.",
            "NoorLink does not guarantee that you will use your full allowance; your plan price covers the allowance and validity window, not actual consumption.",
          ],
        },
        {
          title: "3. Eligibility for refund",
          body: ["A full refund or replacement may be offered if:"],
          bullets: [
            "The eSIM cannot be installed or connected because of a technical failure on our side or the provider side.",
            "You were charged but the system failed to generate an eSIM due to inventory or provisioning issues.",
            "You did not receive the QR code email within 2 hours of purchase and support could not resolve it.",
          ],
        },
        {
          title: "4. Non-refundable scenarios",
          body: ["Refunds are not available for:"],
          bullets: [
            "Devices that are not eSIM-compatible or are carrier-locked.",
            "Deleted eSIMs that were removed from device settings after delivery.",
            "Plans that were already scanned and activated.",
            "Weak or unavailable local carrier coverage in remote areas.",
            "Unused data remaining after the validity period has expired.",
            "Partial use of a plan where the service worked as described.",
          ],
        },
        {
          title: "5. How to request a refund",
          body: [
            "If you believe your order qualifies, contact support within 5 days of purchase and include the details below.",
          ],
          orderedBullets: [
            "Send your request to support@noorlink.co.",
            "Include your order ID, such as NL-123456.",
            "Attach a screenshot showing the installation error or no-service status.",
          ],
        },
        {
          title: "6. Review timeline",
          body: [
            "Our team investigates the issue with the provider. If a technical failure is confirmed, refunds are returned to the original payment method within 5 to 10 business days.",
          ],
        },
      ]}
    />
  );
}
