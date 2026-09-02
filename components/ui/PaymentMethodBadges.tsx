type IconProps = {
  className?: string;
};

function VisaIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 48 32" aria-hidden="true" role="img">
      <rect width="48" height="32" rx="4" fill="#fff" />
      <path
        fill="#1A1F71"
        d="M20.2 20.5h-2.9l1.8-11h2.9l-1.8 11Zm11.4-10.7c-.6-.2-1.5-.5-2.6-.5-2.9 0-4.9 1.5-4.9 3.7 0 1.6 1.5 2.5 2.6 3 1.1.5 1.5.9 1.5 1.3 0 .7-1 .9-1.5.9-1 0-1.6-.1-2.4-.5l-.3-.2-.4 2.2c.6.3 1.8.5 3 .5 3.1 0 5.1-1.5 5.1-3.8 0-1.3-.8-2.2-2.5-3-1-.5-1.6-.8-1.6-1.3 0-.4.5-.9 1.5-.9.9 0 1.5.2 2 .4l.2.1.4-2.1ZM37 20.5h2.7l-2.3-11h-2.5c-.8 0-1.4.2-1.7 1l-4.9 10h3.1l.7-1.9h3.8l.4 1.9Zm-3.3-4.2 1.6-4.3.9 4.3h-2.5ZM18.2 9.5l-2.8 11h-2.8l2.8-11h2.8Z"
      />
    </svg>
  );
}

function MastercardIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 48 32" aria-hidden="true" role="img">
      <rect width="48" height="32" rx="4" fill="#fff" />
      <circle cx="19" cy="16" r="7" fill="#EB001B" />
      <circle cx="29" cy="16" r="7" fill="#F79E1B" fillOpacity="0.95" />
    </svg>
  );
}

function AmexIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 48 32" aria-hidden="true" role="img">
      <rect width="48" height="32" rx="4" fill="#2E77BC" />
      <path
        fill="#fff"
        d="M10.5 21.5 13 11h2.6l2.5 10.5h-2.4l-.4-1.7h-2.8l-.4 1.7H9.8Zm4.2-3.8-1-4.2-1 4.2h2Zm5.1 3.8V11h4.1c2.2 0 3.6 1.1 3.6 2.9 0 1.5-1 2.4-2.5 2.7l2.9 4.9h-2.7l-2.7-4.6h-1.2v4.6H19.8Zm2.2-6.4h1.5c.9 0 1.4-.4 1.4-1.1 0-.7-.5-1.1-1.4-1.1h-1.5v2.2Zm7.5 6.4 2.5-10.5h2.4l2.5 10.5h-2.3l-.4-1.7h-2.8l-.4 1.7h-2.5Zm4.2-3.8-1-4.2-1 4.2h2Z"
      />
    </svg>
  );
}

function PayPalIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 48 32" aria-hidden="true" role="img">
      <rect width="48" height="32" rx="4" fill="#fff" />
      <path
        fill="#00457C"
        d="M17.8 9.5c2.4 0 4.1 1.3 3.8 3.9-.3 2.8-2.5 4.4-5.6 4.4h-1.5l-.6 3.7h-2.4l1.5-9.3c.1-.5.5-.7 1-.7h1.8Zm-.5 6c1.8 0 2.9-.9 3.1-2.6.2-1.4-.7-2.2-2.2-2.2h-1.3l-.7 4.8h1.1Zm8.8-6h2.2l-.3 1.8h2.1l-.4 2.1h-2.1l-.5 3.2c-.1.7.3 1 .9 1 .3 0 .6 0 .9-.1l-.4 2.1c-.5.1-1 .2-1.6.2-1.7 0-2.5-.9-2.2-2.6l.6-3.8h-1.3l.4-2.1h1.3l.3-1.8Z"
      />
    </svg>
  );
}

function ApplePayIcon({ className }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 48 32" aria-hidden="true" role="img">
      <rect width="48" height="32" rx="4" fill="#fff" />
      <path
        fill="#000"
        d="M14.8 10.2c-.7.8-1.8 1.4-2.9 1.3-.1-1.2.4-2.4 1.1-3.2.7-.9 1.9-1.5 2.8-1.6.1 1.2-.3 2.4-1 3.5Zm.9 1.5c-1.6-.1-3 .9-3.8.9-.8 0-1.9-.8-3.1-.8-1.6 0-3 .9-3.8 2.3-1.6 2.8-.4 7 1.1 9.3.8 1.1 1.7 2.4 2.9 2.3 1.1 0 1.6-.7 3-.7 1.4 0 1.8.7 3 .7 1.2 0 2-1.1 2.7-2.2.9-1.2 1.2-2.4 1.2-2.5-.1 0-2.4-.9-2.4-3.6 0-2.3 1.9-3.4 2-3.5-1.1-1.6-2.8-1.8-3.4-1.8Zm8.7 1.1v11.5h1.8v-3.9h2.6c2.4 0 4.1-1.6 4.1-3.8 0-2.3-1.7-3.8-4.2-3.8h-4.3Zm1.8 1.5h2.2c1.7 0 2.6.8 2.6 2.3s-.9 2.3-2.6 2.3h-2.2v-4.6Z"
      />
    </svg>
  );
}

const METHODS = [
  { id: "visa", label: "Visa", Icon: VisaIcon },
  { id: "mastercard", label: "Mastercard", Icon: MastercardIcon },
  { id: "amex", label: "American Express", Icon: AmexIcon },
  { id: "paypal", label: "PayPal", Icon: PayPalIcon },
  { id: "apple-pay", label: "Apple Pay", Icon: ApplePayIcon },
] as const;

type Props = {
  className?: string;
};

export function PaymentMethodBadges({ className = "home-pay-badges" }: Props) {
  return (
    <div className={className} aria-label="Payment methods">
      {METHODS.map(({ id, label, Icon }) => (
        <span key={id} title={label}>
          <Icon className="payment-badge-icon" />
          <span className="sr-only">{label}</span>
        </span>
      ))}
    </div>
  );
}
