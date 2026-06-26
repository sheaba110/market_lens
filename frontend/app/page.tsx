import Link from "next/link";
import { SearchBar } from "@/components/search/SearchBar";

const highlights = [
  {
    value: "10k+",
    label: "Products surfaced through curated search",
  },
  {
    value: "200ms",
    label: "Fast filtering feel across the discovery flow",
  },
  {
    value: "6",
    label: "Core categories ready to explore on day one",
  },
];

const collections = [
  "Keyboards",
  "Processors",
  "Graphic cards",
  "Displays",
  "Motherboards",
  "Memory",
  "Storage",
  "Power supplies",
  "Cases",
  "Cooling",
];

const features = [
  {
    title: "Search that feels immediate",
    copy:
      "Type naturally and refine by category, price, and attributes without breaking the flow.",
  },
  {
    title: "Curated product cards",
    copy:
      "Keep the important signals visible: price, tags, stock status, and clean imagery.",
  },
  {
    title: "Built for exploration",
    copy:
      "Guide visitors from a strong landing page into a focused search experience in one click.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#FAFAFA] text-zinc-950">
      <div className="absolute inset-x-0 top-0 -z-10 h-[34rem] bg-[radial-gradient(circle_at_top,_rgba(24,24,27,0.14),_transparent_55%),linear-gradient(180deg,rgba(255,255,255,1)_0%,rgba(250,250,250,1)_100%)]" />
      <div className="absolute left-1/2 top-24 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-zinc-200/60 blur-3xl" />

      <header className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 pt-6 sm:px-6 lg:px-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-black-400">
            MarketLens
          </p>
          <p className="mt-1 text-sm text-black-500">
            Product discovery, sharpened.
          </p>
        </div>

        <Link
          href="/search"
       className="rounded-full border border-white bg-black px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-800"
        >
          Open Search
        </Link>
      </header>

      <section className="mx-auto grid w-full max-w-7xl gap-14 px-4 pb-20 pt-16 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:px-8 lg:pt-24">
        <div className="max-w-3xl">
          <p className="mb-5 inline-flex items-center rounded-full border border-zinc-300 bg-white px-3 py-1 text-xs font-semibold tracking-[0.22em] text-zinc-500 shadow-sm">
            Home for Product Discovery
          </p>

          <h1 className="max-w-4xl text-5xl font-semibold tracking-tight text-zinc-950 sm:text-6xl lg:text-7xl">
            Find the right product before the page finishes blinking.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-600">
            MarketLens gives shoppers a focused starting point, then takes them
            straight into a fast search experience with the filters they need to
            compare products confidently.
          </p>

          <div className="mt-10">
            <SearchBar />
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            {collections.map((collection) => (
              <span
                key={collection}
                className="rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm text-zinc-600 shadow-sm"
              >
                {collection}
              </span>
            ))}
          </div>
        </div>

        <div className="grid gap-4 self-start">
          <div className="rounded-[28px] border border-zinc-200/70 bg-white p-6 shadow-[0_20px_60px_rgba(24,24,27,0.08)]">
            <p className="text-xs font-semibold tracking-[0.2em] text-zinc-500">
              At a Glance
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
              {highlights.map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-zinc-100 bg-zinc-50/80 p-4"
                >
                  <p className="text-3xl font-semibold tracking-tight text-zinc-950">
                    {item.value}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-zinc-500">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[28px] border border-zinc-200/70 bg-zinc-950 p-6 text-white shadow-[0_20px_60px_rgba(24,24,27,0.18)]">
            <p className="text-xs font-semibold tracking-[0.2em] text-zinc-400">
              Why it Works
            </p>
            <div className="mt-5 space-y-4">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm"
                >
                  <h2 className="text-base font-semibold">{feature.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-zinc-300">
                    {feature.copy}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="rounded-[32px] border border-zinc-200/70 bg-white p-8 shadow-[0_24px_80px_rgba(24,24,27,0.06)] lg:p-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold tracking-[0.22em] text-zinc-500">
                Discovery Flow
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl">
                Start broad on the homepage, then narrow down when the intent is
                clear.
              </h2>
            </div>

            <Link
              href="/search"
              className="inline-flex items-center justify-center rounded-full bg-zinc-950 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-zinc-800"
            >
              Browse products
            </Link>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="rounded-3xl bg-zinc-50 p-5">
              <p className="text-sm font-semibold text-zinc-950">
                Clear first impression
              </p>
              <p className="mt-2 text-sm leading-6 text-zinc-500">
                The homepage now explains what MarketLens does instead of showing
                the default template.
              </p>
            </div>
            <div className="rounded-3xl bg-zinc-50 p-5">
              <p className="text-sm font-semibold text-zinc-950">
                Immediate next step
              </p>
              <p className="mt-2 text-sm leading-6 text-zinc-500">
                Visitors can jump straight into the search page from the hero or
                the bottom CTA.
              </p>
            </div>
            <div className="rounded-3xl bg-zinc-50 p-5">
              <p className="text-sm font-semibold text-zinc-950">
                Same visual language
              </p>
              <p className="mt-2 text-sm leading-6 text-zinc-500">
                The layout follows the soft neutrals and sharp cards already used
                in the search experience.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
