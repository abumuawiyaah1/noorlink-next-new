import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import "@/styles/help-pages.css";

const FAQ_GROUPS = [
  {
    title: "Delivery & install",
    items: [
      {
        q: "Where is my QR code?",
        a: "You receive a checkout confirmation first. The QR code is in a second email after payment confirms. Check spam/junk if it is missing.",
      },
      {
        q: "When does my plan start?",
        a: "Typically when you install the eSIM and connect to a supported network in the destination country.",
      },
    ],
  },
  {
    title: "Compatibility",
    items: [
      {
        q: "Will this work on my phone?",
        a: "Most phones from iPhone XR / XS, Samsung Galaxy S20, Google Pixel 3, and newer support eSIM. Check Settings for “Add eSIM”.",
      },
      {
        q: "Do I keep my WhatsApp number?",
        a: "Yes. NoorLink is data-only. Keep your physical SIM or main line on for WhatsApp and calls.",
      },
    ],
  },
  {
    title: "Refunds",
    items: [
      {
        q: "Can I get a refund?",
        a: "If the eSIM fails to activate due to a technical error, we can refund. Change-of-mind after a working QR is issued is not refundable.",
      },
    ],
  },
];

export function ModernFaqPage() {
  return (
    <>
      <SiteHeader />
      <Breadcrumbs items={[{ href: "/", label: "Home" }, { label: "FAQ" }]} />
      <main className="help-page">
        <section className="help-hero">
          <h1>Frequently asked questions</h1>
          <p>Setup, delivery, refunds, and compatibility.</p>
        </section>
        <div className="help-inner">
          <div className="faq-quick-grid">
            <article className="help-card">
              <h2>Most common issue</h2>
              <p>QR code email delay after payment confirmation.</p>
            </article>
            <article className="help-card">
              <h2>Fastest fix</h2>
              <p>Use My eSIMs or the Support page order tracker before messaging us.</p>
            </article>
            <article className="help-card">
              <h2>Need a human?</h2>
              <p>Live chat and WhatsApp support are available around the clock.</p>
            </article>
          </div>
          <div className="faq-list">
            {FAQ_GROUPS.map((group) => (
              <section key={group.title} className="faq-group">
                <h2 className="faq-group__title">{group.title}</h2>
                <div className="faq-group__items">
                  {group.items.map((item) => (
                    <article key={item.q} className="faq-item">
                      <h3>{item.q}</h3>
                      <p>{item.a}</p>
                    </article>
                  ))}
                </div>
              </section>
            ))}
            <div className="help-card faq-help-card">
              <h2>Need more help?</h2>
              <p>
                Visit the <Link href="/support">Support page</Link>, use live chat,
                or track your order before contacting us.
              </p>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
