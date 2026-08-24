export function TrustRatingBadge() {
  return (
    <div className="v2-trust-rating" aria-label="Customer satisfaction">
      <span className="v2-trust-rating__stars" aria-hidden="true">
        ★★★★★
      </span>
      <span className="v2-trust-rating__score">4.8</span>
      <span className="v2-trust-rating__label">Pilgrim-trusted support</span>
      <span className="v2-trust-rating__badge">Money-back guarantee</span>
    </div>
  );
}
