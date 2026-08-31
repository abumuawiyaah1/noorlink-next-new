export type SocialAssetStatus = "new" | "ready" | "posted";

export type SocialAsset = {
  id: string;
  filename: string;
  contentType: string;
  sizeBytes: number;
  status: SocialAssetStatus;
  partner: string;
  caption: string;
  notes: string;
  uploadedAt: string;
  updatedAt: string;
};

export type SocialAssetManifest = {
  version: 1;
  assets: SocialAsset[];
};

export const SOCIAL_ASSET_STATUSES: SocialAssetStatus[] = [
  "new",
  "ready",
  "posted",
];

export const SOCIAL_ASSET_STATUS_LABELS: Record<SocialAssetStatus, string> = {
  new: "New",
  ready: "Ready to post",
  posted: "Posted",
};
