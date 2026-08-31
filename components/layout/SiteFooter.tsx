import Link from "next/link";
import { Facebook, Instagram } from "lucide-react";

const SOCIAL_LINKS = [
  {
    href: "https://www.instagram.com/noorlinkesim/",
    label: "NoorLink on Instagram",
    Icon: Instagram,
  },
  {
    href: "https://www.facebook.com/profile.php?id=61593708492331",
    label: "NoorLink on Facebook",
    Icon: Facebook,
  },
] as const;

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
          <nav className="site-footer__social" aria-label="Social">
            {SOCIAL_LINKS.map(({ href, label, Icon }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                title={label}
              >
                <Icon size={18} strokeWidth={2} aria-hidden="true" />
              </a>
            ))}
          </nav>
          <span>© {new Date().getFullYear()} NoorLink</span>
        </div>
      </div>
    </footer>
  );
}
