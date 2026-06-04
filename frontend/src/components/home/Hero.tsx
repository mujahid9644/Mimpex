"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ScanLine, Sparkles } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { MIMPEX_ASSETS } from "@/lib/assets";

export function Hero() {
  return (
    <section
      className="relative min-h-[75vh] w-full overflow-hidden bg-cover bg-center bg-no-repeat lg:h-screen"
      style={{ backgroundImage: `url(${MIMPEX_ASSETS.sliders[0]})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/95 via-emerald-900/70 to-emerald-900/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/70 via-transparent to-transparent" />

      <Container className="relative flex min-h-[75vh] items-center py-16 lg:h-screen">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="max-w-4xl"
        >
          {/* <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/15 px-5 py-2 text-sm font-bold text-white shadow-sm backdrop-blur">
            <Sparkles className="h-4 w-4 text-red-300" />
            MAL · কৃষি বিজ্ঞান ও AI
          </span> */}
          <h1 className="mt-7 max-w-4xl text-4xl font-black leading-[1.15] text-green-400 md:text-6xl lg:text-7xl">
            কৃষি ও কৃষকের কল্যাণে মিমপেক্স
          </h1>
          <p className="mt-6 max-w-3xl text-xl font-semibold leading-9 text-green-600/95 md:text-2xl">
            ফসল সুরক্ষা, সার ও পিজিআর, কৃষক সহায়তা এবং স্মার্ট রোগ নির্ণয়ে মিমপেক্স এগ্রোকেমিক্যালস লিমিটেড।
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/products"
              className="inline-flex min-h-14 items-center justify-center gap-3 rounded-md bg-red-700 px-8 text-base font-black text-green-200 shadow-xl shadow-red-950/20 transition hover:bg-red-800 md:min-h-16 md:text-lg"
            >
              পণ্য দেখুন
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="/imagebot"
              className="inline-flex min-h-14 items-center justify-center gap-3 rounded-md border border-white/35 bg-white/15 px-8 text-base font-black text-green-200 backdrop-blur transition hover:bg-white/25 md:min-h-16 md:text-lg"
            >
              <ScanLine className="h-5 w-5" />
              ImageBot চেষ্টা করুন
            </Link>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
