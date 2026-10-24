"use client";

import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  filterDestinations,
  resolveDestination,
} from "@/lib/hero-destinations";
import { logSearch } from "@/lib/analytics-api";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { localizedPath } from "@/lib/i18n/path";
import { useLocaleState } from "@/lib/i18n/use-locale";

type CountrySearchProps = {
  initialQuery?: string;
  placeholder?: string;
};

export function CountrySearch({
  initialQuery = "",
  placeholder,
}: CountrySearchProps) {
  const router = useRouter();
  const [locale] = useLocaleState();
  const search = getDictionary(locale).search;
  const resolvedPlaceholder = placeholder ?? search.anotherCountry;
  const [query, setQuery] = useState(initialQuery);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const suggestions = useMemo(() => filterDestinations(query), [query]);
  const showDropdown = open && query.trim().length >= 2 && suggestions.length > 0;

  function goToQuery(nextQuery: string) {
    const dest = resolveDestination(nextQuery);
    const trimmed = nextQuery.trim();
    if (dest) {
      logSearch(dest.label);
      router.push(localizedPath(dest.href, locale));
      return;
    }
    if (trimmed) {
      logSearch(trimmed);
      router.push(
        `${localizedPath("/destinations", locale)}?q=${encodeURIComponent(trimmed)}`,
      );
    }
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const pick = showDropdown ? suggestions[activeIndex] : null;
    goToQuery(pick?.label ?? query);
    setOpen(false);
  }

  return (
    <form className="country-search" onSubmit={onSubmit} autoComplete="off">
      <input
        type="search"
        value={query}
        placeholder={resolvedPlaceholder}
        aria-label={search.anotherDestinationAria}
        onChange={(event) => {
          setQuery(event.target.value);
          setActiveIndex(0);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => {
          window.setTimeout(() => setOpen(false), 150);
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowDown") {
            event.preventDefault();
            setOpen(true);
            setActiveIndex((index) => Math.min(index + 1, suggestions.length - 1));
          } else if (event.key === "ArrowUp") {
            event.preventDefault();
            setActiveIndex((index) => Math.max(index - 1, 0));
          }
        }}
      />
      <button type="submit">{search.button}</button>
      {showDropdown && (
        <ul className="country-search__dropdown" role="listbox">
          {suggestions.map((dest, index) => (
            <li key={dest.id} role="option" aria-selected={index === activeIndex}>
              <button
                type="button"
                className={index === activeIndex ? "is-active" : undefined}
                onMouseDown={(event) => {
                  event.preventDefault();
                  goToQuery(dest.label);
                }}
              >
                <span className="country-search__flag" aria-hidden="true">
                  {dest.flag}
                </span>
                <span className="country-search__label">{dest.label}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </form>
  );
}
