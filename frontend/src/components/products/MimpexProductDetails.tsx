"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ChevronRight, ExternalLink, Star } from "lucide-react";

import { Container } from "@/components/ui/Container";
import {
  MIMPEX_CATALOG,
  getCategoryLabel,
  getProductSlug,
  type MimpexCatalogProduct,
} from "@/data/mimpex-catalog";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

export function MimpexProductDetails({ product }: { product: MimpexCatalogProduct | undefined }) {
  const { locale } = useLanguage();
  const isBn = locale === "bn";

  if (!product) {
    return (
      <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,#1f7a3a_0,#052e1e_42%,#02170f_100%)]">
        <Container className="py-20 text-center">
          <p className="text-lg font-semibold text-emerald-50/70">
            {isBn ? "পণ্যটি পাওয়া যায়নি।" : "Product not found."}
          </p>
          <Link href="/product" className="mt-6 inline-flex items-center gap-2 font-bold text-lime-300 hover:text-lime-200 transition">
            <ArrowLeft className="h-4 w-4" />
            {isBn ? "পণ্য তালিকায় ফিরে যান" : "Back to products"}
          </Link>
        </Container>
      </div>
    );
  }

  const related = MIMPEX_CATALOG.filter((item) => item.category === product.category && item.id !== product.id).slice(0, 3);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,#1f7a3a_0,#052e1e_42%,#02170f_100%)]">
      <Container className="py-10 md:py-14">
        <nav className="mb-8 flex flex-wrap items-center gap-2 text-sm text-emerald-50/70">
          <Link href="/" className="hover:text-lime-300 transition">
            {isBn ? "হোম" : "Home"}
          </Link>
          <ChevronRight className="h-4 w-4 opacity-50" />
          <Link href="/product" className="hover:text-lime-300 transition">
            {isBn ? "পণ্য তালিকা" : "Products"}
          </Link>
          <ChevronRight className="h-4 w-4 opacity-50" />
          <span className="font-semibold text-white">{product.nameBn}</span>
        </nav>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start">
          <div>
            <div className="relative aspect-square bg-white/10 rounded-2xl border border-white/15 backdrop-blur-md p-6">
              <Image
                src={product.image}
                alt={product.nameBn}
                fill
                priority
                className="object-contain"
                sizes="(max-width: 1024px) 100vw, 44vw"
              />
            </div>
          </div>

          <section>
            <h1 className="text-3xl font-bold leading-tight text-white md:text-4xl">{product.nameBn}</h1>
            <p className="mt-5 text-base leading-8 text-emerald-50/85">{product.efficacyBn}</p>

            <div className="mt-6 space-y-3 border-y border-white/10 py-5 text-sm text-emerald-50/70">
              <p>
                <span className="font-semibold text-white">বিভাগ: </span>
                <Link href={`/product-category/${product.category}`} className="text-lime-300 hover:text-lime-200 transition">
                  {getCategoryLabel(product.category, "bn")}
                </Link>
              </p>
              <p>
                <span className="font-semibold text-white">ফসল ট্যাগ: </span>
                {product.cropTagsBn.map((tag, index) => (
                  <span key={tag}>
                    <Link href={`/product?search=${encodeURIComponent(tag)}`} className="text-lime-300 hover:text-lime-200 transition">
                      {tag}
                    </Link>
                    {index < product.cropTagsBn.length - 1 ? ", " : ""}
                  </span>
                ))}
              </p>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/#imagebot"
                className="inline-flex items-center justify-center rounded-lg bg-cyan-500/90 px-6 py-3 text-sm font-bold text-white hover:bg-cyan-500 transition shadow-lg"
              >
                কৃষি সমাধান
              </Link>
              <a
                href={product.sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-6 py-3 text-sm font-bold text-white hover:bg-white/15 transition backdrop-blur"
              >
                মূল সাইট
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </section>
        </div>

        <section className="mt-12 border-t border-white/10 pt-8">
          <div className="mb-6 flex flex-wrap gap-2 border-b border-white/10">
            <button className="border-b-2 border-lime-300 px-5 py-3 text-sm font-bold text-lime-300">
              বিবরণ
            </button>
            <button className="px-5 py-3 text-sm font-bold text-emerald-50/60 hover:text-white transition">পর্যালোচনা (0)</button>
          </div>

          <div className="space-y-5 text-base leading-8 text-emerald-50/85">
            <h2 className="text-2xl font-bold text-white">বিবরণ</h2>
            <div className="rounded-lg border border-white/10 bg-white/5 p-5 backdrop-blur-md">
              <p>
                <span className="font-bold text-lime-300">সক্রিয় উপাদান: </span>
                <span className="text-white">{product.mainIngredientBn}</span>
              </p>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/5 p-5 backdrop-blur-md">
              <p>
                <span className="font-bold text-lime-300">কার্যকারিতা: </span>
                <span className="text-white">{product.efficacyBn}</span>
              </p>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/5 p-5 backdrop-blur-md">
              <p>
                <span className="font-bold text-lime-300">প্রয়োগ মাত্রা: </span>
                <span className="text-white">{product.dosageBn}</span>
              </p>
            </div>
          </div>

          <div className="mt-10 rounded-lg border border-white/10 bg-white/5 p-6 backdrop-blur-md">
            <h2 className="text-2xl font-bold text-white">পর্যালোচনা</h2>
            <p className="mt-3 text-sm text-emerald-50/70">এখনও কোন পর্যালোচনা নেই।</p>
            <div className="mt-5 flex gap-1 text-amber-400">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star key={index} className="h-5 w-5" />
              ))}
            </div>
          </div>
        </section>

        {related.length > 0 && (
          <section className="mt-12">
            <h2 className="text-2xl font-bold text-white">সম্পর্কিত পণ্য</h2>
            <div className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <Link key={item.id} href={`/product/${getProductSlug(item)}`} className="group block">
                  <div className="relative aspect-square bg-white/10 rounded-xl border border-white/15 overflow-hidden backdrop-blur-md p-4 hover:border-white/30 transition">
                    <Image src={item.image} alt={item.nameBn} fill className="object-contain group-hover:scale-110 transition-transform" sizes="(max-width: 1024px) 50vw, 25vw" />
                  </div>
                  <p className="mt-3 text-xs font-semibold text-lime-300">{getCategoryLabel(item.category, "bn")}</p>
                  <h3 className="mt-2 text-lg font-bold leading-snug text-white group-hover:text-lime-300 transition">
                    {item.nameBn}
                  </h3>
                </Link>
              ))}
            </div>
          </section>
        )}
      </Container>
    </div>
  );
}
