import path from "path";
import { Review } from "./src/models/Review";
import fs from "fs";
import yaml from "js-yaml";

const filePath = path.join(__dirname, "./reviews.yaml");

function generateData(): Review[] {
  const fileContents = fs.readFileSync(filePath, "utf8");
  const data = yaml.load(fileContents) as any[];

  return data.map((item) => ({
    slug: item.slug,
    pros: item.pros,
    cons: item.cons,
    comparison: item.comparison,
    product: {
      imageUrl: item.imageUrl,
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
  }));
}

const reviews: Review[] = generateData();

fs.writeFileSync(
  path.join(__dirname, "./reviews.yaml"),
  JSON.stringify(reviews, null, 2),
  "utf-8",
);

console.log(
  "YAML files successfully transformed to JSON and saved to output.json",
);
