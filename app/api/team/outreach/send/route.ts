import { NextResponse } from "next/server";
import { requireSocialHubAuthFromRequest } from "@/lib/social-hub-auth";
import {
  getOutreachEmailSecrets,
  outreachEmailConfigured,
  sendOutreachBrandedEmail,
} from "@/lib/outreach-email-send";
import { updateOutreachContact } from "@/lib/outreach-storage";
import {
  fillOutreachTemplate,
  getOutreachTemplate,
} from "@/lib/outreach-templates";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const denied = await requireSocialHubAuthFromRequest(request);
  if (denied) return denied;

  const secrets = await getOutreachEmailSecrets();
  return NextResponse.json({
    configured: outreachEmailConfigured(secrets),
    fromEmail: secrets.fromEmail || null,
    replyTo: secrets.replyTo || null,
  });
}

export async function POST(request: Request) {
  const denied = await requireSocialHubAuthFromRequest(request);
  if (denied) return denied;

  try {
    const body = (await request.json()) as {
      contactId?: string;
      toEmail?: string;
      templateId?: string;
      subject?: string;
      bodyText?: string;
      eyebrow?: string;
      title?: string;
      ctaHref?: string;
      ctaLabel?: string;
      name?: string;
      handle?: string;
      promoCode?: string;
      contentUrl?: string;
      markMessaged?: boolean;
    };

    const template = body.templateId
      ? getOutreachTemplate(body.templateId)
      : undefined;

    const vars = {
      name: body.name ?? "",
      handle: body.handle ?? "",
      code: body.promoCode ?? "",
      contentUrl: body.contentUrl ?? "",
    };

    const subject = (body.subject ?? template?.subject ?? "").trim();
    const bodyText = fillOutreachTemplate(
      (body.bodyText ?? template?.body ?? "").trim(),
      vars,
    );
    const eyebrow = (body.eyebrow ?? template?.eyebrow ?? "Creator partnership").trim();
    const title = (body.title ?? template?.title ?? "A note from NoorLink").trim();
    const ctaHref = body.ctaHref ?? template?.ctaHref;
    const ctaLabel = body.ctaLabel ?? template?.ctaLabel;
    const toEmail = (body.toEmail ?? "").trim();

    const result = await sendOutreachBrandedEmail({
      toEmail,
      subject: fillOutreachTemplate(subject, vars),
      bodyText,
      eyebrow,
      title: fillOutreachTemplate(title, vars),
      ctaHref,
      ctaLabel,
    });

    let contact = null;
    if (body.contactId) {
      const today = new Date().toISOString().slice(0, 10);
      contact = await updateOutreachContact(body.contactId, {
        email: toEmail,
        messageSent: bodyText,
        lastEmailAt: new Date().toISOString(),
        lastEmailSubject: fillOutreachTemplate(subject, vars),
        ...(body.markMessaged !== false
          ? {
              status: "messaged" as const,
              contactedAt: today,
            }
          : {}),
      });
    }

    return NextResponse.json({ ok: true, id: result.id, contact });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Could not send outreach email.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
