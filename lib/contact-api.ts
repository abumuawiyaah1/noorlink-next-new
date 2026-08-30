import { API_BASE } from "@/lib/api-client";
import { debug, debugError } from "@/lib/debug";

export async function submitContactForm(payload: {
  name: string;
  email: string;
  subject?: string;
  message: string;
  orderId?: string;
}): Promise<{ success: boolean; ticketId?: string; message?: string; error?: string }> {
  const url = `${API_BASE}/api/contact`;
  debug("contact", "submitContactForm →", {
    url,
    subject: payload.subject,
    nameLen: payload.name.length,
    messageLen: payload.message.length,
  });
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = (await response.json().catch(() => ({}))) as {
      success?: boolean;
      ticketId?: string;
      message?: string;
      detail?: string;
    };
    if (!response.ok || !data.success) {
      const error = data.detail ?? data.message ?? "Could not send your message.";
      debugError("contact", "submit failed", { status: response.status, error });
      return { success: false, error };
    }
    debug("contact", "ticket created", { ticketId: data.ticketId });
    return {
      success: true,
      ticketId: data.ticketId,
      message: data.message,
    };
  } catch (err) {
    debugError("contact", "network error", err);
    return {
      success: false,
      error: err instanceof Error ? err.message : "Could not send your message.",
    };
  }
}
