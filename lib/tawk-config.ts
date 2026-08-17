/** NoorLink × Tawk.to — public embed IDs from the Tawk dashboard. */
export const TAWK_PROPERTY_ID = "6a83989070b1101d482a0b50";
export const TAWK_WIDGET_ID = "1k090nthp";

export const TAWK_EMBED_URL = `https://embed.tawk.to/${TAWK_PROPERTY_ID}/${TAWK_WIDGET_ID}`;

/** Override via env if you rotate widgets without redeploying constants. */
export function getTawkEmbedUrl(): string {
  const propertyId =
    process.env.NEXT_PUBLIC_TAWK_PROPERTY_ID?.trim() || TAWK_PROPERTY_ID;
  const widgetId =
    process.env.NEXT_PUBLIC_TAWK_WIDGET_ID?.trim() || TAWK_WIDGET_ID;
  return `https://embed.tawk.to/${propertyId}/${widgetId}`;
}

export function isTawkEnabled(): boolean {
  return Boolean(getTawkEmbedUrl());
}
