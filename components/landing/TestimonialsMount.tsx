"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Testimonials } from "@/components/landing/Testimonials";

export function TestimonialsMount() {
  const [mountNode, setMountNode] = useState<HTMLElement | null>(null);

  useEffect(() => {
    let node = document.getElementById("testimonials-mount");
    if (!node) {
      node = document.createElement("div");
      node.id = "testimonials-mount";
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
  return createPortal(<Testimonials />, mountNode);
}
