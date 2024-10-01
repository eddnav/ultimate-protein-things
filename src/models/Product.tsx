import { ProductType } from "./ProductType";

export interface Product {
  imageUrl: string;
  name: string;
  brand: string;
  type: ProductType;
  portionWeightInGrams: number;
  portionCaloriesInKcal: number;
  portionProteinInGrams: number;
  portionSugarInGrams: number;
}
