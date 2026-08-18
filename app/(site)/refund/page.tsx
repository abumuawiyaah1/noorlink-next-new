import "@/styles/content-pages.css";
import { PolicyPageShell } from "@/components/content/PolicyPageShell";

export default function Page() {
  return (
    <PolicyPageShell
      title="Refund & Cancellation Policy"
      badge="Last updated: January 19, 2026"
      alert='Important notice: eSIMs and top-ups are digital goods. Once a QR code has been generated and delivered, standard "return" rights do not apply.'
      sections={[
        {
          title: "1. General policy",
          body: [
            "We can only offer refunds under specific technical conditions. Change-of-mind or accidental purchases are not refundable once the eSIM has been delivered.",
          ],
        },
        {
          title: "2. Eligibility for refund",
          body: ["A full refund or replacement may be offered if:"],
          bullets: [
            "The eSIM cannot be installed or connected because of a technical failure on our side or the provider side.",
            "You were charged but the system failed to generate an eSIM due to inventory issues.",
            "You did not receive the QR code email within 2 hours of purchase and support could not resolve it.",
          ],
        },
        {
          title: "3. Non-refundable scenarios",
          body: ["Refunds are not available for:"],
          bullets: [
            "Devices that are not eSIM-compatible or are carrier-locked.",
            "Deleted eSIMs that were removed from device settings after delivery.",
            "Plans that were already scanned and activated.",
            "Weak or unavailable local carrier coverage in remote areas.",
          ],
        },
        {
          title: "4. How to request a refund",
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
          title: "5. Review timeline",
          body: [
            "Our team investigates the issue with the provider. If a technical failure is confirmed, refunds are returned to the original payment method within 5 to 10 business days.",
          ],
        },
      ]}
    />
  );
}
