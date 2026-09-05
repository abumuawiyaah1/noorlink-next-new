import { getCountryNetworkNames } from "@/lib/country-networks";
import { SecureCheckoutTrust } from "@/components/ui/SecureCheckoutTrust";

const SAUDI_COUNTRY_ID = "saudi-arabia";

function formatCarrierName(name: string): string {
  if (name.toLowerCase() === "stc") return "STC";
  return name;
}

export function PilgrimCarrierRow() {
  const carriers = getCountryNetworkNames(SAUDI_COUNTRY_ID).map(formatCarrierName);

  return (
    <div className="pilgrim-carriers" aria-label="Networks and payment security">
      <div className="pilgrim-carriers__row">
        <div className="pilgrim-carriers__group">
          <span className="pilgrim-carriers__label">Powered in Saudi Arabia By</span>
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
          <span className="pilgrim-carriers__label">Pay Securely With</span>
          <SecureCheckoutTrust
            variant="marks"
            showSsl={false}
            className="pilgrim-carriers__pay-badges"
          />
        </div>
      </div>
      <p className="pilgrim-carriers__trust">
        Your payment is protected for your journey. Use Apple Pay, PayPal, or card —
        your details are never stored on our servers. We take that trust seriously.
      </p>
    </div>
  );
}
