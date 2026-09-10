import type { Product } from "@/lib/types/product";

interface ProductResponse {
  results: Product[];
}

export async function searchProducts({ query }: { query: string }): Promise<ProductResponse> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";
  const response = await fetch(`${baseUrl}/products/?search=${encodeURIComponent(query)}`);

  if (!response.ok) throw new Error("Product search failed");

  const payload = await response.json();
  const results = payload.results ?? payload;
  return {
    results: results.map((product: Product & { current_price?: number }) => ({
      ...product,
      price: product.price ?? product.current_price,
    })),
  };
}
