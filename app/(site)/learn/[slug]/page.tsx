import type { Metadata } from "next";
import "@/styles/content-pages.css";
import "@/styles/learn.css";
import { LearnPostPage } from "@/components/content/LearnPostPage";
import { getLearnPost, LEARN_POSTS } from "@/lib/learn-posts";
import { buildPageMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{ slug: string }> | { slug: string };
};

export function generateStaticParams() {
  return LEARN_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolved = await Promise.resolve(params);
  const post = getLearnPost(resolved.slug);
  if (!post) {
    return buildPageMetadata({
      title: "Learn | NoorLink",
      description: "Travel notes from NoorLink.",
      path: "/learn",
    });
  }

  return buildPageMetadata({
    title: `${post.en.title} | NoorLink`,
    description: post.en.description,
    path: `/learn/${post.slug}`,
  });
}

export default async function Page({ params }: Props) {
  const resolved = await Promise.resolve(params);
  return <LearnPostPage slug={resolved.slug} />;
}
