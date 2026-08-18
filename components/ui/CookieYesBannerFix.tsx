"use client";

import { useEffect } from "react";

const TITLE = "We value your privacy";
const BAD_TITLE = /we\s+a\s+noorlink|value your privacy/i;

function rewriteBanner() {
  document.querySelectorAll(".cky-title, .cky-notice-title, h2.cky-title").forEach((el) => {
    const text = el.textContent ?? "";
    if (BAD_TITLE.test(text) && el.textContent !== TITLE) {
      el.textContent = TITLE;
    }
  });

  document.querySelectorAll('a[href*="privacy.html"]').forEach((anchor) => {
    const el = anchor as HTMLAnchorElement;
    el.setAttribute("href", "/privacy");
  });
}

export function CookieYesBannerFix() {
  useEffect(() => {
    rewriteBanner();

    const onLoad = () => rewriteBanner();
    document.addEventListener("cookieyes_banner_load", onLoad);

    const observer = new MutationObserver(() => rewriteBanner());
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener("cookieyes_banner_load", onLoad);
      observer.disconnect();
    };
  }, []);

  return null;
}
