"use client";

import { useEffect } from "react";
import { rememberAttributionFromLocation } from "@/lib/attribution";

/** Captures UTM params + landing path once per session for checkout attribution. */
export function MarketingAttributionCapture() {
  useEffect(() => {
    rememberAttributionFromLocation();
  }, []);
  return null;
}
