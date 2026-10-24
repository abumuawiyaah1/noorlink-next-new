"use client";

import { FormEvent, useState } from "react";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { useLocaleState } from "@/lib/i18n/use-locale";
import { subscribeInsider } from "@/lib/newsletter-api";

export function HomeNewsletter() {
  const [locale] = useLocaleState();
  const dict = getDictionary(locale);
  const n = dict.newsletter;
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
        result.message ?? n.success,
      );
      setEmail("");
      setDestination("");
      return;
    }

    setStatus("error");
    setMessage(result.error ?? n.error);
  }

  return (
    <section className="newsletter-section">
      <div className="container">
        <div className="newsletter-box">
          <div className="news-text">
            <div className="news-kicker">{n.kicker}</div>
            <h2>{n.title}</h2>
            <p>{n.lede}</p>
            <div className="news-perks">
              <div className="perk">
                <i className="fas fa-check-circle" aria-hidden="true" />
                {n.perk1}
              </div>
              <div className="perk">
                <i className="fas fa-check-circle" aria-hidden="true" />
                {n.perk2}
              </div>
              <div className="perk">
                <i className="fas fa-check-circle" aria-hidden="true" />
                {n.perk3}
              </div>
            </div>
          </div>
          <div className="news-form">
            <form onSubmit={(event) => void handleSubmit(event)}>
              <div className="news-input-group">
                <label className="news-label" htmlFor="insider-email">
                  {n.emailLabel}
                </label>
                <input
                  id="insider-email"
                  type="email"
                  className="news-input"
                  placeholder={n.emailPlaceholder}
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>
              <div className="news-input-group">
                <label className="news-label" htmlFor="dreamDest">
                  {n.tripLabel}
                </label>
                <select
                  id="dreamDest"
                  className="news-input"
                  value={destination}
                  onChange={(event) => setDestination(event.target.value)}
                >
                  <option value="">{n.tripSelect}</option>
                  <option value="Umrah">{n.tripUmrah}</option>
                  <option value="Europe">{n.tripEurope}</option>
                  <option value="Asia">{n.tripAsia}</option>
                  <option value="Americas">{n.tripAmericas}</option>
                </select>
              </div>
              <button
                type="submit"
                className="news-btn"
                disabled={status === "sending"}
              >
                {status === "sending" ? n.joining : n.join}
                <i className="fas fa-arrow-right" aria-hidden="true" />
              </button>
              {message && (
                <p
                  className={`news-status${status === "error" ? " is-error" : ""}`}
                  role="status"
                >
                  {message}
                </p>
              )}
              <p className="news-privacy">
                {n.privacy}{" "}
                <a href="/unsubscribe">{n.unsubscribe}</a> {n.anytime}
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
