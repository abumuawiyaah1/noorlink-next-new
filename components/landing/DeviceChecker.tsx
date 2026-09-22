"use client";

import { useState } from "react";
import Link from "next/link";
import {
  fetchCompatibleDevices,
  reportDeviceCheckMiss,
  type DeviceBrand,
} from "@/lib/devices-api";
import { CompatibilityModal } from "@/components/modals/CompatibilityModal";
import { PhoneDeviceIcon } from "@/components/ui/PhoneDeviceIcon";

function normalize(value: string): string {
  return value.trim().toLowerCase().replace(/\s+/g, " ");
}

function findMatch(
  query: string,
  brands: DeviceBrand[],
): { brand: string; model: string } | null {
  const q = normalize(query);
  if (q.length < 2) return null;

  for (const brand of brands) {
    for (const model of brand.models) {
      const full = normalize(`${brand.name} ${model.name}`);
      const modelOnly = normalize(model.name);
      if (full.includes(q) || modelOnly.includes(q) || q.includes(modelOnly)) {
        return { brand: brand.name, model: model.name };
      }
    }
  }
  return null;
}

export function DeviceChecker() {
  const [query, setQuery] = useState("");
  const [busy, setBusy] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [result, setResult] = useState<{
    ok: boolean;
    title: string;
    detail: string;
  } | null>(null);

  async function runCheck() {
    const trimmed = query.trim();
    if (!trimmed) {
      setModalOpen(true);
      return;
    }

    setBusy(true);
    setResult({
      ok: false,
      title: "Checking…",
      detail: "Looking up compatible devices.",
    });

    try {
      const brands = await fetchCompatibleDevices();
      const match = findMatch(trimmed, brands);
      if (match) {
        setResult({
          ok: true,
          title: "Great news — your device supports eSIM.",
          detail: `${match.brand} ${match.model} can use NoorLink. Confirm it is carrier-unlocked before you buy.`,
        });
      } else {
        reportDeviceCheckMiss(trimmed);
        setResult({
          ok: false,
          title: "We could not confirm this device.",
          detail:
            "Try a more specific model name, use the picker, or contact support.",
        });
      }
    } catch (err) {
      console.error("[DeviceChecker]", err);
      setResult({
        ok: false,
        title: "Device check is temporarily unavailable.",
        detail: "Please try again in a moment, or contact support.",
      });
    } finally {
      setBusy(false);
    }
  }

  return (
    <section id="device-checker" className="checker-section" aria-labelledby="device-checker-heading">
      <div className="container">
        <div className="check-icon-large">
          <PhoneDeviceIcon className="check-icon-large__svg" />
        </div>
        <h2 id="device-checker-heading" style={{ fontSize: "2rem", color: "var(--primary)" }}>
          Free phone check — is your device eSIM compatible?
        </h2>
        <p className="checker-seo-lead">
          Free travel eSIM compatibility check for your phone. Confirm it supports
          eSIM and is carrier-unlocked before you buy.
        </p>
        <div className="checker-box">
          <div className="check-input-group">
            <input
              type="text"
              className="check-input"
              value={query}
              placeholder="e.g. iPhone 14, Samsung S23"
              aria-label="Phone model for free eSIM compatibility check"
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  void runCheck();
                }
              }}
            />
            <button
              type="button"
              className="check-btn"
              disabled={busy}
              onClick={() => void runCheck()}
            >
              {busy ? "Checking…" : "Check for free"}
            </button>
          </div>
          {result && (
            <div
              id="result-area"
              className={result.ok ? "result-yes" : "result-no"}
              style={{ display: "block" }}
              role="status"
            >
              <p style={{ margin: 0, fontWeight: 700 }}>{result.title}</p>
              <p style={{ margin: "8px 0 0" }}>{result.detail}</p>
              {result.ok ? (
                <p style={{ margin: "12px 0 0" }}>
                  <Link href="/destinations" className="check-btn" style={{ display: "inline-block", padding: "10px 24px" }}>
                    Shop data plans
                  </Link>
                </p>
              ) : (
                <p style={{ margin: "12px 0 0" }}>
                  <button
                    type="button"
                    className="check-btn"
                    style={{ marginRight: 12 }}
                    onClick={() => setModalOpen(true)}
                  >
                    Open device picker
                  </button>
                  <Link href="/support" style={{ textDecoration: "underline" }}>
                    Contact support
                  </Link>
                </p>
              )}
            </div>
          )}
        </div>
      </div>
      <CompatibilityModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </section>
  );
}
