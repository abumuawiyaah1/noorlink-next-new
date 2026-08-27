import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { RAMADAN_GIVING } from "@/lib/giving";

export function GivePage() {
  const {
    profitSharePercent,
    customerDiscountPercent,
    hadith,
    hadithReference,
  } = RAMADAN_GIVING;

  return (
    <>
      <SiteHeader />
      <Breadcrumbs items={[{ href: "/", label: "Home" }, { label: "Giving" }]} />
      <main className="content-page">
        <section className="content-hero content-hero--compact">
          <div className="content-hero__inner">
            <span className="content-kicker">Ramadan giving</span>
            <h1>Our pledge for the blessed month</h1>
            <p>
              Inspired by the Sunnah — your Insider discount, and our promise to
              give from profit.
            </p>
          </div>
        </section>

        <div className="content-shell" style={{ padding: "2.5rem 1.25rem 4rem" }}>
          <article className="content-card" style={{ maxWidth: 720, margin: "0 auto" }}>
            <p className="content-kicker">From the Sunnah</p>
            <blockquote style={{ margin: "0 0 1.25rem", padding: 0, border: 0 }}>
              <p style={{ fontStyle: "italic", lineHeight: 1.65, color: "#334155" }}>
                {hadith}
              </p>
              <cite
                style={{
                  display: "block",
                  fontStyle: "normal",
                  fontWeight: 650,
                  color: "var(--primary)",
                  marginTop: "0.35rem",
                }}
              >
                {hadithReference}
              </cite>
            </blockquote>

            <h2 style={{ color: "var(--primary)", marginTop: "1.75rem" }}>
              What NoorLink pledges
            </h2>
            <p style={{ color: "#334155", lineHeight: 1.65 }}>
              When you use the Ramadan Insider code on Hajj &amp; Umrah Connect
              or Saudi plans:
            </p>
            <ul style={{ color: "#334155", lineHeight: 1.7 }}>
              <li>
                You receive <strong>{customerDiscountPercent}% off</strong> at
                checkout.
              </li>
              <li>
                NoorLink donates{" "}
                <strong>{profitSharePercent}% of our profit</strong> from that
                eligible purchase to charity we support for the season.
              </li>
            </ul>
            <p style={{ color: "#334155", lineHeight: 1.65 }}>
              The discount is yours. The donation is ours — we do not send you
              away to donate on our behalf. We give from what we earn, in the
              spirit of a month when the Prophet ﷺ increased in generosity.
            </p>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "0.75rem",
                marginTop: "1.75rem",
              }}
            >
              <Link href="/hajj-umrah" className="btn-nav" style={{ color: "#fff" }}>
                View pilgrimage plans
              </Link>
              <Link
                href="/newsletter/2027-01-ramadan-special"
                style={{
                  alignSelf: "center",
                  color: "var(--primary)",
                  fontWeight: 650,
                }}
              >
                Read the Ramadan Insider special
              </Link>
            </div>
          </article>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
