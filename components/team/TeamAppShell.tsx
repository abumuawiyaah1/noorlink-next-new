"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { TEAM_NAV } from "@/lib/team-nav";
import "@/styles/team-dashboard.css";

type TeamAppShellProps = {
  title: string;
  children: React.ReactNode;
};

export function TeamAppShell({ title, children }: TeamAppShellProps) {
  const pathname = usePathname();
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function check() {
      try {
        const res = await fetch("/api/social/auth/login", { method: "GET" });
        if (!cancelled) setAuthed(res.ok);
      } catch {
        if (!cancelled) setAuthed(false);
      }
    }
    void check();
    return () => {
      cancelled = true;
    };
  }, []);

  async function handleLogin(event: React.FormEvent) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/social/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const body = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setError(body.error ?? "Could not sign in.");
        setAuthed(false);
        return;
      }
      setAuthed(true);
      setPassword("");
    } catch {
      setError("Could not reach the login service.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleLogout() {
    await fetch("/api/social/auth/logout", { method: "POST" });
    setAuthed(false);
  }

  if (authed === null) {
    return (
      <div className="team-app team-app--centered">
        <p className="team-app__loading">Loading team tools…</p>
      </div>
    );
  }

  if (!authed) {
    return (
      <div className="team-app team-app--centered">
        <div className="team-login">
          <p className="team-login__kicker">NoorLink team</p>
          <h1>Sign in</h1>
          <p className="team-login__lead">
            Same team password as the social toolkit. Used to protect outreach
            notes and creator DMs.
          </p>
          <form className="team-login__form" onSubmit={(e) => void handleLogin(e)}>
            <label htmlFor="team-password">Password</label>
            <input
              id="team-password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
            {error ? <p className="team-login__error">{error}</p> : null}
            <button type="submit" disabled={submitting}>
              {submitting ? "Signing in…" : "Sign in"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="team-app">
      <header className="team-app__header">
        <div className="team-app__brand">
          <span className="team-app__wordmark">
            <span className="team-app__wordmark-noor">Noor</span>
            <span className="team-app__wordmark-link">Link</span>
          </span>
          <span className="team-app__badge">Team</span>
          <span className="team-app__badge">{title}</span>
        </div>
        <button type="button" className="team-app__signout" onClick={() => void handleLogout()}>
          Sign out
        </button>
      </header>
      <div className="team-app__body">
        <nav className="team-app__nav" aria-label="Team tools">
          <p className="team-app__nav-label">Tools</p>
          <ul>
            {TEAM_NAV.map((item) => {
              const active = item.exact
                ? pathname === item.href
                : pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`team-app__nav-link${active ? " team-app__nav-link--active" : ""}`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
            <li>
              <a
                href="https://api.noorlink.co/admin/social-media"
                className="team-app__nav-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                Social media ↗
              </a>
            </li>
          </ul>
        </nav>
        <main className="team-app__main">{children}</main>
      </div>
    </div>
  );
}
