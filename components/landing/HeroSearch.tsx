"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  fetchPopularPills,
  logSearch,
  type HeroPopularPill,
} from "@/lib/analytics-api";
import {
  filterDestinations,
  findDestinationById,
  popularPills,
  resolveDestination,
  type HeroDestination,
} from "@/lib/hero-destinations";
import "@/styles/hero-search.css";

const MIN_QUERY_LENGTH = 3;

function defaultPopularPills(): HeroPopularPill[] {
  return popularPills.map((pill) => {
    const dest = findDestinationById(pill.destinationId);
    return {
      label: pill.label,
      query: pill.query,
      href: dest?.href ?? "/destinations",
      flag: dest?.flag ?? "🌍",
    };
  });
}

export function HeroSearch() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selected, setSelected] = useState<HeroDestination | null>(null);
  const [activePill, setActivePill] = useState<string | null>(null);
  const [pills, setPills] = useState<HeroPopularPill[]>(defaultPopularPills);

  const suggestions = filterDestinations(query);
  const trimmedQuery = query.trim();
  const meetsMinLength = trimmedQuery.length >= MIN_QUERY_LENGTH;
  const showDropdown = isOpen && meetsMinLength && suggestions.length > 0;

  const navigateTo = useCallback(
    (dest: HeroDestination) => {
      setSelected(dest);
      setQuery(dest.label);
      setIsOpen(false);
      router.push(dest.href);
    },
    [router],
  );

  const handleSearch = useCallback(() => {
    const dest = selected ?? resolveDestination(query);
    if (dest) {
      logSearch(dest.label);
      navigateTo(dest);
      return;
    }
    const trimmed = query.trim();
    if (trimmed) {
      logSearch(trimmed);
      router.push(`/destinations?q=${encodeURIComponent(trimmed)}`);
    } else {
      router.push("/destinations");
    }
  }, [navigateTo, query, router, selected]);

  const selectSuggestion = useCallback(
    (dest: HeroDestination) => {
      logSearch(dest.label);
      navigateTo(dest);
    },
    [navigateTo],
  );

  const handlePillClick = useCallback(
    (pill: HeroPopularPill) => {
      setQuery(pill.query);
      setSelected(null);
      setActivePill(pill.label);
      setIsOpen(false);
      const dest = resolveDestination(pill.query);
      if (dest) {
        logSearch(dest.label);
        router.push(dest.href);
        return;
      }
      logSearch(pill.query);
      router.push(pill.href);
    },
    [router],
  );

  useEffect(() => {
    function handleOutsideClick(e: MouseEvent) {
      if (!containerRef.current?.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  useEffect(() => {
    let cancelled = false;

    fetchPopularPills()
      .then((hydrated) => {
        if (!cancelled && hydrated.length > 0) setPills(hydrated);
      })
      .catch(() => {
        if (!cancelled) setPills(defaultPopularPills());
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="hero-search-widget" ref={containerRef}>
      <div className="hero-search">
        <input
          ref={inputRef}
          type="text"
          id="homeSearch"
          value={query}
          placeholder="Where are you traveling? (e.g. Turkey)"
          autoComplete="off"
          onChange={(e) => {
            const value = e.target.value;
            setQuery(value);
            setSelected(null);
            setActivePill(null);
            setIsOpen(value.trim().length >= MIN_QUERY_LENGTH);
          }}
          onFocus={() => setIsOpen(trimmedQuery.length >= MIN_QUERY_LENGTH)}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown" && meetsMinLength) {
              e.preventDefault();
              setIsOpen(true);
              setActiveIndex((i) => Math.min(i + 1, suggestions.length - 1));
            } else if (e.key === "ArrowUp") {
              e.preventDefault();
              setActiveIndex((i) => Math.max(i - 1, 0));
            } else if (e.key === "Enter") {
              e.preventDefault();
              if (showDropdown && suggestions[activeIndex]) {
                selectSuggestion(suggestions[activeIndex]);
              } else {
                handleSearch();
              }
            } else if (e.key === "Escape") {
              setIsOpen(false);
            }
          }}
        />
        <button type="button" onClick={handleSearch}>
          Search
        </button>
      </div>

      {showDropdown && (
        <ul className="hero-search-dropdown" role="listbox">
          {suggestions.map((dest, index) => (
            <li key={dest.id} role="option" aria-selected={index === activeIndex}>
              <button
                type="button"
                className={`hero-search-dropdown__item${index === activeIndex ? " is-active" : ""}`}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => selectSuggestion(dest)}
              >
                <span className="hero-search-dropdown__flag" aria-hidden="true">
                  {dest.flag}
                </span>
                <span>
                  {dest.label}
                  <span className="hero-search-dropdown__meta">
                    {dest.type === "region" ? "Region" : "Country"} · View plans
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}

      <div className="hero-search-pills">
        <span className="hero-search-pills__label">Popular:</span>
        {pills.map((pill) => (
          <button
            key={pill.label}
            type="button"
            className={`hero-search-pill${activePill === pill.label ? " is-selected" : ""}`}
            onClick={() => handlePillClick(pill)}
          >
            {pill.flag ? `${pill.flag} ` : null}
            {pill.label}
          </button>
        ))}
      </div>
    </div>
  );
}
