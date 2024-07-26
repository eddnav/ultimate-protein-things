export enum ProductType {
    ProteinBar = "ProteinBar",
    ProteinCookie = "ProteinCookie"
}

export namespace ProductType {
    export function toString(productType: ProductType): string {
        switch (productType) {
            case ProductType.ProteinBar: 
            return "Protein Bar";
            case ProductType.ProteinCookie: 
            return "Protein Cookie";
        }
    }
}