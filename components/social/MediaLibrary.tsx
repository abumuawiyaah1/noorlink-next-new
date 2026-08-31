"use client";

import { useCallback, useEffect, useState } from "react";
import { CopyButton } from "@/components/social/CopyButton";
import { StorageUsageNotice } from "@/components/social/StorageUsageNotice";
import {
  formatStorageSize,
  remainingStorageBytes,
  type SocialStorageUsage,
} from "@/lib/social-hub-storage-quota";
import type { SocialAsset, SocialAssetStatus } from "@/lib/social-hub-types";
import {
  SOCIAL_ASSET_STATUS_LABELS,
  SOCIAL_ASSET_STATUSES,
} from "@/lib/social-hub-types";

function assetPreviewUrl(id: string): string {
  return `/api/social/assets/${id}`;
}

function assetDownloadUrl(id: string): string {
  return `/api/social/assets/${id}?download=1`;
}

export function MediaLibrary() {
  const [assets, setAssets] = useState<SocialAsset[]>([]);
  const [storage, setStorage] = useState<SocialStorageUsage | null>(null);
  const [backend, setBackend] = useState<"r2" | "local">("local");
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [partner, setPartner] = useState("");
  const [caption, setCaption] = useState("");
  const [notes, setNotes] = useState("");

  const loadAssets = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/social/assets", { credentials: "same-origin" });
      if (!response.ok) {
        throw new Error("Could not load media library.");
      }
      const data = (await response.json()) as {
        assets: SocialAsset[];
        backend: "r2" | "local";
        storage: SocialStorageUsage;
      };
      setAssets(data.assets);
      setBackend(data.backend);
      setStorage(data.storage);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Load failed.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadAssets();
  }, [loadAssets]);

  async function handleUpload(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const fileInput = form.elements.namedItem("file") as HTMLInputElement | null;
    const file = fileInput?.files?.[0];
    if (!file) {
      setError("Choose a photo or video first.");
      return;
    }

    if (storage && file.size > remainingStorageBytes(storage.usageBytes)) {
      setError(
        `Not enough space left (${formatStorageSize(remainingStorageBytes(storage.usageBytes))} remaining on your ${storage.quotaLabel} R2 quota). Delete old files first.`,
      );
      return;
    }

    setUploading(true);
    setError("");
    const formData = new FormData();
    formData.set("file", file);
    formData.set("partner", partner);
    formData.set("caption", caption);
    formData.set("notes", notes);

    try {
      const response = await fetch("/api/social/assets", {
        method: "POST",
        body: formData,
        credentials: "same-origin",
      });
      const data = (await response.json()) as { error?: string };
      if (!response.ok) {
        throw new Error(data.error ?? "Upload failed.");
      }
      form.reset();
      setPartner("");
      setCaption("");
      setNotes("");
      await loadAssets();
    } catch (uploadError) {
      setError(uploadError instanceof Error ? uploadError.message : "Upload failed.");
    } finally {
      setUploading(false);
    }
  }

  async function updateAsset(
    id: string,
    patch: Partial<Pick<SocialAsset, "status" | "partner" | "caption" | "notes">>,
  ) {
    const response = await fetch(`/api/social/assets/${id}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(patch),
      credentials: "same-origin",
    });
    if (!response.ok) return;
    const data = (await response.json()) as { asset: SocialAsset };
    setAssets((current) =>
      current.map((asset) => (asset.id === id ? data.asset : asset)),
    );
  }

  async function removeAsset(id: string) {
    if (!window.confirm("Delete this file from the library?")) return;
    const response = await fetch(`/api/social/assets/${id}`, {
      method: "DELETE",
      credentials: "same-origin",
    });
    if (!response.ok) return;
    await loadAssets();
  }

  return (
    <section className="social-hub-section" aria-labelledby="social-media-heading">
      <div className="content-section-head">
        <span className="content-kicker">Media library</span>
        <h2 id="social-media-heading">Partner photos &amp; videos</h2>
        <p>
          Upload assets from partners, mark when they are ready to post, and
          download them anytime. Stored on{" "}
          {backend === "r2" ? "Cloudflare R2" : "local dev storage"}.
        </p>
      </div>

      {storage ? (
        <StorageUsageNotice
          usageBytes={storage.usageBytes}
          quotaBytes={storage.quotaBytes}
          quotaLabel={storage.quotaLabel}
          backend={backend}
        />
      ) : null}

      <form className="social-hub-upload" onSubmit={(event) => void handleUpload(event)}>
        <div className="social-hub-upload__row">
          <label className="social-hub-upload__file">
            <span>Photo or video</span>
            <input name="file" type="file" accept="image/*,video/*" required />
          </label>
          <label>
            Partner name
            <input
              type="text"
              value={partner}
              onChange={(event) => setPartner(event.target.value)}
              placeholder="Optional"
            />
          </label>
        </div>
        <label>
          Caption draft
          <textarea
            value={caption}
            onChange={(event) => setCaption(event.target.value)}
            rows={3}
            placeholder="Paste or draft the post caption here"
          />
        </label>
        <label>
          Internal notes
          <input
            type="text"
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            placeholder="e.g. use next week, needs crop"
          />
        </label>
        <button type="submit" className="social-hub-card__cta" disabled={uploading}>
          {uploading ? "Uploading…" : "Upload to library"}
        </button>
      </form>

      {error ? <p className="social-hub-login__error">{error}</p> : null}

      {loading ? (
        <p className="social-hub-muted">Loading library…</p>
      ) : assets.length === 0 ? (
        <p className="social-hub-muted">
          No uploads yet. Add partner photos or videos above.
        </p>
      ) : (
        <div className="social-hub-grid social-hub-grid--media">
          {assets.map((asset) => (
            <MediaAssetCard
              key={asset.id}
              asset={asset}
              onUpdate={updateAsset}
              onDelete={removeAsset}
            />
          ))}
        </div>
      )}
    </section>
  );
}

type MediaAssetCardProps = {
  asset: SocialAsset;
  onUpdate: (
    id: string,
    patch: Partial<Pick<SocialAsset, "status" | "partner" | "caption" | "notes">>,
  ) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
};

function MediaAssetCard({ asset, onUpdate, onDelete }: MediaAssetCardProps) {
  const isImage = asset.contentType.startsWith("image/");
  const isVideo = asset.contentType.startsWith("video/");
  const previewUrl = assetPreviewUrl(asset.id);

  return (
    <article className="social-hub-media-card">
      <div className="social-hub-media-card__preview">
        {isImage ? (
          <img src={previewUrl} alt="" loading="lazy" />
        ) : isVideo ? (
          <video src={previewUrl} controls preload="metadata" />
        ) : (
          <div className="social-hub-media-card__fallback">File</div>
        )}
      </div>
      <div className="social-hub-media-card__body">
        <div className="social-hub-media-card__head">
          <h3 title={asset.filename}>{asset.filename}</h3>
          <span className={`social-hub-status social-hub-status--${asset.status}`}>
            {SOCIAL_ASSET_STATUS_LABELS[asset.status]}
          </span>
        </div>
        <p className="social-hub-muted">
          {formatStorageSize(asset.sizeBytes)} · {new Date(asset.uploadedAt).toLocaleDateString()}
        </p>

        <label>
          Status
          <select
            value={asset.status}
            onChange={(event) =>
              void onUpdate(asset.id, {
                status: event.target.value as SocialAssetStatus,
              })
            }
          >
            {SOCIAL_ASSET_STATUSES.map((status) => (
              <option key={status} value={status}>
                {SOCIAL_ASSET_STATUS_LABELS[status]}
              </option>
            ))}
          </select>
        </label>

        <label>
          Partner
          <input
            type="text"
            defaultValue={asset.partner}
            onBlur={(event) => {
              if (event.target.value !== asset.partner) {
                void onUpdate(asset.id, { partner: event.target.value });
              }
            }}
          />
        </label>

        <label>
          Caption
          <textarea
            defaultValue={asset.caption}
            rows={3}
            onBlur={(event) => {
              if (event.target.value !== asset.caption) {
                void onUpdate(asset.id, { caption: event.target.value });
              }
            }}
          />
        </label>

        {asset.caption ? (
          <CopyButton text={asset.caption} label="Copy caption" />
        ) : null}

        <div className="social-hub-list__actions">
          <a href={assetDownloadUrl(asset.id)} download={asset.filename}>
            Download
          </a>
          <button
            type="button"
            className="social-hub-copy-btn social-hub-copy-btn--danger"
            onClick={() => void onDelete(asset.id)}
          >
            Delete
          </button>
        </div>
      </div>
    </article>
  );
}
