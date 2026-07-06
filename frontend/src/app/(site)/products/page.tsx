"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Grid2X2, ListFilter, Search, Sprout, Database, Layers, CheckCircle2, X } from "lucide-react";

import { ProductCard } from "@/components/products/ProductCard";
import { Container } from "@/components/ui/Container";
import { CATALOG_CATEGORIES, type ProductCategoryId } from "@/data/mimpex-catalog";
import { getCropBySlug } from "@/data/crops";
import { cn } from "@/lib/cn";
import { fetchProducts, type Product } from "@/lib/api";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

function isCategoryId(value: string | null): value is ProductCategoryId {
  return Boolean(value && CATALOG_CATEGORIES.some((category) => category.id === value));
}

function getCategoryLabel(id: ProductCategoryId, locale: "en" | "bn") {
  const cat = CATALOG_CATEGORIES.find((category) => category.id === id);
  if (!cat) return id;
  return locale === "bn" ? cat.labelBn : cat.labelEn;
}

function matchesSearch(product: Product, query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return true;

  return [
    product.matrix_id,
    product.name_bn,
    product.name_en,
    product.formulation,
    product.active_chemical,
    product.description_bn,
    product.description_en,
    product.product_type,
    product.crop_targets.join(" "),
  ]
    .join(" ")
    .toLowerCase()
    .includes(q);
}

// Framer Motion Variants for Premium Entrance
const faderEffect = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] }
  }
};

const heroVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 1, 0.5, 1],
      staggerChildren: 0.1,
    },
  },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04,
    },
  },
};

export default function ProductsPage() {
  const { locale } = useLanguage();
  const searchParams = useSearchParams();
  const categoryQuery = searchParams.get("category");
  const cropQuery = searchParams.get("crop");
  const searchQuery = searchParams.get("search") ?? "";
  const [activeCategory, setActiveCategory] = useState<ProductCategoryId>(isCategoryId(categoryQuery) ? categoryQuery : "all");
  const [search, setSearch] = useState(searchQuery);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    setActiveCategory(isCategoryId(categoryQuery) ? categoryQuery : "all");
  }, [categoryQuery]);

  useEffect(() => {
    setSearch(searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    let ignore = false;

    setLoading(true);
    setError("");

    fetchProducts()
      .then((nextProducts) => {
        if (!ignore) setProducts(nextProducts);
      })
      .catch((err: Error) => {
        if (!ignore) {
          setProducts([]);
          setError(err.message);
        }
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, []);

  const crop = cropQuery ? getCropBySlug(cropQuery) : undefined;
  const filtered = useMemo(() => {
    return products.filter((product) => {
      const categoryOk = activeCategory === "all" || product.product_type === activeCategory;
      return categoryOk && (crop ? product.crop_targets.some((target) => target === crop.nameBn) : true) && matchesSearch(product, search);
    });
  }, [activeCategory, crop, products, search]);

  const activeLabel = crop
    ? (locale === "bn" ? `${crop.nameBn} ফসল সমাধান` : `${crop.nameEn || crop.nameBn} Crop Solutions`)
    : activeCategory === "all"
      ? (locale === "bn" ? "সকল পণ্য" : "All Products")
      : getCategoryLabel(activeCategory, locale);

  const totalProductsCount = products.length;
  const totalCategoriesCount = CATALOG_CATEGORIES.length - 1; // exclude 'all'
  const totalCropsCount = useMemo(() => {
    const crops = new Set(products.flatMap((p) => p.crop_targets));
    return crops.size;
  }, [products]);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,#0b4834_0,#052e1e_42%,#0b4834_100%)] relative overflow-hidden text-white">
      {/* Background Graphic Lines */}
      <div className="absolute inset-0 opacity-[0.02] bg-[url('https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?q=80&w=1600')] bg-cover bg-center pointer-events-none mix-blend-overlay" />

      {/* SECTION 1: HERO SECTION */}
      <section className="relative z-10 py-16 md:py-10 border-b border-white/5 bg-transparent">
        <Container>
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={heroVariants}
            className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between"
          >
            {/* Title & Subtitle */}
            <div className="max-w-3xl space-y-6">
              <nav className="flex items-center gap-2 text-sm text-emerald-300/70">
                <Link href="/" className="hover:text-lime-400 transition-colors">
                  {locale === "bn" ? "হোম" : "Home"}
                </Link>
                <ChevronRight className="h-4 w-4 opacity-50" />
                <span className="font-semibold text-emerald-100">{locale === "bn" ? "পণ্য ক্যাটালগ" : "Product Catalog"}</span>
              </nav>

              <div className="space-y-4">
                <span className="text-xs font-bold text-lime-400 uppercase tracking-widest bg-lime-400/10 px-4 py-1.5 rounded-full border border-lime-400/20 shadow-sm inline-block animate-pulse">
                  {locale === "bn" ? "কৃষি বিজ্ঞান ও ফসল সুরক্ষা" : "Agrochemicals & Crop Science"}
                </span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
                  {locale === "bn" ? "আমাদের সমাধান ক্যাটালগ" : "Crop Solutions Catalog"}
                </h1>
                <p className="text-base md:text-lg leading-relaxed text-emerald-100/80 font-light max-w-2xl">
                  {locale === "bn" 
                    ? "বাংলাদেশের কৃষকদের ফলন ও ফসলের স্বাস্থ্য সুরক্ষায় মিমপেক্স-এর উন্নত ফর্মুলেশন ও প্রযুক্তিসমৃদ্ধ কৃষি বিজ্ঞান সমাধান।" 
                    : "Mimpex's advanced formulations and technology-driven crop solutions, dedicated to enhancing yield and protecting crop health for farmers across Bangladesh."}
                </p>
              </div>
            </div>

            {/* Premium Dynamic Statistics (Glassmorphism) */}
            <div className="grid grid-cols-3 gap-4 sm:gap-6 w-full lg:max-w-md shrink-0">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 md:p-5 text-center backdrop-blur-md shadow-lg hover:border-lime-400/35 transition-colors duration-300">
                <Database className="h-5 w-5 text-lime-400 mx-auto mb-2 opacity-80" />
                <p className="text-2xl md:text-3xl font-black text-white">{loading ? "..." : totalProductsCount}</p>
                <p className="text-[10px] text-emerald-200/60 mt-1 uppercase tracking-wider font-bold">
                  {locale === "bn" ? "সক্রিয় সমাধান" : "Active Solutions"}
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 md:p-5 text-center backdrop-blur-md shadow-lg hover:border-lime-400/35 transition-colors duration-300">
                <Layers className="h-5 w-5 text-lime-400 mx-auto mb-2 opacity-80" />
                <p className="text-2xl md:text-3xl font-black text-white">{loading ? "..." : totalCategoriesCount}</p>
                <p className="text-[10px] text-emerald-200/60 mt-1 uppercase tracking-wider font-bold">
                  {locale === "bn" ? "শ্রেণীসমূহ" : "Categories"}
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 md:p-5 text-center backdrop-blur-md shadow-lg hover:border-lime-400/35 transition-colors duration-300">
                <Sprout className="h-5 w-5 text-lime-400 mx-auto mb-2 opacity-80" />
                <p className="text-2xl md:text-3xl font-black text-white">{loading ? "..." : totalCropsCount}</p>
                <p className="text-[10px] text-emerald-200/60 mt-1 uppercase tracking-wider font-bold">
                  {locale === "bn" ? "লক্ষ্য ফসল" : "Target Crops"}
                </p>
              </div>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* SECTION 2: SEARCH / FILTER & CONTEXT (Glass background layout) */}
      <section className="bg-white/5 backdrop-blur-md relative z-10 border-b border-white/10 py-10">
        <Container>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-1">
              <h2 className="text-2xl md:text-3xl font-extrabold text-white">{activeLabel}</h2>
              <p className="text-sm text-emerald-200/60">
                {loading 
                  ? (locale === "bn" ? "পণ্য লোড হচ্ছে..." : "Loading products...") 
                  : (locale === "bn" 
                    ? `${products.length}টির মধ্যে ${filtered.length}টি পণ্য প্রদর্শিত হচ্ছে` 
                    : `${filtered.length} of ${products.length} solutions showing`)}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-4 w-full max-w-2xl lg:justify-end">
              {/* Desktop Live Grid Status Indicator */}
              <div className="hidden items-center gap-2 rounded-2xl bg-white/5 border border-white/10 px-4 py-3 text-xs font-bold text-emerald-300 lg:flex shrink-0">
                <Grid2X2 className="h-4.5 w-4.5 text-lime-400" />
                <span>{locale === "bn" ? "লাইভ গ্রিড" : "Live Grid"}</span>
              </div>

              {/* Large Glass Search Container */}
              <div className="relative w-full max-w-xl group">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-lime-500/10 rounded-2xl blur-md opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
                <div className="relative flex items-center bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-lg transition-all duration-300 focus-within:border-lime-400/50 focus-within:ring-1 focus-within:ring-lime-400/30">
                  <Search className="absolute left-4 h-5 w-5 text-emerald-300/60 transition-colors group-focus-within:text-lime-400" />
                  <input
                    type="search"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder={
                      locale === "bn"
                        ? "পণ্য, উপাদান, ফসল বা সমস্যা দিয়ে খুঁজুন..."
                        : "Search by product, ingredient, crop, or problem..."
                    }
                    className="h-14 w-full bg-transparent pl-12 pr-4 text-sm text-white placeholder-emerald-100/40 focus:outline-none"
                  />
                </div>
              </div>

              {/* Mobile Filter Button */}
              <button
                type="button"
                onClick={() => setIsFilterOpen(true)}
                className="lg:hidden flex items-center justify-center gap-2 rounded-2xl bg-white/5 border border-white/10 px-5 py-3 text-sm font-bold text-white hover:bg-white/10 transition-all duration-300 w-full sm:w-auto"
              >
                <ListFilter className="h-4.5 w-4.5 text-lime-400" />
                <span>{locale === "bn" ? "ক্যাটাগরি ফিল্টার" : "Filter Categories"}</span>
              </button>
            </div>
          </div>

          {/* Context Alerts (Crop target active filter warning) */}
          {crop && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-lime-400/30 bg-lime-400/10 p-4 text-sm font-semibold text-lime-200"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-lime-400 shrink-0" />
                <span>
                  {locale === "bn"
                    ? `সক্রিয় ফসলের সমাধান প্রসঙ্গ: ${crop.nameBn}`
                    : `Active crop context solutions: ${crop.nameBn}`}
                </span>
              </div>
              <Link href={`/imagebot?crop=${crop.slug}`} className="font-extrabold text-lime-400 hover:text-white underline transition-colors">
                {locale === "bn" ? "ইমেজবট (AI Diagnosis) ব্যবহার করুন" : "Open AI Diagnosis ImageBot"}
              </Link>
            </motion.div>
          )}

          {error && (
            <div className="mt-6 rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-sm font-semibold text-red-300">
              {error}
            </div>
          )}
        </Container>
      </section>

      {/* SECTION 3: MAIN CATALOG CONTENT (Sidebar & Grid - Transparent overlays) */}
      <section className="bg-black/15 relative z-10 py-16 md:py-20">
        <Container>
          <div className="flex flex-col gap-10 lg:flex-row lg:items-start">
            
            {/* Sticky Glass Sidebar (Desktop Only) */}
            <aside className="hidden lg:block w-full shrink-0 lg:sticky lg:top-28 lg:w-72">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-md shadow-xl space-y-6">
                <div className="border-b border-white/5 pb-4">
                  <p className="flex items-center gap-2.5 text-sm font-bold text-white uppercase tracking-wider">
                    <ListFilter className="h-4.5 w-4.5 text-lime-400" />
                    {locale === "bn" ? "পণ্যের শ্রেণীসমূহ" : "Product Categories"}
                  </p>
                </div>
                <nav className="flex flex-col gap-1.5" aria-label="Product categories">
                  {CATALOG_CATEGORIES.map((category) => {
                    const count =
                      category.id === "all"
                        ? products.length
                        : products.filter((product) => product.product_type === category.id).length;
                    const active = activeCategory === category.id;

                    return (
                      <button
                        key={category.id}
                        type="button"
                        onClick={() => setActiveCategory(category.id)}
                        className={cn(
                          "group flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm font-bold transition-all duration-300 border",
                          active 
                            ? "bg-emerald-600/30 border-emerald-500/40 text-white shadow-lg shadow-emerald-950/20" 
                            : "border-transparent text-emerald-100/70 hover:bg-white/5 hover:text-white hover:border-white/10"
                        )}
                      >
                        <span>{locale === "bn" ? category.labelBn : category.labelEn}</span>
                        <span 
                          className={cn(
                            "rounded-full px-2.5 py-0.5 text-xs font-bold border transition-colors duration-300", 
                            active 
                              ? "bg-lime-400/20 text-lime-400 border-lime-400/30" 
                              : "bg-white/5 text-emerald-300 border-white/5 group-hover:border-white/10"
                          )}
                        >
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </nav>
              </div>
            </aside>

            {/* Slide-over Mobile Drawer for Categories */}
            <AnimatePresence>
              {isFilterOpen && (
                <>
                  {/* Backdrop */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setIsFilterOpen(false)}
                    className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden"
                  />

                  {/* Drawer Panel */}
                  <motion.div
                    initial={{ x: "-100%" }}
                    animate={{ x: 0 }}
                    exit={{ x: "-100%" }}
                    transition={{ type: "spring", damping: 25, stiffness: 200 }}
                    className="fixed inset-y-0 left-0 z-50 w-80 max-w-[85vw] bg-emerald-950/95 border-r border-white/10 backdrop-blur-xl p-6 shadow-2xl flex flex-col gap-6 lg:hidden overflow-y-auto"
                  >
                    <div className="flex items-center justify-between border-b border-white/5 pb-4">
                      <p className="flex items-center gap-2.5 text-sm font-bold text-white uppercase tracking-wider">
                        <ListFilter className="h-4.5 w-4.5 text-lime-400" />
                        {locale === "bn" ? "পণ্যের শ্রেণীসমূহ" : "Product Categories"}
                      </p>
                      <button
                        type="button"
                        onClick={() => setIsFilterOpen(false)}
                        className="text-emerald-300 hover:text-white p-1 rounded-full hover:bg-white/5 transition-colors"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                    <nav className="flex flex-col gap-1.5" aria-label="Product categories mobile">
                      {CATALOG_CATEGORIES.map((category) => {
                        const count =
                          category.id === "all"
                            ? products.length
                            : products.filter((product) => product.product_type === category.id).length;
                        const active = activeCategory === category.id;

                        return (
                          <button
                            key={category.id}
                            type="button"
                            onClick={() => {
                              setActiveCategory(category.id);
                              setIsFilterOpen(false);
                            }}
                            className={cn(
                              "group flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm font-bold transition-all duration-300 border",
                              active 
                                ? "bg-emerald-600/30 border-emerald-500/40 text-white shadow-lg" 
                                : "border-transparent text-emerald-100/70 hover:bg-white/5 hover:text-white hover:border-white/10"
                            )}
                          >
                            <span>{locale === "bn" ? category.labelBn : category.labelEn}</span>
                            <span 
                              className={cn(
                                "rounded-full px-2.5 py-0.5 text-xs font-bold border transition-colors duration-300", 
                                active 
                                  ? "bg-lime-400/20 text-lime-400 border-lime-400/30" 
                                  : "bg-white/5 text-emerald-300 border-white/5"
                              )}
                            >
                              {count}
                            </span>
                          </button>
                        );
                      })}
                    </nav>
                  </motion.div>
                </>
              )}
            </AnimatePresence>

            {/* Product Grid & Loader */}
            <div className="min-w-0 flex-1">
              
              {loading ? (
                // Dark Glass Loading Skeletons
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                    <div key={item} className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md p-0 shadow-sm animate-pulse">
                      <div className="aspect-square bg-emerald-950/50" />
                      <div className="space-y-4 p-6">
                        <div className="h-6 w-3/4 rounded bg-emerald-900/40 animate-pulse" />
                        <div className="h-4 w-1/2 rounded bg-emerald-900/30 animate-pulse" />
                        <div className="space-y-2 pt-2">
                          <div className="h-3 w-full rounded bg-emerald-900/20" />
                          <div className="h-3 w-5/6 rounded bg-emerald-900/20" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : filtered.length > 0 ? (
                // Staggered Entrance Products Grid
                <motion.div 
                  initial="hidden"
                  animate="visible"
                  variants={containerVariants}
                  className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                >
                  {filtered.map((product, index) => (
                    <ProductCard key={product.matrix_id} product={product} locale={locale} index={index} />
                  ))}
                </motion.div>
              ) : (
                // No Products State (Glass design)
                <motion.div 
                  initial="hidden"
                  animate="visible"
                  variants={faderEffect}
                  className="rounded-3xl border border-dashed border-white/20 bg-white/5 backdrop-blur-sm px-6 py-20 text-center"
                >
                  <p className="text-xl font-bold text-white">
                    {locale === "bn" ? "কোনো পণ্য পাওয়া যায়নি" : "No products found"}
                  </p>
                  <p className="mt-2 text-sm text-emerald-200/60 font-light">
                    {locale === "bn" 
                      ? "অনুগ্রহ করে অন্য কোনো শ্রেণী নির্বাচন করুন বা ভিন্ন অনুসন্ধান শব্দ ব্যবহার করুন।" 
                      : "Try another category, or adjust your search filter."}
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSearch("");
                      setActiveCategory("all");
                    }}
                    className="mt-8 rounded-full bg-lime-400 px-8 py-3.5 text-sm font-bold text-emerald-950 shadow-lg hover:bg-lime-300 hover:scale-102 transition-all duration-300"
                  >
                    {locale === "bn" ? "সব পণ্য দেখুন" : "Show all products"}
                  </button>
                </motion.div>
              )}
            </div>

          </div>
        </Container>
      </section>
    </div>
  );
}
