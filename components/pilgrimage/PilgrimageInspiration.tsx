import Image from "next/image";
import {
  PILGRIMAGE_DUA_REMINDER,
  PILGRIMAGE_FEATURED_QUOTE,
  PILGRIMAGE_GALLERY,
  PILGRIMAGE_QUOTES,
} from "@/lib/pilgrimage-inspiration";

export function PilgrimageInspiration() {
  return (
    <section className="pilgrim-inspiration" aria-labelledby="pilgrim-inspiration-title">
      <div className="pilgrim-inspiration__header">
        <span className="pilgrim-inspiration__kicker">For the Journey of a Lifetime</span>
        <h2 id="pilgrim-inspiration-title" className="pilgrim-inspiration__title">
          Worship First. Connectivity in the Background.
        </h2>
        <p className="pilgrim-inspiration__lead">
          NoorLink helps pilgrims stay connected in Makkah and Madinah without letting
          setup steal focus from what matters most.
        </p>
      </div>

      <article className="pilgrim-inspiration__featured">
        <span className="pilgrim-inspiration__label">Qur&apos;an</span>
        {PILGRIMAGE_FEATURED_QUOTE.arabic ? (
          <p className="pilgrim-inspiration__arabic" lang="ar" dir="rtl">
            {PILGRIMAGE_FEATURED_QUOTE.arabic}
          </p>
        ) : null}
        <blockquote className="pilgrim-inspiration__quote">
          &ldquo;{PILGRIMAGE_FEATURED_QUOTE.text}&rdquo;
        </blockquote>
        <cite className="pilgrim-inspiration__cite">{PILGRIMAGE_FEATURED_QUOTE.source}</cite>
      </article>

      <div className="pilgrim-inspiration__quotes">
        {PILGRIMAGE_QUOTES.map((item) => (
          <article key={item.id} className="pilgrim-inspiration__quote-card">
            <span className="pilgrim-inspiration__label">
              {item.kind === "quran" ? "Qur'an" : "Hadith"}
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
        {PILGRIMAGE_GALLERY.map((item) => (
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

      <p className="pilgrim-inspiration__reminder">{PILGRIMAGE_DUA_REMINDER}</p>
    </section>
  );
}
