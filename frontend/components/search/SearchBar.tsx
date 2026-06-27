"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { searchProducts } from "@/lib/api/products";
import { useDebounce } from "@/lib/hooks/useDebounce";
import type { Product } from "@/lib/types/product";

const trendingKeywords = ["PC Components", "Laptops", "Accessories"];

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1560393464-5c69a73c5770?q=80&w=1200&auto=format&fit=crop";

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
  const shouldShowDropdown = isFocused && (query.length > 0 || products.length > 0);

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
        className={`fixed inset-0 z-10 bg-black/10 backdrop-blur-md transition-opacity duration-300 ${
          isFocused ? "opacity-100" : "pointer-events-none opacity-0"
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
                const value = event.target.value;
                setQuery(value);
                onRefine?.(value); 
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

        {shouldShowDropdown ? (
          <div className="absolute left-0 right-0 top-[calc(100%+12px)] overflow-hidden rounded-2xl border border-zinc-200/70 bg-white/95 backdrop-blur-xl shadow-xl">
            <div className="grid gap-0 md:grid-cols-[0.9fr_1.4fr]">
              <div className="border-b border-zinc-200/60 p-4 md:border-b-0 md:border-r">
                <p className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-zinc-400">
                  Trending
                </p>
                <div className="space-y-1">
                  {visibleKeywords.map((keyword) => (
                    <button
                      key={keyword}
                      type="button"
                      onClick={() => handleKeywordClick(keyword)}
                      className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm text-zinc-700 transition-colors hover:bg-zinc-100"
                    >
                      <span>{keyword}</span>
                      <span className="text-xs text-zinc-400">Search</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-4">
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-zinc-400">
                    Products
                  </p>
                  {isLoading ? (
                    <p className="text-xs text-zinc-400">Searching</p>
                  ) : null}
                </div>

                <div className="space-y-2">
                  {products.map((product) => (
                    <Link
                      key={product.id}
                      href={`/product/${product.id}`}
                      onClick={() => setIsFocused(false)}
                      className="flex w-full items-center gap-3 rounded-xl p-2 text-left transition-colors hover:bg-zinc-100"
                    >
                      <Image
                        src={product.image_url || FALLBACK_IMAGE}
                        alt={product.title || "Product Image"}
                        width={56}
                        height={56}
                        sizes="56px"
                        className="h-14 w-14 rounded-lg object-cover"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-zinc-800">
                          {product.title || "Unnamed Product"}
                        </p>
                        <p className="text-xs text-zinc-400">
                          {product.category || "General"}
                        </p>
                      </div>
                      <p className="text-sm font-semibold text-zinc-950">
                        {formatPrice(product.price || 0, product.currency)}
                      </p>
                    </Link>
                  ))}

                  {!isLoading && query && products.length === 0 ? (
                    <div className="rounded-xl bg-zinc-50 p-6 text-center text-sm text-zinc-400">
                      No products found.
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}