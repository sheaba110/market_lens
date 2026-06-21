"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { searchProducts } from "@/lib/api/products";
import { useDebounce } from "@/lib/hooks/useDebounce";
import type { Product } from "@/lib/types/product";

const trendingKeywords = [
  "Magnetic keyboards",
  "Studio monitors",
  "Espresso machines",
  "Noise cancelling",
  "Desktop processors",
];

function formatPrice(price: number, currency: Product["currency"]) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(price);
}

export function SearchBar() {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const debouncedQuery = useDebounce(query, 350);
  const shouldShowDropdown = isFocused && (query.length > 0 || products.length > 0);

  useEffect(() => {
    let isMounted = true;

    async function runSearch() {
      setIsLoading(true);

      try {
        const response = await searchProducts({
          query: debouncedQuery,
        });

        if (isMounted) {
          setProducts(response.results.slice(0, 4));
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    runSearch();

    return () => {
      isMounted = false;
    };
  }, [debouncedQuery]);

  const visibleKeywords = useMemo(() => {
    if (!query) return trendingKeywords;

    return trendingKeywords.filter((keyword) =>
      keyword.toLowerCase().includes(query.toLowerCase()),
    );
  }, [query]);

  return (
    <>
      <div
        className={`fixed inset-0 z-10 bg-black/10 backdrop-blur-md transition-opacity duration-300 ${
          isFocused ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setIsFocused(false)}
      />

      <div className="relative z-20 mx-auto w-full max-w-3xl">
        <div className="rounded-2xl border border-zinc-200/70 bg-white/90 p-2 backdrop-blur-xl transition-all duration-300 focus-within:border-zinc-300 focus-within:bg-white">
          <div className="flex items-center gap-3 px-4">
            <div className="h-2 w-2 rounded-full bg-zinc-950" />

            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onFocus={() => setIsFocused(true)}
              placeholder="Search magnetic keyboards, espresso machines, processors..."
              className="h-14 w-full bg-transparent text-[15px] text-zinc-950 outline-none placeholder:text-zinc-400"
            />

            <kbd className="hidden rounded-md border border-zinc-200 bg-zinc-50 px-2 py-1 text-xs text-zinc-400 sm:block">
              Ctrl K
            </kbd>
          </div>
        </div>

        {shouldShowDropdown ? (
          <div className="absolute left-0 right-0 top-[calc(100%+12px)] overflow-hidden rounded-2xl border border-zinc-200/70 bg-white/95 backdrop-blur-xl">
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
                      onClick={() => setQuery(keyword)}
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
                    <button
                      key={product.id}
                      type="button"
                      className="flex w-full items-center gap-3 rounded-xl p-2 text-left transition-colors hover:bg-zinc-100"
                    >
                      <Image
                        src={product.image}
                        alt={product.title}
                        width={56}
                        height={56}
                        sizes="56px"
                        className="h-14 w-14 rounded-lg object-cover"
                      />

                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-zinc-800">
                          {product.title}
                        </p>
                        <p className="text-xs text-zinc-400">{product.category}</p>
                      </div>

                      <p className="text-sm font-semibold text-zinc-950">
                        {formatPrice(product.price, product.currency)}
                      </p>
                    </button>
                  ))}

                  {!isLoading && products.length === 0 ? (
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
