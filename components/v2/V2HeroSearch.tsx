"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { logSearch } from "@/lib/analytics-api";
import {
  filterDestinations,
  resolveDestination,
  type HeroDestination,
} from "@/lib/hero-destinations";
import { previewPath } from "@/lib/v2/preview-paths";

const MIN_QUERY_LENGTH = 3;

const V2_PILLS = [
  { id: "saudi", label: "🇸🇦 Saudi Umrah Pass", href: previewPath("/hajj-umrah"), query: "Saudi Arabia" },
  { id: "me", label: "🌍 GCC / Middle East", href: previewPath("/plans/regional/middle-east"), query: "Middle East" },
  { id: "global", label: "🌐 Global", href: previewPath("/plans/regional/global"), query: "Global" },
] as const;

function mapDestHref(href: string): string {
  if (href.startsWith("/preview")) return href;
  if (href.startsWith("/plans/regional/")) return previewPath(href);
  if (href.startsWith("/plans/")) return previewPath(href);
  if (href === "/hajj-umrah") return previewPath("/hajj-umrah");
  if (href === "/destinations") return previewPath("/destinations");
  return href;
}

export function V2HeroSearch() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [activePill, setActivePill] = useState<string | null>(null);

  const suggestions = filterDestinations(query);
  const meetsMinLength = query.trim().length >= MIN_QUERY_LENGTH;
  const showDropdown = isOpen && meetsMinLength && suggestions.length > 0;

  const navigateTo = useCallback(
    (dest: HeroDestination) => {
      setQuery(dest.label);
      setIsOpen(false);
      router.push(mapDestHref(dest.href));
    },
    [router],
  );

  const handleSearch = useCallback(() => {
    const dest = resolveDestination(query);
    if (dest) {
      logSearch(dest.label);
      navigateTo(dest);
      return;
    }
    const trimmed = query.trim();
    if (trimmed) {
      logSearch(trimmed);
      router.push(`${previewPath("/destinations")}?q=${encodeURIComponent(trimmed)}`);
    } else {
      router.push(previewPath("/destinations"));
    }
  }, [navigateTo, query, router]);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!inputRef.current?.closest(".v2-hero-search")) return;
      const target = e.target as Node;
      if (!inputRef.current.closest(".v2-hero-search")?.contains(target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  return (
    <div className="v2-hero-search">
      <div className="v2-hero-search__bar">
        <span className="v2-hero-search__icon" aria-hidden="true">
          🔍
        </span>
        <input
          ref={inputRef}
          type="search"
          placeholder="Where are you traveling?"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
            setActiveIndex(0);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              if (showDropdown && suggestions[activeIndex]) {
                navigateTo(suggestions[activeIndex]);
              } else {
                handleSearch();
              }
            }
            if (e.key === "ArrowDown" && showDropdown) {
              e.preventDefault();
              setActiveIndex((i) => Math.min(i + 1, suggestions.length - 1));
            }
            if (e.key === "ArrowUp" && showDropdown) {
              e.preventDefault();
              setActiveIndex((i) => Math.max(i - 1, 0));
            }
          }}
          aria-autocomplete="list"
          aria-expanded={showDropdown}
        />
        <button type="button" className="v2-btn v2-btn--primary" onClick={handleSearch}>
          Search
        </button>
      </div>

      {showDropdown ? (
        <ul className="v2-hero-search__dropdown" role="listbox">
          {suggestions.map((dest, i) => (
            <li key={dest.id}>
              <button
                type="button"
                role="option"
                aria-selected={i === activeIndex}
                className={i === activeIndex ? "is-active" : ""}
                onMouseDown={(e) => {
                  e.preventDefault();
                  logSearch(dest.label);
                  navigateTo(dest);
                }}
              >
                <span>{dest.flag}</span> {dest.label}
              </button>
            </li>
          ))}
        </ul>
      ) : null}

      <div className="v2-hero-search__pills">
        {V2_PILLS.map((pill) => (
          <button
            key={pill.id}
            type="button"
            className={`v2-pill${activePill === pill.id ? " is-active" : ""}`}
            onClick={() => {
              setActivePill(pill.id);
              logSearch(pill.query);
              router.push(pill.href);
            }}
          >
            {pill.label}
          </button>
        ))}
      </div>

      <p className="v2-hero-search__compat">
        <button
          type="button"
          className="v2-link-btn"
          onClick={() => {
            window.dispatchEvent(new CustomEvent("noorlink:open-compatibility"));
          }}
        >
          Check if your phone supports eSIM →
        </button>
      </p>
    </div>
  );
}
