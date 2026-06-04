"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import type { Product } from "@/lib/api";
import { getProductImageUrl } from "@/lib/product-images";
import { cn } from "@/lib/cn";

type ProductCardProps = {
  product: Product;
  locale: "en" | "bn";
  index?: number;
};

export function ProductCard({ product, locale, index = 0 }: ProductCardProps) {
  const name = locale === "bn" ? product.name_bn : product.name_en || product.name_bn;
  const description = locale === "bn" ? product.description_bn : product.description_en || product.description_bn;
  const imageSrc = getProductImageUrl(product.product_type, product.matrix_id);

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="group flex h-full flex-col overflow-hidden rounded-xl border border-gray-100 bg-white shadow-[0_12px_30px_rgba(2,34,20,0.08)] transition hover:-translate-y-1 hover:border-emerald-200 hover:shadow-[0_18px_42px_rgba(2,34,20,0.14)]"
    >
      <div className={cn("relative aspect-square w-full shrink-0 overflow-hidden rounded-xl border border-gray-100 bg-gray-50 ring-1 ring-inset ring-slate-100 sm:aspect-[4/3] lg:aspect-square")}>
        <div className="absolute inset-4 sm:inset-5">
          <Image
            src={imageSrc}
            alt={name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-contain object-center"
          />
        </div>
        <span className="absolute right-3 top-3 rounded-full bg-white/95 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-red-700 shadow-sm ring-1 ring-slate-100">
          {product.matrix_id}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4 md:p-5">
        <h3 className="text-base font-bold leading-snug text-emerald-900 group-hover:text-emerald-700">{name}</h3>
        {product.formulation && <p className="mt-1 text-xs font-medium uppercase tracking-wide text-slate-500">{product.formulation}</p>}
        {description && <p className="line-clamp-3 flex-1 text-sm leading-relaxed text-slate-600">{description}</p>}
        <p className="text-xs font-semibold capitalize text-emerald-700">{product.product_type.replace("_", " ")}</p>
      </div>
    </motion.article>
  );
}
