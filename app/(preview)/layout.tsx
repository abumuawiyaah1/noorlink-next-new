import "@/styles/v2/index.css";
import { PreviewBanner } from "@/components/v2/PreviewBanner";
import { CurrencyProvider } from "@/components/v2/context/CurrencyContext";

export const metadata = {
  title: "Storefront v2 Preview | NoorLink",
  robots: { index: false, follow: false },
};

export default function PreviewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CurrencyProvider>
      <div className="v2-skin">
        <PreviewBanner />
        {children}
      </div>
    </CurrencyProvider>
  );
}
