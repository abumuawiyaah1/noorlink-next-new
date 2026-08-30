const PARTNER_PROGRAMS = [
  {
    title: "Influencers & creators",
    kicker: "Audience rewards",
    body: "Share a trusted travel eSIM with your followers. Your link gives them a checkout discount while you earn on qualifying sales.",
    image: "/images/traveler.jpg",
    imageAlt: "Travel creator sharing trip recommendations",
  },
  {
    title: "Masjid & Islamic centers",
    kicker: "Community-first",
    body: "Offer your community a practical travel benefit for Umrah, Hajj, and family trips — framed as support for the center, not a coupon hunt.",
    image: "/images/insider/insider-2027-02-umrah.jpg",
    imageAlt: "Pilgrims traveling for Umrah",
  },
  {
    title: "Travel advisors & connectors",
    kicker: "Advisor-friendly",
    body: "Recommend NoorLink to clients and groups you already advise. One link, no inventory, and support handled by our team.",
    image: "/images/middle-east-regional.jpg",
    imageAlt: "Travel advisor planning a regional trip",
  },
] as const;

export function PartnerPrograms() {
  return (
    <section className="partner-programs" aria-labelledby="partner-programs-heading">
      <div className="content-section-head partner-programs__head">
        <span className="content-kicker">Program types</span>
        <h2 id="partner-programs-heading">Choose the path that fits your community</h2>
        <p>Approved cash partners apply below. We review every application manually.</p>
      </div>

      <div className="partner-programs__grid partner-programs__grid--three">
        {PARTNER_PROGRAMS.map((program) => (
          <article key={program.title} className="partner-program-card">
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
