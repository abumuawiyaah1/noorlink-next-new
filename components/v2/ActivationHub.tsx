"use client";

import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import { WHATSAPP_NUMBER } from "@/components/ui/WhatsAppFab";

export type ActivationData = {
  qrCodeUrl?: string | null;
  lpaString?: string | null;
  activationCode?: string | null;
  smdpAddress?: string | null;
  iccid?: string | null;
  orderNumber?: string | null;
  email?: string | null;
};

type Tab = "qr" | "one-tap" | "manual";

function buildIosInstallUrl(lpa: string): string {
  const encoded = encodeURIComponent(lpa);
  return `https://esimsetup.apple.com/esim_qrcode_provisioning?carddata=${encoded}`;
}

export function ActivationHub({
  data,
  demo = false,
}: {
  data: ActivationData;
  demo?: boolean;
}) {
  const [tab, setTab] = useState<Tab>("qr");
  const [copied, setCopied] = useState<string | null>(null);

  const lpa =
    data.lpaString?.trim() ||
    (data.activationCode?.startsWith("LPA:")
      ? data.activationCode
      : data.smdpAddress && data.activationCode
        ? `LPA:1$${data.smdpAddress}$${data.activationCode}`
        : null);

  const iosUrl = lpa ? buildIosInstallUrl(lpa) : null;

  const copy = useCallback(async (label: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(label);
      window.setTimeout(() => setCopied(null), 2000);
    } catch {
      setCopied("error");
    }
  }, []);

  const qrSrc = useMemo(() => {
    if (data.qrCodeUrl) return data.qrCodeUrl;
    if (lpa) {
      return `https://api.qrserver.com/v1/create-qr-code/?size=280x280&data=${encodeURIComponent(lpa)}`;
    }
    return null;
  }, [data.qrCodeUrl, lpa]);

  return (
    <section className="v2-activation-hub" aria-labelledby="v2-activation-title">
      <div className="v2-activation-hub__head">
        <h2 id="v2-activation-title">Install your eSIM</h2>
        {demo ? (
          <span className="v2-activation-hub__demo">Demo preview — sample QR</span>
        ) : data.orderNumber ? (
          <span className="v2-activation-hub__order">Order {data.orderNumber}</span>
        ) : null}
      </div>

      <div className="v2-activation-hub__tabs" role="tablist">
        {(
          [
            ["qr", "Scan QR"],
            ["one-tap", "One-tap (iOS)"],
            ["manual", "Manual"],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={tab === id}
            className={`v2-activation-hub__tab${tab === id ? " is-active" : ""}`}
            onClick={() => setTab(id)}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === "qr" ? (
        <div className="v2-activation-hub__panel" role="tabpanel">
          {qrSrc ? (
            <img
              src={qrSrc}
              alt="eSIM QR code for installation"
              className="v2-activation-hub__qr"
              width={280}
              height={280}
            />
          ) : (
            <div className="v2-activation-hub__placeholder">
              QR will appear here once your order is fulfilled.
            </div>
          )}
          <p className="v2-activation-hub__hint">
            Settings → Cellular → Add eSIM → Scan QR code. Enable data roaming after install.
          </p>
        </div>
      ) : null}

      {tab === "one-tap" ? (
        <div className="v2-activation-hub__panel" role="tabpanel">
          {iosUrl ? (
            <>
              <a href={iosUrl} className="v2-activation-hub__ios-btn">
                Install on iPhone
              </a>
              <p className="v2-activation-hub__hint">
                Opens Apple&apos;s eSIM setup. Use on iOS 17.4+ with Safari.
              </p>
            </>
          ) : (
            <p className="v2-activation-hub__hint">
              One-tap install appears when LPA data is available from your order.
            </p>
          )}
        </div>
      ) : null}

      {tab === "manual" ? (
        <div className="v2-activation-hub__panel" role="tabpanel">
          {lpa ? (
            <div className="v2-activation-hub__field">
              <label>LPA string</label>
              <code className="v2-activation-hub__code">{lpa}</code>
              <button type="button" onClick={() => copy("lpa", lpa)}>
                {copied === "lpa" ? "Copied!" : "Copy LPA"}
              </button>
            </div>
          ) : null}
          {data.smdpAddress ? (
            <div className="v2-activation-hub__field">
              <label>SM-DP+ address</label>
              <code className="v2-activation-hub__code">{data.smdpAddress}</code>
              <button type="button" onClick={() => copy("smdp", data.smdpAddress!)}>
                {copied === "smdp" ? "Copied!" : "Copy"}
              </button>
            </div>
          ) : null}
          {data.activationCode && !data.activationCode.startsWith("LPA:") ? (
            <div className="v2-activation-hub__field">
              <label>Activation code</label>
              <code className="v2-activation-hub__code">{data.activationCode}</code>
              <button type="button" onClick={() => copy("ac", data.activationCode!)}>
                {copied === "ac" ? "Copied!" : "Copy"}
              </button>
            </div>
          ) : null}
        </div>
      ) : null}

      <div className="v2-activation-hub__footer">
        <Link href="/preview/dashboard" className="v2-btn v2-btn--ghost">
          My eSIMs
        </Link>
        <a href={`https://wa.me/${WHATSAPP_NUMBER}`} className="v2-btn v2-btn--whatsapp">
          WhatsApp help
        </a>
      </div>
    </section>
  );
}
