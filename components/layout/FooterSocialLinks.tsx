import { SOCIAL_FOOTER_PROFILES } from "@/lib/social-hub";

function InstagramIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" aria-hidden="true" role="img">
      <defs>
        <linearGradient id="footer-ig-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FD5949" />
          <stop offset="45%" stopColor="#D6249F" />
          <stop offset="100%" stopColor="#285AEB" />
        </linearGradient>
      </defs>
      <rect width="36" height="36" rx="9" fill="url(#footer-ig-gradient)" />
      <rect
        x="9.5"
        y="9.5"
        width="17"
        height="17"
        rx="5"
        fill="none"
        stroke="#fff"
        strokeWidth="2"
      />
      <circle cx="18" cy="18" r="4.2" fill="none" stroke="#fff" strokeWidth="2" />
      <circle cx="24.2" cy="11.8" r="1.35" fill="#fff" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" aria-hidden="true" role="img">
      <rect width="36" height="36" rx="9" fill="#1877F2" />
      <path
        fill="#fff"
        d="M20.2 9.5h3.1c0 1.9-.1 3.8-.1 5.7h3.4l-.3 4.1h-3.1v12.2h-5.1V19.3h-2.4v-4.1h2.4v-2.4c0-2.5 1.2-4.3 4.1-4.3.9 0 2 .1 2.7.3V9.5Z"
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
        {SOCIAL_FOOTER_PROFILES.map(({ href, label, network }) => {
          const Icon = ICONS[network];
          return (
            <a
              key={href}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              title={label}
              className="footer-social__link footer-social__link--brand"
            >
              <Icon />
            </a>
          );
        })}
      </div>
    </nav>
  );
}
