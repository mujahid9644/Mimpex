"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { ChevronRight, Grid2X2, ListFilter, Search } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { getCropBySlug } from "@/data/crops";
import {
  CATALOG_CATEGORIES,
  MIMPEX_CATALOG,
  getCategoryLabel,
  getProductSlug,
  type MimpexCatalogProduct,
  type ProductCategoryId,
} from "@/data/mimpex-catalog";
import { cn } from "@/lib/cn";

function isCategoryId(value: string | null): value is ProductCategoryId {
  return Boolean(value && CATALOG_CATEGORIES.some((category) => category.id === value));
}

function matchesSearch(product: MimpexCatalogProduct, query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  return [
    product.nameBn,
    product.nameEn,
    product.mainIngredientBn,
    product.efficacyBn,
    product.dosageBn,
    product.cropTagsBn.join(" "),
    getCategoryLabel(product.category, "bn"),
  ]
    .join(" ")
    .toLowerCase()
    .includes(q);
}

function CatalogProductCard({ product }: { product: MimpexCatalogProduct }) {
  const href = `/product/${getProductSlug(product)}`;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition hover:-translate-y-1 hover:border-emerald-200 hover:shadow-xl">
      <Link href={href} className="relative block aspect-square overflow-hidden rounded-xl border border-gray-100 bg-gray-50">
        <Image
          src={product.image}
          alt={product.nameBn}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-contain p-6 transition duration-300 group-hover:scale-105"
        />
      </Link>

      <div className="flex flex-1 flex-col border-t border-slate-100 p-5">
        <Link href={`/product-category/${product.category}`} className="text-xs font-black text-red-700">
          {getCategoryLabel(product.category, "bn")}
        </Link>
        <Link href={href} className="mt-2">
          <h3 className="line-clamp-2 text-lg font-black leading-snug text-emerald-950 group-hover:text-emerald-700">
            {product.nameBn}
          </h3>
        </Link>
        <p className="mt-3 line-clamp-3 flex-1 text-sm leading-7 text-slate-600">{product.efficacyBn}</p>
        <p className="mt-3 text-sm font-bold text-slate-900">মূল উপাদান: {product.mainIngredientBn}</p>
        <Link href={href} className="mt-4 inline-flex items-center gap-1 text-sm font-black text-emerald-700 hover:text-red-700">
          বিস্তারিত জানুন
          <ChevronRight className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const categoryQuery = searchParams.get("category");
  const cropQuery = searchParams.get("crop");
  const searchQuery = searchParams.get("search") ?? "";
  const [activeCategory, setActiveCategory] = useState<ProductCategoryId>(isCategoryId(categoryQuery) ? categoryQuery : "all");
  const [search, setSearch] = useState(searchQuery);

  useEffect(() => {
    setActiveCategory(isCategoryId(categoryQuery) ? categoryQuery : "all");
  }, [categoryQuery]);

  useEffect(() => {
    setSearch(searchQuery);
  }, [searchQuery]);

  const crop = cropQuery ? getCropBySlug(cropQuery) : undefined;
  const filtered = useMemo(() => {
    return MIMPEX_CATALOG.filter((product) => {
      const categoryOk = activeCategory === "all" || product.category === activeCategory;
      const cropOk = !crop || product.cropTagsBn.some((tag) => tag === crop.nameBn);
      return categoryOk && cropOk && matchesSearch(product, search);
    });
  }, [activeCategory, crop, search]);

  const activeLabel = crop ? `${crop.nameBn} ফসলের সমাধান` : activeCategory === "all" ? "সকল পণ্য" : getCategoryLabel(activeCategory, "bn");

  return (
    <div className="min-h-screen bg-white">
      <Container className="py-10 md:py-14">
        <nav className="mb-8 flex items-center gap-2 text-sm text-slate-500">
          <Link href="/" className="hover:text-emerald-700">
            হোম
          </Link>
          <ChevronRight className="h-4 w-4 opacity-60" />
          <span className="font-semibold text-slate-900">পণ্য তালিকা</span>
        </nav>

        <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
          <aside className="w-full shrink-0 lg:sticky lg:top-28 lg:w-72">
            <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <div className="border-b border-slate-200 pb-3">
                <p className="flex items-center gap-2 text-sm font-black text-emerald-950">
                  <ListFilter className="h-4 w-4" />
                  পণ্যের শ্রেণিবিভাগ
                </p>
              </div>
              <nav className="pt-3" aria-label="Product categories">
                {CATALOG_CATEGORIES.map((category) => {
                  const count =
                    category.id === "all"
                      ? MIMPEX_CATALOG.length
                      : MIMPEX_CATALOG.filter((product) => product.category === category.id).length;
                  const active = activeCategory === category.id;
                  return (
                    <button
                      key={category.id}
                      type="button"
                      onClick={() => setActiveCategory(category.id)}
                      className={cn(
                        "mb-1 flex w-full items-center justify-between rounded-md px-3 py-2.5 text-left text-sm font-bold transition-colors",
                        active ? "bg-emerald-700 text-white" : "text-slate-700 hover:bg-emerald-50 hover:text-emerald-800"
                      )}
                    >
                      <span>{category.labelBn}</span>
                      <span className={cn("text-xs", active ? "text-white/80" : "text-slate-400")}>{count}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </aside>

          <div className="min-w-0 flex-1">
            <div className="mb-6 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
              <div>
                <h1 className="text-3xl font-black text-emerald-950">{activeLabel}</h1>
                <p className="mt-1 text-sm text-slate-500">{filtered.length}টি পণ্য দেখানো হচ্ছে</p>
              </div>
              <div className="hidden items-center gap-2 text-sm font-bold text-slate-500 sm:flex">
                <Grid2X2 className="h-4 w-4" />
                <span>Enterprise product grid</span>
              </div>
              <div className="relative w-full max-w-lg">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type="search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="পণ্যের নাম, উপাদান, ফসল বা সমস্যা দিয়ে খুঁজুন..."
                  className="h-11 w-full rounded-md border border-slate-300 bg-white pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>
            </div>

            {crop && (
              <div className="mb-6 rounded-lg border border-lime-200 bg-lime-50 p-4 text-sm font-semibold text-emerald-900">
                Crop context active: {crop.nameBn}. রোগ নির্ণয়ের জন্য{" "}
                <Link href={`/imagebot?crop=${crop.slug}`} className="font-black text-red-700 underline">
                  ImageBot খুলুন
                </Link>
                ।
              </div>
            )}

            {filtered.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                {filtered.map((product) => (
                  <CatalogProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="rounded-lg border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
                <p className="text-lg font-semibold text-slate-700">কোনো পণ্য পাওয়া যায়নি</p>
                <p className="mt-2 text-sm text-slate-500">অন্য শ্রেণি বা সার্চ শব্দ চেষ্টা করুন।</p>
                <button
                  type="button"
                  onClick={() => {
                    setSearch("");
                    setActiveCategory("all");
                  }}
                  className="mt-6 rounded-md bg-emerald-700 px-5 py-2.5 text-sm font-black text-white hover:bg-emerald-800"
                >
                  সব পণ্য দেখুন
                </button>
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}
