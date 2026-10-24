"use client";

import { FormEvent, useState } from "react";
import { subscribeInsider } from "@/lib/newsletter-api";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { localizedPath } from "@/lib/i18n/path";
import { useLocaleState } from "@/lib/i18n/use-locale";

type Props = {
  variant?: "page" | "inline";
};

export function InsiderSignupForm({ variant = "page" }: Props) {
  const [locale] = useLocaleState();
  const n = getDictionary(locale).newsletterPage;
  const [email, setEmail] = useState("");
  const [destination, setDestination] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setMessage(null);

    const result = await subscribeInsider({
      email: email.trim(),
      dreamDestination: destination || undefined,
    });

    if (result.success) {
      setStatus("sent");
      setMessage(result.message ?? n.signupSuccess);
      setEmail("");
      setDestination("");
      return;
    }

    setStatus("error");
    setMessage(result.error ?? n.signupError);
  }

  return (
    <form
      className={`insider-signup insider-signup--${variant}`}
      onSubmit={(event) => void handleSubmit(event)}
    >
      <div className="insider-signup__fields">
        <label className="sr-only" htmlFor={`insider-email-${variant}`}>
          {n.signupEmailLabel}
        </label>
        <input
          id={`insider-email-${variant}`}
          type="email"
          required
          autoComplete="email"
          placeholder={n.signupEmailPlaceholder}
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <label className="sr-only" htmlFor={`insider-dest-${variant}`}>
          {n.signupTripLabel}
        </label>
        <select
          id={`insider-dest-${variant}`}
          value={destination}
          onChange={(event) => setDestination(event.target.value)}
        >
          <option value="">{n.signupTripOptional}</option>
          <option value="Umrah">{n.signupUmrah}</option>
          <option value="Hajj">{n.signupHajj}</option>
          <option value="Europe">{n.signupEurope}</option>
          <option value="Asia">{n.signupAsia}</option>
          <option value="Americas">{n.signupAmericas}</option>
        </select>
        <button type="submit" disabled={status === "sending"}>
          {status === "sending" ? n.signupJoining : n.signupJoin}
        </button>
      </div>
      {message && (
        <p
          className={`insider-signup__status${status === "error" ? " is-error" : ""}`}
          role="status"
        >
          {message}
        </p>
      )}
      <p className="insider-signup__privacy">
        {n.signupPrivacy}{" "}
        <a href={localizedPath("/unsubscribe", locale)}>{n.signupUnsubscribe}</a>{" "}
        {n.signupAnytime}
      </p>
    </form>
  );
}
