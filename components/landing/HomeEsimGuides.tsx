import Link from "next/link";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { localizedPath } from "@/lib/i18n/path";
import { getRequestLocale } from "@/lib/i18n/request-locale";
import {
  getPseoLocaleCopy,
  getWaveAIndexedPseoDestinations,
  pseoHubPath,
} from "@/lib/pseo";

/**
 * Calm crawl path from the indexed homepage into Wave A eSIM hubs + /esim index.
 * No cards — text links only (matches destinations guides pattern).
 */
export async function HomeEsimGuides() {
  const locale = await getRequestLocale();
  const dict = getDictionary(locale);
  const hubs = getWaveAIndexedPseoDestinations();

  return (
    <section
      className="home-esim-guides"
      aria-labelledby="home-esim-guides-heading"
    >
      <div className="container">
        <span className="why-kicker">{dict.pseo.kicker}</span>
        <h2 id="home-esim-guides-heading">{dict.pseo.homeGuidesTitle}</h2>
        <p className="home-esim-guides__blurb">{dict.pseo.homeGuidesBlurb}</p>
        <ul className="home-esim-guides__list">
          {hubs.map((dest) => {
            const copy = getPseoLocaleCopy(dest, locale);
            return (
              <li key={dest.slug}>
                <Link
                  href={localizedPath(pseoHubPath(dest.slug), locale)}
                  className="home-esim-guides__link"
                >
                  {copy.countryName}
                </Link>
              </li>
            );
          })}
        </ul>
        <Link
          href={localizedPath("/esim", locale)}
          className="home-esim-guides__all"
        >
          {dict.footer.esimGuides}
        </Link>
      </div>
    </section>
  );
}
