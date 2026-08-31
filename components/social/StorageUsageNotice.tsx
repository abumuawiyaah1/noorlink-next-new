import {
  formatStorageSize,
  SOCIAL_STORAGE_QUOTA_LABEL,
  storageUsagePercent,
  type SocialStorageUsage,
} from "@/lib/social-hub-storage-quota";

type StorageUsageNoticeProps = SocialStorageUsage & {
  backend: "r2" | "local";
};

function usageLevel(percent: number): "ok" | "caution" | "warning" {
  if (percent >= 90) return "warning";
  if (percent >= 75) return "caution";
  return "ok";
}

export function StorageUsageNotice({
  usageBytes,
  quotaBytes,
  quotaLabel,
  backend,
}: StorageUsageNoticeProps) {
  const percent = storageUsagePercent(usageBytes, quotaBytes);
  const level = usageLevel(percent);
  const remainingBytes = Math.max(0, quotaBytes - usageBytes);

  return (
    <aside
      className={`social-hub-storage social-hub-storage--${level}`}
      aria-label="Storage usage"
    >
      <div className="social-hub-storage__head">
        <strong>Cloudflare R2 storage</strong>
        <span>
          {formatStorageSize(usageBytes)} of {quotaLabel} used
        </span>
      </div>

      <div
        className="social-hub-storage__bar"
        role="progressbar"
        aria-valuenow={Math.round(percent)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${Math.round(percent)}% of ${quotaLabel} used`}
      >
        <span style={{ width: `${percent}%` }} />
      </div>

      <p className="social-hub-storage__meta">
        {formatStorageSize(remainingBytes)} remaining
        {backend === "local" ? " (local dev — quota applies in production)" : ""}
      </p>

      <p className="social-hub-storage__reminder">
        Your Cloudflare account includes <strong>{SOCIAL_STORAGE_QUOTA_LABEL} free</strong>{" "}
        R2 storage. This library counts toward that limit — videos use space quickly.
        Delete files marked <strong>Posted</strong> once you no longer need them, and
        check usage in the{" "}
        <a
          href="https://dash.cloudflare.com/?to=/:account/r2/overview"
          target="_blank"
          rel="noopener noreferrer"
        >
          Cloudflare R2 dashboard
        </a>
        .
      </p>

      {level === "caution" ? (
        <p className="social-hub-storage__alert">
          Getting full — remove old videos or posted assets you have saved elsewhere.
        </p>
      ) : null}

      {level === "warning" ? (
        <p className="social-hub-storage__alert social-hub-storage__alert--strong">
          Almost full — upload may fail until you delete files from the library.
        </p>
      ) : null}
    </aside>
  );
}
