"use client";

import { FormEvent, useState } from "react";
import { subscribeInsider } from "@/lib/newsletter-api";

type Props = {
  variant?: "page" | "inline";
};

export function InsiderSignupForm({ variant = "page" }: Props) {
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
      setMessage(
        result.message ??
          "You’re on the Insider list. Monthly guides and timed deals — no spam.",
      );
      setEmail("");
      setDestination("");
      return;
    }

    setStatus("error");
    setMessage(result.error ?? "Could not join right now. Try again shortly.");
  }

  return (
    <form
      className={`insider-signup insider-signup--${variant}`}
      onSubmit={(event) => void handleSubmit(event)}
    >
      <div className="insider-signup__fields">
        <label className="sr-only" htmlFor={`insider-email-${variant}`}>
          Email
        </label>
        <input
          id={`insider-email-${variant}`}
          type="email"
          required
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <label className="sr-only" htmlFor={`insider-dest-${variant}`}>
          Next trip
        </label>
        <select
          id={`insider-dest-${variant}`}
          value={destination}
          onChange={(event) => setDestination(event.target.value)}
        >
          <option value="">Next trip (optional)</option>
          <option value="Umrah">Umrah / Hajj</option>
          <option value="Europe">Europe</option>
          <option value="Asia">Asia</option>
          <option value="Americas">Americas</option>
        </select>
        <button type="submit" disabled={status === "sending"}>
          {status === "sending" ? "Joining…" : "Join Insider"}
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
        One email a month. Unsubscribe anytime.
      </p>
    </form>
  );
}
