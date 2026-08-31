"use client";

import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { CopyButton } from "@/components/social/CopyButton";
import { MediaLibrary } from "@/components/social/MediaLibrary";
import {
  SOCIAL_BRAND_ASSETS,
  SOCIAL_CAPTION_TEMPLATES,
  SOCIAL_HASHTAGS,
  SOCIAL_KEY_LINKS,
  SOCIAL_POST_WORKFLOW,
  SOCIAL_PROFILE_COPY,
  SOCIAL_QUICK_LINKS,
} from "@/lib/social-hub";
import "@/styles/content-pages.css";
import "@/styles/social-hub.css";

export function SocialHubPage({ onLogout }: { onLogout: () => void }) {
  return (
    <>
      <Breadcrumbs
        items={[
          { href: "/", label: "Home" },
          { label: "Social toolkit" },
        ]}
      />
      <main className="content-page social-hub-page">
        <section className="content-hero content-hero--compact">
          <div className="content-hero__inner">
            <span className="content-kicker">NoorLink team</span>
            <h1>Social toolkit</h1>
            <p>
              Store partner media, open Meta tools, copy captions, and download
              brand assets for Facebook and Instagram.
            </p>
            <div className="social-hub-hero-actions">
              <p className="content-hero__badge">
                Team access only · bookmark this page
              </p>
              <button
                type="button"
                className="social-hub-copy-btn"
                onClick={onLogout}
              >
                Sign out
              </button>
            </div>
          </div>
        </section>

        <div className="content-shell social-hub-shell">
          <MediaLibrary />
          <section className="social-hub-section" aria-labelledby="social-quick-heading">
            <div className="content-section-head">
              <span className="content-kicker">Quick access</span>
              <h2 id="social-quick-heading">Open your social accounts</h2>
              <p>One click to the tools you use to publish and monitor posts.</p>
            </div>
            <div className="social-hub-grid social-hub-grid--links">
              {SOCIAL_QUICK_LINKS.map((item) => (
                <article key={item.href} className="social-hub-card">
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-hub-card__cta"
                  >
                    {item.cta}
                  </a>
                </article>
              ))}
            </div>
          </section>

          <section className="social-hub-section" aria-labelledby="social-workflow-heading">
            <div className="content-section-head">
              <span className="content-kicker">Workflow</span>
              <h2 id="social-workflow-heading">How to post today</h2>
              <p>
                Instagram is not fully linked in Business Suite yet — post to both
                platforms with the same image and caption until Meta finishes the
                Business switch.
              </p>
            </div>
            <ol className="social-hub-workflow">
              {SOCIAL_POST_WORKFLOW.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </section>

          <section className="social-hub-section" aria-labelledby="social-captions-heading">
            <div className="content-section-head">
              <span className="content-kicker">Captions</span>
              <h2 id="social-captions-heading">Ready-to-post copy</h2>
              <p>Calm, practical tone. Edit the bracketed line, then copy.</p>
            </div>
            <div className="social-hub-grid">
              {SOCIAL_CAPTION_TEMPLATES.map((template) => (
                <article key={template.id} className="social-hub-card social-hub-card--copy">
                  <div className="social-hub-card__head">
                    <h3>{template.label}</h3>
                    <CopyButton text={template.text} />
                  </div>
                  <pre className="social-hub-copy">{template.text}</pre>
                </article>
              ))}
            </div>
          </section>

          <section className="social-hub-section social-hub-split">
            <article className="social-hub-card" aria-labelledby="social-links-heading">
              <h2 id="social-links-heading">Links to use in posts</h2>
              <ul className="social-hub-list">
                {SOCIAL_KEY_LINKS.map((item) => (
                  <li key={item.url}>
                    <span>{item.label}</span>
                    <div className="social-hub-list__actions">
                      <a href={item.url} target="_blank" rel="noopener noreferrer">
                        Open
                      </a>
                      <CopyButton text={item.url} label="Copy URL" />
                    </div>
                  </li>
                ))}
              </ul>
            </article>

            <article className="social-hub-card" aria-labelledby="social-profile-heading">
              <h2 id="social-profile-heading">Profile reference</h2>
              <dl className="social-hub-dl">
                <div>
                  <dt>Instagram bio</dt>
                  <dd>
                    <pre className="social-hub-copy social-hub-copy--compact">
                      {SOCIAL_PROFILE_COPY.instagramBio}
                    </pre>
                    <CopyButton text={SOCIAL_PROFILE_COPY.instagramBio} />
                  </dd>
                </div>
                <div>
                  <dt>Website line</dt>
                  <dd>{SOCIAL_PROFILE_COPY.websiteLine}</dd>
                </div>
                <div>
                  <dt>Category</dt>
                  <dd>{SOCIAL_PROFILE_COPY.category}</dd>
                </div>
                <div>
                  <dt>Hashtags</dt>
                  <dd>
                    <p className="social-hub-tags">{SOCIAL_HASHTAGS.join(" ")}</p>
                    <CopyButton text={SOCIAL_HASHTAGS.join(" ")} label="Copy hashtags" />
                  </dd>
                </div>
              </dl>
            </article>
          </section>

          <section className="social-hub-section" aria-labelledby="social-assets-heading">
            <div className="content-section-head">
              <span className="content-kicker">Brand assets</span>
              <h2 id="social-assets-heading">Images for posts</h2>
              <p>Download from the site or right-click → Save image in your browser.</p>
            </div>
            <div className="social-hub-grid social-hub-grid--assets">
              {SOCIAL_BRAND_ASSETS.map((asset) => (
                <article key={asset.path} className="social-hub-asset">
                  <a href={asset.path} target="_blank" rel="noopener noreferrer">
                    <img src={asset.path} alt="" loading="lazy" />
                  </a>
                  <div>
                    <h3>{asset.label}</h3>
                    <p>{asset.note}</p>
                    <div className="social-hub-list__actions">
                      <a href={asset.path} download>
                        Download
                      </a>
                      <CopyButton
                        text={`https://noorlink.co${asset.path}`}
                        label="Copy URL"
                      />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="content-cta social-hub-cta">
            <h2>Need help with Meta linking?</h2>
            <p>
              Finish the Instagram Business switch in Accounts Center, then add
              @noorlinkesim in Business Suite → Settings → Instagram accounts.
            </p>
            <p>
              <a
                href="https://accountscenter.facebook.com/profiles"
                target="_blank"
                rel="noopener noreferrer"
                className="social-hub-card__cta"
              >
                Open Accounts Center
              </a>
              {" · "}
              <Link href="/support">Customer support page</Link>
            </p>
          </section>
        </div>
      </main>
    </>
  );
}
