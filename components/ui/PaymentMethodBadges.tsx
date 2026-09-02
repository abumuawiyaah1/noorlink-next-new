const METHODS = [
  { id: "visa", label: "Visa", src: "/images/payments/visa.svg" },
  { id: "mastercard", label: "Mastercard", src: "/images/payments/mastercard.svg" },
  { id: "amex", label: "American Express", src: "/images/payments/amex.svg" },
  { id: "paypal", label: "PayPal", src: "/images/payments/paypal.svg" },
  { id: "apple-pay", label: "Apple Pay", src: "/images/payments/apple-pay.svg" },
] as const;

type Props = {
  className?: string;
};

export function PaymentMethodBadges({ className = "home-pay-badges" }: Props) {
  return (
    <div className={className} aria-label="Payment methods">
      {METHODS.map(({ id, label, src }) => (
        <span key={id} className="payment-badge" title={label}>
          <img
            className="payment-badge__image"
            src={src}
            alt={label}
            width={60}
            height={38}
            loading="lazy"
            decoding="async"
          />
        </span>
      ))}
    </div>
  );
}
