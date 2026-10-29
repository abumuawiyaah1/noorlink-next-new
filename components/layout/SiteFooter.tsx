"use client";

import Link from "next/link";
import { FooterSocialLinks } from "@/components/layout/FooterSocialLinks";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { localizedPath } from "@/lib/i18n/path";
import { useLocaleState } from "@/lib/i18n/use-locale";
import { SUPPORT_EMAIL } from "@/lib/support-contact";

export function SiteFooter() {
  const [locale] = useLocaleState();
  const dict = getDictionary(locale);

  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <Link href={localizedPath("/", locale)} className="site-footer__brand">
          Noor<span style={{ color: "var(--accent)" }}>Link</span>
        </Link>
        <nav className="site-footer__links" aria-label={dict.footer.company}>
          <Link href={localizedPath("/destinations", locale)}>
            {dict.footer.destinations}
          </Link>
          <Link href={localizedPath("/esim", locale)}>{dict.footer.esimGuides}</Link>
          <Link href={localizedPath("/learn", locale)}>{dict.footer.learn}</Link>
          <Link href={localizedPath("/faq", locale)}>{dict.footer.faq}</Link>
          <Link href={localizedPath("/support", locale)}>{dict.footer.support}</Link>
          <Link href={localizedPath("/partners#apply", locale)}>
            {dict.footer.partners}
          </Link>
          <Link href={localizedPath("/review", locale)}>{dict.footer.reviews}</Link>
          <Link href={localizedPath("/privacy", locale)}>{dict.footer.privacy}</Link>
          <Link href={localizedPath("/terms", locale)}>{dict.footer.terms}</Link>
          <Link href={localizedPath("/refund", locale)}>{dict.footer.refund}</Link>
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
