import { Facebook, Instagram } from "lucide-react";

const SOCIAL_LINKS = [
  {
    href: "https://www.instagram.com/noorlinkesim/",
    label: "NoorLink on Instagram",
    shortLabel: "Instagram",
    Icon: Instagram,
  },
  {
    href: "https://www.facebook.com/profile.php?id=61593708492331",
    label: "NoorLink on Facebook",
    shortLabel: "Facebook",
    Icon: Facebook,
  },
] as const;

export function FooterSocialLinks() {
  return (
    <nav className="footer-social" aria-label="Social">
      <span className="footer-social__label">Follow us</span>
      <div className="footer-social__links">
        {SOCIAL_LINKS.map(({ href, label, shortLabel, Icon }) => (
          <a
            key={href}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            title={label}
            className="footer-social__link"
          >
            <Icon size={20} strokeWidth={2.25} aria-hidden="true" />
            <span>{shortLabel}</span>
          </a>
        ))}
      </div>
    </nav>
  );
}
