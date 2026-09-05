import { NextResponse } from "next/server";
import { requireSocialHubAuthFromRequest } from "@/lib/social-hub-auth";
import {
  createOutreachContact,
  listOutreachContacts,
  seedOutreachContactsIfEmpty,
} from "@/lib/outreach-storage";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const denied = await requireSocialHubAuthFromRequest(request);
  if (denied) return denied;

  const url = new URL(request.url);
  if (url.searchParams.get("seed") === "1") {
    const result = await seedOutreachContactsIfEmpty();
    const contacts = await listOutreachContacts();
    return NextResponse.json({ contacts, ...result });
  }

  const contacts = await listOutreachContacts();
  return NextResponse.json({ contacts });
}

export async function POST(request: Request) {
  const denied = await requireSocialHubAuthFromRequest(request);
  if (denied) return denied;

  try {
    const body = (await request.json()) as Record<string, unknown>;
    const contact = await createOutreachContact(body);
    return NextResponse.json({ contact }, { status: 201 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Could not create contact.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
