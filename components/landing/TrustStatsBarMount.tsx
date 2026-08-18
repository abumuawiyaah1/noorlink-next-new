"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { TrustStatsBar } from "@/components/landing/TrustStatsBar";

export function TrustStatsBarMount() {
  const [mountNode, setMountNode] = useState<HTMLElement | null>(null);

  useEffect(() => {
    let node = document.getElementById("trust-stats-mount");
    if (!node) {
      node = document.createElement("div");
      node.id = "trust-stats-mount";
      const steps = document.querySelector(".steps-section");
      if (steps?.parentElement) {
        steps.parentElement.insertBefore(node, steps);
      } else {
        document.body.appendChild(node);
      }
    }
    setMountNode(node);
  }, []);

  if (!mountNode) return null;
  return createPortal(<TrustStatsBar />, mountNode);
}
