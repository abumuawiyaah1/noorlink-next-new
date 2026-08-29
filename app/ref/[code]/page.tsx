import { redirect } from "next/navigation";

const BACKEND =
  process.env.BACKEND_API_URL?.replace(/\/$/, "") || "https://api.noorlink.co";

type Props = {
  params: Promise<{ code: string }>;
};

export default async function AffiliateRedirectPage({ params }: Props) {
  const { code } = await params;
  const normalized = code
    .trim()
    .toUpperCase()
    .replace(/[^A-Z0-9-]/g, "")
    .slice(0, 32);

  if (!normalized) {
    redirect("/destinations");
  }

  let landingPath = "/destinations";

  try {
    const res = await fetch(
      `${BACKEND}/api/affiliate/resolve?ref=${encodeURIComponent(normalized)}`,
      { cache: "no-store" },
    );
    if (res.ok) {
      const data = (await res.json()) as {
        valid?: boolean;
        landingPath?: string;
      };
      if (data.valid && data.landingPath?.startsWith("/")) {
        landingPath = data.landingPath;
      }
    }
  } catch {
    /* default landing */
  }

  redirect(`${landingPath}?ref=${encodeURIComponent(normalized)}`);
}
