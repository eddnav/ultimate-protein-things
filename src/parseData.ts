import { Review } from "./models/Review";
import yaml from "js-yaml";

function getSlug(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .replace(/[\s_]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function parseData(data: string): Review[] {
  const yamlData = yaml.load(data) as any[];
  return yamlData.map((item) => {
    console.log("my item: " + item);
    const slug = getSlug(item.name);
    return {
      slug: slug,
      pros: item.pros,
      cons: item.cons,
      comparison: item.comparison,
      product: {
        imageUrl: `"https://raw.githubusercontent.com/eddnav/ultimate-protein-things/main/assets/img/${slug}.avif"`,
        name: item.name,
        brand: item.brand,
        type: item.type,
        weightInGrams: parseFloat(item.weightInGrams),
        caloriesInKcal: parseFloat(item.caloriesInKcal),
        proteinInGrams: parseFloat(item.proteinInGrams),
        sugarInGrams: parseFloat(item.sugarInGrams),
      },
      tier: item.tier,
      reviewYear: parseInt(item.reviewYear, 10),
    };
  });
}
