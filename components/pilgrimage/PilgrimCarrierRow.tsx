"use client";

import { getCountryNetworkNames } from "@/lib/country-networks";
import { SecureCheckoutTrust } from "@/components/ui/SecureCheckoutTrust";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { useLocaleState } from "@/lib/i18n/use-locale";

const SAUDI_COUNTRY_ID = "saudi-arabia";

function formatCarrierName(name: string): string {
  if (name.toLowerCase() === "stc") return "STC";
  return name;
}

export function PilgrimCarrierRow() {
  const [locale] = useLocaleState();
  const pil = getDictionary(locale).pilgrimagePage;
  const carriers = getCountryNetworkNames(SAUDI_COUNTRY_ID).map(formatCarrierName);

  return (
    <div className="pilgrim-carriers" aria-label={pil.carriersAria}>
      <div className="pilgrim-carriers__row">
        <div className="pilgrim-carriers__group">
          <span className="pilgrim-carriers__label">{pil.carriersPoweredBy}</span>
          <ul className="pilgrim-carriers__list">
            {carriers.map((name) => (
              <li key={name} className="pilgrim-carriers__item">
                {name}
              </li>
            ))}
          </ul>
        </div>
        <span className="pilgrim-carriers__divider" aria-hidden="true" />
        <div className="pilgrim-carriers__pay">
          <span className="pilgrim-carriers__label">{pil.carriersPayWith}</span>
          <SecureCheckoutTrust
            variant="marks"
            showSsl={false}
            className="pilgrim-carriers__pay-badges"
          />
        </div>
      </div>
      <p className="pilgrim-carriers__trust">{pil.carriersTrust}</p>
    </div>
  );
}
