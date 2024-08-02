import { Product } from "./Product";
import { Tier } from "./Tier";

export interface Review {
  slug: string;
  pros: [string];
  cons: [string];
  comparison: string | null;
  product: Product;
  tier: Tier;
  reviewYear: number;
}
