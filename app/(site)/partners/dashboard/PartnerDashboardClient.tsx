"use client";

import Link from "next/link";
import { PartnerLoginPanel } from "@/components/partners/PartnerLoginPanel";
import "@/styles/content-pages.css";
import "@/styles/help-pages.css";

export function PartnerDashboardClient() {
  return (
    <div className="container" style={{ maxWidth: 640, padding: "2rem 1rem 4rem" }}>
      <p className="text-muted small">
        <Link href="/partners#login">← Partner programs</Link>
      </p>
      <h1 style={{ color: "var(--primary, #0F3D3E)" }}>Partner dashboard</h1>
      <p style={{ color: "#334155" }}>
        Enter your partner code and the email on file with NoorLink.
      </p>
      <div style={{ marginTop: "1.5rem" }}>
        <PartnerLoginPanel />
      </div>
    </div>
  );
}
