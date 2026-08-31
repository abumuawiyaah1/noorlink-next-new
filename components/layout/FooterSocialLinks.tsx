import { SOCIAL_FOOTER_PROFILES } from "@/lib/social-hub";

function InstagramIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
      <circle cx="17.5" cy="6.5" r="1.25" fill="currentColor" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M14 8.5h2.5l-.5 3H14v9h-3.5v-9H9v-3h1.5V7.2c0-2.4 1.4-3.7 3.6-3.7.9 0 1.8.1 2.4.2V6.5H15c-.8 0-1 .4-1 1v1Z"
        fill="currentColor"
      />
    </svg>
  );
}

const ICONS = {
  instagram: InstagramIcon,
  facebook: FacebookIcon,
} as const;

export function FooterSocialLinks() {
  return (
    <nav className="footer-social" aria-label="Social">
      <span className="footer-social__label">Follow us</span>
      <div className="footer-social__links">
        {SOCIAL_FOOTER_PROFILES.map(({ href, label, shortLabel, network }) => {
          const Icon = ICONS[network];
          return (
            <a
              key={href}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              title={label}
              className="footer-social__link"
            >
              <Icon />
              <span>{shortLabel}</span>
            </a>
          );
        })}
      </div>
    </nav>
  );
}
