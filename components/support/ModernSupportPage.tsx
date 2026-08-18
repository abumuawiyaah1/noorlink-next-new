"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { submitContactForm } from "@/lib/contact-api";
import { WHATSAPP_NUMBER } from "@/components/ui/WhatsAppFab";
import "@/styles/help-pages.css";

export function ModernSupportPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("Order help");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSending(true);
    setError(null);
    setStatus(null);
    const result = await submitContactForm({ name, email, subject, message });
    setSending(false);
    if (!result.success) {
      setError(result.error ?? "Could not send your message.");
      return;
    }
    setStatus(result.message ?? "Message sent. We’ll reply by email.");
    setMessage("");
  }

  return (
    <>
      <SiteHeader />
      <Breadcrumbs items={[{ href: "/", label: "Home" }, { label: "Support" }]} />
      <main className="help-page">
        <section className="help-hero">
          <h1>We’re here to help</h1>
          <p>24/7 support for eSIM delivery, install, and checkout.</p>
        </section>
        <div className="help-inner">
          <div className="help-grid">
            <article className="help-card">
              <h2>Live chat</h2>
              <p>
                Use the chat bubble (bottom-left after a few seconds) to stay on this
                page, or WhatsApp for mobile.
              </p>
              <p style={{ marginTop: 12 }}>
                <a href={`https://wa.me/${WHATSAPP_NUMBER}`}>Open WhatsApp</a>
                {" · "}
                <Link href="/faq">Read FAQs</Link>
              </p>
            </article>
            <article className="help-card">
              <h2>Orders</h2>
              <p>
                Paid orders send a confirmation email first. The QR code arrives in a
                second email after payment confirms.
              </p>
              <p style={{ marginTop: 12 }}>
                <Link href="/dashboard">Look up My eSIMs</Link>
                {" · "}
                <Link href="/refund">Refund policy</Link>
              </p>
            </article>
          </div>

          <form className="help-form" onSubmit={onSubmit}>
            <h2>Send a message</h2>
            <label htmlFor="support-name">Name</label>
            <input
              id="support-name"
              required
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
            <label htmlFor="support-email">Email</label>
            <input
              id="support-email"
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <label htmlFor="support-subject">Subject</label>
            <select
              id="support-subject"
              value={subject}
              onChange={(event) => setSubject(event.target.value)}
            >
              <option>Order help</option>
              <option>Install / QR code</option>
              <option>Checkout / payment</option>
              <option>Refund</option>
              <option>Other</option>
            </select>
            <label htmlFor="support-message">Message</label>
            <textarea
              id="support-message"
              required
              rows={5}
              value={message}
              onChange={(event) => setMessage(event.target.value)}
            />
            <button type="submit" disabled={sending}>
              {sending ? "Sending…" : "Send"}
            </button>
            {status && <p className="help-form__status">{status}</p>}
            {error && (
              <p className="help-form__status" style={{ color: "#b91c1c" }}>
                {error}
              </p>
            )}
          </form>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
