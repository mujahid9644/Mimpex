"use client";

import { useEffect, useState } from "react";

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
    description_bn: "উদ্ভিদের দৈহিক বৃদ্ধি, ফুলের সুষম বিকাশ, ফলের আকৃতি বড় করা এবং ফলন বৃদ্ধিতে সহায়ক।",
    description_en: "Supports vegetative growth, flowering, fruit sizing and higher yield.",
    product_type: "pgr",
    legacy_url: "https://mimpexbd.com/product/%e0%a6%87%e0%a6%a5%e0%a6%bf%e0%a6%aa%e0%a7%8d%e0%a6%b2%e0%a6%be%e0%a6%b8-%e0%a7%a9%e0%a7%af-%e0%a7%ac-%e0%a6%8f%e0%a6%b8-%e0%a6%8f%e0%a6%b2/",
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

export function ProductCatalog() {
  const { t, locale } = useLanguage();
  const [active, setActive] = useState("all");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cat = PRODUCT_CATEGORIES.find((c) => c.slug === active);
    setLoading(true);
    fetchProducts(cat?.type || undefined)
      .then(setProducts)
      .catch(() => setProducts(DEMO))
      .finally(() => setLoading(false));
  }, [active]);

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {PRODUCT_CATEGORIES.map((cat) => (
          <button
            key={cat.slug}
            type="button"
            onClick={() => setActive(cat.slug)}
            className={cn(
              "rounded-full px-4 py-2.5 text-sm font-semibold transition-all duration-200",
              active === cat.slug
                ? "bg-mimpex-green text-white shadow-md shadow-emerald-900/15"
                : "bg-white text-slate-600 shadow-sm ring-1 ring-slate-200 hover:ring-emerald-600/40"
            )}
          >
            {t.products[cat.labelKey]}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      ) : (
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {products.map((p, i) => (
            <ProductCard key={p.matrix_id} product={p} locale={locale} index={i} />
          ))}
        </div>
      )}

      {!loading && products.length === 0 && (
        <p className="mt-16 text-center text-slate-500">No products in this category yet.</p>
      )}
    </div>
  );
}
