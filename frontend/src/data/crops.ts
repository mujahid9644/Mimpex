import type { ProductCategoryId } from "@/data/mimpex-catalog";

export interface CropMatrixItem {
  slug: string;
  nameBn: string;
  nameEn: string;
}

export interface CategoryLink {
  href: string;
  labelBn: string;
  labelEn: string;
  category: ProductCategoryId;
}

export const HOME_CATEGORY_LINKS: CategoryLink[] = [
  { href: "/products?category=insecticide", labelBn: "কীটনাশক", labelEn: "Insecticides", category: "insecticide" },
  { href: "/products?category=fungicide", labelBn: "ছত্রাকনাশক", labelEn: "Fungicides", category: "fungicide" },
  { href: "/products?category=herbicide", labelBn: "আগাছানাশক", labelEn: "Herbicides", category: "herbicide" },
  { href: "/products?category=pgr", labelBn: "সার ও পিজিআর", labelEn: "Fertilizer & PGR", category: "pgr" },
  { href: "/products?category=aquaculture", labelBn: "একুয়াকালচার পণ্য", labelEn: "Aquaculture Products", category: "aquaculture" },
];

export const CROP_MATRIX: CropMatrixItem[] = [
  { slug: "rice", nameBn: "ধান", nameEn: "Rice" },
  { slug: "maize", nameBn: "ভুট্টা", nameEn: "Maize" },
  { slug: "potato", nameBn: "আলু", nameEn: "Potato" },
  { slug: "mango", nameBn: "আম", nameEn: "Mango" },
  { slug: "litchi", nameBn: "লিচু", nameEn: "Litchi" },
  { slug: "guava", nameBn: "পেয়ারা", nameEn: "Guava" },
  { slug: "soybean", nameBn: "সয়াবিন", nameEn: "Soybean" },
  { slug: "onion", nameBn: "পেয়াজ", nameEn: "Onion" },
  { slug: "chili", nameBn: "মরিচ", nameEn: "Chili" },
  { slug: "lemon", nameBn: "লেবু", nameEn: "Lemon" },
  { slug: "watermelon", nameBn: "তরমুজ", nameEn: "Watermelon" },
  { slug: "banana", nameBn: "কলা", nameEn: "Banana" },
  { slug: "bean", nameBn: "শিম", nameEn: "Bean" },
  { slug: "mung-bean", nameBn: "মুগ ডাল", nameEn: "Mung Bean" },
  { slug: "eggplant", nameBn: "বেগুন", nameEn: "Eggplant" },
  { slug: "bottle-gourd", nameBn: "লাউ", nameEn: "Bottle Gourd" },
  { slug: "sweet-pumpkin", nameBn: "মিষ্টি কুমড়া", nameEn: "Sweet Pumpkin" },
  { slug: "tomato", nameBn: "টমেটো", nameEn: "Tomato" },
  { slug: "cucumber", nameBn: "শসা", nameEn: "Cucumber" },
  { slug: "pointed-gourd", nameBn: "পটল", nameEn: "Pointed Gourd" },
  { slug: "bitter-gourd", nameBn: "করলা", nameEn: "Bitter Gourd" },
];

export function getCropBySlug(slug: string) {
  return CROP_MATRIX.find((crop) => crop.slug === slug);
}
