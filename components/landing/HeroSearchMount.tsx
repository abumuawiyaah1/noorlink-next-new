"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { HeroSearch } from "@/components/landing/HeroSearch";

/**
 * Ensure a mount node exists even if legacy HTML strip removed it,
 * then portal the hero search widget into place.
 */
export function HeroSearchMount() {
  const [mountNode, setMountNode] = useState<HTMLElement | null>(null);

  useEffect(() => {
    let node = document.getElementById("hero-search-mount");
    if (!node) {
      const heroContent = document.querySelector(".hero .hero-content");
      if (heroContent) {
        node = document.createElement("div");
        node.id = "hero-search-mount";
        const trust = heroContent.querySelector(".trust-badges");
        if (trust) {
          heroContent.insertBefore(node, trust);
        } else {
          heroContent.appendChild(node);
        }
      }
    }
    setMountNode(node);
  }, []);

  if (!mountNode) return null;

  return createPortal(<HeroSearch />, mountNode);
}
