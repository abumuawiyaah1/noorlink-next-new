"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { submitContactForm } from "@/lib/contact-api";
import "@/styles/help-pages.css";

const PARTNER_TYPES = [
  { value: "Influencer or creator", label: "Influencer or creator" },
  { value: "Masjid or Islamic center", label: "Masjid or Islamic center" },
  { value: "Travel advisor or connector", label: "Travel advisor or connector" },
  { value: "Other organization", label: "Other organization" },
] as const;

export function PartnerApplicationForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [partnerType, setPartnerType] = useState(PARTNER_TYPES[0].value);
  const [organization, setOrganization] = useState("");
  const [websiteOrSocial, setWebsiteOrSocial] = useState("");
  const [audience, setAudience] = useState("");
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
      "About your audience:",
      audience.trim(),
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
    setAudience("");
    setPartnerType(PARTNER_TYPES[0].value);
    setAgreedToTerms(false);
  }

  return (
    <form className="help-form partner-portal__panel" onSubmit={onSubmit}>
      <h2>Apply to become a partner</h2>
      <p className="help-intro">
        Tell us about yourself or your organization. No referral code needed — we approve
        partners manually before links go live.
      </p>

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

        <label htmlFor="partner-organization">Organization (optional)</label>
        <input
          id="partner-organization"
          placeholder="Masjid name, agency, or brand"
          value={organization}
          onChange={(event) => setOrganization(event.target.value)}
        />

        <label htmlFor="partner-web">Website or social (optional)</label>
        <input
          id="partner-web"
          placeholder="https:// or @handle"
          value={websiteOrSocial}
          onChange={(event) => setWebsiteOrSocial(event.target.value)}
        />

        <label htmlFor="partner-audience">How will you share NoorLink?</label>
        <textarea
          id="partner-audience"
          required
          rows={5}
          placeholder="Audience size, Hajj/Umrah groups, newsletter, social channels, etc."
          value={audience}
          onChange={(event) => setAudience(event.target.value)}
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
