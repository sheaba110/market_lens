import { instantMeiliSearch } from "@meilisearch/instant-meilisearch";

const host = process.env.NEXT_PUBLIC_MEILISEARCH_HOST || "http://localhost:7700";
const apiKey = process.env.NEXT_PUBLIC_MEILISEARCH_API_KEY;

export const { searchClient } = instantMeiliSearch(host, apiKey, {
  finitePagination: true,
});
