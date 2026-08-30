const PARTNER_BENEFITS = [
  {
    icon: "💰",
    title: "Earn on every trip",
    body: "Cash rewards on qualifying sales from your referral link. Request payout from your partner dashboard when your balance is ready.",
  },
  {
    icon: "🤝",
    title: "Give your community a real discount",
    body: "Your audience gets a practical checkout discount through your link — a travel perk, not a gimmicky coupon hunt.",
  },
  {
    icon: "💬",
    title: "We handle support",
    body: "NoorLink provides 24/7 WhatsApp help for delivery, install, and checkout. You stay focused on your community.",
  },
  {
    icon: "✈️",
    title: "Built for travel",
    body: "190+ destinations plus dedicated Hajj & Umrah corridor plans. Install before you fly — the message your audience already trusts.",
  },
  {
    icon: "🔗",
    title: "One link, no inventory",
    body: "No stock to manage, no QR codes to send. Share your referral link and we deliver eSIMs by email after checkout.",
  },
  {
    icon: "✨",
    title: "A brand that matches your voice",
    body: "Calm, practical, trustworthy — the same tone across our site, emails, and support replies your referrals will see.",
  },
] as const;

export function PartnerBenefits() {
  return (
    <section className="partner-benefits" aria-labelledby="partner-benefits-heading">
      <div className="partner-benefits__banner" aria-hidden="true">
        <div
          className="partner-benefits__banner-image"
          style={{ backgroundImage: "url(/images/hero-3d.jpg)" }}
        />
      </div>

      <div className="partner-benefits__head">
        <span className="content-kicker">Why partner with us</span>
        <h2 id="partner-benefits-heading">Help travelers stay connected — and grow with NoorLink</h2>
        <p>
          Whether you lead a masjid, advise pilgrims, or share travel tips online, NoorLink gives
          you a service worth recommending and rewards that stay simple.
        </p>
      </div>

      <div className="partner-benefits__grid">
        {PARTNER_BENEFITS.map((benefit) => (
          <article key={benefit.title} className="content-card partner-benefits__card">
            <span className="partner-benefits__icon" aria-hidden="true">
              {benefit.icon}
            </span>
            <h3>{benefit.title}</h3>
            <p>{benefit.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
