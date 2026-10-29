import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { getDictionary, t } from "@/lib/i18n/dictionaries";
import { localizedPath } from "@/lib/i18n/path";
import { getRequestLocale } from "@/lib/i18n/request-locale";
import {
  getIndexedPseoDestinations,
  getPseoLocaleCopy,
  pseoHubPath,
} from "@/lib/pseo";
import { buildPageMetadata } from "@/lib/seo";
import "@/styles/pseo-hub.css";

export const revalidate = 2592000;

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale();
  const dict = getDictionary(locale);
  return buildPageMetadata({
    title: dict.pseo.indexTitle,
    description: dict.pseo.indexDescription,
    path: "/esim",
    locale,
  });
}

export default async function EsimGuidesIndexPage() {
  const locale = await getRequestLocale();
  const dict = getDictionary(locale);
  const hubs = getIndexedPseoDestinations();

  return (
    <>
      <SiteHeader />
      <Breadcrumbs
        items={[
          { href: localizedPath("/", locale), label: t(dict, "common.home") },
          { label: dict.pseo.indexNav },
        ]}
      />
      <main className="pseo-hub pseo-hub--index">
        <header className="pseo-hub__hero">
          <p className="pseo-hub__kicker">{dict.pseo.kicker}</p>
          <h1 className="pseo-hub__title">{dict.pseo.indexTitle}</h1>
          <p className="pseo-hub__intro">{dict.pseo.indexDescription}</p>
        </header>
        <ul className="pseo-index__list">
          {hubs.map((dest) => {
            const copy = getPseoLocaleCopy(dest, locale);
            return (
              <li key={dest.slug}>
                <Link
                  href={localizedPath(pseoHubPath(dest.slug), locale)}
                  className="pseo-index__link"
                >
                  <span className="pseo-index__name">{copy.countryName}</span>
                  <span className="pseo-index__meta">
                    {dest.primaryCarrier}
                    {dest.secondaryCarrier ? ` · ${dest.secondaryCarrier}` : ""}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
        <p className="pseo-hub__intro">
          <Link
            href={localizedPath("/destinations", locale)}
            className="pseo-hub__text-link"
          >
            {dict.pseo.browseDestinations}
          </Link>
        </p>
      </main>
      <SiteFooter />
    </>
  );
}
