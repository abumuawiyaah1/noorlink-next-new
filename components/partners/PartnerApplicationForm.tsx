"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { submitContactForm } from "@/lib/contact-api";
import "@/styles/help-pages.css";

const PARTNER_TYPES = [
  { value: "Masjid or Islamic center", label: "Masjid or Islamic center" },
  { value: "Creator, advisor, or organization", label: "Creator, advisor, or organization" },
] as const;

export function PartnerApplicationForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [partnerType, setPartnerType] = useState(PARTNER_TYPES[0].value);
  const [organization, setOrganization] = useState("");
  const [websiteOrSocial, setWebsiteOrSocial] = useState("");
  const [about, setAbout] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!agreedToTerms) {
      setError("Please agree to the Partner Program Terms to submit your application.");
      return;
    }
    if (!organization.trim() && !websiteOrSocial.trim()) {
      setError("Add your organization name or a website / social handle.");
      return;
    }

    setSending(true);
    setError(null);
    setStatus(null);

    const lines = [
      "Partner application",
      "",
      `Type: ${partnerType}`,
      organization.trim() ? `Organization: ${organization.trim()}` : null,
      websiteOrSocial.trim() ? `Website / social: ${websiteOrSocial.trim()}` : null,
      "",
      "About you / your audience:",
      about.trim(),
      "",
      "Agreed to Partner Program Terms: yes",
    ].filter(Boolean);

    const result = await submitContactForm({
      name: name.trim(),
      email: email.trim(),
      subject: "Partner application",
      message: lines.join("\n"),
    });

    setSending(false);
    if (!result.success) {
      setError(result.error ?? "Could not send your application.");
      return;
    }

    setStatus(
      result.message ??
        "Application sent. We review partners manually and reply by email within a few business days.",
    );
    setName("");
    setEmail("");
    setOrganization("");
    setWebsiteOrSocial("");
    setAbout("");
    setPartnerType(PARTNER_TYPES[0].value);
    setAgreedToTerms(false);
  }

  return (
    <form className="help-form partner-portal__panel" onSubmit={onSubmit}>
      <label htmlFor="partner-name">Your name</label>
        <input
          id="partner-name"
          required
          autoComplete="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />

        <label htmlFor="partner-email">Email</label>
        <input
          id="partner-email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />

        <label htmlFor="partner-type">Partner type</label>
        <select
          id="partner-type"
          value={partnerType}
          onChange={(event) => setPartnerType(event.target.value)}
        >
          {PARTNER_TYPES.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <label htmlFor="partner-organization">
          Organization (masjid name, agency, brand){" "}
          <span className="partner-apply__hint">— organization or website/social required</span>
        </label>
        <input
          id="partner-organization"
          value={organization}
          onChange={(event) => setOrganization(event.target.value)}
          placeholder="Al-Noor Islamic Center"
        />

        <label htmlFor="partner-web">Website or social (URL or @handle)</label>
        <input
          id="partner-web"
          value={websiteOrSocial}
          onChange={(event) => setWebsiteOrSocial(event.target.value)}
          placeholder="https:// or @handle"
        />

        <label htmlFor="partner-about">Tell us about you / your audience</label>
        <textarea
          id="partner-about"
          required
          rows={4}
          placeholder="Audience size, Hajj/Umrah groups, newsletter, and how you plan to share NoorLink."
          value={about}
          onChange={(event) => setAbout(event.target.value)}
        />

        <label className="partner-apply__checkbox">
          <input
            type="checkbox"
            checked={agreedToTerms}
            onChange={(event) => setAgreedToTerms(event.target.checked)}
            required
          />
          <span>
            I agree to the{" "}
            <Link href="/partners/terms" target="_blank" rel="noopener noreferrer">
              Partner Program Terms
            </Link>
            .
          </span>
        </label>

        <button type="submit" disabled={sending || !agreedToTerms}>
          {sending ? "Sending…" : "Submit application"}
        </button>

        {status ? <p className="help-form__status">{status}</p> : null}
      {error ? (
        <p className="help-form__status" style={{ color: "var(--error)" }}>
          {error}
        </p>
      ) : null}
    </form>
  );
}
