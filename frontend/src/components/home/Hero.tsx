"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ScanLine } from "lucide-react";

import { Container } from "@/components/ui/Container";

export function Hero() {
  return (
    <section className="relative flex min-h-[80vh] w-full items-center justify-center overflow-hidden bg-emerald-950 lg:h-screen">
      {/* Background Video - Opacity full set kore ujjol kora hoyese */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover opacity-100"
      >
        <source src="/hero.mp4" type="video/mp4" />
      </video>

      {/* Super Light & Transparent Overlay - Text clear thakbe, video-o ujjol dekhabe */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />

      {/* Mobile-er jonno pt-6 and lg:pt-0 use kore padding fix kora hoyese */}
      <Container className="relative z-10 flex min-h-[80vh] items-center justify-center pt-6 pb-16 text-center lg:h-screen lg:py-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex max-w-5xl flex-col items-center"
        >
          {/* Clean, Modern & High-Contrast Typography */}
          <h1 className="text-4xl font-black leading-[1.25] tracking-tight text-white md:text-6xl lg:text-7xl">
            কৃষি ও কৃষকের কল্যাণে <span className="bg-gradient-to-r from-emerald-400 to-green-300 bg-clip-text text-transparent">মিমপেক্স</span>
          </h1>

          <p className="mt-5 max-w-3xl text-base font-medium leading-7 text-emerald-50/90 md:text-xl md:leading-8">
            ফসল সুরক্ষা, সার ও পিজিআর, কৃষক সহায়তা এবং স্মার্ট রোগ নির্ণয়ে মিমপেক্স এগ্রোকেমিক্যালস লিমিটেড।
          </p>

          {/* Premium UI Buttons */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row justify-center w-full sm:w-auto px-4">
            <Link
              href="/products"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 px-7 text-sm font-bold text-white shadow-xl shadow-emerald-950/30 transition-all duration-300 hover:from-emerald-600 hover:to-teal-700 hover:scale-[1.02] active:scale-[0.98] md:h-14 md:text-base"
            >
              পণ্য দেখুন
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href="/imagebot"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-7 text-sm font-bold text-white shadow-lg backdrop-blur-md transition-all duration-300 hover:bg-white/20 hover:border-white/30 hover:scale-[1.02] active:scale-[0.98] md:h-14 md:text-base"
            >
              <ScanLine className="h-4 w-4 text-emerald-400" />
              Mimpex AgriDoc🩺 
            </Link>
          </div>
        </motion.div>
      </Container>

      {/* Bottom Soft Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-emerald-950/50 to-transparent pointer-events-none" />
    </section>
  );
}