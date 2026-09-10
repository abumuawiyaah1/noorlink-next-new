"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import "@/styles/whatsapp-fab.css";

export const WHATSAPP_NUMBER = "17184729390";

/** Routes where the FAB would cover Pay / primary checkout actions. */
const HIDE_FAB_PATHS = new Set(["/checkout", "/gift"]);

export function WhatsAppFab() {
  const pathname = usePathname() ?? "";
  const hide = HIDE_FAB_PATHS.has(pathname);

  return (
    <Link
      id="wa-btn"
      href={`https://wa.me/${WHATSAPP_NUMBER}`}
      className={`whatsapp-float${hide ? " whatsapp-float--hidden" : ""}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      title="Chat on WhatsApp"
      aria-hidden={hide || undefined}
      tabIndex={hide ? -1 : undefined}
    >
      <i className="fab fa-whatsapp" aria-hidden="true" />
    </Link>
  );
}
