import type { Metadata } from "next";
import "@/styles/content-pages.css";
import { PolicyPageShell } from "@/components/content/PolicyPageShell";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "KYC & AML Policy | NoorLink",
  description: "Know Your Customer and Anti-Money Laundering policy for NoorLink.",
  path: "/kyc",
});

export default function Page() {
  return (
    <PolicyPageShell
      title="KYC & AML Policy"
      subtitle="Know Your Customer and Anti-Money Laundering"
      sections={[
        {
          title: "1. General scope",
          body: [
            "NoorLink primarily provides data-only eSIMs, which often do not require identity checks. We still follow international telecom compliance requirements where they apply.",
          ],
        },
        {
          title: "2. When verification is required",
          body: ["Identity verification may be requested when:"],
          bullets: [
            "A destination requires subscriber registration by law.",
            "A single customer purchases an unusually high volume of eSIMs in a short period.",
            "A transaction exceeds $200 USD and triggers manual review.",
          ],
        },
        {
          title: "3. Verification process",
          body: [
            "If verification is required, we may request a government-issued ID and a selfie for liveness detection. This information is processed securely through compliance partners and is not stored directly on NoorLink systems.",
          ],
        },
        {
          title: "4. Contact",
          body: ["For compliance inquiries, contact compliance@noorlink.co."],
        },
      ]}
    />
  );
}
