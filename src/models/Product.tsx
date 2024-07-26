import { StringLiteral } from "typescript";
import { ProductType } from "./ProductType";

export interface Product {
    name: string;
    brand: string;
    type: ProductType;
    weightInGrams: number;
    caloriesInKcal: number;
    proteinInGrams: number;
    sugarInGrams: number;
}