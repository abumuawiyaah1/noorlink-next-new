import { getCloudflareContext } from "@opennextjs/cloudflare";
import { wrapOutreachBrandedEmail } from "@/lib/outreach-email-brand";

type ResendSecrets = {
  apiKey: string;
  fromEmail: string;
  replyTo: string;
};

function readProcessSecrets(): ResendSecrets {
  return {
    apiKey: process.env.RESEND_API_KEY?.trim() ?? "",
    fromEmail: process.env.RESEND_FROM_EMAIL?.trim() ?? "",
    replyTo:
      process.env.OUTREACH_REPLY_TO?.trim() ||
      process.env.SUPPORT_EMAIL?.trim() ||
      "support@noorlink.co",
  };
}

export async function getOutreachEmailSecrets(): Promise<ResendSecrets> {
  try {
    const { env } = await getCloudflareContext({ async: true });
    const worker = env as {
      RESEND_API_KEY?: string;
      RESEND_FROM_EMAIL?: string;
      OUTREACH_REPLY_TO?: string;
      SUPPORT_EMAIL?: string;
    };
    const fromProcess = readProcessSecrets();
    return {
      apiKey: worker.RESEND_API_KEY?.trim() || fromProcess.apiKey,
      fromEmail: worker.RESEND_FROM_EMAIL?.trim() || fromProcess.fromEmail,
      replyTo:
        worker.OUTREACH_REPLY_TO?.trim() ||
        worker.SUPPORT_EMAIL?.trim() ||
        fromProcess.replyTo,
    };
  } catch {
    return readProcessSecrets();
  }
}

export function outreachEmailConfigured(secrets: ResendSecrets): boolean {
  return Boolean(secrets.apiKey && secrets.fromEmail);
}

export type SendOutreachEmailInput = {
  toEmail: string;
  subject: string;
  bodyText: string;
  eyebrow: string;
  title: string;
  ctaHref?: string;
  ctaLabel?: string;
};

export type SendOutreachEmailResult = {
  id: string;
};

export async function sendOutreachBrandedEmail(
  input: SendOutreachEmailInput,
): Promise<SendOutreachEmailResult> {
  const secrets = await getOutreachEmailSecrets();
  if (!outreachEmailConfigured(secrets)) {
    throw new Error(
      "Email sending is not configured. Add RESEND_API_KEY and RESEND_FROM_EMAIL to the Worker (same as order emails).",
    );
  }

  const to = input.toEmail.trim().toLowerCase();
  if (!to || !to.includes("@")) {
    throw new Error("A valid recipient email is required.");
  }

  const subject = input.subject.trim();
  if (!subject) throw new Error("Subject is required.");

  const html = wrapOutreachBrandedEmail({
    eyebrow: input.eyebrow,
    title: input.title,
    bodyText: input.bodyText,
    ctaHref: input.ctaHref,
    ctaLabel: input.ctaLabel,
  });

  const text = input.bodyText.trim();

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${secrets.apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: secrets.fromEmail,
      to: [to],
      reply_to: secrets.replyTo,
      subject,
      html,
      text,
    }),
  });

  const payload = (await res.json().catch(() => ({}))) as {
    id?: string;
    message?: string;
    error?: { message?: string };
  };

  if (!res.ok) {
    const detail =
      payload.error?.message || payload.message || `Resend HTTP ${res.status}`;
    throw new Error(detail);
  }

  return { id: payload.id ?? "sent" };
}
