"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { WhyNoorLink } from "@/components/landing/WhyNoorLink";

export function WhyNoorLinkMount() {
  const [mountNode, setMountNode] = useState<HTMLElement | null>(null);

  useEffect(() => {
    let node = document.getElementById("why-noorlink-mount");
    if (!node) {
      node = document.createElement("div");
      node.id = "why-noorlink-mount";
      const destinationMount = document.getElementById("destination-grid-mount");
      if (destinationMount?.parentElement) {
        destinationMount.parentElement.insertBefore(node, destinationMount);
      } else {
        document.body.appendChild(node);
      }
    }
    setMountNode(node);
  }, []);

  if (!mountNode) return null;
  return createPortal(<WhyNoorLink />, mountNode);
}
