export const PRODUCT_CATEGORIES = [
  { slug: "all", type: "", labelKey: "filterAll" as const },
  { slug: "insecticide", type: "insecticide", labelKey: "insecticide" as const },
  { slug: "fungicide", type: "fungicide", labelKey: "fungicide" as const },
  { slug: "herbicide", type: "herbicide", labelKey: "herbicide" as const },
  { slug: "miticide", type: "miticide", labelKey: "miticide" as const },
  { slug: "public_health", type: "public_health", labelKey: "publicHealth" as const },
  { slug: "pgr", type: "pgr", labelKey: "pgr" as const },
] as const;
