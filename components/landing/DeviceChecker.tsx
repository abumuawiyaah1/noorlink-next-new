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
import { getDictionary, t } from "@/lib/i18n/dictionaries";
import { useLocaleState } from "@/lib/i18n/use-locale";

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
  const [locale] = useLocaleState();
  const dict = getDictionary(locale);
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
      title: dict.phoneCheck.checking,
      detail: dict.phoneCheck.checkingDetail,
    });

    try {
      const brands = await fetchCompatibleDevices();
      const match = findMatch(trimmed, brands);
      if (match) {
        setResult({
          ok: true,
          title: dict.phoneCheck.okTitle,
          detail: t(dict, "phoneCheck.okDetail", {
            device: `${match.brand} ${match.model}`,
          }),
        });
      } else {
        reportDeviceCheckMiss(trimmed);
        setResult({
          ok: false,
          title: dict.phoneCheck.missTitle,
          detail: dict.phoneCheck.missDetail,
        });
      }
    } catch (err) {
      console.error("[DeviceChecker]", err);
      setResult({
        ok: false,
        title: dict.phoneCheck.errorTitle,
        detail: dict.phoneCheck.errorDetail,
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
          {dict.phoneCheck.title}
        </h2>
        <p className="checker-seo-lead">
          {dict.phoneCheck.lead}
        </p>
        <div className="checker-box">
          <div className="check-input-group">
            <input
              type="text"
              className="check-input"
              value={query}
              placeholder={dict.phoneCheck.placeholder}
              aria-label={dict.phoneCheck.aria}
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
              {busy ? dict.phoneCheck.checking : dict.phoneCheck.button}
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
                    {dict.phoneCheck.shopPlans}
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
                    {dict.phoneCheck.openPicker}
                  </button>
                  <Link href="/support" style={{ textDecoration: "underline" }}>
                    {dict.phoneCheck.contactSupport}
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
