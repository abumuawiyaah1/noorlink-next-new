"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { DestinationGrid } from "@/components/landing/DestinationGrid";

export function DestinationGridMount() {
  const [mountNode, setMountNode] = useState<HTMLElement | null>(null);

  useEffect(() => {
    let node = document.getElementById("destination-grid-mount");
    if (!node) {
      node = document.createElement("div");
      node.id = "destination-grid-mount";
      const checker = document.querySelector(".checker-section");
      if (checker?.parentElement) {
        checker.parentElement.insertBefore(node, checker);
      } else {
        document.body.appendChild(node);
      }
    }
    setMountNode(node);
  }, []);

  if (!mountNode) return null;

  return createPortal(<DestinationGrid />, mountNode);
}
