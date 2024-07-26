import { ProductType } from "./ProductType";

export interface Product {
    imageUrl: string;
    name: string;
    brand: string;
    type: ProductType;
    weightInGrams: number;
    caloriesInKcal: number;
    proteinInGrams: number;
    sugarInGrams: number;
}