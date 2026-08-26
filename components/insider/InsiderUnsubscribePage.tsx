"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { unsubscribeInsider } from "@/lib/newsletter-api";

export function InsiderUnsubscribePage() {
  const searchParams = useSearchParams();
  const [email, setEmail] = useState(searchParams.get("email") ?? "");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setMessage(null);

    const result = await unsubscribeInsider(email.trim());
    if (result.success) {
      setStatus("sent");
      setMessage(
        result.message ?? "You’re unsubscribed from NoorLink Insider.",
      );
      return;
    }

    setStatus("error");
    setMessage(result.error ?? "Could not unsubscribe right now.");
  }

  return (
    <>
      <SiteHeader />
      <Breadcrumbs
        items={[
          { href: "/", label: "Home" },
          { href: "/newsletter", label: "Insider" },
          { label: "Unsubscribe" },
        ]}
      />
      <main className="insider-page">
        <div className="insider-shell insider-unsub">
          <p className="insider-kicker">NoorLink Insider</p>
          <h1>Unsubscribe</h1>
          <p className="insider-unsub__lead">
            Leave the monthly Insider list anytime. You can still browse
            destinations and plans on the site.
          </p>

          {status === "sent" ? (
            <div className="insider-unsub__done" role="status">
              <p>{message}</p>
              <div className="insider-deal__actions">
                <Link href="/newsletter" className="insider-btn">
                  Back to Insider
                </Link>
                <Link
                  href="/destinations"
                  className="insider-btn insider-btn--ghost"
                >
                  Browse destinations
                </Link>
              </div>
            </div>
          ) : (
            <form
              className="insider-signup insider-signup--page"
              onSubmit={(event) => void handleSubmit(event)}
            >
              <div className="insider-signup__fields">
                <label className="sr-only" htmlFor="insider-unsub-email">
                  Email
                </label>
                <input
                  id="insider-unsub-email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
                <button type="submit" disabled={status === "sending"}>
                  {status === "sending" ? "Removing…" : "Unsubscribe"}
                </button>
              </div>
              {message && (
                <p
                  className={`insider-signup__status${
                    status === "error" ? " is-error" : ""
                  }`}
                  role="status"
                >
                  {message}
                </p>
              )}
            </form>
          )}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
