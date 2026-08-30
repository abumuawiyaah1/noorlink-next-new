const PARTNER_PROGRAMS = [
  {
    title: "Influencers & creators",
    kicker: "10% off · 10% commission",
    body: "Your audience gets 10% off through your link. You earn 10% cash on net sales, with payout from $25.",
    image: "/images/traveler.jpg",
    imageAlt: "Travel creator sharing trip recommendations",
  },
  {
    title: "Masjid & Islamic centers",
    kicker: "Community-first rewards",
    body: "Support your center with a link framed as a travel benefit — 5% community discount and 12–15% to your organization on Umrah/Hajj corridor plans.",
    image: "/images/insider/insider-2027-02-umrah.jpg",
    imageAlt: "Pilgrims traveling for Umrah",
  },
  {
    title: "Travel advisors & connectors",
    kicker: "8% commission · 10% off",
    body: "Recommend NoorLink to clients and groups you already advise. One link, no inventory, and support handled by our team.",
    image: "/images/middle-east-regional.jpg",
    imageAlt: "Travel advisor planning a regional trip",
  },
  {
    title: "Refer a friend (customers)",
    kicker: "Not a cash partner program",
    body: "After purchase, customers share a personal link. Friends save 10%; the referrer gets 10% off a future order — covered by our Terms of Service, not Partner Program Terms.",
    image: "/images/sim-card.jpg",
    imageAlt: "Digital eSIM delivery on a phone",
    muted: true,
  },
] as const;

export function PartnerPrograms() {
  return (
    <section className="partner-programs" aria-labelledby="partner-programs-heading">
      <div className="content-section-head partner-programs__head">
        <span className="content-kicker">Program types</span>
        <h2 id="partner-programs-heading">Choose the path that fits your community</h2>
        <p>
          Cash partners apply below. Customer refer-a-friend is automatic after a qualifying
          purchase.
        </p>
      </div>

      <div className="partner-programs__grid">
        {PARTNER_PROGRAMS.map((program) => (
          <article
            key={program.title}
            className={`partner-program-card${program.muted ? " partner-program-card--muted" : ""}`}
          >
            <div
              className="partner-program-card__media"
              style={{ backgroundImage: `url(${program.image})` }}
              role="img"
              aria-label={program.imageAlt}
            />
            <div className="partner-program-card__body">
              <span className="partner-program-card__kicker">{program.kicker}</span>
              <h3>{program.title}</h3>
              <p>{program.body}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
