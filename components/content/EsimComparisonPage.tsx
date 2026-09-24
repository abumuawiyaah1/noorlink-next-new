import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import {
  ESIM_COMPARE_DISCLAIMER,
  ESIM_COMPARE_FAQS,
  ESIM_COMPARE_GUIDES,
  ESIM_COMPARE_PROVIDERS,
  ESIM_COMPARE_ROWS,
  ESIM_COMPARE_UPDATED_ISO,
  ESIM_COMPARE_UPDATED_LABEL,
  type CompareCell,
} from "@/lib/esim-comparison";
import { CompareTrustpilotProof } from "@/components/content/CompareTrustpilotProof";
import { CompareStickyCta } from "@/components/content/CompareStickyCta";
import { CompareLiveDestinations } from "@/components/content/CompareLiveDestinations";
import "@/styles/esim-compare.css";

function CellBadge({ cell }: { cell: CompareCell }) {
  return (
    <span
      className={`esim-compare__badge esim-compare__badge--${cell.kind}`}
      title={cell.note}
    >
      {cell.label}
    </span>
  );
}

export function EsimComparisonPage() {
  return (
    <>
      <SiteHeader />
      <Breadcrumbs
        items={[
          { href: "/", label: "Home" },
          { label: "eSIM comparison" },
        ]}
      />
      <main className="content-page esim-compare-page">
        <section className="content-hero content-hero--compact">
          <div className="content-hero__inner">
            <span className="content-kicker">Travel eSIM comparison</span>
            <h1>eSIM comparison: NoorLink vs Airalo, Holafly &amp; more</h1>
            <p>
              Compare popular travel eSIM providers on coverage, hotspot, support,
              and dedicated Hajj &amp; Umrah plans — so you pick for the trip you
              are actually taking, not just the biggest catalog.
            </p>
            <p className="esim-compare__updated">
              Chart updated{" "}
              <time dateTime={ESIM_COMPARE_UPDATED_ISO}>
                {ESIM_COMPARE_UPDATED_LABEL}
              </time>
            </p>
          </div>
        </section>

        <div className="content-shell esim-compare-shell">
          <nav className="esim-compare-toc" aria-label="On this page">
            <p className="esim-compare-toc__label">On this page</p>
            <ul>
              <li>
                <a href="#feature-chart">Feature chart</a>
              </li>
              <li>
                <a href="#who-its-for">Who it’s for</a>
              </li>
              <li>
                <a href="#live-plans">Live starting prices</a>
              </li>
              <li>
                <a href="#phone-check">Phone check</a>
              </li>
              <li>
                <a href="#trustpilot">Trustpilot reviews</a>
              </li>
              {ESIM_COMPARE_GUIDES.map((guide) => (
                <li key={guide.id}>
                  <a href={`#${guide.id}`}>{guide.title}</a>
                </li>
              ))}
              <li>
                <a href="#compare-faq">Comparison FAQ</a>
              </li>
            </ul>
          </nav>

          <section
            id="feature-chart"
            className="esim-compare"
            aria-labelledby="esim-compare-heading"
          >
            <div className="content-section-head">
              <span className="content-kicker">Feature chart</span>
              <h2 id="esim-compare-heading">How we stack up</h2>
              <p>
                Six well-known providers beside NoorLink. We highlight where we
                are strongest for pilgrims and practical travelers — without
                pretending every brand serves the same trip.
              </p>
            </div>

            <div className="esim-compare__scroll" tabIndex={0}>
              <table className="esim-compare__table">
                <caption className="visually-hidden">
                  Comparison of NoorLink with Airalo, Holafly, Nomad, Saily,
                  GigSky, and Maya Mobile
                </caption>
                <thead>
                  <tr>
                    <th scope="col" className="esim-compare__feature-col">
                      Feature
                    </th>
                    {ESIM_COMPARE_PROVIDERS.map((provider) => (
                      <th
                        key={provider.id}
                        scope="col"
                        className={
                          provider.highlight
                            ? "esim-compare__provider esim-compare__provider--ours"
                            : "esim-compare__provider"
                        }
                      >
                        <span className="esim-compare__provider-name">
                          {provider.name}
                        </span>
                        {provider.highlight ? (
                          <span className="esim-compare__ours-tag">Us</span>
                        ) : null}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {ESIM_COMPARE_ROWS.map((row) => (
                    <tr key={row.id}>
                      <th scope="row" className="esim-compare__row-label">
                        <span>{row.label}</span>
                        {row.hint ? (
                          <span className="esim-compare__row-hint">
                            {row.hint}
                          </span>
                        ) : null}
                      </th>
                      {ESIM_COMPARE_PROVIDERS.map((provider) => {
                        const cell = row.cells[provider.id];
                        return (
                          <td
                            key={provider.id}
                            className={
                              provider.highlight
                                ? "esim-compare__cell esim-compare__cell--ours"
                                : "esim-compare__cell"
                            }
                          >
                            {cell ? <CellBadge cell={cell} /> : "—"}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="esim-compare__disclaimer">{ESIM_COMPARE_DISCLAIMER}</p>
          </section>

          <section
            id="who-its-for"
            className="esim-compare-audience"
            aria-labelledby="esim-compare-audience-heading"
          >
            <div className="content-section-head">
              <span className="content-kicker">Who it’s for</span>
              <h2 id="esim-compare-audience-heading">
                Pick NoorLink if this sounds like your trip
              </h2>
            </div>
            <ul className="esim-compare-audience__list">
              <li>
                <strong>Umrah or Hajj</strong>
                <span>
                  You want pilgrimage plans with hotspot — not only a generic
                  Saudi country pack.
                </span>
              </li>
              <li>
                <strong>Family or group travel</strong>
                <span>
                  You may share data with a companion’s phone or a laptop on the
                  road.
                </span>
              </li>
              <li>
                <strong>Prefer human help</strong>
                <span>
                  You want WhatsApp support and clear install-before-you-fly
                  steps, not only an app store listing.
                </span>
              </li>
            </ul>
            <div className="esim-compare-inline-cta">
              <Link href="/destinations" className="content-button">
                Browse destinations
              </Link>
              <Link
                href="/hajj-umrah"
                className="content-button content-button--ghost"
              >
                Hajj &amp; Umrah plans
              </Link>
            </div>
          </section>

          <CompareLiveDestinations />

          <section
            id="phone-check"
            className="esim-compare-check"
            aria-labelledby="esim-compare-check-heading"
          >
            <div>
              <span className="content-kicker">Before you buy</span>
              <h2 id="esim-compare-check-heading">
                Not sure your phone works with eSIM?
              </h2>
              <p>
                Run a free compatibility check, then install on home Wi‑Fi so
                you’re ready when you land — not stuck in an airport SIM line.
              </p>
            </div>
            <div className="esim-compare-check__actions">
              <Link
                href="/help/hajj-umrah-phone-check"
                className="content-button"
              >
                Free phone check
              </Link>
              <Link
                href="/help/before-you-fly"
                className="content-button content-button--ghost"
              >
                Install before you fly
              </Link>
            </div>
          </section>

          <CompareTrustpilotProof />

          <section
            className="esim-compare-spotlight"
            aria-labelledby="esim-compare-why"
          >
            <div className="content-section-head">
              <span className="content-kicker">Why travelers pick NoorLink</span>
              <h2 id="esim-compare-why">Built for the trip, not just the catalog</h2>
            </div>
            <ul className="esim-compare-spotlight__list">
              <li>
                <strong>Hajj &amp; Umrah profiles</strong>
                <span>
                  Dedicated{" "}
                  <Link href="/hajj-umrah">pilgrimage plans</Link> with hotspot —
                  not only a generic Saudi listing.
                </span>
              </li>
              <li>
                <strong>WhatsApp help that stays with you</strong>
                <span>
                  Real answers when you are installing at home or already on the
                  ground — start at{" "}
                  <Link href="/support">Support</Link>.
                </span>
              </li>
              <li>
                <strong>Install before you fly</strong>
                <span>
                  Use the{" "}
                  <Link href="/help/before-you-fly">before-you-fly guide</Link>{" "}
                  and{" "}
                  <Link href="/help/hajj-umrah-phone-check">
                    free device check
                  </Link>{" "}
                  so setup happens on Wi‑Fi, not in an airport queue.
                </span>
              </li>
            </ul>
          </section>

          <section
            className="esim-compare-guides"
            aria-labelledby="esim-compare-guides-heading"
          >
            <div className="content-section-head">
              <span className="content-kicker">Guides</span>
              <h2 id="esim-compare-guides-heading">
                How to choose a travel eSIM
              </h2>
              <p>
                Short answers to the searches travelers actually make — written
                for clarity, not hype.
              </p>
            </div>

            <div className="esim-compare-guides__list">
              {ESIM_COMPARE_GUIDES.map((guide) => (
                <article
                  key={guide.id}
                  id={guide.id}
                  className="esim-compare-guide"
                >
                  <h3>{guide.title}</h3>
                  <p>{guide.body}</p>
                  <ul className="esim-compare-guide__links">
                    {guide.links.map((link) => (
                      <li key={link.href}>
                        <Link href={link.href}>{link.label}</Link>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>

          <section
            id="compare-faq"
            className="esim-compare-faq"
            aria-labelledby="esim-compare-faq-heading"
          >
            <div className="content-section-head">
              <span className="content-kicker">FAQ</span>
              <h2 id="esim-compare-faq-heading">Comparison FAQ</h2>
              <p>
                Quick answers before you buy. More setup detail lives in the{" "}
                <Link href="/faq">full FAQ</Link>.
              </p>
            </div>
            <div className="esim-compare-faq__list">
              {ESIM_COMPARE_FAQS.map((item) => (
                <article key={item.q} className="esim-compare-faq__item">
                  <h3>{item.q}</h3>
                  <p>{item.a}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="content-cta">
            <div>
              <span className="content-kicker">Ready to choose?</span>
              <h2>Browse destinations or start with pilgrimage plans.</h2>
              <p>
                Pick a country pack for your next trip, or open Hajj &amp; Umrah
                if Makkah and Madinah are the destination.
              </p>
            </div>
            <div className="content-cta__actions">
              <Link href="/destinations" className="content-button">
                Browse destinations
              </Link>
              <Link
                href="/hajj-umrah"
                className="content-button content-button--ghost"
              >
                Hajj &amp; Umrah plans
              </Link>
            </div>
          </section>
        </div>
      </main>
      <CompareStickyCta />
      <SiteFooter />
    </>
  );
}
