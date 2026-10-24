import type { Metadata } from "next";
import "@/styles/content-pages.css";
import { PolicyPageShell } from "@/components/content/PolicyPageShell";
import { getPolicy } from "@/lib/i18n/policies";
import { getRequestLocale } from "@/lib/i18n/request-locale";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale();
  const policy = getPolicy(locale, "terms");
  return buildPageMetadata({
    title: policy.metaTitle,
    description: policy.metaDescription,
    path: "/terms",
  });
}

export default async function Page() {
  const locale = await getRequestLocale();
  const policy = getPolicy(locale, "terms");
  return (
    <PolicyPageShell
      locale={locale}
      title={policy.title}
      badge={policy.badge}
      sections={policy.sections}
    />
  );
}
