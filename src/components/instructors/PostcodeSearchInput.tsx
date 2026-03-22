"use client";

import { useState, useEffect, useRef, useCallback } from "react";
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
}: PostcodeSearchInputProps) {
  const [inputValue, setInputValue] = useState(value);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [suggestionsOpen, setSuggestionsOpen] = useState(false);
  const [isGeocoding, setIsGeocoding] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const debouncedInput = useDebounce(inputValue, 300);

  // Sync if parent clears the value
  useEffect(() => {
    if (!value) {
      setInputValue("");
      setSuggestions([]);
      setError(null);
    }
  }, [value]);

  // Fetch autocomplete suggestions
  useEffect(() => {
    if (resolvedCoords || debouncedInput.length < 2) {
      setSuggestions([]);
      return;
    }

    setIsFetching(true);
    fetch(`/api/postcode/autocomplete?q=${encodeURIComponent(debouncedInput)}`)
      .then((r) => r.json())
      .then((data) => {
        setSuggestions(data.results ?? []);
        setSuggestionsOpen((data.results ?? []).length > 0);
      })
      .catch(() => setSuggestions([]))
      .finally(() => setIsFetching(false));
  }, [debouncedInput, resolvedCoords]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setSuggestionsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const geocode = useCallback(
    async (postcode: string) => {
      setSuggestionsOpen(false);
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
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault();
      geocode(inputValue.trim());
    }
    if (e.key === "Escape") {
      setSuggestionsOpen(false);
    }
  };

  const handleClear = () => {
    setInputValue("");
    setSuggestions([]);
    setSuggestionsOpen(false);
    setError(null);
    onClear();
    inputRef.current?.focus();
  };

  const isLoading = isFetching || isGeocoding;
  const hasResolved = !!resolvedCoords;

  return (
    <div ref={containerRef} className="relative">
      <div className="relative">
        {/* Left icon */}
        {isLoading ? (
          <Loader2
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400 animate-spin"
          />
        ) : hasResolved ? (
          <MapPin
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-400"
          />
        ) : (
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
          />
        )}

        <input
          ref={inputRef}
          type="text"
          placeholder="Enter postcode…"
          value={inputValue}
          suppressHydrationWarning
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
            onClick={handleClear}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
            aria-label="Clear postcode"
          >
            <X size={12} />
          </button>
        )}
      </div>

      {/* Error */}
      {error && <p className="mt-1.5 text-xs text-red-400">{error}</p>}

      {/* Resolved indicator */}
      {hasResolved && !error && (
        <p className="mt-1.5 text-xs text-emerald-400 flex items-center gap-1">
          <MapPin size={10} />
          Location set — showing nearby instructors
        </p>
      )}

      {/* Hint */}
      {!hasResolved && !error && inputValue.length === 0 && (
        <p className="mt-1.5 text-xs text-slate-600">
          e.g. SW1A 1AA — press Enter or pick a suggestion
        </p>
      )}

      {/* Autocomplete dropdown */}
      {suggestionsOpen && suggestions.length > 0 && (
        <ul className="absolute z-50 top-full mt-1.5 w-full rounded-xl border border-white/10 bg-[#161b27] shadow-xl overflow-y-auto max-h-56">
          {suggestions.map((pc) => (
            <li key={pc}>
              <button
                onMouseDown={(e) => e.preventDefault()} // keep input focused
                onClick={() => handleSelect(pc)}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-slate-300 hover:bg-white/8 hover:text-white transition-colors text-left"
              >
                <MapPin size={12} className="text-slate-500 flex-shrink-0" />
                {pc}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
