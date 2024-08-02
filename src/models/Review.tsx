import { Product } from "./Product";
import { Tier } from "./Tier";

export interface Review {
  slug: string;
  good: string[];
  bad: string[];
  comparison: string | null;
  product: Product;
  tier: Tier;
  year: number;
}
