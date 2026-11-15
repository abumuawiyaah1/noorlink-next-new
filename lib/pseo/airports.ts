/**
 * Primary arrival airports for pSEO hubs (IATA + city label).
 * Used by install/airport blocks and FAQ defaults.
 */
export type PseoAirport = {
  code: string;
  label: string;
};

const AIRPORTS: Record<string, PseoAirport[]> = {
  turkey: [
    { code: "IST", label: "Istanbul" },
    { code: "SAW", label: "Istanbul Sabiha" },
    { code: "AYT", label: "Antalya" },
  ],
  thailand: [
    { code: "BKK", label: "Bangkok Suvarnabhumi" },
    { code: "DMK", label: "Bangkok Don Mueang" },
    { code: "HKT", label: "Phuket" },
  ],
  mexico: [
    { code: "MEX", label: "Mexico City" },
    { code: "CUN", label: "Cancún" },
    { code: "GDL", label: "Guadalajara" },
  ],
  colombia: [
    { code: "BOG", label: "Bogotá" },
    { code: "MDE", label: "Medellín" },
    { code: "CTG", label: "Cartagena" },
  ],
  "dominican-republic": [
    { code: "PUJ", label: "Punta Cana" },
    { code: "SDQ", label: "Santo Domingo" },
  ],
  egypt: [
    { code: "CAI", label: "Cairo" },
    { code: "SSH", label: "Sharm El Sheikh" },
    { code: "HRG", label: "Hurghada" },
  ],
  uae: [
    { code: "DXB", label: "Dubai" },
    { code: "AUH", label: "Abu Dhabi" },
    { code: "SHJ", label: "Sharjah" },
  ],
  morocco: [
    { code: "CMN", label: "Casablanca" },
    { code: "RAK", label: "Marrakech" },
    { code: "AGA", label: "Agadir" },
  ],
  indonesia: [
    { code: "CGK", label: "Jakarta" },
    { code: "DPS", label: "Denpasar Bali" },
  ],
  "costa-rica": [
    { code: "SJO", label: "San José" },
    { code: "LIR", label: "Liberia" },
  ],
  jamaica: [
    { code: "KIN", label: "Kingston" },
    { code: "MBJ", label: "Montego Bay" },
  ],
  bahamas: [{ code: "NAS", label: "Nassau" }],
  barbados: [{ code: "BGI", label: "Bridgetown" }],
  spain: [
    { code: "MAD", label: "Madrid" },
    { code: "BCN", label: "Barcelona" },
  ],
  italy: [
    { code: "FCO", label: "Rome Fiumicino" },
    { code: "MXP", label: "Milan Malpensa" },
  ],
  france: [
    { code: "CDG", label: "Paris Charles de Gaulle" },
    { code: "ORY", label: "Paris Orly" },
  ],
  brazil: [
    { code: "GRU", label: "São Paulo" },
    { code: "GIG", label: "Rio de Janeiro" },
  ],
  canada: [
    { code: "YYZ", label: "Toronto" },
    { code: "YVR", label: "Vancouver" },
  ],
  "saudi-arabia": [
    { code: "JED", label: "Jeddah" },
    { code: "RUH", label: "Riyadh" },
    { code: "MED", label: "Madinah" },
  ],
  usa: [
    { code: "JFK", label: "New York JFK" },
    { code: "LAX", label: "Los Angeles" },
    { code: "MIA", label: "Miami" },
  ],
  japan: [
    { code: "NRT", label: "Tokyo Narita" },
    { code: "HND", label: "Tokyo Haneda" },
    { code: "KIX", label: "Osaka Kansai" },
  ],
  uk: [
    { code: "LHR", label: "London Heathrow" },
    { code: "LGW", label: "London Gatwick" },
    { code: "MAN", label: "Manchester" },
  ],
  germany: [
    { code: "FRA", label: "Frankfurt" },
    { code: "MUC", label: "Munich" },
  ],
  "south-korea": [
    { code: "ICN", label: "Seoul Incheon" },
    { code: "GMP", label: "Seoul Gimpo" },
  ],
  australia: [
    { code: "SYD", label: "Sydney" },
    { code: "MEL", label: "Melbourne" },
  ],
  portugal: [
    { code: "LIS", label: "Lisbon" },
    { code: "OPO", label: "Porto" },
  ],
  greece: [
    { code: "ATH", label: "Athens" },
    { code: "HER", label: "Heraklion" },
  ],
  netherlands: [{ code: "AMS", label: "Amsterdam Schiphol" }],
  switzerland: [
    { code: "ZRH", label: "Zurich" },
    { code: "GVA", label: "Geneva" },
  ],
  ireland: [{ code: "DUB", label: "Dublin" }],
  singapore: [{ code: "SIN", label: "Singapore Changi" }],
  vietnam: [
    { code: "SGN", label: "Ho Chi Minh City" },
    { code: "HAN", label: "Hanoi" },
  ],
  india: [
    { code: "DEL", label: "Delhi" },
    { code: "BOM", label: "Mumbai" },
  ],
  philippines: [
    { code: "MNL", label: "Manila" },
    { code: "CEB", label: "Cebu" },
  ],
  malaysia: [
    { code: "KUL", label: "Kuala Lumpur" },
    { code: "PEN", label: "Penang" },
  ],
  ghana: [{ code: "ACC", label: "Accra" }],
  kenya: [
    { code: "NBO", label: "Nairobi" },
    { code: "MBA", label: "Mombasa" },
  ],
  nigeria: [
    { code: "LOS", label: "Lagos" },
    { code: "ABV", label: "Abuja" },
  ],
  "south-africa": [
    { code: "JNB", label: "Johannesburg" },
    { code: "CPT", label: "Cape Town" },
  ],
  argentina: [
    { code: "EZE", label: "Buenos Aires Ezeiza" },
    { code: "AEP", label: "Buenos Aires Aeroparque" },
  ],
  peru: [
    { code: "LIM", label: "Lima" },
    { code: "CUZ", label: "Cusco" },
  ],
  chile: [{ code: "SCL", label: "Santiago" }],
  panama: [{ code: "PTY", label: "Panama City Tocumen" }],
  qatar: [{ code: "DOH", label: "Doha Hamad" }],
  jordan: [{ code: "AMM", label: "Amman" }],
  kuwait: [{ code: "KWI", label: "Kuwait City" }],
  bahrain: [{ code: "BAH", label: "Bahrain" }],
  oman: [{ code: "MCT", label: "Muscat" }],
  "trinidad-and-tobago": [
    { code: "POS", label: "Port of Spain" },
    { code: "TAB", label: "Tobago" },
  ],
  aruba: [{ code: "AUA", label: "Oranjestad" }],
  "puerto-rico": [{ code: "SJU", label: "San Juan" }],
  austria: [
    { code: "VIE", label: "Vienna" },
    { code: "SZG", label: "Salzburg" },
  ],
  belgium: [{ code: "BRU", label: "Brussels" }],
  poland: [
    { code: "WAW", label: "Warsaw" },
    { code: "KRK", label: "Kraków" },
  ],
  sweden: [{ code: "ARN", label: "Stockholm Arlanda" }],
  maldives: [{ code: "MLE", label: "Malé" }],
  china: [
    { code: "PVG", label: "Shanghai Pudong" },
    { code: "PEK", label: "Beijing Capital" },
  ],
};

export function getPseoAirports(slug: string): PseoAirport[] {
  return AIRPORTS[slug.trim().toLowerCase()] ?? [];
}

export function formatPseoAirportList(slug: string): string {
  const airports = getPseoAirports(slug);
  if (airports.length === 0) return "";
  return airports.map((a) => `${a.label} (${a.code})`).join(", ");
}
