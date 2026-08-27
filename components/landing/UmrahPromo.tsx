import Link from "next/link";

export function UmrahPromo() {
  return (
    <section className="umrah-promo-section" aria-label="Hajj and Umrah plans">
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
              <div className="promo-cta-row">
                <Link href="/hajj-umrah" className="btn-nav promo-cta">
                  View Hajj &amp; Umrah plans
                </Link>
                <Link
                  href="/newsletter/2027-01-ramadan-special"
                  className="promo-cta-secondary"
                >
                  Ramadan Insider special
                </Link>
                <Link
                  href="/newsletter/2027-04-hajj-special"
                  className="promo-cta-secondary"
                >
                  Hajj Insider special
                </Link>
              </div>
              <p className="promo-insider-note">
                Special editions go to customers buying or searching Umrah &amp; Hajj
                packages — Qur’an &amp; Hadith reminders, one month before the season.
              </p>
            </div>
            <div className="promo-feature-img" role="img" aria-label="Pilgrimage travel" />
          </div>
        </div>
      </div>
    </section>
  );
}
