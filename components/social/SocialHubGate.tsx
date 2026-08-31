"use client";

import { useCallback, useEffect, useState } from "react";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SocialHubLogin } from "@/components/social/SocialHubLogin";
import { SocialHubPage } from "@/components/social/SocialHubPage";

export function SocialHubGate() {
  const [ready, setReady] = useState(false);
  const [authed, setAuthed] = useState(false);

  const checkSession = useCallback(async () => {
    try {
      const response = await fetch("/api/social/auth/login", {
        credentials: "same-origin",
      });
      setAuthed(response.ok);
    } catch {
      setAuthed(false);
    } finally {
      setReady(true);
    }
  }, []);

  useEffect(() => {
    void checkSession();
  }, [checkSession]);

  async function handleLogout() {
    await fetch("/api/social/auth/logout", {
      method: "POST",
      credentials: "same-origin",
    });
    setAuthed(false);
  }

  if (!ready) {
    return (
      <>
        <SiteHeader />
        <main className="content-page social-hub-page">
          <p className="social-hub-muted content-shell">Loading…</p>
        </main>
        <SiteFooter />
      </>
    );
  }

  if (!authed) {
    return (
      <>
        <SiteHeader />
        <SocialHubLogin onSuccess={() => void checkSession()} />
        <SiteFooter />
      </>
    );
  }

  return (
    <>
      <SiteHeader />
      <SocialHubPage onLogout={() => void handleLogout()} />
      <SiteFooter />
    </>
  );
}
