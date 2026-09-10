"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { searchProducts } from "@/lib/api/products";
import { useDebounce } from "@/lib/hooks/useDebounce";
import type { Product } from "@/lib/types/product";

const trendingKeywords = ["PC Components", "Laptops", "Accessories"];

function formatPrice(price: number, currency?: string) {
  const safeCurrency = currency || "EGP";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: safeCurrency,
    maximumFractionDigits: 0,
  }).format(price);
}

interface SearchBarProps {
  onRefine?: (value: string) => void;
}

export function SearchBar({ onRefine }: SearchBarProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const debouncedQuery = useDebounce(query, 350);

  // Autocomplete dropdown fetch (separate REST endpoint, unrelated to InstantSearch)
  useEffect(() => {
    let isMounted = true;

    async function runSearch() {
      if (!debouncedQuery) {
        if (isMounted) setProducts([]);
        return;
      }
      setIsLoading(true);
      try {
        const response = await searchProducts({ query: debouncedQuery });
        if (isMounted) setProducts(response.results.slice(0, 4));
      } catch (error) {
        console.error("Search failed", error);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    runSearch();
    return () => { isMounted = false; };
  }, [debouncedQuery]);

  // Keep a ref to the latest onRefine so the effect below only depends on
  // debouncedQuery. `onRefine` (useSearchBox's `refine`) is not a stable
  // reference across InstantSearch renders — including it directly in the
  // dependency array caused an infinite refine -> rerender -> refine loop
  // that froze the page.
  const onRefineRef = useRef(onRefine);
  useEffect(() => {
    onRefineRef.current = onRefine;
  });

  useEffect(() => {
    onRefineRef.current?.(debouncedQuery);
  }, [debouncedQuery]);

  const visibleKeywords = useMemo(() => {
    if (!query) return trendingKeywords;
    return trendingKeywords.filter((keyword) =>
      keyword.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && query.trim()) {
      setIsFocused(false);
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleKeywordClick = (keyword: string) => {
    setQuery(keyword);
    setIsFocused(false);
    router.push(`/search?q=${encodeURIComponent(keyword)}`);
  };

  return (
    <>
      <div
        className={`fixed inset-0 z-10 bg-black/10 transition-opacity duration-300 ${isFocused ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        onClick={() => setIsFocused(false)}
      />

      <div className="relative z-20 mx-auto w-full max-w-3xl">
        <div className="rounded-2xl border border-zinc-190/70 bg-white/90 p-1 backdrop-blur-xl transition-all duration-200 focus-within:border-zinc-400 focus-within:bg-white">
          <div className="flex items-center gap-3 px-4">
            <div className="h-2 w-2 rounded-full bg-zinc-950" />

            <input
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
              }}
              onFocus={() => setIsFocused(true)}
              onKeyDown={handleKeyDown}
              placeholder="Search RTX 3080, Intel Core i7, AMD Ryzen 9 ..."
              className="h-11 w-full bg-transparent text-[16px] text-zinc-950 outline-none placeholder:text-zinc-500"
            />

            <kbd className="hidden rounded-md border border-zinc-200 bg-zinc-50 px-3 py-0.5 text-xs text-black sm:block hover:bg-zinc-900 hover:text-white">
              Search ↵
            </kbd>
          </div>
        </div>

        {isFocused && (isLoading || products.length > 0 || visibleKeywords.length > 0) ? (
          <div className="absolute inset-x-0 top-[calc(100%+0.5rem)] overflow-hidden rounded-2xl border border-zinc-200 bg-white p-2 shadow-xl">
            {isLoading ? <p className="px-3 py-2 text-sm text-zinc-500">Searching…</p> : null}
            {products.map((product) => (
              <Link
                key={product.id}
                href={product.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsFocused(false)}
                className="flex items-center justify-between rounded-xl px-3 py-2 text-sm hover:bg-zinc-50"
              >
                <span className="line-clamp-1 text-zinc-800">{product.title}</span>
                <span className="ml-4 shrink-0 font-medium text-zinc-950">
                  {formatPrice(product.price || 0)}
                </span>
              </Link>
            ))}
            {!isLoading && products.length === 0
              ? visibleKeywords.map((keyword) => (
                <button
                  key={keyword}
                  type="button"
                  onClick={() => handleKeywordClick(keyword)}
                  className="block w-full rounded-xl px-3 py-2 text-left text-sm text-zinc-600 hover:bg-zinc-50"
                >
                  Search for {keyword}
                </button>
              ))
              : null}
          </div>
        ) : null}
      </div>
    </>
  );
}
