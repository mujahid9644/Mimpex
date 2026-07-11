"use client";

import { useCallback, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, CloudUpload, CheckCircle, Loader2, Sprout, ShieldAlert, Droplets, ArrowRight } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { getCropBySlug } from "@/data/crops";
import { cn } from "@/lib/cn";
import { diagnoseImage, fetchProduct, type DiagnosisResult, type Product } from "@/lib/api";

type ImageBotHubProps = {
  standalone?: boolean;
  cropSlug?: string;
};

export function ImageBotHub({ standalone = false, cropSlug = "" }: ImageBotHubProps) {
  const router = useRouter();
  const crop = cropSlug ? getCropBySlug(cropSlug) : undefined;
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DiagnosisResult | null>(null);
  const [matchedProduct, setMatchedProduct] = useState<Product | null>(null);
  const [error, setError] = useState<string | null>(null);

  const processFile = useCallback(
    async (file: File) => {
      setError(null);
      setResult(null);
      setMatchedProduct(null);
      const reader = new FileReader();
      reader.onload = async () => {
        const dataUrl = String(reader.result);
        setPreview(dataUrl);
        setLoading(true);
        try {
          const diagnosis = await diagnoseImage(file, crop?.nameBn);
          setResult(diagnosis);
          if (diagnosis.matched_product_id) {
            fetchProduct(diagnosis.matched_product_id)
              .then(setMatchedProduct)
              .catch(() => setMatchedProduct(null));
          }
        } catch (err) {
          const detail = err instanceof Error && err.message.includes("Django API is unreachable") ? ` ${err.message}` : "";
          setError(`ছবি বিশ্লেষণ করা যায়নি। পরিষ্কার পাতা/ফসলের ছবি দিয়ে আবার চেষ্টা করুন অথবা backend server চালু আছে কি না দেখুন।${detail}`);
        } finally {
          setLoading(false);
        }
      };
      reader.readAsDataURL(file);
    },
    [crop?.nameBn]
  );

  const handleProductClick = () => {
    if (result?.matched_product_id) {
      router.push(`/products/${encodeURIComponent(result.matched_product_id)}`);
    }
  };

  return (
    <section
      id="imagebot"
      className={cn(
        "scroll-mt-28 bg-[radial-gradient(circle_at_top_left,#0b4834_0,#052e1e_42%,#02170f_100%)] py-16 md:py-10",
        standalone && "min-h-screen"
      )}
    >
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-lime-300/25 bg-lime-300/10 px-4 py-2 text-sm font-bold text-lime-100">
              <Bot className="h-4 w-4" />
              Gemini Vision Crop Pathology Portal
            </span>
            <h2 className="mt-5 text-4xl font-black leading-tight text-white md:text-6xl">Mimpex AgriDoc🩺 কৃষি সমাধান</h2>
            <p className="mt-5 text-lg leading-8 text-emerald-50/85">
              আক্রান্ত পাতা, কান্ড বা ফলের ছবি আপলোড করুন। ImageBot ফসলের ধরন, রোগ বিশ্লেষণ এবং Mimpex পণ্যের নির্ভুল ডোজ নির্দেশনা প্রদান করে।
            </p>
            {crop && (
              <div className="mt-6 rounded-lg border border-lime-300/25 bg-white/10 p-4 text-lime-50">
                নির্বাচিত ফসল প্রসঙ্গ: <span className="font-black">{crop.nameBn}</span>
              </div>
            )}
          </div>

          <div className="relative">
            <div className="pointer-events-none absolute inset-0 animate-pulse rounded-[2rem] bg-lime-300/20 blur-3xl" />
            <div className="relative rounded-lg border border-white/15 bg-white/10 p-5 shadow-2xl backdrop-blur">
              <button
                type="button"
                onDragOver={(event) => {
                  event.preventDefault();
                  setDragOver(true);
                }}
                onDragLeave={() => setDragOver(false)}
                onDrop={(event) => {
                  event.preventDefault();
                  setDragOver(false);
                  const file = event.dataTransfer.files?.[0];
                  if (file?.type.startsWith("image/")) processFile(file);
                }}
                onClick={() => inputRef.current?.click()}
                className={cn(
                  "relative flex min-h-80 w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-lg border-2 border-dashed p-8 text-center transition",
                  dragOver ? "border-lime-300 bg-lime-300/15" : "border-white/30 bg-emerald-950/25 hover:border-lime-300/70"
                )}
              >
                <span className={cn("absolute h-44 w-44 rounded-full border border-lime-300/25", loading && "animate-pulse")} />
                <span className={cn("absolute h-64 w-64 rounded-full border border-lime-300/20", loading && "animate-ping")} />
                <span className={cn("absolute h-80 w-80 rounded-full border border-emerald-300/10", loading && "animate-pulse")} />
                <CloudUpload className="relative h-16 w-16 text-lime-300" />
                <p className="relative mt-5 text-xl font-black text-white">ছবি ড্র্যাগ করুন অথবা আপলোড করুন</p>
                <p className="relative mt-2 text-sm text-emerald-50/70">JPG, PNG, WebP crop disease image</p>
                <input
                  ref={inputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(event) => {
                    const file = event.target.files?.[0];
                    if (file) processFile(file);
                  }}
                />
              </button>

              <AnimatePresence>
                {loading && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-5 flex items-center justify-center gap-3 rounded-lg bg-white/10 py-4 text-white"
                  >
                    <Loader2 className="h-5 w-5 animate-spin text-lime-300" />
                    পাতা স্ক্যান ও Gemini Vision রোগ নির্ণয় চলছে...
                  </motion.div>
                )}
              </AnimatePresence>

              {preview && (
                <div className="mt-5 overflow-hidden rounded-xl border border-gray-100 bg-gray-50">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={preview} alt="Uploaded crop" className="max-h-80 w-full object-contain" />
                </div>
              )}

              {error && <p className="mt-5 rounded-lg bg-red-700/25 p-4 text-sm font-semibold text-red-50">{error}</p>}
            </div>
          </div>
        </div>

        {result && (
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-12 space-y-6"
          >
            {/* Quick Info Cards */}
            <div className="grid gap-4 md:grid-cols-2">
              <InfoCard icon={Sprout} label="ফসল প্রকার" value={result.crop_type} />
              <InfoCard icon={ShieldAlert} label="রোগের নাম" value={result.disease_name || result.condition} />
              <InfoCard icon={Droplets} label="প্রয়োগের মাত্রা" value={result.bangla_prescription.dosage} />
            </div>

            {/* Treatment Strategy & Agri-Prescription Card */}
            <div className="grid gap-6 lg:grid-cols-2">
              {/* Treatment Strategy Panel */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md"
              >
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-lime-300/20">
                    <Droplets className="h-5 w-5 text-lime-300" />
                  </div>
                  <h3 className="text-lg font-black text-white">রোগ নিরাময় কার্যকারিতা</h3>
                </div>
                <p className="mb-4 text-sm leading-relaxed text-emerald-50/80">
                  {result.bangla_prescription.disease_explanation_bn}
                </p>
                <div className="space-y-2 pt-4 border-t border-white/10">
                  <p className="text-xs font-bold text-emerald-50/60">সক্রিয় উপাদান:</p>
                <p className="text-sm font-semibold text-emerald-100">
                  {matchedProduct?.active_chemical || matchedProduct?.formulation || "ডাটাবেজে সক্রিয় উপাদান সেট করা নেই"}
                </p>
                </div>
              </motion.div>

              {/* Agri-Prescription Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-md"
              >
                <div className="mb-6">
                  <button
                    onClick={handleProductClick}
                    className="group inline-flex items-center gap-2 transition"
                  >
                    <h3 className="text-lg font-black text-lime-300 group-hover:text-lime-200 transition">
                      {matchedProduct?.name_bn || matchedProduct?.name_en || result.matched_product_id}
                    </h3>
                    <ArrowRight className="h-4 w-4 text-lime-300 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <p className="mt-1 text-xs text-emerald-50/60">কৃষি ব্যবস্থাপত্র</p>
                </div>

                <div className="space-y-4">
                  {/* Dosage Section */}
                  <div className="flex gap-4 rounded-lg bg-white/5 p-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-lime-300/20">
                      <CheckCircle className="h-6 w-6 text-lime-300" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-emerald-50/60">প্রস্তাবিত ডোজ</p>
                      <p className="mt-1 text-sm font-semibold text-white">{result.bangla_prescription.dosage}</p>
                    </div>
                  </div>

                  {/* Disease Explanation */}
                  {result.bangla_prescription.disease_explanation_bn && (
                    <div className="flex gap-4 rounded-lg bg-white/5 p-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-emerald-300/20">
                        <Sprout className="h-6 w-6 text-emerald-300" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-emerald-50/60">প্রভাব বিশ্লেষণ</p>
                        <p className="mt-1 text-sm text-emerald-50/85">{result.bangla_prescription.disease_explanation_bn}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* View Details Button */}
                <button
                  onClick={handleProductClick}
                  className="mt-6 w-full rounded-lg bg-gradient-to-r from-lime-500 to-emerald-500 py-3 text-sm font-black text-white shadow-lg transition hover:shadow-xl hover:scale-105"
                >
                  সম্পূর্ণ পণ্য বিবরণ দেখুন
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </Container>
    </section>
  );
}

function InfoCard({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-lg border border-white/15 bg-white/10 p-4 backdrop-blur">
      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-50/70">
        <Icon className="h-4 w-4" />
        {label}
      </div>
      <p className="mt-2 text-base font-black text-white leading-tight">{value}</p>
    </div>
  );
}
