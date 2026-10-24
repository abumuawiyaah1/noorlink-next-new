"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FormEvent, Suspense, useState } from "react";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { OrderLookupCard } from "@/components/orders/OrderLookupCard";
import { submitContactForm } from "@/lib/contact-api";
import { WHATSAPP_NUMBER } from "@/components/ui/WhatsAppFab";
import { getDictionary, t } from "@/lib/i18n/dictionaries";
import { useLocaleState } from "@/lib/i18n/use-locale";
import { SUPPORT_EMAIL } from "@/lib/support-contact";
import "@/styles/help-pages.css";

function SupportContent() {
  const [locale] = useLocaleState();
  const dict = getDictionary(locale);
  const searchParams = useSearchParams();
  const initialEmail = searchParams.get("email") ?? "";
  const initialOrderId = searchParams.get("orderId") ?? "";
  const initialSubject =
    searchParams.get("subject") ?? dict.supportSubjects.orderHelp;
  const defaultMessage = initialOrderId
    ? t(dict, "supportPage.defaultMessage", { orderId: initialOrderId })
    : "";
  const [name, setName] = useState("");
  const [email, setEmail] = useState(initialEmail);
  const [subject, setSubject] = useState(initialSubject);
  const [message, setMessage] = useState(defaultMessage);
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSending(true);
    setError(null);
    setStatus(null);
    const result = await submitContactForm({
      name,
      email,
      subject,
      message,
      orderId: initialOrderId || undefined,
      language: locale,
    });
    setSending(false);
    if (!result.success) {
      setError(result.error ?? t(dict, "supportPage.sendError"));
      return;
    }
    setStatus(dict.support.ticketCreated);
    setMessage("");
  }

  return (
    <>
      <SiteHeader />
      <Breadcrumbs
        items={[
          { href: "/", label: t(dict, "common.home") },
          { label: dict.support.title },
        ]}
      />
      <main className="help-page">
        <section className="help-hero">
          <h1>{dict.support.title}</h1>
          <p>{dict.support.intro}</p>
        </section>
        <div className="help-inner">
          <div className="help-grid">
            <article className="help-card">
              <h2>{t(dict, "supportPage.needNowTitle")}</h2>
              <p>{t(dict, "supportPage.needNowBody")}</p>
              <p style={{ marginTop: 12 }}>
                <a href={`https://wa.me/${WHATSAPP_NUMBER}`}>{t(dict, "common.openWhatsApp")}</a>
                {" · "}
                <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>
                {" · "}
                <Link href="/faq">{t(dict, "common.readFaqs")}</Link>
                {" · "}
                <Link href="/help/before-you-fly">
                  {t(dict, "supportPage.beforeFly")}
                </Link>
                {" · "}
                <Link href="/help/umrah-esim-before-you-fly">
                  {t(dict, "helpPage.umrahBeforeFlyCrumb")}
                </Link>
                {" · "}
                <Link href="/help/hajj-umrah-phone-check">
                  {t(dict, "helpPage.phoneCheckCrumb")}
                </Link>
              </p>
            </article>
            <article className="help-card">
              <h2>{t(dict, "supportPage.trackFirstTitle")}</h2>
              <p>{t(dict, "supportPage.trackFirstBody")}</p>
              <p style={{ marginTop: 12 }}>
                <Link href="/dashboard">{t(dict, "supportPage.lookupMyEsims")}</Link>
                {" · "}
                <Link href="/help/before-you-fly">
                  {t(dict, "supportPage.dataChecklist")}
                </Link>
                {" · "}
                <Link href="/refund">{t(dict, "supportPage.refundPolicy")}</Link>
              </p>
            </article>
          </div>

          <section className="help-form help-form--lookup">
            <h2>{t(dict, "supportPage.trackOrder")}</h2>
            <p className="help-intro">{t(dict, "supportPage.trackIntro")}</p>
            <OrderLookupCard
              compact
              title={t(dict, "supportPage.lookupTitle")}
              description={t(dict, "supportPage.lookupDesc")}
              submitLabel={t(dict, "supportPage.checkOrder")}
              initialEmail={initialEmail}
              initialOrderId={initialOrderId}
            />
            <div className="help-checklist">
              <strong>{t(dict, "supportPage.qrNotArrived")}</strong>
              <ul>
                <li>{t(dict, "supportPage.tipSpam")}</li>
                <li>{t(dict, "supportPage.tipConfirm")}</li>
                <li>{t(dict, "supportPage.tipWhatsApp")}</li>
              </ul>
            </div>
          </section>

          <form className="help-form" onSubmit={onSubmit}>
            <h2>{t(dict, "supportPage.sendTitle")}</h2>
            <p className="help-intro">{t(dict, "supportPage.sendIntro")}</p>
            <label htmlFor="support-name">{dict.support.formName}</label>
            <input
              id="support-name"
              required
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
            <label htmlFor="support-email">{dict.support.formEmail}</label>
            <input
              id="support-email"
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <label htmlFor="support-subject">{dict.support.formSubject}</label>
            <select
              id="support-subject"
              value={subject}
              onChange={(event) => setSubject(event.target.value)}
            >
              <option value={dict.supportSubjects.orderHelp}>
                {dict.supportSubjects.orderHelp}
              </option>
              <option value={dict.supportSubjects.installQr}>
                {dict.supportSubjects.installQr}
              </option>
              <option value={dict.supportSubjects.checkoutPayment}>
                {dict.supportSubjects.checkoutPayment}
              </option>
              <option value={dict.supportSubjects.refund}>
                {dict.supportSubjects.refund}
              </option>
              <option value={dict.supportSubjects.other}>
                {dict.supportSubjects.other}
              </option>
            </select>
            <label htmlFor="support-message">{dict.support.formMessage}</label>
            <textarea
              id="support-message"
              required
              rows={5}
              value={message}
              onChange={(event) => setMessage(event.target.value)}
            />
            <button type="submit" disabled={sending}>
              {sending ? "…" : dict.support.formSubmit}
            </button>
            {status && <p className="help-form__status">{status}</p>}
            {error && (
              <p className="help-form__status" style={{ color: "var(--error)" }}>
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

export function ModernSupportPage() {
  return (
    <Suspense fallback={<main className="help-page" />}>
      <SupportContent />
    </Suspense>
  );
}
