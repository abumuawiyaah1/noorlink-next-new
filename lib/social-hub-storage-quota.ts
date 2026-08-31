/** Cloudflare R2 free tier — keep media library under this cap. */
export const SOCIAL_STORAGE_QUOTA_BYTES = 10 * 1024 * 1024 * 1024;
export const SOCIAL_STORAGE_QUOTA_LABEL = "10 GB";

export type SocialStorageUsage = {
  usageBytes: number;
  quotaBytes: number;
  quotaLabel: string;
};

export function sumAssetBytes(assets: { sizeBytes: number }[]): number {
  return assets.reduce((total, asset) => total + asset.sizeBytes, 0);
}

export function buildSocialStorageUsage(
  assets: { sizeBytes: number }[],
): SocialStorageUsage {
  return {
    usageBytes: sumAssetBytes(assets),
    quotaBytes: SOCIAL_STORAGE_QUOTA_BYTES,
    quotaLabel: SOCIAL_STORAGE_QUOTA_LABEL,
  };
}

export function storageUsagePercent(usageBytes: number, quotaBytes: number): number {
  if (quotaBytes <= 0) return 0;
  return Math.min(100, (usageBytes / quotaBytes) * 100);
}

export function formatStorageSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
}

export function remainingStorageBytes(usageBytes: number): number {
  return Math.max(0, SOCIAL_STORAGE_QUOTA_BYTES - usageBytes);
}

export function assertStorageQuota(
  currentUsageBytes: number,
  incomingBytes: number,
): void {
  if (currentUsageBytes + incomingBytes > SOCIAL_STORAGE_QUOTA_BYTES) {
    const remaining = remainingStorageBytes(currentUsageBytes);
    throw new Error(
      `Storage limit reached (${SOCIAL_STORAGE_QUOTA_LABEL} on Cloudflare R2). ` +
        `${formatStorageSize(remaining)} left — delete posted or old files first.`,
    );
  }
}
