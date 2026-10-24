"use client";

import Link from "next/link";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { localizedPath } from "@/lib/i18n/path";
import { useLocaleState } from "@/lib/i18n/use-locale";

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
  const [locale] = useLocaleState();
  const g = getDictionary(locale).successPage.giftEsim;

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

  const giftHref = `${localizedPath("/gift", locale)}?${giftParams.toString()}`;

  return (
    <div className="loyalty-card card-gift-esim">
      <p className="gift-esim-kicker">{g.kicker}</p>
      <h2 className="gift-esim-title">{g.title}</h2>
      <p className="gift-esim-copy">{g.copy}</p>
      {canGift ? (
        <Link href={giftHref} className="btn-nav btn-nav--accent gift-esim-cta">
          {g.cta}
        </Link>
      ) : (
        <p className="gift-note">{g.waiting}</p>
      )}
    </div>
  );
}
