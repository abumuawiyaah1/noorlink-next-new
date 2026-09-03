import { API_BASE } from "@/lib/api-client";
import { debug, debugError } from "@/lib/debug";

export type DeviceModel = {
  id: string;
  name: string;
};

export type DeviceBrand = {
  id: string;
  name: string;
  models: DeviceModel[];
};

export type CompatibleDevicesResponse = {
  success: boolean;
  brands: DeviceBrand[];
};

export async function fetchCompatibleDevices(): Promise<DeviceBrand[]> {
  const url = `${API_BASE}/api/v1/devices/compatible`;
  debug("devices", "fetchCompatibleDevices →", url);

  try {
    const res = await fetch(url, {
      method: "GET",
      headers: { Accept: "application/json" },
    });

    if (!res.ok) {
      throw new Error(`Failed to load compatible devices (${res.status})`);
    }

    const data = (await res.json()) as CompatibleDevicesResponse;
    const brands = data.brands ?? [];
    debug("devices", "loaded brands", { count: brands.length });
    return brands;
  } catch (err) {
    debugError("devices", "Device list fetch failed", err);
    throw err;
  }
}

/** Fire-and-forget: log a device search we could not match (weekly ops review). */
export function reportDeviceCheckMiss(query: string): void {
  const trimmed = query.trim();
  if (trimmed.length < 2) return;

  const url = `${API_BASE}/api/v1/devices/report-miss`;
  void fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query: trimmed }),
  }).catch((err) => {
    debugError("devices", "reportDeviceCheckMiss failed", err);
  });
}
