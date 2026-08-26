import { Suspense } from "react";
import "@/styles/content-pages.css";
import "@/styles/insider.css";
import { InsiderUnsubscribePage } from "@/components/insider/InsiderUnsubscribePage";

export default function UnsubscribeRoute() {
  return (
    <Suspense fallback={null}>
      <InsiderUnsubscribePage />
    </Suspense>
  );
}
