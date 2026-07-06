"use client";

import { useEffect, useMemo, useState } from "react";

import { ProductCard } from "@/components/products/ProductCard";
import { fetchProducts, type Product } from "@/lib/api";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { PRODUCT_CATEGORIES } from "@/types/products";
import { cn } from "@/lib/cn";

const DEMO: Product[] = [
  {
    id: 1,
    matrix_id: "M_002",
    name_bn: "ইথিপ্লাস ৩৯.৬ এস এল",
    name_en: "EthiPlus 39.6 SL",
    formulation: "39.6% SL",
    active_chemical: "Ethephon 39.6%",
    pack_size: "100 ml",
    unit_price_bdt: 0,
    crop_targets: ["ধান", "আম", "সবজি"],
    description_bn:
      "উদ্ভিদের দৈহিক বৃদ্ধি, ফুলের সুষম বিকাশ, ফলের আকৃতি বড় করা এবং ফলন বৃদ্ধিতে সহায়ক।",
    description_en: "Supports vegetative growth, flowering, fruit sizing and higher yield.",
    product_type: "pgr",
    legacy_url:
      "https://mimpexbd.com/product/%e0%a6%87%e0%a6%a5%e0%a6%bf%e0%a6%aa%e0%a7%8d%e0%a6%b2%e0%a6%be%e0%a6%b8-%e0%a7%a9%e0%a7%af-%e0%a7%ac-%e0%a6%8f%e0%a6%b8-%e0%a6%8f%e0%a6%b2/",
    image_url: "",
    is_active: true,
    stock_status: "in_stock",
  },
];

function ProductCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-[0_12px_30px_rgba(2,34,20,0.08)]">
      <div className="aspect-square w-full animate-pulse bg-slate-200 sm:aspect-[4/3] lg:aspect-square" />
      <div className="space-y-3 p-4">
        <div className="h-5 w-3/4 animate-pulse rounded bg-slate-200" />
        <div className="h-3 w-1/2 animate-pulse rounded bg-slate-100" />
        <div className="h-12 w-full animate-pulse rounded bg-slate-100" />
      </div>
    </div>
  );
}

function SearchIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="11" cy="11" r="7" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

// FilterIcon is used in categories filter title
function FilterIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <line x1="4" y1="6" x2="20" y2="6" />
      <line x1="7" y1="12" x2="17" y2="12" />
      <line x1="10" y1="18" x2="14" y2="18" />
    </svg>
  );
}

export function ProductCatalog() {
  const { t, locale } = useLanguage();
  const [active, setActive] = useState("all");
  const [query, setQuery] = useState("");
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch once, filter client-side afterwards (snappier category/search switching)
  useEffect(() => {
    setLoading(true);
    fetchProducts()
      .then(setAllProducts)
      .catch(() => setAllProducts(DEMO))
      .finally(() => setLoading(false));
  }, []);

  const counts = useMemo(() => {
    const map: Record<string, number> = { all: allProducts.length };
    for (const cat of PRODUCT_CATEGORIES) {
      if (cat.slug === "all") continue;
      map[cat.slug] = allProducts.filter((p) => p.product_type === cat.type).length;
    }
    return map;
  }, [allProducts]);

  const filtered = useMemo(() => {
    const cat = PRODUCT_CATEGORIES.find((c) => c.slug === active);
    let list = allProducts;

    if (cat && cat.slug !== "all" && cat.type) {
      list = list.filter((p) => p.product_type === cat.type);
    }

    if (query.trim()) {
      const q = query.trim().toLowerCase();
      list = list.filter((p) =>
        [p.name_bn, p.name_en, p.active_chemical, ...(p.crop_targets || [])]
          .filter(Boolean)
          .some((field) => field!.toLowerCase().includes(q))
      );
    }

    return list;
  }, [allProducts, active, query]);

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[280px_1fr]">
      {/* Sidebar filters */}
      <aside className="lg:sticky lg:top-24 lg:self-start">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center gap-2 border-b border-slate-100 pb-4">
            <FilterIcon className="h-5 w-5 text-mimpex-green" />
            <h3 className="text-base font-bold text-slate-900">
              {locale === "bn" ? "পণ্যের ক্যাটাগরি" : "Product Categories"}
            </h3>
          </div>

          <div className="flex flex-col gap-1.5">
            {PRODUCT_CATEGORIES.map((cat) => (
              <button
                key={cat.slug}
                type="button"
                onClick={() => setActive(cat.slug)}
                className={cn(
                  "flex items-center justify-between rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors duration-150",
                  active === cat.slug
                    ? "bg-mimpex-green text-white shadow-sm"
                    : "text-slate-600 hover:bg-slate-50"
                )}
              >
                <span>{t.products[cat.labelKey]}</span>
                <span
                  className={cn(
                    "rounded-full px-2 py-0.5 text-xs font-bold",
                    active === cat.slug ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"
                  )}
                >
                  {counts[cat.slug] ?? 0}
                </span>
              </button>
            ))}
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div>
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
              {locale === "bn" ? "সকল পণ্য" : "All Products"}
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              {loading
                ? locale === "bn"
                  ? "লোড হচ্ছে..."
                  : "Loading..."
                : locale === "bn"
                  ? `${filtered.length} টি পণ্য দেখানো হচ্ছে (মোট ${allProducts.length})`
                  : `${filtered.length} of ${allProducts.length} products showing`}
            </p>
          </div>
        </div>

        <div className="relative mt-6">
          <SearchIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={
              locale === "bn"
                ? "পণ্য, উপাদান, ফসল বা সমস্যা দিয়ে খুঁজুন..."
                : "Search by product, ingredient, crop, or problem..."
            }
            className="w-full rounded-2xl border border-slate-200 bg-white py-3.5 pl-12 pr-4 text-sm text-slate-700 shadow-sm outline-none transition focus:border-mimpex-green focus:ring-2 focus:ring-emerald-600/20"
          />
        </div>

        {loading ? (
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        ) : filtered.length > 0 ? (
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((p, i) => (
              <ProductCard key={p.matrix_id} product={p} locale={locale} index={i} />
            ))}
          </div>
        ) : (
          <div className="mt-16 flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 py-16 text-center">
            <p className="text-slate-500">
              {locale === "bn"
                ? "এই ক্যাটাগরিতে এখনো কোনো পণ্য নেই।"
                : "No products in this category yet."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}