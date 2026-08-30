import type { Metadata } from "next";
import Link from "next/link";
import "@/styles/content-pages.css";
import { PolicyPageShell } from "@/components/content/PolicyPageShell";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Partner Program Terms | NoorLink",
  description:
    "Terms for approved NoorLink cash partners — influencers, masjid and Islamic centers, and travel connectors.",
  path: "/partners/terms",
});

export default function PartnerTermsPage() {
  return (
    <PolicyPageShell
      title="Partner Program Terms"
      badge="Last updated: August 29, 2026"
      subtitle="These terms apply to approved cash partners only — not to regular customers who refer friends after purchase."
      breadcrumbItems={[
        { href: "/", label: "Home" },
        { href: "/partners", label: "Partners" },
        { label: "Partner Program Terms" },
      ]}
      sections={[
        {
          title: "1. Scope",
          body: [
            "These Partner Program Terms (“Partner Terms”) govern your participation in the NoorLink partner program as an approved influencer, masjid or Islamic center, travel advisor, or connector (“Partner,” “you”).",
            "These Partner Terms do not apply to regular NoorLink customers who share a personal refer-a-friend link after their own purchase. Customer referral rewards (a discount on a future order, not cash) are described on noorlink.co and in our general Terms of Service.",
            "By applying to the program, being approved, or using a partner referral link or dashboard, you agree to these Partner Terms and to our Privacy Policy.",
          ],
        },
        {
          title: "2. Eligibility and approval",
          body: [
            "Partners must be at least 18 years old and able to enter a binding agreement. Organizations must be represented by an authorized contact.",
            "All partners are approved manually by NoorLink. Submitting an application does not guarantee acceptance. We may approve, decline, or revoke participation at our discretion.",
            "We may request additional information about your organization, audience, or promotional methods before or after approval.",
          ],
        },
        {
          title: "3. Partner types and default rates",
          body: [
            "Commission rates, audience discounts, and payout minimums depend on partner type. Default rates below may be customized in writing when you are approved.",
          ],
          bullets: [
            "Influencer / creator: 10% audience discount; 10% commission on qualifying net sales; $25 minimum payout.",
            "Masjid / Islamic center: 5% community discount; 12% commission on qualifying net sales (15% on eligible Hajj & Umrah corridor plans); $50 minimum payout.",
            "Travel advisor / connector: 10% audience discount; 8% commission on qualifying net sales; $25 minimum payout.",
          ],
        },
        {
          title: "4. Referral links and attribution",
          body: [
            "Approved partners receive a unique referral code and link. A sale is attributed to you when a customer completes checkout using your active link or code, subject to these Partner Terms.",
            "Attribution is tracked automatically. We do not guarantee attribution if a customer clears cookies, uses a different device, applies another offer that overrides referral tracking, or completes checkout without your link or code.",
            "You may not use your own referral link or code for personal purchases (“self-referral”). Self-referrals do not earn commission.",
          ],
        },
        {
          title: "5. Commissions",
          body: [
            "Commissions are calculated as a percentage of qualifying net sales — the order subtotal after customer discounts and before tax and payment processing, unless we specify otherwise in your approval email.",
            "A commission becomes eligible after the customer’s order is paid and fulfilled. Commissions may be reversed or adjusted if the underlying order is refunded, charged back, cancelled, or determined to be fraudulent or abusive.",
            "Commission rates, discount levels, and eligible products may change for future orders. We will use reasonable efforts to notify approved partners of material changes.",
            "Commissions are not guaranteed income. Past performance does not guarantee future earnings.",
          ],
        },
        {
          title: "6. Payouts",
          body: [
            "Cash payouts are processed manually by the NoorLink team after you request a withdrawal through the partner dashboard and your approved balance meets the payout minimum for your partner type.",
            "Payout requests are typically reviewed within five (5) business days. We may delay or withhold payout while investigating suspected fraud, policy violations, or account discrepancies.",
            "You are responsible for providing accurate payout contact details (such as PayPal or bank information) when requested. NoorLink is not responsible for failed transfers caused by incorrect details you provide.",
            "Unpaid balances may be forfeited if your account is terminated for cause, or if your account is inactive for twelve (12) consecutive months, except where prohibited by law.",
          ],
        },
        {
          title: "7. Taxes",
          body: [
            "Partners are independent contractors, not employees or agents of NoorLink. You are solely responsible for any taxes, filings, or reporting obligations arising from commissions you receive.",
            "We may request tax information (such as a W-9 for U.S. partners) before issuing payouts above applicable thresholds and may issue informational tax forms where required by law.",
          ],
        },
        {
          title: "8. Brand and marketing",
          body: ["You may promote NoorLink using the referral link and factual program details we provide. You agree to:"],
          bullets: [
            "Present NoorLink honestly — as a travel eSIM service, not as a mobile carrier or network operator.",
            "Use accurate descriptions of coverage, data allowances, and pricing as shown on noorlink.co at the time of promotion.",
            "Not modify the NoorLink name, logo, or branding except as we expressly authorize in writing.",
            "Not imply endorsement, employment, or official partnership beyond your approved status.",
            "Frame masjid and community links as a practical travel benefit for your community, not as a generic coupon or misleading discount scheme.",
          ],
        },
        {
          title: "9. Prohibited conduct",
          body: ["You may not:"],
          bullets: [
            "Send unsolicited bulk email (spam), SMS spam, or deceptive ads.",
            "Bid on NoorLink trademarks or brand terms in paid search without our written consent.",
            "Make false or exaggerated claims (for example, “unlimited data everywhere” or guaranteed network speeds).",
            "Use cookie stuffing, fake traffic, incentive sites that mislead customers, or any fraudulent attribution method.",
            "Promote NoorLink on sites or channels that are illegal, hateful, or primarily adult or gambling content.",
            "Resell, sublicense, or white-label NoorLink eSIMs under your own brand without a separate written agreement.",
          ],
        },
        {
          title: "10. Suspension and termination",
          body: [
            "We may suspend or terminate your partner account immediately if you breach these Partner Terms, engage in prohibited conduct, or if we reasonably suspect fraud or harm to customers or the NoorLink brand.",
            "Upon termination, your referral link will stop earning new commissions. We will pay out eligible approved balances that are not connected to fraud or chargebacks, subject to the payout rules above.",
            "You may stop participating at any time by notifying support@noorlink.co. Termination does not affect our right to withhold or reverse commissions tied to invalid orders.",
          ],
        },
        {
          title: "11. Changes",
          body: [
            "We may update these Partner Terms from time to time. The “Last updated” date at the top of this page will change when we do.",
            "Material changes will be posted on noorlink.co/partners/terms. Continued use of your partner link or dashboard after changes take effect constitutes acceptance, except where a change requires separate consent under applicable law.",
          ],
        },
        {
          title: "12. Disclaimer and limitation of liability",
          body: [
            "The partner program and referral tools are provided “as is.” To the fullest extent permitted by law, NoorLink is not liable for indirect, incidental, or consequential damages arising from your participation.",
            "Our total liability to you for any claim related to the partner program is limited to unpaid commissions we have confirmed as approved and not disputed at the time of the claim.",
          ],
        },
        {
          title: "13. General",
          body: [
            "These Partner Terms are governed by the laws of the State of New Mexico, USA, without regard to conflict-of-law rules.",
            "If any provision is unenforceable, the remaining provisions remain in effect.",
            "Questions about these Partner Terms or your partner account: support@noorlink.co",
            "NoorLink · Mountain Road Pl NE, Suite R · Albuquerque, NM 87110, USA",
          ],
        },
      ]}
    >
      <p className="partner-apply__links">
        <Link href="/partners#apply">Apply to become a partner</Link>
        {" · "}
        <Link href="/partners#login">Partner sign in</Link>
        {" · "}
        <Link href="/terms">Terms of Service</Link>
      </p>
    </PolicyPageShell>
  );
}
