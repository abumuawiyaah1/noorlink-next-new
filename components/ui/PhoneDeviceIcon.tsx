type Props = {
  className?: string;
};

export function PhoneDeviceIcon({ className }: Props) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 96"
      fill="none"
      aria-hidden="true"
      role="img"
    >
      <defs>
        <linearGradient id="phone-body" x1="32" y1="4" x2="32" y2="92" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0F3D3E" />
          <stop offset="1" stopColor="#05191A" />
        </linearGradient>
        <linearGradient id="phone-screen" x1="32" y1="14" x2="32" y2="78" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F8FAFC" />
          <stop offset="1" stopColor="#E2E8F0" />
        </linearGradient>
      </defs>
      <rect x="10" y="4" width="44" height="88" rx="10" fill="url(#phone-body)" />
      <rect x="12.5" y="6.5" width="39" height="83" rx="8.5" stroke="#FF9500" strokeOpacity="0.35" />
      <rect x="16" y="14" width="32" height="64" rx="4" fill="url(#phone-screen)" />
      <rect x="24" y="9" width="16" height="3.5" rx="1.75" fill="#05191A" fillOpacity="0.55" />
      <circle cx="32" cy="11.8" r="0.9" fill="#94A3B8" />
      <rect x="27" y="82" width="10" height="2.2" rx="1.1" fill="#FF9500" fillOpacity="0.85" />
      <rect x="22" y="24" width="20" height="3" rx="1.5" fill="#0F3D3E" fillOpacity="0.18" />
      <rect x="22" y="31" width="16" height="2.4" rx="1.2" fill="#0F3D3E" fillOpacity="0.12" />
      <rect x="22" y="37" width="18" height="2.4" rx="1.2" fill="#0F3D3E" fillOpacity="0.12" />
      <circle cx="48" cy="58" r="7" fill="#FF9500" fillOpacity="0.18" />
      <path
        d="M44.5 58h7M48 54.5v7"
        stroke="#FF9500"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}
