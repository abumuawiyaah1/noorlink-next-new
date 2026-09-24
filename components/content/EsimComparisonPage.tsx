import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import {
  ESIM_COMPARE_DISCLAIMER,
  ESIM_COMPARE_PROVIDERS,
  ESIM_COMPARE_ROWS,
  type CompareCell,
} from "@/lib/esim-comparison";
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
            <span className="content-kicker">Compare eSIM providers</span>
            <h1>NoorLink vs popular travel eSIMs</h1>
            <p>
              A calm side-by-side of what matters when you travel — coverage,
              hotspot, support, and whether pilgrimage plans are built for the
              trip you are actually taking.
            </p>
          </div>
        </section>

        <div className="content-shell esim-compare-shell">
          <section
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
                  Dedicated pilgrimage plans with hotspot — not only a generic
                  Saudi listing.
                </span>
              </li>
              <li>
                <strong>WhatsApp help that stays with you</strong>
                <span>
                  Real answers when you are installing at home or already on the
                  ground.
                </span>
              </li>
              <li>
                <strong>Install before you fly</strong>
                <span>
                  Guides and a free device check so setup happens on Wi‑Fi, not
                  in an airport queue.
                </span>
              </li>
            </ul>
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
              <Link href="/hajj-umrah" className="content-button content-button--ghost">
                Hajj &amp; Umrah plans
              </Link>
            </div>
          </section>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
