"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createPortal } from "react-dom";
import {
  fetchCompatibleDevices,
  type DeviceBrand,
} from "@/lib/devices-api";
import { CompatibilityModal } from "@/components/modals/CompatibilityModal";

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

/**
 * Wires the legacy homepage device checker (#deviceInput / #device-check-btn)
 * to the Railway devices API, and keeps CompatibilityModal as a fallback.
 */
export function DeviceCheckerBridge() {
  const [modalOpen, setModalOpen] = useState(false);
  const [resultNode, setResultNode] = useState<HTMLElement | null>(null);
  const [result, setResult] = useState<{
    ok: boolean;
    title: string;
    detail: string;
  } | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    setResultNode(document.getElementById("result-area"));
  }, []);

  useEffect(() => {
    async function runCheck(event: Event) {
      const target = event.target as Element | null;
      const btn = target?.closest?.("#device-check-btn");
      if (!btn) return;

      event.preventDefault();
      event.stopPropagation();

      const input = document.getElementById(
        "deviceInput",
      ) as HTMLInputElement | null;
      const query = input?.value?.trim() ?? "";

      // Empty input → open brand/model modal
      if (!query) {
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
        const match = findMatch(query, brands);
        if (match) {
          setResult({
            ok: true,
            title: "Great news! Your device is compatible.",
            detail: `${match.brand} ${match.model} supports eSIM.`,
          });
        } else {
          setResult({
            ok: false,
            title: "We couldn't confirm this device.",
            detail:
              "Try a more specific model name, use the picker, or contact support.",
          });
        }
      } catch (err) {
        console.error("[DeviceCheckerBridge]", err);
        setResult({
          ok: false,
          title: "Device check temporarily unavailable.",
          detail: "Please try again in a moment, or contact support.",
        });
      } finally {
        setBusy(false);
      }
    }

    function onKeyDown(event: KeyboardEvent) {
      const input = event.target as HTMLElement | null;
      if (input?.id !== "deviceInput") return;
      if (event.key !== "Enter") return;
      event.preventDefault();
      document.getElementById("device-check-btn")?.click();
    }

    document.addEventListener("click", runCheck, true);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("click", runCheck, true);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  useEffect(() => {
    if (!resultNode) return;
    if (!result) {
      resultNode.style.display = "none";
      resultNode.innerHTML = "";
      return;
    }
    resultNode.style.display = "block";
    resultNode.className = result.ok ? "result-yes" : "result-no";
  }, [result, resultNode]);

  return (
    <>
      {resultNode &&
        result &&
        createPortal(
          <div>
            <p style={{ margin: 0, fontWeight: 700 }}>
              {result.ok ? "✅ " : "⚠️ "}
              {result.title}
            </p>
            <p style={{ margin: "8px 0 0" }}>{result.detail}</p>
            {result.ok ? (
              <p style={{ margin: "12px 0 0" }}>
                <Link
                  href="/destinations"
                  style={{
                    display: "inline-block",
                    background: "var(--primary)",
                    color: "white",
                    padding: "10px 24px",
                    borderRadius: 50,
                    textDecoration: "none",
                    fontWeight: 700,
                  }}
                >
                  Shop Data Plans
                </Link>
              </p>
            ) : (
              <p style={{ margin: "8px 0 0" }}>
                <button
                  type="button"
                  className="check-btn"
                  style={{ marginRight: 12 }}
                  disabled={busy}
                  onClick={() => setModalOpen(true)}
                >
                  Open device picker
                </button>
                <Link href="/support" style={{ textDecoration: "underline" }}>
                  Contact Support
                </Link>
              </p>
            )}
          </div>,
          resultNode,
        )}

      <CompatibilityModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}
