import type { Metadata } from "next";
import { ShortHelpGuidePage } from "@/components/support/ShortHelpGuidePage";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getRequestLocale } from "@/lib/i18n/request-locale";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale();
  const help = getDictionary(locale).helpPage;
  return buildPageMetadata({
    title: `${help.phoneCheckTitle} | NoorLink`,
    description: help.phoneCheckIntro,
    path: "/help/hajj-umrah-phone-check",
  });
}

export default async function Page() {
  const locale = await getRequestLocale();
  const help = getDictionary(locale).helpPage;

  return (
    <ShortHelpGuidePage
      breadcrumbLabel={help.phoneCheckCrumb}
      title={help.phoneCheckTitle}
      intro={help.phoneCheckIntro}
      sections={[
        { title: help.phoneCheckS1Title, body: help.phoneCheckS1Body },
        { title: help.phoneCheckS2Title, body: help.phoneCheckS2Body },
        { title: help.phoneCheckS3Title, body: help.phoneCheckS3Body },
        { title: help.phoneCheckS4Title, body: help.phoneCheckS4Body },
      ]}
      primaryCta={{
        href: "/hajj-umrah",
        label: help.phoneCheckPrimaryCta,
      }}
      secondaryCta={{
        href: "/#device-checker",
        label: help.phoneCheckSecondaryCta,
      }}
    />
  );
}
