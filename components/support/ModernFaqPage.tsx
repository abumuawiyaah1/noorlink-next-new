import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import "@/styles/help-pages.css";

const FAQS = [
  {
    q: "Where is my QR code?",
    a: "You receive a checkout confirmation first. The QR code is in a second email after payment confirms. Check spam/junk if it is missing.",
  },
  {
    q: "Will this work on my phone?",
    a: "Most phones from iPhone XR / XS, Samsung Galaxy S20, Google Pixel 3, and newer support eSIM. Check Settings for “Add eSIM”.",
  },
  {
    q: "Can I get a refund?",
    a: "If the eSIM fails to activate due to a technical error, we can refund. Change-of-mind after a working QR is issued is not refundable.",
  },
  {
    q: "Do I keep my WhatsApp number?",
    a: "Yes. NoorLink is data-only. Keep your physical SIM or main line on for WhatsApp and calls.",
  },
  {
    q: "When does my plan start?",
    a: "Typically when you install the eSIM and connect to a supported network in the destination country.",
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
          <div className="faq-list">
            {FAQS.map((item) => (
              <article key={item.q} className="faq-item">
                <h2>{item.q}</h2>
                <p>{item.a}</p>
              </article>
            ))}
            <article className="faq-item">
              <h2>Need more help?</h2>
              <p>
                Visit the <Link href="/support">Support page</Link> or use live chat
                on any page.
              </p>
            </article>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
