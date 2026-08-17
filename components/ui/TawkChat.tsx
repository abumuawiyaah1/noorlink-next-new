"use client";

import Script from "next/script";
import { getTawkEmbedUrl } from "@/lib/tawk-config";
import "@/styles/tawk-brand.css";

/**
 * Tawk.to live chat — bottom-left (WhatsApp stays bottom-right).
 * Set header/button colors in Tawk dashboard → Widget Appearance:
 *   Primary #0F3D3E · Accent #FF9500
 */
export function TawkChat() {
  const embedUrl = getTawkEmbedUrl();

  return (
    <Script id="tawk-to" strategy="afterInteractive">
      {`
        var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
        Tawk_API.customStyle = {
          visibility: {
            desktop: {
              position: "bl",
              xOffset: 20,
              yOffset: 24,
            },
            mobile: {
              position: "bl",
              xOffset: 16,
              yOffset: 20,
            },
          },
        };
        Tawk_API.onLoad = function () {
          if (typeof Tawk_API.setAttributes === "function") {
            Tawk_API.setAttributes({ brand: "NoorLink" }, function () {});
          }
        };
        (function () {
          var s1 = document.createElement("script");
          var s0 = document.getElementsByTagName("script")[0];
          s1.async = true;
          s1.src = "${embedUrl}";
          s1.charset = "UTF-8";
          s1.setAttribute("crossorigin", "*");
          s0.parentNode.insertBefore(s1, s0);
        })();
      `}
    </Script>
  );
}
