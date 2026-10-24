"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { unsubscribeInsider } from "@/lib/newsletter-api";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { localizedPath } from "@/lib/i18n/path";
import { useLocaleState } from "@/lib/i18n/use-locale";

export function InsiderUnsubscribePage() {
  const [locale] = useLocaleState();
  const dict = getDictionary(locale);
  const u = dict.unsubscribePage;
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
      setMessage(result.message ?? u.successDefault);
      return;
    }

    setStatus("error");
    setMessage(result.error ?? u.errorDefault);
  }

  return (
    <>
      <SiteHeader />
      <Breadcrumbs
        items={[
          { href: localizedPath("/", locale), label: dict.common.home },
          {
            href: localizedPath("/newsletter", locale),
            label: u.insiderCrumb,
          },
          { label: u.crumb },
        ]}
      />
      <main className="insider-page">
        <div className="insider-shell insider-unsub">
          <p className="insider-kicker">{u.kicker}</p>
          <h1>{u.title}</h1>
          <p className="insider-unsub__lead">{u.lede}</p>

          {status === "sent" ? (
            <div className="insider-unsub__done" role="status">
              <p>{message}</p>
              <div className="insider-deal__actions">
                <Link
                  href={localizedPath("/newsletter", locale)}
                  className="insider-btn"
                >
                  {u.backToInsider}
                </Link>
                <Link
                  href={localizedPath("/destinations", locale)}
                  className="insider-btn insider-btn--ghost"
                >
                  {u.browseDestinations}
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
                  {u.emailLabel}
                </label>
                <input
                  id="insider-unsub-email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder={u.emailPlaceholder}
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
                <button type="submit" disabled={status === "sending"}>
                  {status === "sending" ? u.submitting : u.submit}
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
