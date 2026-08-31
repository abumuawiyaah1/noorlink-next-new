import Link from "next/link";
import { FooterSocialLinks } from "@/components/layout/FooterSocialLinks";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <Link href="/" className="site-footer__brand">
          Noor<span style={{ color: "var(--accent)" }}>Link</span>
        </Link>
        <nav className="site-footer__links" aria-label="Footer">
          <Link href="/destinations">Destinations</Link>
          <Link href="/faq">FAQ</Link>
          <Link href="/support">Support</Link>
          <Link href="/partners#apply">Partners</Link>
          <Link href="/review">Reviews</Link>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
          <Link href="/refund">Refunds</Link>
        </nav>
        <div className="site-footer__meta">
          <FooterSocialLinks />
          <span className="site-footer__copy">© {new Date().getFullYear()} NoorLink</span>
        </div>
      </div>
    </footer>
  );
}
