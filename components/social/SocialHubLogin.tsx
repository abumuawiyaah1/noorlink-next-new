"use client";

import { useState } from "react";

type SocialHubLoginProps = {
  onSuccess: () => void;
};

export function SocialHubLogin({ onSuccess }: SocialHubLoginProps) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/social/auth/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ password }),
        credentials: "same-origin",
      });
      const data = (await response.json()) as { error?: string };
      if (!response.ok) {
        setError(data.error ?? "Could not sign in.");
        return;
      }
      setPassword("");
      onSuccess();
    } catch {
      setError("Network error. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="content-page social-hub-page">
      <section className="content-hero content-hero--compact">
        <div className="content-hero__inner">
          <span className="content-kicker">NoorLink team</span>
          <h1>Social toolkit</h1>
          <p>Sign in to open the media library and posting resources.</p>
        </div>
      </section>
      <div className="content-shell">
        <form className="social-hub-login" onSubmit={(event) => void handleSubmit(event)}>
          <label htmlFor="social-hub-password">Team password</label>
          <input
            id="social-hub-password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
          {error ? <p className="social-hub-login__error">{error}</p> : null}
          <button type="submit" disabled={loading}>
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </main>
  );
}
