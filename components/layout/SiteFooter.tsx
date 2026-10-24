"use client";

import Link from "next/link";
import { FooterSocialLinks } from "@/components/layout/FooterSocialLinks";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { useLocaleState } from "@/lib/i18n/use-locale";
import { SUPPORT_EMAIL } from "@/lib/support-contact";

export function SiteFooter() {
  const [locale] = useLocaleState();
  const dict = getDictionary(locale);

  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <Link href="/" className="site-footer__brand">
          Noor<span style={{ color: "var(--accent)" }}>Link</span>
        </Link>
        <nav className="site-footer__links" aria-label={dict.footer.company}>
          <Link href="/destinations">{dict.footer.destinations}</Link>
          <Link href="/learn">{dict.footer.learn}</Link>
          <Link href="/faq">{dict.footer.faq}</Link>
          <Link href="/support">{dict.footer.support}</Link>
          <Link href="/partners#apply">{dict.footer.partners}</Link>
          <Link href="/review">{dict.footer.reviews}</Link>
          <Link href="/privacy">{dict.footer.privacy}</Link>
          <Link href="/terms">{dict.footer.terms}</Link>
          <Link href="/refund">{dict.footer.refund}</Link>
          <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>
        </nav>
        <div className="site-footer__meta">
          <FooterSocialLinks
            followLabel={dict.footer.followUs}
            socialAria={dict.footer.socialAria}
          />
          <span className="site-footer__copy">
            © {new Date().getFullYear()} NoorLink
          </span>
        </div>
      </div>
    </footer>
  );
}
