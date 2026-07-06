"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { 
  ArrowLeft, 
  ChevronRight, 
  ExternalLink, 
  PackageCheck, 
  Sprout,
  Beaker,
  FlaskConical,
  Package,
  Coins,
  Archive,
  CheckCircle,
  EyeOff
} from "lucide-react";

import { Container } from "@/components/ui/Container";
import { fetchProduct, type Product } from "@/lib/api";
import { getProductImageUrl } from "@/lib/product-images";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

export default function ProductDetailsPage({ params }: { params: { id: string } }) {
  const { locale } = useLanguage();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let ignore = false;

    setLoading(true);
    setError("");
    fetchProduct(params.id)
      .then((nextProduct) => {
        if (!ignore) setProduct(nextProduct);
      })
      .catch((err: Error) => {
        if (!ignore) setError(err.message || "Product not found");
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,#1f7a3a_0,#052e1e_42%,#02170f_100%)] text-white relative overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 opacity-[0.02] bg-[url('https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?q=80&w=1600')] bg-cover bg-center pointer-events-none mix-blend-overlay" />
        <Container className="py-16 relative z-10">
          <div className="h-6 w-48 animate-pulse rounded bg-emerald-900/40" />
          <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start">
            <div className="aspect-square animate-pulse rounded-[32px] bg-emerald-950/40 border border-white/10" />
            <div className="space-y-6">
              <div className="h-10 w-3/4 animate-pulse rounded bg-emerald-900/40" />
              <div className="h-4 w-1/4 animate-pulse rounded bg-emerald-900/35" />
              <div className="h-32 animate-pulse rounded bg-emerald-950/30 border border-white/5" />
              <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="h-16 animate-pulse rounded-2xl bg-white/5 border border-white/5" />
                ))}
              </div>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  if (!product || error) {
    return (
      <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,#1f7a3a_0,#052e1e_42%,#02170f_100%)] text-white relative overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 opacity-[0.02] bg-[url('https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?q=80&w=1600')] bg-cover bg-center pointer-events-none mix-blend-overlay" />
        <Container className="py-20 text-center relative z-10">
          <EyeOff className="h-16 w-16 text-lime-400/60 mx-auto mb-4" />
          <p className="text-xl font-bold text-white">
            {locale === "bn" ? "পণ্যটি খুঁজে পাওয়া যায়নি।" : "Product not found."}
          </p>
          <Link href="/products" className="mt-8 inline-flex items-center gap-2.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 px-6 py-3 text-sm font-bold text-white transition-all duration-300">
            <ArrowLeft className="h-4 w-4" />
            {locale === "bn" ? "পণ্য ক্যাটালগে ফিরে যান" : "Back to catalog"}
          </Link>
        </Container>
      </div>
    );
  }

  const imageSrc = product.image_url || getProductImageUrl(product.product_type, product.matrix_id);
  const name = product.name_bn || product.name_en || product.matrix_id;
  const description = product.description_bn || product.description_en;

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,#1f7a3a_0,#052e1e_42%,#02170f_100%)] text-white relative overflow-hidden">
      {/* Background Graphic Lines */}
      <div className="absolute inset-0 opacity-[0.02] bg-[url('https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?q=80&w=1600')] bg-cover bg-center pointer-events-none mix-blend-overlay" />

      <Container className="py-10 md:py-16 relative z-10">
        {/* Navigation Breadcrumbs */}
        <nav className="mb-10 flex flex-wrap items-center gap-2 text-sm text-emerald-300/70">
          <Link href="/" className="hover:text-lime-400 transition-colors">
            {locale === "bn" ? "হোম" : "Home"}
          </Link>
          <ChevronRight className="h-4 w-4 opacity-50" />
          <Link href="/products" className="hover:text-lime-400 transition-colors">
            {locale === "bn" ? "পণ্যসমূহ" : "Products"}
          </Link>
          <ChevronRight className="h-4 w-4 opacity-50" />
          <span className="font-semibold text-emerald-100">{name}</span>
        </nav>

        {/* Product Details Section Grid */}
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start">
          {/* Left Column: Image Frame */}
          <div className="relative aspect-square w-full overflow-hidden rounded-[32px] border border-white/10 bg-[radial-gradient(circle_at_center,#052e1e_0%,#010f0a_100%)] p-8 shadow-2xl flex items-center justify-center group">
            <div className="relative w-4/5 h-4/5 transition-transform duration-700 group-hover:scale-105">
              <Image 
                src={imageSrc} 
                alt={name} 
                fill 
                priority 
                sizes="(max-width: 1024px) 100vw, 40vw" 
                className="object-contain object-center" 
              />
            </div>
            
            {/* Code Badge */}
            <span className="absolute left-6 top-6 rounded-full bg-lime-400/10 px-4 py-1.5 font-mono text-xs font-bold text-lime-400 border border-lime-400/20 shadow-sm">
              {product.matrix_id}
            </span>
          </div>

          {/* Right Column: Specification details */}
          <section className="space-y-6">
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-lime-400">
                {product.product_type.replace("_", " ")}
              </span>
              <h1 className="text-4xl md:text-5xl font-black leading-tight text-white tracking-tight">
                {name}
              </h1>
              {product.name_en && product.name_en !== product.name_bn && (
                <p className="text-lg font-semibold text-emerald-300/40 italic tracking-wide">{product.name_en}</p>
              )}
            </div>

            {/* Description Text */}
            {description && (
              <p className="text-sm md:text-base leading-relaxed text-emerald-100/70 font-light whitespace-pre-line border-l-2 border-lime-400/30 pl-4 py-1">
                {description}
              </p>
            )}

            {/* 6 Grid Specs Cards with custom Icons */}
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 pt-4">
              <SpecInfoCard 
                icon={Beaker} 
                label={locale === "bn" ? "ফর্মুলেশন" : "Formulation"} 
                value={product.formulation || (locale === "bn" ? "নির্ধারিত নয়" : "Not set")} 
              />
              <SpecInfoCard 
                icon={FlaskConical} 
                label={locale === "bn" ? "সক্রিয় উপাদান" : "Active Chemical"} 
                value={product.active_chemical || (locale === "bn" ? "নির্ধারিত নয়" : "Not set")} 
              />
              <SpecInfoCard 
                icon={Package} 
                label={locale === "bn" ? "প্যাক সাইজ" : "Pack Size"} 
                value={product.pack_size || (locale === "bn" ? "নির্ধারিত নয়" : "Not set")} 
              />
              <SpecInfoCard 
                icon={Coins} 
                label={locale === "bn" ? "মূল্য (বিডিটি)" : "Price (BDT)"} 
                value={Number(product.unit_price_bdt || 0) > 0 ? `৳${product.unit_price_bdt}` : (locale === "bn" ? "নির্ধারিত নয়" : "Not set")} 
              />
              <SpecInfoCard 
                icon={Archive} 
                label={locale === "bn" ? "স্টক অবস্থা" : "Stock Status"} 
                value={product.stock_status ? product.stock_status.replace("_", " ") : (locale === "bn" ? "নির্ধারিত নয়" : "Not set")} 
              />
              <SpecInfoCard 
                icon={CheckCircle} 
                label={locale === "bn" ? "পণ্য অবস্থা" : "Status"} 
                value={product.is_active ? (locale === "bn" ? "সক্রিয়" : "Active") : (locale === "bn" ? "অসক্রিয়" : "Inactive")} 
              />
            </div>

            {/* Target Crops Section */}
            {product.crop_targets.length > 0 && (
              <div className="rounded-2xl border border-lime-400/20 bg-lime-400/5 p-5 backdrop-blur-sm space-y-3">
                <div className="flex items-center gap-2 text-sm font-bold text-lime-200">
                  <Sprout className="h-4.5 w-4.5 text-lime-400" />
                  {locale === "bn" ? "লক্ষ্য ফসল ও ব্যবহার ক্ষেত্র" : "Target Crops & Usages"}
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.crop_targets.map((cropTarget) => (
                    <Link 
                      key={cropTarget} 
                      href={`/products?search=${encodeURIComponent(cropTarget)}`} 
                      className="rounded-full bg-white/5 hover:bg-lime-400/10 px-4 py-1.5 text-xs font-bold text-emerald-100 hover:text-lime-300 border border-white/10 hover:border-lime-400/30 transition-all duration-300"
                    >
                      {cropTarget}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Premium action buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              <Link 
                href={`/imagebot?product=${encodeURIComponent(product.matrix_id)}`} 
                className="inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-emerald-600 to-lime-500 hover:from-emerald-500 hover:to-lime-400 px-8 py-4 text-sm font-bold text-emerald-950 shadow-lg shadow-emerald-950/20 transition-all duration-300 hover:scale-102"
              >
                <PackageCheck className="h-5 w-5" />
                {locale === "bn" ? "ইমেজবট (Prescription AI) দিয়ে পরীক্ষা করুন" : "Use with AI ImageBot"}
              </Link>
              {product.legacy_url && (
                <a 
                  href={product.legacy_url} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 px-8 py-4 text-sm font-bold text-white transition-all duration-300"
                >
                  {locale === "bn" ? "মূল ওয়েবসাইট উৎস" : "Original Source"}
                  <ExternalLink className="h-4.5 w-4.5" />
                </a>
              )}
            </div>
          </section>
        </div>
      </Container>
    </div>
  );
}

function SpecInfoCard({ 
  icon: Icon, 
  label, 
  value 
}: { 
  icon: React.ComponentType<{ className?: string }>; 
  label: string; 
  value: string; 
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md shadow-sm hover:border-lime-400/30 transition-all duration-300 flex items-start gap-3">
      <div className="p-2 rounded-xl bg-lime-400/10 text-lime-400 border border-lime-400/20 shrink-0">
        <Icon className="h-5 w-5" />
      </div>
      <div className="space-y-1">
        <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-400/60 leading-none">{label}</p>
        <p className="text-xs font-semibold text-white capitalize leading-tight pt-0.5">{value}</p>
      </div>
    </div>
  );
}
