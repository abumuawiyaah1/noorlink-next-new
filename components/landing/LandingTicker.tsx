"use client";

import { useEffect, useState } from "react";

type TickerCity = {
  name: string;
  flag: string;
  tz: string;
  net: string;
  weather: string;
};

const CITIES: TickerCity[] = [
  { name: "Mecca", flag: "🇸🇦", tz: "Asia/Riyadh", net: "STC 5G", weather: "32°C" },
  { name: "New York", flag: "🇺🇸", tz: "America/New_York", net: "T-Mobile 5G", weather: "18°C" },
  { name: "London", flag: "🇬🇧", tz: "Europe/London", net: "EE 5G", weather: "14°C" },
  { name: "Cairo", flag: "🇪🇬", tz: "Africa/Cairo", net: "Vodafone 4G", weather: "29°C" },
  { name: "Dubai", flag: "🇦🇪", tz: "Asia/Dubai", net: "Du 5G", weather: "30°C" },
  { name: "Tokyo", flag: "🇯🇵", tz: "Asia/Tokyo", net: "SoftBank 5G", weather: "22°C" },
  { name: "Paris", flag: "🇫🇷", tz: "Europe/Paris", net: "Orange 5G", weather: "16°C" },
  { name: "Mexico City", flag: "🇲🇽", tz: "America/Mexico_City", net: "Telcel 5G", weather: "24°C" },
];

function formatCityTime(timeZone: string): string {
  try {
    return new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
      timeZone,
    }).format(new Date());
  } catch {
    return "--:--";
  }
}

export function LandingTicker() {
  const [nowLabel, setNowLabel] = useState<string>("");

  useEffect(() => {
    const tick = () => setNowLabel(new Date().toLocaleTimeString());
    tick();
    const id = window.setInterval(tick, 60_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="ticker-wrap">
      <div className="ticker" id="ticker-content">
        {CITIES.map((city) => (
          <span key={city.name} className="ticker-item">
            {city.flag} {city.name} · {formatCityTime(city.tz)} · {city.net} · {city.weather}
          </span>
        ))}
        {nowLabel && (
          <span className="ticker-item" aria-hidden="true">
            Updated {nowLabel}
          </span>
        )}
      </div>
    </div>
  );
}
