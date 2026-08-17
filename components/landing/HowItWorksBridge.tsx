"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const OPEN_CHECKER_EVENT = "noorlink:open-device-checker";

/**
 * Makes How It Works step cards actionable:
 * 1. Verify & Buy  → scroll to device checker + open picker
 * 2. Get Your Plan → /plans
 * 3. Scan & Connect → /dashboard
 */
export function HowItWorksBridge() {
  const router = useRouter();

  useEffect(() => {
    function onClick(event: MouseEvent) {
      const target = event.target as Element | null;
      const card = target?.closest?.("[data-how-step]") as HTMLElement | null;
      if (!card) return;

      const step = card.getAttribute("data-how-step");
      if (!step) return;

      event.preventDefault();

      if (step === "1") {
        const checker = document.getElementById("device-checker");
        checker?.scrollIntoView({ behavior: "smooth", block: "start" });
        window.setTimeout(() => {
          window.dispatchEvent(new CustomEvent(OPEN_CHECKER_EVENT));
          document.getElementById("deviceInput")?.focus();
        }, 350);
        return;
      }

      if (step === "2") {
        router.push("/plans");
        return;
      }

      if (step === "3") {
        router.push("/dashboard");
      }
    }

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [router]);

  return null;
}

export { OPEN_CHECKER_EVENT };
