import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

const securityHeaders = [
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "X-Frame-Options",
    value: "DENY",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "base-uri 'self'",
      "form-action 'self' https://checkout.stripe.com https://www.paypal.com https://www.sandbox.paypal.com",
      "frame-ancestors 'none'",
      "img-src 'self' data: https: blob:",
      "font-src 'self' https://fonts.gstatic.com https://cdnjs.cloudflare.com https://cdn-cookieyes.com data:",
      // CookieYes banner styles load from their CDN
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdnjs.cloudflare.com https://cdn-cookieyes.com",
      // Stripe + CookieYes + PayPal Smart Buttons SDK
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://js.stripe.com https://embed.tawk.to https://cdn-cookieyes.com https://www.paypal.com https://www.sandbox.paypal.com https://www.paypalobjects.com",
      "frame-src 'self' https://js.stripe.com https://hooks.stripe.com https://checkout.stripe.com https://embed.tawk.to https://www.paypal.com https://www.sandbox.paypal.com https://www.paypalobjects.com",
      // CookieYes + PayPal checkout APIs
      "connect-src 'self' https://api.noorlink.co http://127.0.0.1:8000 http://localhost:8000 https://api.stripe.com https://*.tawk.to wss://*.tawk.to https://cdn-cookieyes.com https://*.cookieyes.com https://www.paypal.com https://www.sandbox.paypal.com https://*.paypal.com https://*.paypalobjects.com",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;

// Enables Cloudflare bindings during local `next dev`
initOpenNextCloudflareForDev();
