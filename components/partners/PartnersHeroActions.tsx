"use client";

import { getDictionary } from "@/lib/i18n/dictionaries";
import { useLocaleState } from "@/lib/i18n/use-locale";

type PortalMode = "apply" | "login";

function openPortal(mode: PortalMode) {
  const hash = mode === "login" ? "#login" : "#apply";
  if (window.location.hash !== hash) {
    window.location.hash = hash;
  } else {
    window.dispatchEvent(new HashChangeEvent("hashchange"));
  }
  document
    .getElementById("partner-portal")
    ?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function PartnersHeroActions() {
  const [locale] = useLocaleState();
  const p = getDictionary(locale).partnersPage;

  return (
    <div className="partners-hero__actions">
      <button
        type="button"
        className="content-button content-button--accent"
        onClick={() => openPortal("apply")}
      >
        {p.applyCta}
      </button>
      <button
        type="button"
        className="content-button partners-hero__signin"
        onClick={() => openPortal("login")}
      >
        {p.signInCta}
      </button>
    </div>
  );
}
