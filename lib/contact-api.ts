import { API_BASE } from "@/lib/api-client";

export async function submitContactForm(payload: {
  name: string;
  email: string;
  subject?: string;
  message: string;
}): Promise<{ success: boolean; ticketId?: string; message?: string; error?: string }> {
  const url = `${API_BASE}/api/contact`;
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
      return {
        success: false,
        error: data.detail ?? data.message ?? "Could not send your message.",
      };
    }
    return {
      success: true,
      ticketId: data.ticketId,
      message: data.message,
    };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Could not send your message.",
    };
  }
}
