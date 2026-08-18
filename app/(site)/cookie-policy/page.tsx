import type { Metadata } from "next";
import "@/styles/content-pages.css";
import { PolicyPageShell } from "@/components/content/PolicyPageShell";

export const metadata: Metadata = {
  title: "Cookie Policy | NoorLink",
};

export default function CookiePolicyPage() {
  return (
    <PolicyPageShell
      title="Cookie Policy"
      subtitle="How NoorLink uses cookies and similar technologies."
      sections={[
        {
          title: "1. What cookies do on NoorLink",
          body: [
            "Cookies help the site remember preferences, keep checkout and support tools working, and measure how pages are being used.",
          ],
        },
        {
          title: "2. Types of cookies we may use",
          bullets: [
            "Essential cookies needed for core site functions.",
            "Analytics cookies that help us understand site performance and usage.",
            "Support and messaging cookies used by tools such as live chat.",
            "Consent cookies that remember your privacy choices.",
          ],
        },
        {
          title: "3. Managing your choices",
          body: [
            "You can adjust your preferences through the cookie banner when available, and you can also manage or delete cookies from your browser settings at any time.",
          ],
        },
        {
          title: "4. Contact",
          body: ["If you have questions about cookies or consent, contact support@noorlink.co."],
        },
      ]}
    />
  );
}
