import type { Metadata } from "next";

export const SITE_NAME = "NoorLink";
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://noorlink.co"
);

/** Default social share image (1200×630). */
export const DEFAULT_OG_IMAGE = "/images/og.jpg";

export const NOINDEX_ROBOTS: Metadata["robots"] = {
  index: false,
  follow: false,
  googleBot: { index: false, follow: false },
};

export function absoluteUrl(path: string): string {
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function buildPageMetadata(input: {
  title: string;
  description: string;
  path: string;
  image?: string;
  noIndex?: boolean;
}): Metadata {
  const url = absoluteUrl(input.path);
  const image = absoluteUrl(input.image ?? DEFAULT_OG_IMAGE);

  return {
    title: input.title,
    description: input.description,
    alternates: { canonical: url },
    openGraph: {
      title: input.title,
      description: input.description,
      url,
      siteName: SITE_NAME,
      type: "website",
      locale: "en_US",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: input.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: input.title,
      description: input.description,
      images: [image],
    },
    ...(input.noIndex ? { robots: NOINDEX_ROBOTS } : {}),
  };
}

export const ROOT_METADATA: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "NoorLink | Instant Travel eSIMs",
    template: "%s",
  },
  description:
    "Instant high-speed travel eSIM data in 190+ countries. Install before you fly — no physical SIM, no roaming shock.",
  icons: { icon: "/images/favicon.png" },
  openGraph: {
    siteName: SITE_NAME,
    type: "website",
    locale: "en_US",
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "NoorLink travel eSIM",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@noorlink",
  },
};
