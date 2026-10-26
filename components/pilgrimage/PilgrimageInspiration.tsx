"use client";

import Image from "next/image";
import {
  localizedDuaReminder,
  localizedFeaturedQuote,
  localizedGallery,
  localizedInspirationChrome,
  localizedQuotes,
} from "@/lib/i18n/pilgrimage";
import { useLocaleState } from "@/lib/i18n/use-locale";

export function PilgrimageInspiration() {
  const [locale] = useLocaleState();
  const chrome = localizedInspirationChrome(locale);
  const featured = localizedFeaturedQuote(locale);
  const quotes = localizedQuotes(locale);
  const gallery = localizedGallery(locale);
  const duaReminder = localizedDuaReminder(locale);

  return (
    <section className="pilgrim-inspiration" aria-labelledby="pilgrim-inspiration-title">
      <div className="pilgrim-inspiration__header">
        <span className="pilgrim-inspiration__kicker">{chrome.kicker}</span>
        <h2 id="pilgrim-inspiration-title" className="pilgrim-inspiration__title">
          {chrome.title}
        </h2>
        <p className="pilgrim-inspiration__lead">{chrome.lead}</p>
      </div>

      <article className="pilgrim-inspiration__featured">
        <span className="pilgrim-inspiration__label">{chrome.labelQuran}</span>
        {featured.arabic ? (
          <p className="pilgrim-inspiration__arabic" lang="ar" dir="rtl">
            {featured.arabic}
          </p>
        ) : null}
        <blockquote className="pilgrim-inspiration__quote">
          &ldquo;{featured.text}&rdquo;
        </blockquote>
        <cite className="pilgrim-inspiration__cite">{featured.source}</cite>
      </article>

      <div className="pilgrim-inspiration__quotes">
        {quotes.map((item) => (
          <article key={item.id} className="pilgrim-inspiration__quote-card">
            <span className="pilgrim-inspiration__label">
              {item.kind === "quran" ? chrome.labelQuran : chrome.labelHadith}
            </span>
            {item.arabic ? (
              <p className="pilgrim-inspiration__arabic pilgrim-inspiration__arabic--small" lang="ar" dir="rtl">
                {item.arabic}
              </p>
            ) : null}
            <p className="pilgrim-inspiration__quote-text">&ldquo;{item.text}&rdquo;</p>
            <p className="pilgrim-inspiration__cite">{item.source}</p>
          </article>
        ))}
      </div>

      <div className="pilgrim-inspiration__gallery">
        {gallery.map((item) => (
          <article key={item.id} className="pilgrim-inspiration__gallery-card">
            <div className="pilgrim-inspiration__gallery-media">
              <Image
                src={item.image}
                alt={item.imageAlt}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="pilgrim-inspiration__gallery-image"
              />
            </div>
            <div className="pilgrim-inspiration__gallery-body">
              <h3>{item.title}</h3>
              <p>{item.caption}</p>
            </div>
          </article>
        ))}
      </div>

      <p className="pilgrim-inspiration__reminder">{duaReminder}</p>
    </section>
  );
}
