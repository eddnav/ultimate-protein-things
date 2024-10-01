export enum ProductType {
  ProteinBar = "ProteinBar",
  ProteinCookie = "ProteinCookie",
  ProteinChocolateBar = "ProteinChocolateBar",
  ProteinSpread = "ProteinSpread",
  ProteinPowder = "ProteinPowder",
}

export namespace ProductType {
  export function toString(productType: ProductType): string {
    switch (productType) {
      case ProductType.ProteinBar:
        return "Protein Bar";
      case ProductType.ProteinCookie:
        return "Protein Cookie";
      case ProductType.ProteinChocolateBar:
        return "Protein Chocolate Bar";
      case ProductType.ProteinSpread:
        return "Protein Spread";
      case ProductType.ProteinPowder:
        return "Protein Powder";
    }
  }
}
