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
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const slideInFromLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
};

export function ProductsPageClient() {
  const searchParams = useSearchParams();
  const { locale } = useLanguage();

  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Get filter from URL
  const categoryFilter = searchParams.get("category") || "";
  const searchQuery = searchParams.get("search") || "";

  const selectedCropSlug = searchParams.get("crop");
  const selectedCrop = selectedCropSlug ? getCropBySlug(selectedCropSlug) : undefined;

  // Fetch products on mount
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const data = await fetchProducts();
        setAllProducts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load products");
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  // Filter products
  const filteredProducts = useMemo(() => {
    let filtered = allProducts;

    // Filter by category
    if (categoryFilter && isCategoryId(categoryFilter)) {
      filtered = filtered.filter((p) => p.product_type === categoryFilter);
    }

    // Filter by crop if selected
    if (selectedCrop) {
      filtered = filtered.filter((p) =>
        p.crop_targets.some((ct) => ct.toLowerCase() === selectedCrop.nameBn.toLowerCase())
      );
    }

    // Filter by search query
    filtered = filtered.filter((p) => matchesSearch(p, searchQuery));

    return filtered;
  }, [allProducts, categoryFilter, searchQuery, selectedCrop]);

  if (loading) {
    return (
      <Container>
        <div className="flex items-center justify-center min-h-[400px]">
          <Sprout className="w-8 h-8 animate-spin text-mimpex-green" />
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={faderEffect}
        className="py-12"
      >
        {/* Header */}
        <div className="mb-12">
          <motion.h1 variants={slideInFromLeft} className="text-4xl font-bold mb-2 text-gray-900">
            আমাদের পণ্য
          </motion.h1>
          <motion.p variants={slideInFromLeft} className="text-gray-600">
            সম্পূর্ণ কৃষি সমাধান খুঁজুন
          </motion.p>
        </div>

        {/* Filter Summary */}
        {(categoryFilter || searchQuery || selectedCrop) && (
          <motion.div
            variants={scaleIn}
            className="bg-gradient-to-r from-mimpex-green/10 to-mimpex-green/5 rounded-lg p-4 mb-8 border border-mimpex-green/20"
          >
            <p className="text-sm text-gray-700">
              ফিল্টার: 
              {categoryFilter && (
                <span className="font-semibold">
                  {getCategoryLabel(categoryFilter as ProductCategoryId, locale)}
                  {(searchQuery || selectedCrop) && ", "}
                </span>
              )}
              {selectedCrop && (
                <span className="font-semibold">
                  {`ফসল: ${selectedCrop.nameBn}`}
                  {searchQuery && ", "}
                </span>
              )}
              {searchQuery && (
                <span className="font-semibold">
                  {`খোঁজা: "${searchQuery}"`}
                </span>
              )}
            </p>
          </motion.div>
        )}

        {/* Results */}
        {filteredProducts.length === 0 ? (
          <motion.div variants={scaleIn} className="text-center py-12">
            <Database className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600">
              কোন পণ্য পাওয়া যায়নি
            </p>
          </motion.div>
        ) : (
          <>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              <AnimatePresence>
                {filteredProducts.map((product) => (
                  <motion.div
                    key={product.id}
                    variants={scaleIn}
                    layout
                    exit={{ opacity: 0, scale: 0.95 }}
                  >
                    <ProductCard product={product} locale={locale} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {/* Results Count */}
            <motion.div variants={slideInFromLeft} className="mt-8 text-center text-sm text-gray-600">
              {`${filteredProducts.length} পণ্য প্রদর্শিত`}
            </motion.div>
          </>
        )}
      </motion.div>
    </Container>
  );
}
