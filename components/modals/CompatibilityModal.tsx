"use client";

import { useEffect, useMemo, useState } from "react";
import { fetchCompatibleDevices, type DeviceBrand } from "@/lib/devices-api";
import { getDictionary, t } from "@/lib/i18n/dictionaries";
import { useLocaleState } from "@/lib/i18n/use-locale";
import "@/styles/compatibility-modal.css";

type CompatibilityModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function CompatibilityModal({ isOpen, onClose }: CompatibilityModalProps) {
  const [locale] = useLocaleState();
  const m = getDictionary(locale).compatModal;
  const [brands, setBrands] = useState<DeviceBrand[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [brandId, setBrandId] = useState("");
  const [modelId, setModelId] = useState("");

  useEffect(() => {
    if (!isOpen) return;

    let cancelled = false;
    setLoading(true);
    setError(null);

    fetchCompatibleDevices()
      .then((data) => {
        if (!cancelled) setBrands(data);
      })
      .catch((err: unknown) => {
        console.error("[CompatibilityModal] Load failed:", err);
        if (!cancelled) {
          setError(err instanceof Error ? err.message : m.loadError);
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [isOpen, m.loadError]);

  useEffect(() => {
    if (!isOpen) {
      setBrandId("");
      setModelId("");
      setError(null);
    }
  }, [isOpen]);

  const selectedBrand = useMemo(
    () => brands.find((brand) => brand.id === brandId) ?? null,
    [brands, brandId],
  );

  const selectedModel = useMemo(
    () => selectedBrand?.models.find((model) => model.id === modelId) ?? null,
    [selectedBrand, modelId],
  );

  if (!isOpen) return null;

  const handleBrandChange = (value: string) => {
    setBrandId(value);
    setModelId("");
  };

  return (
    <div
      className="compatibility-overlay"
      role="presentation"
      onClick={onClose}
      onKeyDown={(e) => {
        if (e.key === "Escape") onClose();
      }}
    >
      <div
        className="compatibility-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="compatibility-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="compatibility-modal__header">
          <div>
            <h2 id="compatibility-modal-title" className="compatibility-modal__title">
              {m.title}
            </h2>
            <p className="compatibility-modal__subtitle">{m.subtitle}</p>
          </div>
          <button
            type="button"
            className="compatibility-modal__close"
            aria-label={m.close}
            onClick={onClose}
          >
            ×
          </button>
        </div>

        {loading && (
          <p className="compatibility-modal__loading">{m.loading}</p>
        )}

        {error && !loading && (
          <p className="compatibility-modal__error">{error}</p>
        )}

        {!loading && !error && (
          <>
            <div className="compatibility-modal__field">
              <label className="compatibility-modal__label" htmlFor="compat-brand">
                {m.selectBrand}
              </label>
              <select
                id="compat-brand"
                className="compatibility-modal__select"
                value={brandId}
                onChange={(e) => handleBrandChange(e.target.value)}
              >
                <option value="">{m.chooseBrand}</option>
                {brands.map((brand) => (
                  <option key={brand.id} value={brand.id}>
                    {brand.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="compatibility-modal__field">
              <label className="compatibility-modal__label" htmlFor="compat-model">
                {m.selectModel}
              </label>
              <select
                id="compat-model"
                className="compatibility-modal__select"
                value={modelId}
                disabled={!selectedBrand}
                onChange={(e) => setModelId(e.target.value)}
              >
                <option value="">
                  {selectedBrand ? m.chooseModel : m.selectBrandFirst}
                </option>
                {selectedBrand?.models.map((model) => (
                  <option key={model.id} value={model.id}>
                    {model.name}
                  </option>
                ))}
              </select>
            </div>
          </>
        )}

        {selectedModel && (
          <div className="compatibility-modal__status">
            <p className="compatibility-modal__status-title">
              <span aria-hidden="true">✓</span> {m.success}
            </p>
            <p className="compatibility-modal__status-text">
              {t(getDictionary(locale), "compatModal.successBody", {
                brand: selectedBrand?.name ?? "",
                model: selectedModel.name,
              })}
            </p>
          </div>
        )}

        <p className="compatibility-modal__note">{m.note}</p>
      </div>
    </div>
  );
}
