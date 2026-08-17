"use client";

import Link from "next/link";
import "@/styles/whatsapp-fab.css";

export const WHATSAPP_NUMBER = "17184729390";

export function WhatsAppFab() {
  return (
    <Link
      id="wa-btn"
      href={`https://wa.me/${WHATSAPP_NUMBER}`}
      className="whatsapp-float"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      title="Chat on WhatsApp"
    >
      <i className="fab fa-whatsapp" aria-hidden="true" />
    </Link>
  );
}
