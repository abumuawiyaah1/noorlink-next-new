"use client";

import { useEffect } from "react";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { useLocaleState } from "@/lib/i18n/use-locale";
import "@/styles/cookieyes-mobile.css";

const BAD_TITLE = /we\s+a\s+noorlink|value your privacy|valoramos tu privacidad|نُقدّر خصوصيتك|نقدر خصوصيتك/i;

function rewriteBanner(title: string) {
  document.querySelectorAll(".cky-title, .cky-notice-title, h2.cky-title").forEach((el) => {
    const text = el.textContent ?? "";
    if (BAD_TITLE.test(text) && el.textContent !== title) {
      el.textContent = title;
    }
  });

  document.querySelectorAll('a[href*="privacy.html"]').forEach((anchor) => {
    const el = anchor as HTMLAnchorElement;
    el.setAttribute("href", "/privacy");
  });
}

export function CookieYesBannerFix() {
  const [locale] = useLocaleState();
  const title = getDictionary(locale).cookies.bannerTitle;

  useEffect(() => {
    rewriteBanner(title);

    const onLoad = () => rewriteBanner(title);
    document.addEventListener("cookieyes_banner_load", onLoad);

    const observer = new MutationObserver(() => rewriteBanner(title));
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener("cookieyes_banner_load", onLoad);
      observer.disconnect();
    };
  }, [title]);

  return null;
}
