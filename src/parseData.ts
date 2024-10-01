import { Review } from "./models/Review";
import yaml from "js-yaml";

function getSlug(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .replace(/[\s_]+/g, "-")
    .replace(/^-+|-+$|%/g, "");
}

export default function parseData(data: string): Review[] {
  const yamlData = yaml.load(data) as any[];
  return yamlData.map((item) => {
    const slug = getSlug(`${item.brand} ${item.name}`);
    return {
      slug: slug,
      good: item.good,
      bad: item.bad,
      comparison: item.comparison,
      product: {
        imageUrl: `https://raw.githubusercontent.com/eddnav/ultimate-protein-things/main/assets/img/${slug}.avif`,
        name: item.name,
        brand: item.brand,
        type: item.type,
        portionWeightInGrams: parseFloat(item.portionWeightInGrams),
        portionCaloriesInKcal: parseFloat(item.portionCaloriesInKcal),
        portionProteinInGrams: parseFloat(item.portionProteinInGrams),
        portionSugarInGrams: parseFloat(item.portionSugarInGrams),
      },
      tier: item.tier,
      year: parseInt(item.year, 10),
    };
  });
}
