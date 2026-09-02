import { TrustStatsBar } from "@/components/landing/TrustStatsBar";

export function HowItWorks() {
  return (
    <section className="steps-section" id="how-it-works">
      <div className="container">
        <TrustStatsBar />
        <div className="steps-header">
          <h2>How it works</h2>
          <p>Install before you fly — three calm steps to data on arrival.</p>
        </div>
        <div className="steps-grid">
          <article className="step-card">
            <div className="step-icon">
              <i className="fas fa-mobile-alt" aria-hidden="true" />
            </div>
            <h3>1. Choose your plan</h3>
            <p>
              Confirm your phone supports eSIM, then pick a destination and data
              amount that fits the trip.
            </p>
          </article>
          <article className="step-card">
            <div className="step-icon">
              <i className="fas fa-envelope-open-text" aria-hidden="true" />
            </div>
            <h3>2. Get your QR</h3>
            <p>
              Your activation details arrive by email right after checkout — no
              waiting for a plastic SIM.
            </p>
          </article>
          <article className="step-card">
            <div className="step-icon">
              <i className="fas fa-qrcode" aria-hidden="true" />
            </div>
            <h3>3. Scan &amp; connect</h3>
            <p>
              Install from Settings before you fly. Turn on data roaming when you
              land and you&apos;re online.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
