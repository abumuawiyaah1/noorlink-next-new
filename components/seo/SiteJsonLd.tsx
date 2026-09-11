import { JsonLd } from "@/components/seo/JsonLd";
import {
  TRUSTPILOT_PROFILE_URL,
  TRUSTPILOT_REVIEW_COUNT,
  TRUSTPILOT_TRUST_SCORE,
} from "@/lib/review-links";
import { SITE_NAME, SITE_URL, absoluteUrl } from "@/lib/seo";

export function SiteJsonLd() {
  return (
    <JsonLd
      data={[
        {
          "@context": "https://schema.org",
          "@type": "Organization",
          name: SITE_NAME,
          url: SITE_URL,
          logo: absoluteUrl("/images/logo.png"),
          email: "support@noorlink.co",
          sameAs: [TRUSTPILOT_PROFILE_URL],
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: TRUSTPILOT_TRUST_SCORE,
            bestRating: 5,
            worstRating: 1,
            reviewCount: TRUSTPILOT_REVIEW_COUNT,
          },
        },
        {
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: SITE_NAME,
          url: SITE_URL,
          potentialAction: {
            "@type": "SearchAction",
            target: {
              "@type": "EntryPoint",
              urlTemplate: `${SITE_URL}/destinations?q={search_term_string}`,
            },
            "query-input": "required name=search_term_string",
          },
        },
      ]}
    />
  );
}
