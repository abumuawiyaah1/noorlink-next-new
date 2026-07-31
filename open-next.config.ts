// OpenNext Cloudflare config
// https://opennext.js.org/cloudflare
import { defineCloudflareConfig } from "@opennextjs/cloudflare";
// Optional: enable R2 incremental cache for ISR / fetch cache in production
// import r2IncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/r2-incremental-cache";

export default defineCloudflareConfig({
	// incrementalCache: r2IncrementalCache,
});
