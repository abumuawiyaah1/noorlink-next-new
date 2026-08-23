const stats = [
  { value: "190+", label: "Countries covered", icon: "🌍" },
  { value: "Instant", label: "QR delivery", icon: "⚡" },
  { value: "Hotspot", label: "Included on plans", icon: "📶" },
  { value: "24/7", label: "WhatsApp support", icon: "💬" },
] as const;

export function TrustStatsBar() {
  return (
    <section className="trust-stats-bar" aria-label="NoorLink highlights">
      <div className="container">
        <div className="trust-stats-grid">
          {stats.map((item) => (
            <div key={item.label} className="trust-stat">
              <span className="trust-stat-icon" aria-hidden="true">
                {item.icon}
              </span>
              <div>
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
