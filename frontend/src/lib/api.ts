const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000";

export interface DiagnosticResult {
  crop_type: string;
  disease_name: string;
  condition: string;
  confidence_score: number;
  matched_product_id: string;
  bangla_prescription: {
    disease_explanation_bn: string;
    dosage: string;
  };
}

export type DiagnosisResult = DiagnosticResult;

export interface Product {
  id: number;
  matrix_id: string;
  name_bn: string;
  name_en: string;
  formulation: string;
  active_chemical: string;
  pack_size: string;
  unit_price_bdt: number;
  crop_targets: string[];
  description_bn: string;
  description_en: string;
  product_type: string;
  legacy_url: string;
}

export type NewsItem = {
  id: number;
  title_en: string;
  title_bn: string;
  body_en: string;
  body_bn: string;
  is_pinned: boolean;
  published_at: string;
};

export type AboutData = {
  profile: {
    mission_en: string;
    mission_bn: string;
    vision_en: string;
    vision_bn: string;
    profile_en: string;
    profile_bn: string;
  };
  directors: {
    id: number;
    name_en: string;
    name_bn: string;
    title_en: string;
    title_bn: string;
    bio_en: string;
    bio_bn: string;
  }[];
  milestones: {
    id: number;
    year: number;
    title_en: string;
    title_bn: string;
    description_en: string;
    description_bn: string;
  }[];
};

async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  let res: Response;
  try {
    res = await fetch(`${API_BASE}${path}`, init);
  } catch {
    throw new Error("Django API is unreachable. Please confirm the backend is running at http://127.0.0.1:8000.");
  }
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err as { detail?: string }).detail ?? `Request failed: ${path}`);
  }
  return res.json();
}

export async function diagnoseImage(file: File, cropContext?: string): Promise<DiagnosisResult> {
  const formData = new FormData();
  formData.append("image", file);
  if (cropContext) formData.append("crop_context", cropContext);
  return apiFetch("/api/v1/ai/diagnose/", {
    method: "POST",
    body: formData,
  });
}

export async function sendChatMessage(message: string, messages: { role: string; content: string }[]): Promise<string> {
  const data = await apiFetch<{ reply: string }>("/api/v1/ai/chat/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, messages }),
  });
  return data.reply;
}

export async function fetchProducts(type?: string): Promise<Product[]> {
  const url = type
    ? `/api/products/?type=${encodeURIComponent(type)}`
    : "/api/products/";
  return apiFetch(url);
}

export async function fetchNews(): Promise<NewsItem[]> {
  return apiFetch("/api/cms/news/");
}

export async function fetchAbout(): Promise<AboutData> {
  return apiFetch("/api/cms/about/");
}

export async function submitContact(payload: {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}): Promise<void> {
  await apiFetch("/api/cms/contact/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}
