import { API_BASE } from "@/lib/api-client";

export type InsiderSubscribePayload = {
  email: string;
  dreamDestination?: string;
};

export type InsiderSubscribeResult = {
  success: boolean;
  message?: string;
  error?: string;
};

export async function subscribeInsider(
  payload: InsiderSubscribePayload,
): Promise<InsiderSubscribeResult> {
  const url = `${API_BASE}/api/newsletter/subscribe`;
  const body: Record<string, unknown> = {
    email: payload.email.trim().toLowerCase(),
  };
  if (payload.dreamDestination) {
    body.dream_destination = payload.dreamDestination;
    body.dreamDestination = payload.dreamDestination;
  }

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = (await res.json().catch(() => ({}))) as Record<string, unknown>;
    if (!res.ok) {
      const detail = data.detail;
      return {
        success: false,
        error:
          typeof detail === "string"
            ? detail
            : typeof data.message === "string"
              ? data.message
              : "Could not subscribe right now.",
      };
    }

    return {
      success: Boolean(data.success ?? true),
      message:
        typeof data.message === "string"
          ? data.message
          : "You are subscribed to NoorLink Insider.",
    };
  } catch (err) {
    return {
      success: false,
      error:
        err instanceof Error
          ? err.message
          : "Could not reach the newsletter service.",
    };
  }
}
