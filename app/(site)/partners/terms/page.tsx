import type { Metadata } from "next";
import Link from "next/link";
import "@/styles/content-pages.css";
import { PolicyPageShell } from "@/components/content/PolicyPageShell";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { localizedPath } from "@/lib/i18n/path";
import { getPolicy } from "@/lib/i18n/policies";
import { getRequestLocale } from "@/lib/i18n/request-locale";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale();
  const policy = getPolicy(locale, "partners-terms");
  return buildPageMetadata({
    title: policy.metaTitle,
    description: policy.metaDescription,
    path: "/partners/terms",
  });
}

export default async function PartnerTermsPage() {
  const locale = await getRequestLocale();
  const policy = getPolicy(locale, "partners-terms");
  const dict = getDictionary(locale);
  const p = dict.partnersPage;

  return (
    <PolicyPageShell
      locale={locale}
      title={policy.title}
      badge={policy.badge}
      subtitle={policy.subtitle}
      breadcrumbItems={[
        { href: "/", label: dict.common.home },
        { href: "/partners", label: p.crumb },
        { label: policy.title },
      ]}
      sections={policy.sections}
    >
      <p className="partner-apply__links">
        <Link href={localizedPath("/partners#apply", locale)}>
          {p.applyCta}
        </Link>
        {" · "}
        <Link href={localizedPath("/partners#login", locale)}>
          {p.signInCta}
        </Link>
        {" · "}
        <Link href={localizedPath("/terms", locale)}>
          {dict.checkout.terms}
        </Link>
      </p>
    </PolicyPageShell>
  );
}
