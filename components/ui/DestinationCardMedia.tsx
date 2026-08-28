"use client";

import { useCallback, useEffect, useState } from "react";

type Props = {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
  width?: number;
  height?: number;
};

const DEFAULT_WIDTH = 800;
const DEFAULT_HEIGHT = 500;

export function DestinationCardMedia({
  src,
  alt,
  priority = false,
  className = "",
  width = DEFAULT_WIDTH,
  height = DEFAULT_HEIGHT,
}: Props) {
  const [loaded, setLoaded] = useState(false);
  const markLoaded = useCallback(() => setLoaded(true), []);

  useEffect(() => {
    setLoaded(false);
    const img = new Image();
    img.src = src;
    if (img.complete && img.naturalWidth > 0) {
      setLoaded(true);
    }
  }, [src]);

  return (
    <div className={`card-media${loaded ? " is-loaded" : ""}${className ? ` ${className}` : ""}`}>
      {!loaded && <span className="card-media-shimmer" aria-hidden="true" />}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={priority ? "high" : "auto"}
        onLoad={markLoaded}
        onError={markLoaded}
      />
    </div>
  );
}
