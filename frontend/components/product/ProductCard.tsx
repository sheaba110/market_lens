import Image from "next/image";
import type { Product } from "@/lib/types/product";

interface ProductCardProps {
  product: Product;
}

function formatPrice(price: number, currency: Product["currency"]) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(price);
}

export function ProductCard({ product }: ProductCardProps) {
  const hasDiscount =
    product.originalPrice !== undefined && product.originalPrice > product.price;

  const discountPercentage = hasDiscount
    ? Math.round(
        ((product.originalPrice! - product.price) / product.originalPrice!) * 100,
      )
    : null;

  return (
    <article className="group overflow-hidden rounded-2xl border border-zinc-200/60 bg-white">
      <div className="relative aspect-[4/5] overflow-hidden bg-zinc-100">
        <Image
          src={product.image}
          alt={product.title}
          fill
          sizes="(min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {discountPercentage ? (
          <div className="absolute left-3 top-3 rounded-full border border-white/50 bg-white/80 px-2.5 py-1 text-[11px] font-medium text-zinc-900 backdrop-blur-md">
            {discountPercentage}% off
          </div>
        ) : null}

        <button
          type="button"
          className="absolute inset-x-3 bottom-3 translate-y-4 rounded-full bg-zinc-950 px-4 py-3 text-sm font-medium text-white opacity-0 transition-all duration-300 ease-out hover:bg-zinc-800 group-hover:translate-y-0 group-hover:opacity-100"
        >
          Quick Add
        </button>
      </div>

      <div className="space-y-3 p-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="line-clamp-2 text-sm font-medium leading-5 text-zinc-700">
              {product.title}
            </h3>
            <p className="mt-1 text-xs text-zinc-400">{product.category}</p>
          </div>

          <div className="shrink-0 text-right">
            <p className="text-sm font-semibold text-zinc-950">
              {formatPrice(product.price, product.currency)}
            </p>

            {product.originalPrice ? (
              <p className="text-xs text-zinc-400 line-through">
                {formatPrice(product.originalPrice, product.currency)}
              </p>
            ) : null}
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {product.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-zinc-200/70 px-2 py-1 text-[11px] text-zinc-500"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
