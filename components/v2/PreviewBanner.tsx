import Link from "next/link";
import { PREVIEW_BASE } from "@/lib/v2/preview-paths";

export function PreviewBanner() {
  return (
    <div className="v2-preview-banner" role="status">
      <div className="v2-preview-banner__inner">
        <span className="v2-preview-banner__label">Storefront v2 preview</span>
        <span className="v2-preview-banner__hint">
          This is a design sandbox — live site unchanged at noorlink.co
        </span>
        <div className="v2-preview-banner__actions">
          <Link href={PREVIEW_BASE} className="v2-preview-banner__link">
            Preview home
          </Link>
          <Link href="/" className="v2-preview-banner__link v2-preview-banner__link--ghost">
            ← Current site
          </Link>
        </div>
      </div>
    </div>
  );
}
