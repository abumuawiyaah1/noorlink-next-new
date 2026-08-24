import { getCountryNetworkNames } from "@/lib/country-networks";

const SAUDI_COUNTRY_ID = "saudi-arabia";

function formatCarrierName(name: string): string {
  if (name.toLowerCase() === "stc") return "STC";
  return name;
}

export function PilgrimCarrierRow() {
  const carriers = getCountryNetworkNames(SAUDI_COUNTRY_ID).map(formatCarrierName);

  return (
    <div className="pilgrim-carriers" aria-label="Saudi network partners">
      <span className="pilgrim-carriers__label">Powered in Saudi Arabia by</span>
      <ul className="pilgrim-carriers__list">
        {carriers.map((name) => (
          <li key={name} className="pilgrim-carriers__item">
            {name}
          </li>
        ))}
      </ul>
    </div>
  );
}
