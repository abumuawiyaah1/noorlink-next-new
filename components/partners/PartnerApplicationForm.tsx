"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { submitContactForm } from "@/lib/contact-api";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { localizedPath } from "@/lib/i18n/path";
import { useLocaleState } from "@/lib/i18n/use-locale";
import "@/styles/help-pages.css";

/** Stable CRM values — labels come from the dictionary. */
const PARTNER_TYPE_VALUES = [
  "Masjid or Islamic center",
  "Creator, advisor, or organization",
] as const;

type PartnerType = (typeof PARTNER_TYPE_VALUES)[number];

export function PartnerApplicationForm() {
  const [locale] = useLocaleState();
  const dict = getDictionary(locale);
  const f = dict.partnersPage.form;
  const typeLabels: Record<PartnerType, string> = {
    "Masjid or Islamic center": f.typeMasjid,
    "Creator, advisor, or organization": f.typeCreator,
  };

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [partnerType, setPartnerType] = useState<PartnerType>(PARTNER_TYPE_VALUES[0]);
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
      setError(f.errorTerms);
      return;
    }
    if (!organization.trim() && !websiteOrSocial.trim()) {
      setError(f.errorOrg);
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
      `Locale: ${locale}`,
    ].filter(Boolean);

    const result = await submitContactForm({
      name: name.trim(),
      email: email.trim(),
      subject: "Partner application",
      message: lines.join("\n"),
    });

    setSending(false);
    if (!result.success) {
      setError(result.error ?? f.errorSend);
      return;
    }

    setStatus(result.message ?? f.success);
    setName("");
    setEmail("");
    setOrganization("");
    setWebsiteOrSocial("");
    setAbout("");
    setPartnerType(PARTNER_TYPE_VALUES[0]);
    setAgreedToTerms(false);
  }

  return (
    <form className="help-form partner-portal__panel" onSubmit={onSubmit}>
      <label htmlFor="partner-name">{f.name}</label>
      <input
        id="partner-name"
        required
        autoComplete="name"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />

      <label htmlFor="partner-email">{f.email}</label>
      <input
        id="partner-email"
        type="email"
        required
        autoComplete="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />

      <label htmlFor="partner-type">{f.partnerType}</label>
      <select
        id="partner-type"
        value={partnerType}
        onChange={(event) => setPartnerType(event.target.value as PartnerType)}
      >
        {PARTNER_TYPE_VALUES.map((value) => (
          <option key={value} value={value}>
            {typeLabels[value]}
          </option>
        ))}
      </select>

      <label htmlFor="partner-organization">
        {f.organization}{" "}
        <span className="partner-apply__hint">{f.organizationHint}</span>
      </label>
      <input
        id="partner-organization"
        value={organization}
        onChange={(event) => setOrganization(event.target.value)}
        placeholder={f.organizationPlaceholder}
      />

      <label htmlFor="partner-web">{f.website}</label>
      <input
        id="partner-web"
        value={websiteOrSocial}
        onChange={(event) => setWebsiteOrSocial(event.target.value)}
        placeholder={f.websitePlaceholder}
      />

      <label htmlFor="partner-about">{f.about}</label>
      <textarea
        id="partner-about"
        required
        rows={4}
        placeholder={f.aboutPlaceholder}
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
          {f.agreeBefore}{" "}
          <Link
            href={localizedPath("/partners/terms", locale)}
            target="_blank"
            rel="noopener noreferrer"
          >
            {f.agreeLink}
          </Link>
          .
        </span>
      </label>

      <button type="submit" disabled={sending || !agreedToTerms}>
        {sending ? f.sending : f.submit}
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
