import { API_BASE } from "@/lib/api-client";

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

  try {
    const res = await fetch(url, {
      method: "GET",
      headers: { Accept: "application/json" },
    });

    if (!res.ok) {
      throw new Error(`Failed to load compatible devices (${res.status})`);
    }

    const data = (await res.json()) as CompatibleDevicesResponse;
    return data.brands ?? [];
  } catch (err) {
    console.error("[CompatibilityModal] Device list fetch failed:", err);
    throw err;
  }
}
