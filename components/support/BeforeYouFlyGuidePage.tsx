"use client";

import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { LandingReadyChecklist } from "@/components/orders/LandingReadyChecklist";
import { WHATSAPP_NUMBER } from "@/components/ui/WhatsAppFab";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { localizedPath } from "@/lib/i18n/path";
import { renderTemplate } from "@/lib/i18n/template";
import { useLocaleState } from "@/lib/i18n/use-locale";
import "@/styles/help-pages.css";

const WHATSAPP_GUIDE_HREF = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Hi NoorLink — my eSIM is installed but I have no data after landing. I followed the before-you-fly guide.",
)}`;

export function BeforeYouFlyGuidePage() {
  const [locale] = useLocaleState();
  const dict = getDictionary(locale);
  const help = dict.helpPage;

  return (
    <>
      <SiteHeader />
      <Breadcrumbs
        items={[
          { href: "/", label: dict.common.home },
          { href: "/support", label: dict.nav.support },
          { label: help.beforeFlyCrumb },
        ]}
      />
      <main className="help-page">
        <section className="help-hero">
          <p className="help-hero__brand" aria-hidden="true">
            Noor<span>Link</span>
          </p>
          <h1>{help.beforeFlyTitle}</h1>
          <p>{help.beforeFlyLede}</p>
        </section>
        <div className="help-inner">
          <LandingReadyChecklist preview />

          <div className="help-card" style={{ marginTop: 24 }}>
            <h2>{help.stillNoDataTitle}</h2>
            <p>
              {renderTemplate(help.stillNoDataBody, {
                whatsapp: (
                  <a
                    href={WHATSAPP_GUIDE_HREF}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {help.whatsappSupport}
                  </a>
                ),
                myEsims: (
                  <Link href={localizedPath("/dashboard", locale)}>
                    {dict.nav.myEsims}
                  </Link>
                ),
              })}
            </p>
          </div>

          <div className="help-card" style={{ marginTop: 16 }}>
            <h2>{dict.pseo.indexNav}</h2>
            <p>
              <Link href={localizedPath("/esim", locale)}>
                {dict.pseo.indexTitle}
              </Link>
              {" · "}
              <Link href={localizedPath("/destinations", locale)}>
                {dict.pseo.browseDestinations}
              </Link>
            </p>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
