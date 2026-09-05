"use client";

import { useEffect, useMemo, useState } from "react";
import { CopyButton } from "@/components/social/CopyButton";
import { TeamAppShell } from "@/components/team/TeamAppShell";
import {
  OUTREACH_MESSAGE_TEMPLATES,
  fillOutreachTemplate,
  type OutreachMessageTemplate,
  type OutreachTemplateId,
} from "@/lib/outreach-templates";
import {
  OUTREACH_PLATFORM_LABELS,
  OUTREACH_STATUS_LABELS,
  OUTREACH_WAVE_LABELS,
  type OutreachContact,
  type OutreachPlatform,
  type OutreachStatus,
  type OutreachWave,
} from "@/lib/outreach-types";

type ContactDraft = Omit<OutreachContact, "id" | "createdAt" | "updatedAt">;

const EMPTY_DRAFT: ContactDraft = {
  name: "",
  handle: "",
  email: "",
  platform: "instagram",
  profileUrl: "",
  contentUrl: "",
  wave: "search",
  status: "to_contact",
  messageSent: "",
  promoCode: "",
  notes: "",
  contactedAt: "",
  repliedAt: "",
  lastEmailAt: "",
  lastEmailSubject: "",
};

function draftFromContact(contact: OutreachContact): ContactDraft {
  return {
    name: contact.name,
    handle: contact.handle,
    email: contact.email ?? "",
    platform: contact.platform,
    profileUrl: contact.profileUrl,
    contentUrl: contact.contentUrl,
    wave: contact.wave,
    status: contact.status,
    messageSent: contact.messageSent,
    promoCode: contact.promoCode,
    notes: contact.notes,
    contactedAt: contact.contactedAt,
    repliedAt: contact.repliedAt,
    lastEmailAt: contact.lastEmailAt ?? "",
    lastEmailSubject: contact.lastEmailSubject ?? "",
  };
}

export function OutreachCrmPage() {
  const [contacts, setContacts] = useState<OutreachContact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<OutreachStatus | "all">("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [draft, setDraft] = useState<ContactDraft>(EMPTY_DRAFT);
  const [saving, setSaving] = useState(false);
  const [sending, setSending] = useState(false);
  const [isNew, setIsNew] = useState(false);
  const [emailConfigured, setEmailConfigured] = useState<boolean | null>(null);
  const [templateId, setTemplateId] = useState<OutreachTemplateId>("gifted_collab");
  const [emailSubject, setEmailSubject] = useState("");
  const [emailBody, setEmailBody] = useState("");

  const selected = useMemo(
    () => contacts.find((c) => c.id === selectedId) ?? null,
    [contacts, selectedId],
  );

  const activeTemplate = useMemo(
    () =>
      OUTREACH_MESSAGE_TEMPLATES.find((t) => t.id === templateId) ??
      OUTREACH_MESSAGE_TEMPLATES[0],
    [templateId],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return contacts.filter((c) => {
      if (statusFilter !== "all" && c.status !== statusFilter) return false;
      if (!q) return true;
      return (
        c.name.toLowerCase().includes(q) ||
        c.handle.toLowerCase().includes(q) ||
        (c.email ?? "").toLowerCase().includes(q) ||
        c.notes.toLowerCase().includes(q) ||
        c.promoCode.toLowerCase().includes(q)
      );
    });
  }, [contacts, query, statusFilter]);

  function applyTemplate(
    template: OutreachMessageTemplate,
    vars: {
      name: string;
      handle: string;
      code: string;
      contentUrl: string;
    },
  ) {
    setEmailSubject(fillOutreachTemplate(template.subject, vars));
    setEmailBody(fillOutreachTemplate(template.body, vars));
  }

  async function loadContacts(seed = false) {
    setLoading(true);
    setError(null);
    try {
      const url = seed ? "/api/team/outreach?seed=1" : "/api/team/outreach";
      const res = await fetch(url);
      if (res.status === 401) {
        setError("Please sign in again.");
        setContacts([]);
        return;
      }
      const body = (await res.json()) as {
        contacts?: OutreachContact[];
        error?: string;
      };
      if (!res.ok) {
        setError(body.error ?? "Could not load contacts.");
        return;
      }
      setContacts(body.contacts ?? []);
    } catch {
      setError("Could not load the outreach databank.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadContacts(true);
    void (async () => {
      try {
        const res = await fetch("/api/team/outreach/send");
        const body = (await res.json()) as { configured?: boolean };
        setEmailConfigured(Boolean(body.configured));
      } catch {
        setEmailConfigured(false);
      }
    })();
  }, []);

  useEffect(() => {
    if (selected) {
      setIsNew(false);
      const next = draftFromContact(selected);
      setDraft(next);
      applyTemplate(activeTemplate, {
        name: next.name,
        handle: next.handle,
        code: next.promoCode,
        contentUrl: next.contentUrl,
      });
    }
    // Only when selection changes — not on every template tweak
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedId]);

  function startNew() {
    setSelectedId(null);
    setIsNew(true);
    setDraft(EMPTY_DRAFT);
    applyTemplate(OUTREACH_MESSAGE_TEMPLATES[0], {
      name: "",
      handle: "",
      code: "",
      contentUrl: "",
    });
    setTemplateId("gifted_collab");
    setSuccess(null);
  }

  function onPickTemplate(id: OutreachTemplateId) {
    setTemplateId(id);
    const template =
      OUTREACH_MESSAGE_TEMPLATES.find((t) => t.id === id) ??
      OUTREACH_MESSAGE_TEMPLATES[0];
    applyTemplate(template, {
      name: draft.name,
      handle: draft.handle,
      code: draft.promoCode,
      contentUrl: draft.contentUrl,
    });
  }

  async function saveDraft() {
    setSaving(true);
    setError(null);
    setSuccess(null);
    try {
      if (isNew || !selectedId) {
        const res = await fetch("/api/team/outreach", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(draft),
        });
        const body = (await res.json()) as {
          contact?: OutreachContact;
          error?: string;
        };
        if (!res.ok) throw new Error(body.error ?? "Save failed.");
        await loadContacts();
        if (body.contact) setSelectedId(body.contact.id);
        setIsNew(false);
        setSuccess("Contact saved.");
      } else {
        const res = await fetch(`/api/team/outreach/${selectedId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(draft),
        });
        const body = (await res.json()) as { error?: string };
        if (!res.ok) throw new Error(body.error ?? "Save failed.");
        await loadContacts();
        setSuccess("Contact saved.");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed.");
    } finally {
      setSaving(false);
    }
  }

  async function removeContact() {
    if (!selectedId || isNew) return;
    if (!window.confirm("Delete this contact?")) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/team/outreach/${selectedId}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const body = (await res.json()) as { error?: string };
        throw new Error(body.error ?? "Delete failed.");
      }
      setSelectedId(null);
      setIsNew(false);
      setDraft(EMPTY_DRAFT);
      await loadContacts();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Delete failed.");
    } finally {
      setSaving(false);
    }
  }

  async function sendBrandedEmail() {
    if (!draft.email.trim()) {
      setError("Add their email address before sending.");
      return;
    }
    if (!selectedId && !isNew) {
      setError("Save the contact first, then send.");
      return;
    }

    setSending(true);
    setError(null);
    setSuccess(null);
    try {
      let contactId = selectedId;
      if (isNew || !contactId) {
        const createRes = await fetch("/api/team/outreach", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(draft),
        });
        const created = (await createRes.json()) as {
          contact?: OutreachContact;
          error?: string;
        };
        if (!createRes.ok || !created.contact) {
          throw new Error(created.error ?? "Could not save contact before send.");
        }
        contactId = created.contact.id;
        setSelectedId(contactId);
        setIsNew(false);
      } else {
        await fetch(`/api/team/outreach/${contactId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(draft),
        });
      }

      const res = await fetch("/api/team/outreach/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contactId,
          toEmail: draft.email,
          templateId,
          subject: emailSubject,
          bodyText: emailBody,
          eyebrow: activeTemplate.eyebrow,
          title: activeTemplate.title,
          ctaHref: activeTemplate.ctaHref,
          ctaLabel: activeTemplate.ctaLabel,
          name: draft.name,
          handle: draft.handle,
          promoCode: draft.promoCode,
          contentUrl: draft.contentUrl,
          markMessaged: true,
        }),
      });
      const body = (await res.json()) as {
        error?: string;
        contact?: OutreachContact;
      };
      if (!res.ok) throw new Error(body.error ?? "Send failed.");

      await loadContacts();
      if (body.contact) {
        setDraft(draftFromContact(body.contact));
      }
      setSuccess(`Branded email sent to ${draft.email}.`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Send failed.");
    } finally {
      setSending(false);
    }
  }

  function updateField<K extends keyof ContactDraft>(
    key: K,
    value: ContactDraft[K],
  ) {
    setDraft((prev) => ({ ...prev, [key]: value }));
  }

  const mailtoHref =
    draft.email && emailSubject
      ? `mailto:${encodeURIComponent(draft.email)}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`
      : "";

  return (
    <TeamAppShell title="Creator outreach">
      <header className="outreach-intro">
        <span className="content-kicker">Databank + email</span>
        <h1>Creator outreach</h1>
        <p>
          Store handles and links, pick a premade message, and send a branded
          NoorLink email — or copy it for Instagram DMs.
        </p>
        {emailConfigured === false ? (
          <p className="outreach-banner outreach-banner--warn">
            Email send is not configured yet. Add{" "}
            <code>RESEND_API_KEY</code> and <code>RESEND_FROM_EMAIL</code> to
            the Worker (same keys as order emails). You can still copy messages
            or use mailto.
          </p>
        ) : null}
        {emailConfigured ? (
          <p className="outreach-banner">
            Branded send is ready — emails use NoorLink teal/orange chrome.
          </p>
        ) : null}
      </header>

      <div className="outreach-toolbar">
        <input
          type="search"
          className="outreach-search"
          placeholder="Search name, handle, email, notes…"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <select
          className="outreach-select"
          value={statusFilter}
          onChange={(event) =>
            setStatusFilter(event.target.value as OutreachStatus | "all")
          }
        >
          <option value="all">All statuses</option>
          {(Object.keys(OUTREACH_STATUS_LABELS) as OutreachStatus[]).map(
            (status) => (
              <option key={status} value={status}>
                {OUTREACH_STATUS_LABELS[status]}
              </option>
            ),
          )}
        </select>
        <button
          type="button"
          className="outreach-btn outreach-btn--primary"
          onClick={startNew}
        >
          Add creator
        </button>
      </div>

      {error ? <p className="outreach-error">{error}</p> : null}
      {success ? <p className="outreach-success">{success}</p> : null}

      <div className="outreach-layout">
        <section className="outreach-list" aria-label="Creators">
          {loading ? (
            <p className="outreach-muted">Loading…</p>
          ) : filtered.length === 0 ? (
            <p className="outreach-muted">No creators yet. Add one to start.</p>
          ) : (
            <ul>
              {filtered.map((contact) => (
                <li key={contact.id}>
                  <button
                    type="button"
                    className={`outreach-list__item${
                      selectedId === contact.id ? " is-active" : ""
                    }`}
                    onClick={() => {
                      setIsNew(false);
                      setSelectedId(contact.id);
                      setSuccess(null);
                      setError(null);
                    }}
                  >
                    <span className="outreach-list__name">{contact.name}</span>
                    <span className="outreach-list__meta">
                      {contact.handle || contact.email || "No handle"} ·{" "}
                      {OUTREACH_STATUS_LABELS[contact.status]}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="outreach-editor" aria-label="Contact details">
          {!isNew && !selected ? (
            <p className="outreach-muted">
              Select a creator, or click Add creator.
            </p>
          ) : (
            <>
              <form
                className="outreach-form"
                onSubmit={(event) => {
                  event.preventDefault();
                  void saveDraft();
                }}
              >
                <div className="outreach-form__row">
                  <label>
                    Name
                    <input
                      required
                      value={draft.name}
                      onChange={(e) => updateField("name", e.target.value)}
                    />
                  </label>
                  <label>
                    Handle
                    <div className="outreach-inline">
                      <input
                        value={draft.handle}
                        onChange={(e) => updateField("handle", e.target.value)}
                        placeholder="@handle"
                      />
                      {draft.handle ? (
                        <CopyButton text={draft.handle} label="Copy" />
                      ) : null}
                    </div>
                  </label>
                </div>

                <label>
                  Email (for branded send)
                  <div className="outreach-inline">
                    <input
                      type="email"
                      value={draft.email}
                      onChange={(e) => updateField("email", e.target.value)}
                      placeholder="creator@email.com"
                    />
                    {draft.email ? (
                      <CopyButton text={draft.email} label="Copy" />
                    ) : null}
                  </div>
                </label>

                <div className="outreach-form__row">
                  <label>
                    Platform
                    <select
                      value={draft.platform}
                      onChange={(e) =>
                        updateField(
                          "platform",
                          e.target.value as OutreachPlatform,
                        )
                      }
                    >
                      {(
                        Object.keys(
                          OUTREACH_PLATFORM_LABELS,
                        ) as OutreachPlatform[]
                      ).map((platform) => (
                        <option key={platform} value={platform}>
                          {OUTREACH_PLATFORM_LABELS[platform]}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label>
                    Wave
                    <select
                      value={draft.wave}
                      onChange={(e) =>
                        updateField("wave", e.target.value as OutreachWave)
                      }
                    >
                      {(Object.keys(OUTREACH_WAVE_LABELS) as OutreachWave[]).map(
                        (wave) => (
                          <option key={wave} value={wave}>
                            {OUTREACH_WAVE_LABELS[wave]}
                          </option>
                        ),
                      )}
                    </select>
                  </label>
                  <label>
                    Status
                    <select
                      value={draft.status}
                      onChange={(e) =>
                        updateField("status", e.target.value as OutreachStatus)
                      }
                    >
                      {(
                        Object.keys(OUTREACH_STATUS_LABELS) as OutreachStatus[]
                      ).map((status) => (
                        <option key={status} value={status}>
                          {OUTREACH_STATUS_LABELS[status]}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>

                <label>
                  Profile / page link
                  <div className="outreach-inline">
                    <input
                      value={draft.profileUrl}
                      onChange={(e) =>
                        updateField("profileUrl", e.target.value)
                      }
                      placeholder="https://…"
                    />
                    {draft.profileUrl ? (
                      <>
                        <CopyButton text={draft.profileUrl} label="Copy link" />
                        <a
                          href={draft.profileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="outreach-link"
                        >
                          Open
                        </a>
                      </>
                    ) : null}
                  </div>
                </label>

                <label>
                  Best video / post link
                  <div className="outreach-inline">
                    <input
                      value={draft.contentUrl}
                      onChange={(e) =>
                        updateField("contentUrl", e.target.value)
                      }
                      placeholder="Packing or arrival video URL"
                    />
                    {draft.contentUrl ? (
                      <>
                        <CopyButton text={draft.contentUrl} label="Copy link" />
                        <a
                          href={draft.contentUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="outreach-link"
                        >
                          Open
                        </a>
                      </>
                    ) : null}
                  </div>
                </label>

                <div className="outreach-form__row">
                  <label>
                    Promo code
                    <div className="outreach-inline">
                      <input
                        value={draft.promoCode}
                        onChange={(e) =>
                          updateField("promoCode", e.target.value)
                        }
                        placeholder="e.g. SAFFIYAH10"
                      />
                      {draft.promoCode ? (
                        <CopyButton text={draft.promoCode} label="Copy" />
                      ) : null}
                    </div>
                  </label>
                  <label>
                    Contacted date
                    <input
                      type="date"
                      value={draft.contactedAt}
                      onChange={(e) =>
                        updateField("contactedAt", e.target.value)
                      }
                    />
                  </label>
                  <label>
                    Replied date
                    <input
                      type="date"
                      value={draft.repliedAt}
                      onChange={(e) => updateField("repliedAt", e.target.value)}
                    />
                  </label>
                </div>

                <label>
                  Notes
                  <textarea
                    rows={3}
                    value={draft.notes}
                    onChange={(e) => updateField("notes", e.target.value)}
                    placeholder="Audience, trip timing, follow-ups…"
                  />
                </label>

                {draft.lastEmailAt ? (
                  <p className="outreach-muted">
                    Last branded email: {draft.lastEmailSubject || "(no subject)"}{" "}
                    · {new Date(draft.lastEmailAt).toLocaleString()}
                  </p>
                ) : null}

                <div className="outreach-form__actions">
                  <button
                    type="submit"
                    className="outreach-btn outreach-btn--primary"
                    disabled={saving}
                  >
                    {saving
                      ? "Saving…"
                      : isNew
                        ? "Add to databank"
                        : "Save changes"}
                  </button>
                  {!isNew && selectedId ? (
                    <button
                      type="button"
                      className="outreach-btn outreach-btn--danger"
                      onClick={() => void removeContact()}
                      disabled={saving}
                    >
                      Delete
                    </button>
                  ) : null}
                </div>
              </form>

              <div className="outreach-compose">
                <div className="outreach-compose__head">
                  <h2>Send branded email</h2>
                  <p>
                    Premade messages fill with their name, handle, and code.
                    Edit before sending.
                  </p>
                </div>

                <div className="outreach-templates" role="list">
                  {OUTREACH_MESSAGE_TEMPLATES.map((template) => (
                    <button
                      key={template.id}
                      type="button"
                      role="listitem"
                      className={`outreach-template${
                        templateId === template.id ? " is-active" : ""
                      }`}
                      onClick={() => onPickTemplate(template.id)}
                    >
                      <strong>{template.label}</strong>
                      <span>{template.description}</span>
                    </button>
                  ))}
                </div>

                <label>
                  Subject
                  <input
                    value={emailSubject}
                    onChange={(e) => setEmailSubject(e.target.value)}
                  />
                </label>
                <label>
                  Message body
                  <textarea
                    rows={10}
                    value={emailBody}
                    onChange={(e) => setEmailBody(e.target.value)}
                  />
                </label>

                <div className="outreach-form__actions">
                  <button
                    type="button"
                    className="outreach-btn outreach-btn--primary"
                    disabled={sending || !emailConfigured}
                    onClick={() => void sendBrandedEmail()}
                  >
                    {sending ? "Sending…" : "Send branded email"}
                  </button>
                  <CopyButton text={emailBody} label="Copy for DM" />
                  {mailtoHref ? (
                    <a href={mailtoHref} className="outreach-btn">
                      Open in mail app
                    </a>
                  ) : null}
                </div>
              </div>
            </>
          )}
        </section>
      </div>
    </TeamAppShell>
  );
}
