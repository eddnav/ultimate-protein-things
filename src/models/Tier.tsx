export enum Tier {
  Dogshit = "Dogshit",
  F = "F",
  E = "E",
  D = "D",
  C = "C",
  B = "B",
  A = "A",
  S = "S",
}

export namespace Tier {
  export function getTagClassName(tier: Tier): string {
    switch (tier) {
      case Tier.Dogshit:
        return "tier-dogshit";
      case Tier.F:
        return "tier-f";
      case Tier.E:
        return "tier-e";
      case Tier.D:
        return "tier-d";
      case Tier.C:
        return "tier-c";
      case Tier.B:
        return "tier-b";
      case Tier.A:
        return "tier-a";
      case Tier.S:
        return "tier-s";
    }
  }
}
