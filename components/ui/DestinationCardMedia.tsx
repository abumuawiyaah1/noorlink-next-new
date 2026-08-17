"use client";

import { useState } from "react";

type Props = {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
};

export function DestinationCardMedia({
  src,
  alt,
  priority = false,
  className = "",
}: Props) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`card-media${loaded ? " is-loaded" : ""}${className ? ` ${className}` : ""}`}>
      {!loaded && <span className="card-media-shimmer" aria-hidden="true" />}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={priority ? "high" : "auto"}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}
