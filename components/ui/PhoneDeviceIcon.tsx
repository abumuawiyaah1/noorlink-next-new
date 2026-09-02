type Props = {
  className?: string;
};

export function PhoneDeviceIcon({ className }: Props) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      role="img"
    >
      <rect
        x="7"
        y="2.5"
        width="10"
        height="19"
        rx="2.2"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <circle cx="12" cy="18.5" r="1" fill="currentColor" />
      <path
        d="M10 5.5h4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}
