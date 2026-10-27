import type { Metadata } from "next";
import { Geist_Mono, Plus_Jakarta_Sans } from "next/font/google";
import { headers } from "next/headers";
import Script from "next/script";
import { SiteJsonLd } from "@/components/seo/SiteJsonLd";
import { CookieYesBannerFix } from "@/components/ui/CookieYesBannerFix";
import { MarketingAttributionCapture } from "@/components/analytics/MarketingAttributionCapture";
import { GlobalBackButton } from "@/components/ui/GlobalBackButton";
import { WhatsAppFab } from "@/components/ui/WhatsAppFab";
import {
  CURRENCY_HEADER,
  normalizeCurrency,
} from "@/lib/currency/config";
import { CurrencyProvider } from "@/lib/currency/use-currency";
import { LOCALE_HEADER, LOCALE_META, normalizeLocale } from "@/lib/i18n/config";
import { LocaleProvider } from "@/lib/i18n/use-locale";
import { ROOT_METADATA } from "@/lib/seo";
import "./globals.css";

const COOKIEYES_SCRIPT_ID = "961f820e92b5546e026c4c37009d673e";
const FONT_AWESOME_HREF =
  "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "700", "800"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

export const metadata: Metadata = ROOT_METADATA;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headerStore = await headers();
  const locale = normalizeLocale(headerStore.get(LOCALE_HEADER));
  const currency = normalizeCurrency(headerStore.get(CURRENCY_HEADER));
  const meta = LOCALE_META[locale];

  return (
    <html
      lang={meta.htmlLang}
      dir={meta.dir}
      data-locale={locale}
      className={`${geistMono.variable} ${plusJakarta.variable} h-full antialiased`}
    >
      <head>
        {/* Print media + flip to all after load — avoids blocking LCP */}
        <link
          id="fa-css"
          rel="stylesheet"
          href={FONT_AWESOME_HREF}
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
          media="print"
        />
        <script
          dangerouslySetInnerHTML={{
            __html:
              "document.getElementById('fa-css')?.addEventListener('load',function(e){e.target.media='all'});",
          }}
        />
        <noscript>
          <link
            rel="stylesheet"
            href={FONT_AWESOME_HREF}
            crossOrigin="anonymous"
            referrerPolicy="no-referrer"
          />
        </noscript>
      </head>
      <body className="min-h-full flex flex-col">
        <LocaleProvider initialLocale={locale}>
          <CurrencyProvider initialCurrency={currency}>
            <SiteJsonLd />
            <MarketingAttributionCapture />
            {children}
            <GlobalBackButton />
            <WhatsAppFab />
            <CookieYesBannerFix />
          </CurrencyProvider>
        </LocaleProvider>
        <Script
          id="cookieyes"
          src={`https://cdn-cookieyes.com/client_data/${COOKIEYES_SCRIPT_ID}/script.js`}
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
