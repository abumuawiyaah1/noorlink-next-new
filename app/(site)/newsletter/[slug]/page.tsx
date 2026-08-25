import "@/styles/content-pages.css";
import "@/styles/insider.css";
import { InsiderIssuePage } from "@/components/insider/InsiderIssuePage";
import { INSIDER_ISSUES } from "@/lib/insider-issues";

type Props = {
  params: Promise<{ slug: string }> | { slug: string };
};

export function generateStaticParams() {
  return INSIDER_ISSUES.map((issue) => ({ slug: issue.slug }));
}

export default async function NewsletterIssueRoute({ params }: Props) {
  const resolved = await Promise.resolve(params);
  return <InsiderIssuePage slug={resolved.slug} />;
}
