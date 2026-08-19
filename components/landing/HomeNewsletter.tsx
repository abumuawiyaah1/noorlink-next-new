"use client";

import { FormEvent, useState } from "react";
import { submitContactForm } from "@/lib/contact-api";

export function HomeNewsletter() {
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

    const result = await submitContactForm({
      name: "Insider signup",
      email: email.trim(),
      subject: "Join NoorLink Insider",
      message: destination
        ? `Please add this email to the Insider list. Destination interest: ${destination}.`
        : "Please add this email to the Insider list.",
    });

    if (result.success) {
      setStatus("sent");
      setMessage("You’re on the list. We’ll send destination guides and plan updates.");
      setEmail("");
      setDestination("");
      return;
    }

    setStatus("error");
    setMessage(result.error ?? "Could not join right now. Try support instead.");
  }

  return (
    <section className="newsletter-section">
      <div className="container">
        <div className="newsletter-box">
          <div className="news-text">
            <div className="news-kicker">NoorLink Insider</div>
            <h2>Travel updates, not inbox noise.</h2>
            <p>
              Destination guides, Hajj &amp; Umrah reminders, and occasional plan
              updates. Unsubscribe anytime.
            </p>
            <div className="news-perks">
              <div className="perk">
                <i className="fas fa-check-circle" aria-hidden="true" />
                Destination guides
              </div>
              <div className="perk">
                <i className="fas fa-check-circle" aria-hidden="true" />
                Hajj &amp; Umrah notes
              </div>
              <div className="perk">
                <i className="fas fa-check-circle" aria-hidden="true" />
                Plan &amp; delivery tips
              </div>
            </div>
          </div>
          <div className="news-form">
            <form onSubmit={(event) => void handleSubmit(event)}>
              <div className="news-input-group">
                <label className="news-label" htmlFor="insider-email">
                  Your email
                </label>
                <input
                  id="insider-email"
                  type="email"
                  className="news-input"
                  placeholder="you@example.com"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>
              <div className="news-input-group">
                <label className="news-label" htmlFor="dreamDest">
                  Next trip (optional)
                </label>
                <select
                  id="dreamDest"
                  className="news-input"
                  value={destination}
                  onChange={(event) => setDestination(event.target.value)}
                >
                  <option value="">Select a region…</option>
                  <option value="Umrah">Umrah / Hajj</option>
                  <option value="Europe">Europe</option>
                  <option value="Asia">Asia</option>
                  <option value="Americas">Americas</option>
                </select>
              </div>
              <button
                type="submit"
                className="news-btn"
                disabled={status === "sending"}
              >
                {status === "sending" ? "Joining…" : "Join Insider"}
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
                We respect your privacy. Unsubscribe anytime.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
