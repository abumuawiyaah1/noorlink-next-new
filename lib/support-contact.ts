/** Public support inbox — use for mailto + display copy. */
export const SUPPORT_EMAIL = "support@noorlink.co";
export const COMPLIANCE_EMAIL = "compliance@noorlink.co";

const EMAIL_PATTERN =
  /(support@noorlink\.co|compliance@noorlink\.co)/gi;

/** Split plain text so NoorLink emails become mailto anchors. */
export function linkifyNoorlinkEmails(
  text: string,
): Array<string | { href: string; label: string }> {
  const parts: Array<string | { href: string; label: string }> = [];
  let last = 0;
  for (const match of text.matchAll(EMAIL_PATTERN)) {
    const index = match.index ?? 0;
    if (index > last) parts.push(text.slice(last, index));
    const label = match[0];
    parts.push({ href: `mailto:${label.toLowerCase()}`, label });
    last = index + label.length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts.length > 0 ? parts : [text];
}
