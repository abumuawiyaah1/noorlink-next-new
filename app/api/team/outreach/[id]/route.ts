import { NextResponse } from "next/server";
import { requireSocialHubAuthFromRequest } from "@/lib/social-hub-auth";
import {
  deleteOutreachContact,
  updateOutreachContact,
} from "@/lib/outreach-storage";

export const dynamic = "force-dynamic";

type RouteContext = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, context: RouteContext) {
  const denied = await requireSocialHubAuthFromRequest(request);
  if (denied) return denied;

  const { id } = await context.params;
  try {
    const body = (await request.json()) as Record<string, unknown>;
    const contact = await updateOutreachContact(id, body);
    return NextResponse.json({ contact });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Could not update contact.";
    const status = message === "Contact not found." ? 404 : 400;
    return NextResponse.json({ error: message }, { status });
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  const denied = await requireSocialHubAuthFromRequest(_request);
  if (denied) return denied;

  const { id } = await context.params;
  try {
    await deleteOutreachContact(id);
    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Could not delete contact.";
    const status = message === "Contact not found." ? 404 : 400;
    return NextResponse.json({ error: message }, { status });
  }
}
