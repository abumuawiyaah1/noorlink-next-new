"use client";

import { CopyButton } from "@/components/social/CopyButton";
import {
  EDUCATIONAL_DRAFT_STATUS_LABELS,
  EDUCATIONAL_REVIEW_WORKFLOW,
  educationalDraftsByTopic,
  formatEducationalPost,
  type EducationalDraft,
} from "@/lib/social-hub-educational";

function platformLabel(platform: EducationalDraft["platform"]): string {
  return platform === "meta" ? "Meta (FB / IG)" : "LinkedIn";
}

export function EducationalDrafts() {
  const topics = educationalDraftsByTopic();
  const reviewCount = topics.reduce(
    (n, t) => n + t.drafts.filter((d) => d.status === "review").length,
    0,
  );

  return (
    <section
      className="social-hub-section"
      aria-labelledby="social-edu-heading"
    >
      <div className="content-section-head">
        <span className="content-kicker">Educational · review first</span>
        <h2 id="social-edu-heading">Meta & LinkedIn drafts</h2>
        <p>
          Teach eSIM basics in NoorLink voice.{" "}
          <span className="social-hub-edu-count">{reviewCount} drafts</span>{" "}
          are marked For review — do not post until a teammate approves. Full
          text also lives in{" "}
          <code>content/social/educational-review.md</code> for PR review.
        </p>
      </div>

      <ol className="social-hub-workflow social-hub-workflow--tight">
        {EDUCATIONAL_REVIEW_WORKFLOW.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ol>

      <div className="social-hub-edu-topics">
        {topics.map(({ topic, drafts }) => (
          <article key={topic} className="social-hub-edu-topic">
            <h3>{topic}</h3>
            <div className="social-hub-grid social-hub-grid--edu">
              {drafts.map((draft) => {
                const full = formatEducationalPost(draft);
                return (
                  <div
                    key={draft.id}
                    className="social-hub-card social-hub-card--copy"
                  >
                    <div className="social-hub-card__head">
                      <div>
                        <p className="social-hub-edu-platform">
                          {platformLabel(draft.platform)}
                        </p>
                        <span
                          className={`social-hub-status social-hub-status--${draft.status}`}
                        >
                          {EDUCATIONAL_DRAFT_STATUS_LABELS[draft.status]}
                        </span>
                      </div>
                      <CopyButton
                        text={full}
                        label={
                          draft.status === "review"
                            ? "Copy draft"
                            : "Copy to post"
                        }
                      />
                    </div>
                    <p className="social-hub-edu-hook">{draft.hook}</p>
                    <pre className="social-hub-copy">{full}</pre>
                    {draft.notes ? (
                      <p className="social-hub-edu-notes">{draft.notes}</p>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
