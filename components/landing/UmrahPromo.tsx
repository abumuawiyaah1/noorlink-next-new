import Link from "next/link";

export function UmrahPromo() {
  return (
    <div className="container">
      <div className="ramadan-promo">
        <div className="promo-content">
          <div className="promo-text">
            <div className="promo-kicker">Hajj &amp; Umrah</div>
            <h2 className="promo-title">Stay connected in Makkah and Madinah</h2>
            <p className="promo-copy">
              Dedicated pilgrimage plans with hotspot included. Install before
              you fly so maps, messages, and group coordination work on arrival.
            </p>
            <Link href="/hajj-umrah" className="btn-nav promo-cta">
              View Hajj &amp; Umrah plans
            </Link>
          </div>
          <div className="promo-feature-img" role="img" aria-label="Pilgrimage travel" />
        </div>
      </div>
    </div>
  );
}
