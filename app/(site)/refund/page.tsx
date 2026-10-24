import type { Metadata } from "next";
import "@/styles/content-pages.css";
import { PolicyPageShell } from "@/components/content/PolicyPageShell";
import { getPolicy } from "@/lib/i18n/policies";
import { getRequestLocale } from "@/lib/i18n/request-locale";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale();
  const policy = getPolicy(locale, "refund");
  return buildPageMetadata({
    title: policy.metaTitle,
    description: policy.metaDescription,
    path: "/refund",
  });
}

export default async function Page() {
  const locale = await getRequestLocale();
  const policy = getPolicy(locale, "refund");
  return (
    <PolicyPageShell
      locale={locale}
      title={policy.title}
      badge={policy.badge}
      alert={policy.alert}
      sections={policy.sections}
    />
  );
}
