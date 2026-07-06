"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import type { Product } from "@/lib/api";
import { getProductImageUrl } from "@/lib/product-images";
import { getCategoryLabel } from "@/data/mimpex-catalog";

type ProductCardProps = {
  product: Product;
  locale: "en" | "bn";
  index?: number;
};

export function ProductCard({ product, locale, index = 0 }: ProductCardProps) {
  const name = locale === "bn" ? product.name_bn : product.name_en || product.name_bn;
  const description = locale === "bn" ? product.description_bn : product.description_en || product.description_bn;
  const imageSrc = product.image_url || getProductImageUrl(product.product_type, product.matrix_id);
  const href = `/products/${encodeURIComponent(product.matrix_id)}`;
  
  const categoryLabel = getCategoryLabel(product.product_type as any, locale);

  return (
    <Link href={href} className="block h-full group" aria-label={`View details for ${name}`}>
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.5, 
          delay: Math.min(index * 0.04, 0.3),
          ease: [0.215, 0.61, 0.355, 1] 
        }}
        className="flex h-full flex-col overflow-hidden rounded-[20px] border border-white/10 bg-white/5 backdrop-blur-md transition-all duration-400 hover:-translate-y-1.5 hover:border-lime-400/40 hover:shadow-[0_15px_35px_rgba(4,120,87,0.25)]"
      >
        {/* Image Area - Optimized Height & Spacing */}
        <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden rounded-t-[20px] border-b border-white/5 bg-[radial-gradient(circle_at_center,#052e1e_0%,#010f0a_100%)] p-4 flex items-center justify-center">
          <div className="relative w-3/4 h-3/4 transition-transform duration-500 group-hover:scale-105">
            <Image
              src={imageSrc}
              alt={name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-contain object-center"
              priority={index < 4}
            />
          </div>
          
          {/* Matrix ID Code Badge */}
          <span className="absolute left-3 top-3 rounded-full bg-lime-400/10 px-2.5 py-0.5 font-mono text-[10px] font-bold text-lime-400 border border-lime-400/20 shadow-sm">
            {product.matrix_id}
          </span>

          {/* Category Badge */}
          <span className="absolute right-3 top-3 rounded-full bg-white/10 backdrop-blur-md px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-emerald-100 border border-white/10 shadow-sm">
            {categoryLabel}
          </span>
        </div>

        {/* Content Section - More Compact & Grid Aligned */}
        <div className="flex flex-1 flex-col justify-between p-4 text-left gap-3">
          <div className="space-y-2.5">
            {/* Formulation & Title Row */}
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-base font-extrabold leading-tight text-white group-hover:text-lime-300 transition-colors duration-300 line-clamp-1">
                {name}
              </h3>
              {product.formulation && (
                <span className="shrink-0 rounded bg-emerald-500/15 px-1.5 py-0.5 text-[9px] font-bold tracking-wide text-emerald-300 border border-emerald-500/10 uppercase">
                  {product.formulation}
                </span>
              )}
            </div>

            {locale === "bn" && product.name_en && product.name_en !== product.name_bn && (
              <p className="text-[11px] font-semibold text-emerald-300/40 italic tracking-wide -mt-1.5">
                {product.name_en}
              </p>
            )}

            {/* Active Chemical */}
            {product.active_chemical && (
              <div className="space-y-0.5 text-[11px]">
                <span className="font-bold text-emerald-400/50 uppercase tracking-widest text-[8px] block">
                  {locale === "bn" ? "সক্রিয় উপাদান" : "Active Ingredient"}
                </span>
                <p className="font-medium text-emerald-100/90 line-clamp-1">
                  {product.active_chemical}
                </p>
              </div>
            )}

            {/* Short Description */}
            {description && (
              <p className="line-clamp-2 text-[11px] leading-relaxed text-emerald-100/60 font-light">
                {description}
              </p>
            )}
          </div>

          {/* CTA Link Button - Reduced Padding */}
          <div className="mt-1 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-bold text-lime-400 group/btn">
            <span>{locale === "bn" ? "বিস্তারিত দেখুন" : "View Details"}</span>
            <span className="flex items-center justify-center w-7 h-7 rounded-full bg-lime-400/10 border border-lime-400/20 text-lime-400 transition-all duration-300 group-hover/btn:bg-lime-400 group-hover/btn:text-emerald-950 group-hover/btn:scale-105 shadow-sm">
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </div>
        </div>
      </motion.article>
    </Link>
  );
}