"use client";

import { useMemo } from "react";
import { 
  InstantSearch, 
  useHits, 
  useRefinementList, 
  useRange, 
  useInstantSearch, 
  useClearRefinements,
  useCurrentRefinements
} from "react-instantsearch";
import { searchClient } from "@/lib/meilisearch"; // تأكد من مسار ملف الإعدادات
import { ProductCard } from "@/components/product/ProductCard";
import { SearchBar } from "@/components/search/SearchBar"; // تأكد إن SearchBar بيستخدم useSearchBox
import type { Product } from "@/lib/types/product";

// --- Skeletons ---
function ProductCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-200/60 bg-white">
      <div className="aspect-[4/5] animate-pulse bg-zinc-200" />
      <div className="space-y-4 p-4">
        <div className="flex justify-between gap-4">
          <div className="space-y-2">
            <div className="h-3 w-36 animate-pulse rounded-full bg-zinc-200" />
            <div className="h-3 w-20 animate-pulse rounded-full bg-zinc-200" />
          </div>
          <div className="h-4 w-14 animate-pulse rounded-full bg-zinc-200" />
        </div>
        <div className="flex gap-2">
          <div className="h-6 w-16 animate-pulse rounded-full bg-zinc-200" />
          <div className="h-6 w-20 animate-pulse rounded-full bg-zinc-200" />
        </div>
      </div>
    </div>
  );
}

// --- Custom Filter Components ---
function FilterPills({ attribute, title }: { attribute: string; title: string }) {
  const { items, refine } = useRefinementList({ attribute });

  if (items.length === 0) return null;

  return (
    <div>
      <p className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-zinc-400">
        {title}
      </p>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <button
            key={item.value}
            type="button"
            onClick={() => refine(item.value)}
            className={`rounded-full border px-3 py-2 text-xs font-medium transition-all ${
              item.isRefined
                ? "border-zinc-950 bg-zinc-950 text-white"
                : "border-zinc-200 bg-white text-zinc-500 hover:border-zinc-300 hover:text-zinc-950"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function PriceFilter({ attribute }: { attribute: string }) {
  const { range, start, refine } = useRange({ attribute });
  const min = range.min !== undefined ? range.min : 100;
  const max = range.max !== undefined ? range.max : 1500;
  // بناخد القيمة الحالية، لو مفيش بناخد أقصى قيمة
  const currentValue = start[1] !== -Infinity && start[1] !== undefined ? start[1] : max;

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-zinc-400">
          Price
        </p>
        <p className="text-xs font-semibold text-zinc-950">Up to ${currentValue}</p>
      </div>

      <input
        type="range"
        min={min}
        max={max}
        step={25}
        value={currentValue}
        onChange={(event) => refine([min, Number(event.target.value)])}
        className="h-1 w-full cursor-pointer appearance-none rounded-full bg-zinc-200 accent-zinc-950"
      />

      <div className="mt-2 flex justify-between text-[11px] text-zinc-400">
        <span>${min}</span>
        <span>${max}</span>
      </div>
    </div>
  );
}

// --- Main Content Wrapper ---
// فصلناه في Component لوحده عشان الـ Hooks لازم تشتغل جوا الـ InstantSearch Provider
function SearchPageContent() {
  const { hits } = useHits();
  const { status, results } = useInstantSearch();
  const { refine: clearAll } = useClearRefinements();
  const { items: currentRefinements } = useCurrentRefinements();

  const isLoading = status === "loading" || status === "stalled";
  const nbHits = results?.nbHits || 0;
  
  // بنحسب عدد الفلاتر النشطة بناءً على Meilisearch state
  const activeFilterCount = currentRefinements.reduce(
    (acc, curr) => acc + curr.refinements.length,
    0
  );

  const resultLabel = useMemo(() => {
    if (isLoading) return "Refining results";
    return `${nbHits} curated ${nbHits === 1 ? "result" : "results"}`;
  }, [isLoading, nbHits]);

  return (
    <main className="min-h-screen bg-[#FAFAFA] text-zinc-950">
      <section className="mx-auto flex min-h-[42vh] max-w-6xl flex-col items-center justify-center px-4 py-20">
        <div className="mb-8 text-center">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.22em] text-zinc-400">
            Decoupled Commerce Search
          </p>
          <h1 className="mx-auto max-w-3xl text-4xl font-semibold tracking-normal text-zinc-950 sm:text-5xl">
            Find the right product before the page finishes blinking.
          </h1>
        </div>
        <SearchBar />
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 pb-20 lg:grid-cols-[280px_1fr]">
        {/* السايد بار بتاع الفلاتر */}
        <aside className="h-fit rounded-2xl border border-zinc-200/60 bg-white p-5 lg:sticky lg:top-6">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold text-zinc-950">Filters</h2>
              <p className="mt-1 text-xs text-zinc-400">{activeFilterCount} active</p>
            </div>
            <button
              type="button"
              onClick={clearAll}
              className="rounded-full border border-zinc-200 px-3 py-1.5 text-xs font-medium text-zinc-500 transition-colors hover:border-zinc-300 hover:text-zinc-950"
            >
              Reset
            </button>
          </div>

          <div className="space-y-7">
            {/* لاحظ هنا attribute هو اسم الحقل في الـ Database بتاعتك */}
            <FilterPills attribute="category" title="Category" />
            <FilterPills attribute="tags" title="Attributes" />
            <PriceFilter attribute="price" />
          </div>
        </aside>

        {/* عرض النتائج */}
        <div>
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-zinc-950">Product Discovery</h2>
              <p className="mt-1 text-sm text-zinc-400">{resultLabel}</p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {isLoading
              ? Array.from({ length: 6 }).map((_, index) => (
                  <ProductCardSkeleton key={index} />
                ))
              : hits.map((hit) => (
                  <ProductCard key={hit.id} product={hit as unknown as Product} />
                ))}
          </div>

          {!isLoading && hits.length === 0 && (
            <div className="mt-6 rounded-2xl border border-zinc-200/60 bg-white p-12 text-center">
              <p className="text-sm font-medium text-zinc-950">
                No products matched this refinement.
              </p>
              <p className="mt-2 text-sm text-zinc-400">
                Try removing a filter or increasing the price range.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

// --- Main Export ---
export default function SearchPage() {
  return (
    // هنا بتبدأ رحلة البحث، indexName هو اسم الـ index في Meilisearch
    <InstantSearch indexName="products" searchClient={searchClient}>
      <SearchPageContent />
    </InstantSearch>
  );
}