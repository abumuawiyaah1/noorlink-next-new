"use client";

import { useState } from "react";
import type { LookedUpOrder } from "@/lib/orders-api";
import { isSafeQrCodeUrl, safeExternalHref } from "@/lib/safe-url";

type EsimInstallPanelProps = {
  order: LookedUpOrder;
  compact?: boolean;
};

export function EsimInstallPanel({ order, compact = false }: EsimInstallPanelProps) {
  const [copied, setCopied] = useState<"lpa" | "code" | null>(null);
  const qrHref = safeExternalHref(order.qrCodeUrl, isSafeQrCodeUrl);
  const iosHref = safeExternalHref(order.iosTapLink, isAppleInstallUrl);
  const androidHref = safeExternalHref(order.androidTapLink, isAndroidInstallUrl);
  const lpa = (order.lpaString || "").trim();
  const matchingId = (order.activationCode || "").trim();

  if (!qrHref && !iosHref && !androidHref && !lpa && !matchingId) {
    return null;
  }

  async function copyText(value: string, kind: "lpa" | "code") {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(kind);
      window.setTimeout(() => setCopied(null), 2000);
    } catch {
      /* ignore */
    }
  }

  return (
    <section className={`esim-install${compact ? " esim-install--compact" : ""}`}>
      <header className="esim-install__head">
        <p className="esim-install__eyebrow">NoorLink eSIM</p>
        <h2 className="esim-install__title">Install your eSIM</h2>
        <p className="esim-install__lede">
          Scan the branded QR, or tap a one-tap link on your phone if you can’t scan.
        </p>
      </header>

      <div className="esim-install__grid">
        {qrHref ? (
          <div className="esim-install__qr">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={qrHref}
              alt="NoorLink eSIM QR code"
              width={220}
              height={220}
            />
            <p className="esim-install__caption">Scan with your phone camera</p>
          </div>
        ) : null}

        <div className="esim-install__actions">
          {iosHref ? (
            <a className="esim-install__btn esim-install__btn--primary" href={iosHref}>
              Install on iPhone
            </a>
          ) : null}
          {androidHref ? (
            <a
              className="esim-install__btn esim-install__btn--secondary"
              href={androidHref}
            >
              Install on Android
            </a>
          ) : null}

          {matchingId ? (
            <div className="esim-install__code">
              <span>Matching ID</span>
              <strong>{matchingId}</strong>
              <button
                type="button"
                className="esim-install__copy"
                onClick={() => void copyText(matchingId, "code")}
              >
                {copied === "code" ? "Copied" : "Copy"}
              </button>
            </div>
          ) : null}

          {lpa ? (
            <div className="esim-install__lpa">
              <div className="esim-install__lpa-head">
                <span>Activation code (manual)</span>
                <button
                  type="button"
                  className="esim-install__copy"
                  onClick={() => void copyText(lpa, "lpa")}
                >
                  {copied === "lpa" ? "Copied" : "Copy"}
                </button>
              </div>
              <code>{lpa}</code>
            </div>
          ) : null}

          <ol className="esim-install__steps">
            <li>Connect to Wi‑Fi before you install.</li>
            <li>Scan the QR or tap Install on this phone.</li>
            <li>After landing, turn on the NoorLink line and enable data roaming.</li>
          </ol>
        </div>
      </div>
    </section>
  );
}

function isAppleInstallUrl(value: string | null | undefined): boolean {
  if (!value) return false;
  try {
    const url = new URL(value.trim());
    return (
      url.protocol === "https:" &&
      url.hostname === "esimsetup.apple.com"
    );
  } catch {
    return false;
  }
}

function isAndroidInstallUrl(value: string | null | undefined): boolean {
  if (!value) return false;
  try {
    const url = new URL(value.trim());
    return (
      url.protocol === "https:" &&
      url.hostname === "esimsetup.android.com"
    );
  } catch {
    return false;
  }
}
