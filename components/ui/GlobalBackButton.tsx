"use client";

import { usePathname } from "next/navigation";
import { BackButton } from "@/components/ui/BackButton";
import { stripLocaleFromPath } from "@/lib/i18n/path";

export function GlobalBackButton() {
  const pathname = usePathname() || "/";

  if (stripLocaleFromPath(pathname) === "/") {
    return null;
  }

  return <BackButton />;
}
