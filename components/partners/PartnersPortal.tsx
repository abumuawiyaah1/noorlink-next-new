"use client";

import { useEffect, useState } from "react";
import { PartnerApplicationForm } from "@/components/partners/PartnerApplicationForm";
import { PartnerLoginPanel } from "@/components/partners/PartnerLoginPanel";
import "@/styles/help-pages.css";

type PortalMode = "apply" | "login";

function modeFromHash(): PortalMode {
  if (typeof window === "undefined") return "apply";
  return window.location.hash === "#login" ? "login" : "apply";
}

export function PartnersPortal() {
  const [mode, setMode] = useState<PortalMode>("apply");

  useEffect(() => {
    setMode(modeFromHash());

    function onHashChange() {
      setMode(modeFromHash());
    }

    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  function selectMode(next: PortalMode) {
    setMode(next);
    const hash = next === "login" ? "#login" : "#apply";
    if (window.location.hash !== hash) {
      window.history.replaceState(null, "", hash);
    }
  }

  return (
    <section className="partner-portal" aria-labelledby="partner-portal-heading">
      <div className="partner-portal__intro">
        <h2 id="partner-portal-heading">Apply or sign in</h2>
      </div>

      <div className="partner-portal__tabs" role="tablist" aria-label="Partner options">
        <button
          type="button"
          role="tab"
          id="partner-tab-apply"
          aria-selected={mode === "apply"}
          aria-controls="partner-panel-apply"
          className={mode === "apply" ? "is-active" : undefined}
          onClick={() => selectMode("apply")}
        >
          Apply
        </button>
        <button
          type="button"
          role="tab"
          id="partner-tab-login"
          aria-selected={mode === "login"}
          aria-controls="partner-panel-login"
          className={mode === "login" ? "is-active" : undefined}
          onClick={() => selectMode("login")}
        >
          Sign in to your account
        </button>
      </div>

      <div
        id="apply"
        role="tabpanel"
        aria-labelledby="partner-tab-apply"
        hidden={mode !== "apply"}
        className="partner-portal__panel-wrap"
      >
        <PartnerApplicationForm />
      </div>

      <div
        id="login"
        role="tabpanel"
        aria-labelledby="partner-tab-login"
        hidden={mode !== "login"}
        className="partner-portal__panel-wrap"
      >
        <PartnerLoginPanel />
      </div>
    </section>
  );
}
