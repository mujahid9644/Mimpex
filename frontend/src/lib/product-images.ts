import { MIMPEX_ASSETS } from "@/lib/assets";

const BY_TYPE: Record<string, string> = {
  insecticide: MIMPEX_ASSETS.banners.pesticide,
  fungicide: MIMPEX_ASSETS.banners.fungicide,
  herbicide: MIMPEX_ASSETS.sliders[0],
  miticide: MIMPEX_ASSETS.banners.pesticide,
  pgr: MIMPEX_ASSETS.banners.fertilizer,
  public_health: MIMPEX_ASSETS.banners.field,
  aquaculture: MIMPEX_ASSETS.iconLeaf,
  rodenticide: MIMPEX_ASSETS.iconLeaf,
  other: MIMPEX_ASSETS.iconLeaf,
};

const BY_MATRIX: Record<string, string> = {
  M_001: "https://mimpexbd.com/wp-content/uploads/2022/08/quloop-product-frame-300x300.png",
  M_002: "https://mimpexbd.com/wp-content/uploads/2022/08/ethiplus-product-frame-300x300.png",
  M_003: "https://mimpexbd.com/wp-content/uploads/2022/08/ga-3-product-frame-300x300.png",
  M_004: "https://mimpexbd.com/wp-content/uploads/2022/08/ga-3-tablet-product-frame-300x300.png",
  M_005: "https://mimpexbd.com/wp-content/uploads/2022/07/ultimaplus-product-frame-300x300.png",
  M_006: "https://mimpexbd.com/wp-content/uploads/2022/08/amixor-product-frame-300x300.png",
  M_007: "https://mimpexbd.com/wp-content/uploads/2022/08/kotan-product-frame-300x300.png",
  M_008: "https://mimpexbd.com/wp-content/uploads/2022/07/indol-product-frame-300x300.png",
};

export function getProductImageUrl(productType: string, matrixId?: string): string {
  if (matrixId && BY_MATRIX[matrixId]) return BY_MATRIX[matrixId];
  return BY_TYPE[productType] ?? MIMPEX_ASSETS.iconLeaf;
}
