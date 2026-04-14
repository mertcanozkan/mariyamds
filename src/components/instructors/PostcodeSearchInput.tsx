"use client";

import { useState, useEffect, useRef, useCallback, useId } from "react";
import { Search, X, Loader2, MapPin } from "lucide-react";

export interface PostcodeResult {
  postcode: string;
  lat: number;
  lng: number;
  district: string;
  region: string;
}

interface PostcodeSearchInputProps {
  value: string;
  resolvedCoords?: [number, number];
  onResolve: (result: PostcodeResult) => void;
  onClear: () => void;
  inputId?: string;
  labelledBy?: string;
}

function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return debounced;
}

export default function PostcodeSearchInput({
  value,
  resolvedCoords,
  onResolve,
  onClear,
  inputId,
  labelledBy,
}: PostcodeSearchInputProps) {
  const autoId = useId();
  const id = inputId ?? `${autoId}-postcode`;
  const listboxId = `${autoId}-listbox`;
  const errorId = `${autoId}-error`;
  const hintId = `${autoId}-hint`;

  const [inputValue, setInputValue] = useState(value);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [suggestionsOpen, setSuggestionsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [isGeocoding, setIsGeocoding] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const debouncedInput = useDebounce(inputValue, 300);

  useEffect(() => {
    if (!value) {
      setInputValue("");
      setSuggestions([]);
      setError(null);
      setActiveIndex(-1);
    }
  }, [value]);

  useEffect(() => {
    if (resolvedCoords || debouncedInput.length < 2) {
      setSuggestions([]);
      setSuggestionsOpen(false);
      return;
    }

    setIsFetching(true);
    fetch(`/api/postcode/autocomplete?q=${encodeURIComponent(debouncedInput)}`)
      .then((r) => r.json())
      .then((data) => {
        setSuggestions(data.results ?? []);
        setSuggestionsOpen((data.results ?? []).length > 0);
        setActiveIndex(-1);
      })
      .catch(() => setSuggestions([]))
      .finally(() => setIsFetching(false));
  }, [debouncedInput, resolvedCoords]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setSuggestionsOpen(false);
        setActiveIndex(-1);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const geocode = useCallback(
    async (postcode: string) => {
      setSuggestionsOpen(false);
      setActiveIndex(-1);
      setIsGeocoding(true);
      setError(null);

      try {
        const res = await fetch(`/api/postcode?q=${encodeURIComponent(postcode)}`);
        if (!res.ok) {
          setError("Postcode not found — try again");
          return;
        }
        const data: PostcodeResult = await res.json();
        setInputValue(data.postcode);
        onResolve(data);
      } catch {
        setError("Could not look up postcode");
      } finally {
        setIsGeocoding(false);
      }
    },
    [onResolve]
  );

  const handleSelect = (postcode: string) => {
    setInputValue(postcode);
    geocode(postcode);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (suggestionsOpen && suggestions.length > 0) {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, suggestions.length - 1));
        return;
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, -1));
        return;
      }
      if (e.key === "Enter" && activeIndex >= 0) {
        e.preventDefault();
        handleSelect(suggestions[activeIndex]);
        return;
      }
    }
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault();
      geocode(inputValue.trim());
    }
    if (e.key === "Escape") {
      setSuggestionsOpen(false);
      setActiveIndex(-1);
    }
  };

  const handleClear = () => {
    setInputValue("");
    setSuggestions([]);
    setSuggestionsOpen(false);
    setActiveIndex(-1);
    setError(null);
    onClear();
    inputRef.current?.focus();
  };

  const isLoading = isFetching || isGeocoding;
  const hasResolved = !!resolvedCoords;

  const describedBy = [
    error ? errorId : null,
    !hasResolved && !error && inputValue.length === 0 ? hintId : null,
  ]
    .filter(Boolean)
    .join(" ") || undefined;

  return (
    <div ref={containerRef} className="relative">
      <div className="relative">
        {/* Left icon — decorative */}
        {isLoading ? (
          <Loader2
            size={14}
            aria-hidden="true"
            className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400 animate-spin"
          />
        ) : hasResolved ? (
          <MapPin
            size={14}
            aria-hidden="true"
            className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-400"
          />
        ) : (
          <Search
            size={14}
            aria-hidden="true"
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
          />
        )}

        <input
          ref={inputRef}
          id={id}
          type="text"
          role="combobox"
          autoComplete="off"
          placeholder="Enter postcode…"
          value={inputValue}
          suppressHydrationWarning
          aria-expanded={suggestionsOpen}
          aria-autocomplete="list"
          aria-controls={listboxId}
          aria-activedescendant={activeIndex >= 0 ? `${listboxId}-option-${activeIndex}` : undefined}
          aria-describedby={describedBy}
          aria-labelledby={labelledBy}
          aria-invalid={!!error}
          aria-busy={isLoading}
          onChange={(e) => {
            setInputValue(e.target.value.toUpperCase());
            setError(null);
            if (hasResolved) onClear();
          }}
          onKeyDown={handleKeyDown}
          onFocus={() => suggestions.length > 0 && setSuggestionsOpen(true)}
          className={`w-full pl-9 pr-8 py-2.5 rounded-lg bg-white/5 border text-sm text-white placeholder:text-slate-600 focus:outline-none transition-colors ${
            hasResolved
              ? "border-emerald-500/40 focus:border-emerald-500/60"
              : error
                ? "border-red-500/40 focus:border-red-500/60"
                : "border-white/10 focus:border-blue-500/50"
          }`}
        />

        {/* Clear button */}
        {(inputValue || hasResolved) && (
          <button
            type="button"
            onClick={handleClear}
            aria-label="Clear postcode search"
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
          >
            <X size={12} aria-hidden="true" />
          </button>
        )}
      </div>

      {/* Error */}
      {error && (
        <p id={errorId} role="alert" className="mt-1.5 text-xs text-red-400">
          {error}
        </p>
      )}

      {/* Resolved indicator */}
      {hasResolved && !error && (
        <p className="mt-1.5 text-xs text-emerald-400 flex items-center gap-1" aria-live="polite">
          <MapPin size={10} aria-hidden="true" />
          Location set — showing nearby instructors
        </p>
      )}

      {/* Hint */}
      {!hasResolved && !error && inputValue.length === 0 && (
        <p id={hintId} className="mt-1.5 text-xs text-slate-600">
          e.g. SW1A 1AA — press Enter or pick a suggestion
        </p>
      )}

      {/* Autocomplete listbox */}
      <ul
        id={listboxId}
        role="listbox"
        aria-label="Postcode suggestions"
        hidden={!suggestionsOpen || suggestions.length === 0}
        className="absolute z-50 top-full mt-1.5 w-full rounded-xl border border-white/10 bg-[#161b27] shadow-xl overflow-y-auto max-h-56"
      >
        {suggestions.map((pc, i) => (
          <li
            key={pc}
            id={`${listboxId}-option-${i}`}
            role="option"
            aria-selected={i === activeIndex}
          >
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => handleSelect(pc)}
              className={cn(
                "w-full flex items-center gap-2.5 px-3 py-2 text-sm text-slate-300 hover:bg-white/8 hover:text-white transition-colors text-left",
                i === activeIndex && "bg-white/8 text-white"
              )}
            >
              <MapPin size={12} aria-hidden="true" className="text-slate-500 flex-shrink-0" />
              {pc}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
