import type { Metadata } from "next";
import { ShortHelpGuidePage } from "@/components/support/ShortHelpGuidePage";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getRequestLocale } from "@/lib/i18n/request-locale";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale();
  const help = getDictionary(locale).helpPage;
  return buildPageMetadata({
    title: `${help.umrahBeforeFlyTitle} | NoorLink`,
    description: help.umrahBeforeFlyIntro,
    path: "/help/umrah-esim-before-you-fly",
  });
}

export default async function Page() {
  const locale = await getRequestLocale();
  const help = getDictionary(locale).helpPage;

  return (
    <ShortHelpGuidePage
      breadcrumbLabel={help.umrahBeforeFlyCrumb}
      title={help.umrahBeforeFlyTitle}
      intro={help.umrahBeforeFlyIntro}
      sections={[
        { title: help.umrahBeforeFlyS1Title, body: help.umrahBeforeFlyS1Body },
        { title: help.umrahBeforeFlyS2Title, body: help.umrahBeforeFlyS2Body },
        { title: help.umrahBeforeFlyS3Title, body: help.umrahBeforeFlyS3Body },
        { title: help.umrahBeforeFlyS4Title, body: help.umrahBeforeFlyS4Body },
      ]}
      primaryCta={{
        href: "/hajj-umrah",
        label: help.umrahBeforeFlyPrimaryCta,
      }}
      secondaryCta={{
        href: "/#device-checker",
        label: help.umrahBeforeFlySecondaryCta,
      }}
    />
  );
}
