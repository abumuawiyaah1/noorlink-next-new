"use client";

import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import {
  formatLearnDate,
  learnPostsNewestFirst,
} from "@/lib/learn-posts";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { localizedPath } from "@/lib/i18n/path";
import { useLocaleState } from "@/lib/i18n/use-locale";

export function LearnIndexPage() {
  const [locale] = useLocaleState();
  const dict = getDictionary(locale);
  const page = dict.learnPage;
  const posts = learnPostsNewestFirst(locale);

  return (
    <>
      <SiteHeader />
      <Breadcrumbs
        items={[
          { href: localizedPath("/", locale), label: dict.common.home },
          { label: page.crumb },
        ]}
      />
      <main className="content-page learn-page">
        <section className="content-hero content-hero--compact">
          <div className="content-hero__inner">
            <span className="content-kicker">{page.kicker}</span>
            <h1>{page.title}</h1>
            <p>{page.lede}</p>
          </div>
        </section>

        <div className="content-shell">
          <ul className="learn-list">
            {posts.map((post) => (
              <li key={post.slug}>
                <article className="learn-card">
                  <p className="learn-card__meta">
                    <span>{post.topic}</span>
                    <time dateTime={post.published}>
                      {formatLearnDate(post.published, locale)}
                    </time>
                  </p>
                  <h2>
                    <Link href={localizedPath(`/learn/${post.slug}`, locale)}>
                      {post.title}
                    </Link>
                  </h2>
                  <p>{post.excerpt}</p>
                  <Link
                    href={localizedPath(`/learn/${post.slug}`, locale)}
                    className="learn-card__more"
                  >
                    {page.readNote}
                  </Link>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
