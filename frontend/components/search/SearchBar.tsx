"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useDebouncedCallback } from "@/lib/hooks/useDebouncedCallback";

const trendingKeywords = [
  "PC Components",
  "Laptops",
  "Accessories",
];

interface SearchBarProps {
  onRefine?: (value: string) => void;
}

export function SearchBar({ onRefine }: SearchBarProps) {
  const router = useRouter();

  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const visibleKeywords = useMemo(() => {
    if (!query) {
      return trendingKeywords;
    }

    return trendingKeywords.filter((keyword) =>
      keyword.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  /*
   * Search page:
   *
   * This is now the ONLY search operation.
   *
   * SearchBar no longer calls Django searchProducts().
   * InstantSearch -> Meilisearch handles the search.
   *
   * The refine() call itself is debounced so fast typing doesn't fire
   * a Meilisearch request per keystroke -- the local `query` state
   * still updates instantly so the input never feels laggy.
   */
  const debouncedRefine = useDebouncedCallback((value: string) => {
    onRefine?.(value);
  }, 250);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;

    setQuery(value);
    debouncedRefine(value);
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key !== "Enter") {
      return;
    }

    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
      return;
    }

    setIsFocused(false);

    router.push(
      `/search?q=${encodeURIComponent(trimmedQuery)}`
    );
  };

  const handleKeywordClick = (keyword: string) => {
    setQuery(keyword);
    setIsFocused(false);

    /*
     * Let the search page handle the actual search.
     */
    onRefine?.(keyword);

    router.push(
      `/search?q=${encodeURIComponent(keyword)}`
    );
  };

  return (
    <>
      {/* Backdrop */}

      <div
        className={`
          fixed inset-0 z-10
          bg-black/10
          transition-opacity duration-300
          ${
            isFocused
              ? "opacity-100"
              : "pointer-events-none opacity-0"
          }
        `}
        onClick={() => setIsFocused(false)}
      />

      {/* Search container */}

      <div className="relative z-20 mx-auto w-full max-w-3xl">
        <div
          className="
            rounded-2xl
            border border-zinc-200/70
            bg-white/90
            p-1
            backdrop-blur-xl
            transition-all duration-200
            focus-within:border-zinc-400
            focus-within:bg-white
          "
        >
          <div className="flex items-center gap-3 px-4">
            {/* Search indicator */}

            <div className="h-2 w-2 rounded-full bg-zinc-950" />

            {/* Input */}

            <input
              value={query}
              onChange={handleChange}
              onFocus={() => setIsFocused(true)}
              onKeyDown={handleKeyDown}
              placeholder="Search RTX 3080, Intel Core i7, AMD Ryzen 9 ..."
              className="
                h-11
                w-full
                bg-transparent
                text-[16px]
                text-zinc-950
                outline-none
                placeholder:text-zinc-500
              "
            />

            {/* Keyboard hint */}

            <kbd
              className="
                hidden
                rounded-md
                border border-zinc-200
                bg-zinc-50
                px-3
                py-0.5
                text-xs
                text-black
                hover:bg-zinc-900
                hover:text-white
                sm:block
              "
            >
              Search ↵
            </kbd>
          </div>
        </div>

        {/* 
         * Keep this intentionally lightweight.
         *
         * IMPORTANT:
         * We don't render API results here.
         *
         * The SearchBar should only control the query.
         * Meilisearch/InstantSearch owns the results.
         */}

        {isFocused && visibleKeywords.length > 0 && (
          <div
            className="
              absolute
              left-0
              right-0
              top-full
              mt-2
              overflow-hidden
              rounded-2xl
              border border-zinc-200/70
              bg-white
              shadow-xl
            "
          >
            {visibleKeywords.map((keyword) => (
              <button
                key={keyword}
                type="button"
                onClick={() => handleKeywordClick(keyword)}
                className="
                  block
                  w-full
                  px-4
                  py-3
                  text-left
                  text-sm
                  text-zinc-600
                  transition-colors
                  hover:bg-zinc-50
                  hover:text-zinc-950
                "
              >
                {keyword}
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
}