"use client";

import Link from "next/link";
import { FooterSocialLinks } from "@/components/layout/FooterSocialLinks";
import { SecureCheckoutTrust } from "@/components/ui/SecureCheckoutTrust";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { useLocaleState } from "@/lib/i18n/use-locale";
import { SUPPORT_EMAIL } from "@/lib/support-contact";

export function HomeFooter() {
  const [locale] = useLocaleState();
  const dict = getDictionary(locale);
  const year = new Date().getFullYear();

  return (
    <footer>
      <div className="container footer-grid">
        <div>
          <Link href="/" className="logo-text" style={{ color: "white" }}>
            Noor<span style={{ color: "var(--accent)" }}>Link</span>
            <sup className="logo-tm">TM</sup>
          </Link>
          <p style={{ marginTop: 20, lineHeight: 1.8 }}>
            {dict.home.tagline}
            <br />
            Mountain Road Pl NE, Suite R
            <br />
            Albuquerque, NM 87110
            <br />
            <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>
          </p>
          <FooterSocialLinks
            followLabel={dict.footer.followUs}
            socialAria={dict.footer.socialAria}
          />
          <SecureCheckoutTrust
            variant="marks"
            showSsl={false}
            className="home-pay-badges footer-pay-marks"
          />
        </div>
        <div>
          <h4>{dict.footer.company}</h4>
          <nav className="footer-list" aria-label={dict.footer.company}>
            <Link href="/about">{dict.footer.aboutUs}</Link>
            <Link href="/learn">{dict.footer.learn}</Link>
            <Link href="/newsletter">{dict.footer.newsletter}</Link>
            <Link href="/support">{dict.footer.contactSupport}</Link>
            <Link href="/partners#apply">{dict.footer.partners}</Link>
            <Link href="/faq">{dict.footer.faq}</Link>
          </nav>
        </div>
        <div>
          <h4>{dict.footer.legal}</h4>
          <nav className="footer-list" aria-label={dict.footer.legal}>
            <Link href="/privacy">{dict.footer.privacy}</Link>
            <Link href="/terms">{dict.footer.terms}</Link>
            <Link href="/partners/terms">{dict.footer.partnerTerms}</Link>
            <Link href="/refund">{dict.footer.refund}</Link>
            <Link href="/kyc">{dict.footer.kyc}</Link>
            <Link href="/cookie-policy">{dict.footer.cookies}</Link>
          </nav>
        </div>
      </div>
      <div className="footer-bottom">
        © {year} NoorLink.co. {dict.footer.rights}
      </div>
    </footer>
  );
}
