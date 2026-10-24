"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import {
  formatLearnDate,
  getLocalizedLearnPost,
  learnPostsNewestFirst,
} from "@/lib/learn-posts";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { localizedPath } from "@/lib/i18n/path";
import { useLocaleState } from "@/lib/i18n/use-locale";

export function LearnPostPage({ slug }: { slug: string }) {
  const [locale] = useLocaleState();
  const dict = getDictionary(locale);
  const page = dict.learnPage;
  const post = getLocalizedLearnPost(slug, locale);
  if (!post) notFound();

  const more = learnPostsNewestFirst(locale)
    .filter((item) => item.slug !== post.slug)
    .slice(0, 2);

  return (
    <>
      <SiteHeader />
      <Breadcrumbs
        items={[
          { href: localizedPath("/", locale), label: dict.common.home },
          { href: localizedPath("/learn", locale), label: page.crumb },
          { label: post.title },
        ]}
      />
      <main className="content-page learn-page">
        <section className="content-hero content-hero--compact">
          <div className="content-hero__inner">
            <span className="content-kicker">{post.topic}</span>
            <h1>{post.title}</h1>
            <p className="learn-post__date">
              <time dateTime={post.published}>
                {formatLearnDate(post.published, locale)}
              </time>
            </p>
          </div>
        </section>

        <div className="content-shell">
          <article className="learn-post">
            {post.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}

            <aside className="learn-pivot">
              <span className="content-kicker">{page.stayingConnected}</span>
              <h2>{post.pivotTitle}</h2>
              <p>{post.pivot}</p>
              <ul>
                {post.links.map((link) => (
                  <li key={link.href}>
                    <Link href={localizedPath(link.href, locale)}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </aside>
          </article>

          {more.length > 0 ? (
            <section className="learn-more" aria-labelledby="learn-more-heading">
              <h2 id="learn-more-heading">{page.moreNotes}</h2>
              <ul>
                {more.map((item) => (
                  <li key={item.slug}>
                    <Link href={localizedPath(`/learn/${item.slug}`, locale)}>
                      {item.title}
                    </Link>
                    <span>{item.topic}</span>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
