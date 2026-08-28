import type { Metadata } from "next";
import { Geist, Geist_Mono, Plus_Jakarta_Sans } from "next/font/google";
import Script from "next/script";
import { SiteJsonLd } from "@/components/seo/SiteJsonLd";
import { CookieYesBannerFix } from "@/components/ui/CookieYesBannerFix";
import { GlobalBackButton } from "@/components/ui/GlobalBackButton";
import { WhatsAppFab } from "@/components/ui/WhatsAppFab";
import { ROOT_METADATA } from "@/lib/seo";
import "./globals.css";

const COOKIEYES_SCRIPT_ID = "961f820e92b5546e026c4c37009d673e";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-plus-jakarta",
});

export const metadata: Metadata = ROOT_METADATA;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${plusJakarta.variable} h-full antialiased`}
    >
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <body className="min-h-full flex flex-col">
        <SiteJsonLd />
        {children}
        <GlobalBackButton />
        <WhatsAppFab />
        <CookieYesBannerFix />
        <Script
          id="cookieyes"
          src={`https://cdn-cookieyes.com/client_data/${COOKIEYES_SCRIPT_ID}/script.js`}
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
