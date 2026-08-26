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

export type InsiderUnsubscribeResult = {
  success: boolean;
  message?: string;
  error?: string;
};

function parseApiError(
  data: Record<string, unknown>,
  fallback: string,
): string {
  const detail = data.detail;
  if (typeof detail === "string") return detail;
  if (typeof data.message === "string") return data.message;
  if (typeof data.error === "string") return data.error;
  return fallback;
}

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
      return {
        success: false,
        error: parseApiError(data, "Could not subscribe right now."),
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

export async function unsubscribeInsider(
  email: string,
): Promise<InsiderUnsubscribeResult> {
  const url = `${API_BASE}/api/newsletter/unsubscribe`;

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email.trim().toLowerCase() }),
    });

    const data = (await res.json().catch(() => ({}))) as Record<string, unknown>;
    if (!res.ok) {
      return {
        success: false,
        error: parseApiError(data, "Could not unsubscribe right now."),
      };
    }

    return {
      success: Boolean(data.success ?? true),
      message:
        typeof data.message === "string"
          ? data.message
          : "You’re unsubscribed from NoorLink Insider.",
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
