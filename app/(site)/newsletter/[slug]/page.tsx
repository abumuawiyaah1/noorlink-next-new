import type { Metadata } from "next";
import "@/styles/content-pages.css";
import "@/styles/insider.css";
import { InsiderIssuePage } from "@/components/insider/InsiderIssuePage";
import { getInsiderIssue, INSIDER_ISSUES } from "@/lib/insider-issues";
import { buildPageMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{ slug: string }> | { slug: string };
};

export function generateStaticParams() {
  return INSIDER_ISSUES.map((issue) => ({ slug: issue.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolved = await Promise.resolve(params);
  const issue = getInsiderIssue(resolved.slug);
  if (!issue) {
    return buildPageMetadata({
      title: "Insider issue | NoorLink",
      description: "NoorLink Insider monthly travel newsletter.",
      path: "/newsletter",
    });
  }

  return buildPageMetadata({
    title: `${issue.subject} | NoorLink Insider`,
    description: issue.preview,
    path: `/newsletter/${issue.slug}`,
    image: issue.heroImage,
  });
}

export default async function NewsletterIssueRoute({ params }: Props) {
  const resolved = await Promise.resolve(params);
  return <InsiderIssuePage slug={resolved.slug} />;
}
