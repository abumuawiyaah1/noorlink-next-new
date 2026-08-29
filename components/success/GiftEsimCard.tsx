"use client";

import Link from "next/link";

type Props = {
  buyerEmail?: string | null;
  country?: string | null;
  packageId?: string | null;
  plan?: string | null;
  price?: number | null;
  flag?: string | null;
};

export function GiftEsimCard({
  buyerEmail,
  country,
  packageId,
  plan,
  price,
  flag,
}: Props) {
  const canGift = Boolean(
    buyerEmail?.includes("@") && packageId && country && price && price > 0,
  );

  const giftParams = new URLSearchParams();
  if (buyerEmail) giftParams.set("buyerEmail", buyerEmail);
  if (country) giftParams.set("country", country);
  if (packageId) giftParams.set("packageId", packageId);
  if (plan) giftParams.set("plan", plan);
  if (price != null) giftParams.set("price", String(price));
  if (flag) giftParams.set("flag", flag);

  const giftHref = `/gift?${giftParams.toString()}`;

  return (
    <div className="loyalty-card card-gift-esim">
      <p className="gift-esim-kicker">Send a trip gift</p>
      <h2 className="gift-esim-title">Know someone traveling too?</h2>
      <p className="gift-esim-copy">
        Pick a plan, add a short message — they get the eSIM by email, ready to
        install before they fly.
      </p>
      {canGift ? (
        <Link href={giftHref} className="btn-nav btn-nav--accent gift-esim-cta">
          Gift an eSIM
        </Link>
      ) : (
        <p className="gift-note">
          Your gift link will appear once your order details load.
        </p>
      )}
    </div>
  );
}
