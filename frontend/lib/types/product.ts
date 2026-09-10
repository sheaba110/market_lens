export interface Product {
  id: string;
  title: string;
  url: string;
  vendor: string;
  image_url?: string | null;
  price?: number;
  currency?: string;
  originalPrice?: number;
  category?: string;
  tags?: string[];
}
