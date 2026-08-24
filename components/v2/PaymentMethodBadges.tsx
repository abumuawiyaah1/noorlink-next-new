export function PaymentMethodBadges() {
  return (
    <div className="v2-payment-badges" aria-label="Accepted payment methods">
      <span className="v2-payment-badges__item v2-payment-badges__item--apple"> Apple Pay</span>
      <span className="v2-payment-badges__item v2-payment-badges__item--google"> Google Pay</span>
      <span className="v2-payment-badges__item"> Visa</span>
      <span className="v2-payment-badges__item"> Mastercard</span>
      <span className="v2-payment-badges__note">via secure Stripe checkout</span>
    </div>
  );
}
