"use client";

import { ModernDestinationsPage } from "@/components/destinations/ModernDestinationsPage";
import type { DestinationPriceMap } from "@/lib/destination-prices";

type Props = {
  prices?: DestinationPriceMap;
};

export function DestinationsPage({ prices }: Props) {
  return <ModernDestinationsPage prices={prices} />;
}
