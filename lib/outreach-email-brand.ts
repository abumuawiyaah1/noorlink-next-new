/**
 * NoorLink branded email chrome for creator outreach.
 * Tokens match styles/tokens.css + noorlink-automation email_brand.py.
 */

const PRIMARY = "#0F3D3E";
const PRIMARY_DARK = "#05191A";
const ACCENT = "#FF9500";
const BG = "#F3F5F7";
const SURFACE = "#FFFFFF";
const TEXT = "#111827";
const MUTED = "#6B7280";
const WHATSAPP_NUMBER = "17184729390";
const DEFAULT_LOGO_URL = "https://noorlink.co/images/logo.png";
const DEFAULT_APP_URL = "https://noorlink.co";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function paragraphsToHtml(body: string): string {
  const blocks = body
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean);

  if (blocks.length === 0) return "<p></p>";

  return blocks
    .map((block) => {
      const withBreaks = escapeHtml(block).replace(/\n/g, "<br/>");
      return `<p style="margin:0 0 16px;color:${TEXT};font-size:15px;line-height:1.65;">${withBreaks}</p>`;
    })
    .join("\n");
}

function ctaButton(href: string, label: string): string {
  return `
    <a href="${escapeHtml(href)}"
       style="display:inline-block;background:${ACCENT};color:${PRIMARY_DARK};padding:14px 28px;border-radius:999px;text-decoration:none;font-family:Arial,Helvetica,sans-serif;font-size:15px;font-weight:700;">
      ${escapeHtml(label)}
    </a>
  `;
}

export function wrapOutreachBrandedEmail(input: {
  eyebrow: string;
  title: string;
  bodyText: string;
  ctaHref?: string;
  ctaLabel?: string;
  appUrl?: string;
  logoUrl?: string;
}): string {
  const base = (input.appUrl || DEFAULT_APP_URL).replace(/\/$/, "");
  const logo = (input.logoUrl || DEFAULT_LOGO_URL).trim();
  const bodyHtml = paragraphsToHtml(input.bodyText);
  const cta =
    input.ctaHref && input.ctaLabel
      ? `<p style="margin:8px 0 20px;">${ctaButton(input.ctaHref, input.ctaLabel)}</p>`
      : "";

  const wa = `https://wa.me/${WHATSAPP_NUMBER}`;
  const support = `${base}/support`;

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1"/>
  <title>NoorLink</title>
</head>
<body style="margin:0;padding:0;background:${BG};">
  <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background:${BG};padding:28px 12px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;max-width:600px;background:${SURFACE};border-radius:16px;overflow:hidden;border:1px solid #E5E7EB;">
        <tr>
          <td style="background:${PRIMARY};padding:28px 32px 24px;">
            <table cellpadding="0" cellspacing="0" role="presentation">
              <tr>
                <td style="vertical-align:middle;padding-right:14px;">
                  <a href="${escapeHtml(base)}" style="text-decoration:none;display:inline-block;">
                    <img src="${escapeHtml(logo)}" width="52" height="52" alt="NoorLink"
                         style="display:block;width:52px;height:52px;border:0;border-radius:12px;background:${SURFACE};"/>
                  </a>
                </td>
                <td style="vertical-align:middle;">
                  <a href="${escapeHtml(base)}" style="text-decoration:none;display:inline-block;">
                    <span style="font-family:Arial,Helvetica,sans-serif;font-size:26px;font-weight:800;letter-spacing:-0.02em;color:${SURFACE};">
                      Noor<span style="color:${ACCENT};">Link</span>
                    </span>
                  </a>
                </td>
              </tr>
            </table>
            <p style="margin:18px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:${ACCENT};font-weight:700;">
              ${escapeHtml(input.eyebrow.toUpperCase())}
            </p>
            <h1 style="margin:8px 0 0;font-family:Georgia,'Times New Roman',serif;font-size:26px;line-height:1.25;font-weight:normal;color:${SURFACE};">
              ${escapeHtml(input.title)}
            </h1>
          </td>
        </tr>
        <tr>
          <td style="padding:28px 32px;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.6;color:${TEXT};">
            ${bodyHtml}
            ${cta}
          </td>
        </tr>
        <tr>
          <td style="padding:8px 32px 28px;background:${SURFACE};font-family:Arial,Helvetica,sans-serif;">
            <p style="margin:0 0 10px;color:${MUTED};font-size:13px;line-height:1.55;">
              Questions? Reply to this email, or message us on
              <a href="${wa}" style="color:${PRIMARY};font-weight:700;text-decoration:none;">WhatsApp</a>
              · <a href="${support}" style="color:${PRIMARY};font-weight:700;text-decoration:none;">Support</a>
            </p>
            <p style="margin:0;color:${MUTED};font-size:12px;line-height:1.5;">
              <strong style="color:${PRIMARY};">Noor<span style="color:${ACCENT};">Link</span></strong>
              · Travel eSIM for Umrah, Hajj &amp; journeys worldwide<br/>
              <a href="${escapeHtml(base)}" style="color:${PRIMARY};text-decoration:none;">noorlink.co</a>
              · <a href="mailto:support@noorlink.co" style="color:${PRIMARY};text-decoration:none;">support@noorlink.co</a>
            </p>
          </td>
        </tr>
        <tr>
          <td style="padding:14px 32px;background:${PRIMARY_DARK};text-align:center;font-family:Arial,Helvetica,sans-serif;font-size:11px;color:#9CA3AF;">
            Sent by NoorLink · Creator partnership outreach
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}
