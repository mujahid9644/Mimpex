const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

export type DashboardStats = {
  total_sales_bdt: number;
  active_dealers: number;
  crops_diagnosed_ai: number;
  products_in_catalog: number;
  stock_summary: { in_stock: number; low_stock: number; out_of_stock: number };
  revenue_delta_percent?: number;
  dealer_delta_percent?: number;
  diagnostic_heatmap?: DiagnosticHeatmapRow[];
};

export type AdminProduct = {
  id: number;
  matrix_id: string;
  name_bn: string;
  name_en: string;
  formulation: string;
  description_bn: string;
  description_en: string;
  product_type: string;
  active_chemical: string;
  pack_size: string;
  unit_price_bdt: number;
  crop_targets: string[];
  stock_quantity: number;
  stock_status: string;
  is_verified_matrix: boolean;
};

export type DiagnosticHeatmapRow = {
  region: string;
  disease: string;
  intensity: number;
  cases: number;
};

export type DiagnosticLogRow = {
  id: number;
  crop_type: string;
  condition: string;
  matched_product_id: string;
  created_at: string;
};

async function adminFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}/api/admin${path}`, {
    ...init,
    headers: { "Content-Type": "application/json", ...init?.headers },
  });
  if (!res.ok) throw new Error(`Admin API error: ${path}`);
  if (res.status === 204) return undefined as T;
  return res.json();
}

export const adminApi = {
  stats: () => adminFetch<DashboardStats>("/stats/"),
  products: () => adminFetch<AdminProduct[]>("/products/"),
  createProduct: (body: Partial<AdminProduct>) =>
    adminFetch<AdminProduct>("/products/", { method: "POST", body: JSON.stringify(body) }),
  updateProduct: (matrixId: string, body: Partial<AdminProduct>) =>
    adminFetch<AdminProduct>(`/products/${matrixId}/`, { method: "PATCH", body: JSON.stringify(body) }),
  deleteProduct: (matrixId: string) =>
    adminFetch<void>(`/products/${matrixId}/`, { method: "DELETE" }),
  diagnostics: () => adminFetch<DiagnosticLogRow[]>("/diagnostics/"),
};
