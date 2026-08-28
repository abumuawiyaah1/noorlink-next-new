import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { FAQ_GROUPS } from "@/lib/faq-content";
import "@/styles/help-pages.css";

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
              <p>WhatsApp support is available around the clock.</p>
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
                Visit the <Link href="/support">Support page</Link>, use WhatsApp,
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
