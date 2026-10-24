"use client";

import { getDictionary } from "@/lib/i18n/dictionaries";
import { useLocaleState } from "@/lib/i18n/use-locale";

export function PartnerPrograms() {
  const [locale] = useLocaleState();
  const p = getDictionary(locale).partnersPage;

  return (
    <section className="partner-programs" aria-labelledby="partner-programs-heading">
      <div className="content-section-head partner-programs__head">
        <span className="content-kicker">{p.programsKicker}</span>
        <h2 id="partner-programs-heading">{p.programsTitle}</h2>
        <p>{p.programsLede}</p>
      </div>

      <div className="partner-programs__grid partner-programs__grid--three">
        {p.programs.map((program) => (
          <article key={program.title} className="partner-program-card">
            <div
              className="partner-program-card__media"
              style={{ backgroundImage: `url(${program.image})` }}
              role="img"
              aria-label={program.imageAlt}
            />
            <div className="partner-program-card__body">
              <span className="partner-program-card__kicker">{program.kicker}</span>
              <h3>{program.title}</h3>
              <p>{program.body}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
