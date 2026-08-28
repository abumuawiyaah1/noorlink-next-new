import { JsonLd } from "@/components/seo/JsonLd";
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
          sameAs: ["https://www.trustpilot.com/review/noorlink.co"],
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
