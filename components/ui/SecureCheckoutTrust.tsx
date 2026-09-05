const PAYMENT_MARKS: ReadonlyArray<{
  id: string;
  label: string;
  src: string;
  className?: string;
}> = [
  {
    id: "ssl",
    label: "SSL Certificate",
    src: "/images/payments/ssl-certificate.png",
    className: "secure-trust__mark--ssl",
  },
  {
    id: "paypal",
    label: "PayPal",
    src: "/images/payments/paypal-mark.png",
  },
  {
    id: "google-pay",
    label: "Google Pay",
    src: "/images/payments/google-pay.png",
  },
  {
    id: "apple-pay",
    label: "Apple Pay",
    src: "/images/payments/apple-pay-mark.png",
  },
  {
    id: "visa",
    label: "Visa",
    src: "/images/payments/visa-mark.png",
  },
  {
    id: "mastercard",
    label: "Mastercard",
    src: "/images/payments/mastercard-mark.png",
  },
];

type Variant = "card" | "marks";

type Props = {
  variant?: Variant;
  className?: string;
  /** Hide SSL badge in tight rows (footer / pilgrim). */
  showSsl?: boolean;
};

function PaymentMarksRow({
  showSsl = true,
  className = "",
}: {
  showSsl?: boolean;
  className?: string;
}) {
  const marks = showSsl
    ? PAYMENT_MARKS
    : PAYMENT_MARKS.filter((mark) => mark.id !== "ssl");

  return (
    <div className={`secure-trust__marks ${className}`.trim()} aria-label="Payment methods">
      {marks.map((mark) => (
        <span
          key={mark.id}
          className={["secure-trust__mark", mark.className].filter(Boolean).join(" ")}
          title={mark.label}
        >
          <img
            src={mark.src}
            alt={mark.label}
            className="secure-trust__mark-image"
            width={96}
            height={42}
            loading="lazy"
            decoding="async"
          />
        </span>
      ))}
    </div>
  );
}

export function SecureCheckoutTrust({
  variant = "card",
  className = "",
  showSsl = true,
}: Props) {
  if (variant === "marks") {
    return (
      <PaymentMarksRow
        showSsl={showSsl}
        className={`secure-trust--marks ${className}`.trim()}
      />
    );
  }

  return (
    <div
      className={`secure-trust secure-trust--card ${className}`.trim()}
      aria-label="Secure Stripe checkout"
    >
      <div className="secure-trust__accent" aria-hidden="true" />
      <div className="secure-trust__inner">
        <p className="secure-trust__title">
          Secure <span>Stripe</span> Checkout
        </p>
        <div className="secure-trust__mid">
          <span className="secure-trust__stripe">stripe</span>
          <svg
            className="secure-trust__shield"
            viewBox="0 0 72 72"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="secure-trust-shield" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#0F3D3E" />
                <stop offset="100%" stopColor="#165557" />
              </linearGradient>
            </defs>
            <path
              d="M36 6 L58 16 V34 C58 50 48 60 36 66 C24 60 14 50 14 34 V16 Z"
              fill="url(#secure-trust-shield)"
            />
            <path
              d="M36 10 L54 18.5 V34 C54 47 46 55.5 36 60.5 C26 55.5 18 47 18 34 V18.5 Z"
              fill="none"
              stroke="#FF9500"
              strokeWidth="2.5"
            />
            <rect x="28" y="30" width="16" height="14" rx="2.5" fill="#F3F7F7" />
            <path
              d="M31 30 V26.5 C31 23.5 33.2 21.5 36 21.5 C38.8 21.5 41 23.5 41 26.5 V30"
              fill="none"
              stroke="#FF9500"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <circle cx="36" cy="37" r="2.2" fill="#0F3D3E" />
          </svg>
          <span className="secure-trust__paypal">
            <span className="secure-trust__paypal-a">Pay</span>
            <span className="secure-trust__paypal-b">Pal</span>
          </span>
        </div>
        <PaymentMarksRow showSsl={showSsl} />
        <p className="secure-trust__brand">
          <span className="secure-trust__brand-noor">Noor</span>
          <span className="secure-trust__brand-link">Link</span>
        </p>
      </div>
    </div>
  );
}

/** @deprecated Prefer SecureCheckoutTrust — kept as a thin wrapper for older imports. */
export function PaymentMethodBadges({ className = "home-pay-badges" }: { className?: string }) {
  return (
    <SecureCheckoutTrust
      variant="marks"
      showSsl={false}
      className={className}
    />
  );
}
