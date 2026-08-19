export function HowItWorks() {
  return (
    <section className="steps-section" id="how-it-works">
      <div className="container">
        <div style={{ textAlign: "center" }}>
          <h2 style={{ fontSize: "2.5rem", color: "var(--primary)" }}>
            How It Works
          </h2>
          <p style={{ color: "var(--text-muted)" }}>
            Get online in 3 simple steps
          </p>
        </div>
        <div className="steps-grid">
          <article className="step-card">
            <div className="step-icon">
              <i className="fas fa-mobile-alt" aria-hidden="true" />
            </div>
            <h3>1. Verify &amp; Buy</h3>
            <p>
              Check if your phone is compatible, then choose your destination
              and data plan.
            </p>
          </article>
          <article className="step-card">
            <div className="step-icon">
              <i className="fas fa-envelope-open-text" aria-hidden="true" />
            </div>
            <h3>2. Get Your Plan</h3>
            <p>
              Receive your QR code and activation details instantly via email.
            </p>
          </article>
          <article className="step-card">
            <div className="step-icon">
              <i className="fas fa-qrcode" aria-hidden="true" />
            </div>
            <h3>3. Scan &amp; Connect</h3>
            <p>
              Scan the code in your settings to install the eSIM. Turn on
              roaming and enjoy.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
