"use client";

type PortalMode = "apply" | "login";

function openPortal(mode: PortalMode) {
  const hash = mode === "login" ? "#login" : "#apply";
  if (window.location.hash !== hash) {
    window.location.hash = hash;
  } else {
    window.dispatchEvent(new HashChangeEvent("hashchange"));
  }
  document.getElementById("partner-portal")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function PartnersHeroActions() {
  return (
    <div className="partners-hero__actions">
      <button type="button" className="content-button content-button--accent" onClick={() => openPortal("apply")}>
        Apply to partner
      </button>
      <button type="button" className="content-button partners-hero__signin" onClick={() => openPortal("login")}>
        Sign in to your account
      </button>
    </div>
  );
}
