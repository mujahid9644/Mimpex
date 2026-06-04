"use client";
 
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Leaf } from "lucide-react";
 
import { Container } from "@/components/ui/Container";
import { CROP_MATRIX, HOME_CATEGORY_LINKS } from "@/data/crops";
import { MIMPEX_ASSETS } from "@/lib/assets";
 
const CATEGORY_IMAGES = {
  insecticide: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=600&h=400&fit=crop&q=80",
  fungicide: "https://images.unsplash.com/photo-1625246333195-78d9c38ad576?w=600&h=400&fit=crop&q=80",
  herbicide: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=600&h=400&fit=crop&q=80",
  pgr: "https://images.pexels.com/photos/3962285/pexels-photo-3962285.jpeg?auto=compress&cs=tinysrgb&w=600&q=80",
  aquaculture: "https://images.unsplash.com/photo-1534889336882-9b8a0bdc17f5?w=600&h=400&fit=crop&q=80",
};
 
export function CropMatrix() {
  return (
    <section className="bg-gradient-to-b from-white to-emerald-50 py-16 md:py-24">
      <Container>
        {/* Category Links with Enhanced Design */}
        <div className="grid gap-4 md:grid-cols-5">
          {HOME_CATEGORY_LINKS.map((category, index) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
            >
              <Link
                href={category.href}
                className="group relative flex min-h-32 flex-col overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-600 to-emerald-700 shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
              >
                {/* Background Image */}
                <div className="absolute inset-0 overflow-hidden">
                  <img
                    src={CATEGORY_IMAGES[category.category as keyof typeof CATEGORY_IMAGES]}
                    alt=""
                    className="h-full w-full object-cover opacity-20 transition group-hover:opacity-40 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-900 via-emerald-700/50 to-transparent" />
                </div>
 
                {/* Content */}
                <div className="relative z-10 flex flex-1 flex-col items-between justify-between p-4">
                  <div className="flex items-center gap-2 text-emerald-100 text-sm font-semibold">
                    <Leaf className="h-4 w-4" />
                    <span>পণ্য</span>
                  </div>
                  <div className="flex items-end justify-between gap-3">
                    <span className="text-lg font-black text-white leading-snug group-hover:text-emerald-100 transition">
                      {category.labelBn}
                    </span>
                    <ArrowRight className="h-5 w-5 shrink-0 text-white transition group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
 
        {/* Crop Matrix Section */}
        <div className="relative mt-20 overflow-hidden rounded-3xl border-2 border-emerald-100 bg-gradient-to-br from-emerald-50 via-white to-lime-50 px-6 py-16 shadow-xl md:px-12 md:py-20">
          {/* Decorative Background */}
          <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/3 opacity-5 lg:block">
            <Image src={MIMPEX_ASSETS.iconLeaf} alt="" fill className="object-contain object-right" />
          </div>
 
          {/* Header */}
          <div className="relative text-center max-w-4xl mx-auto">
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-xs font-bold uppercase tracking-[0.3em] text-emerald-600"
            >
              🌾 মিমপেক্স ক্রপ ম্যাট্রিক্স
            </motion.p>
            
            <motion.h2 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mt-4 text-4xl font-black leading-tight text-emerald-950 md:text-6xl"
            >
              ফসল ভিত্তিক ওষুধ নির্ধারণ ও প্রয়োগ
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="mx-auto mt-6 max-w-3xl text-base leading-8 text-slate-700 md:text-lg"
            >
              সঠিক পদ্ধতিতে ফসলের সমস্যা নির্ধারণের মাধ্যমে অনাকাঙ্ক্ষিত ক্ষতি থেকে পরিত্রাণ পাওয়া সম্ভব। তাই মিমপেক্স নিয়ে এসেছে ফসল ভিত্তিক ওষুধ নির্ধারণ ও প্রয়োগের পাশাপাশি তড়িৎ সমাধান।
            </motion.p>
          </div>
 
          {/* Crop Buttons Grid */}
          <div className="relative mt-14 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-7">
            {CROP_MATRIX.map((crop, index) => (
              <motion.div
                key={crop.slug}
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: index * 0.04, type: "spring", stiffness: 100 }}
              >
                <Link
                  href={`/products?crop=${crop.slug}`}
                  className="group relative flex min-h-16 items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-br from-lime-400 to-emerald-500 px-3 py-2 text-center text-sm font-bold text-white shadow-lg shadow-emerald-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-600/40 hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-lime-300/50"
                >
                  {/* Animated background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-0 transition group-hover:opacity-100" />
                  
                  {/* Content */}
                  <Leaf className="relative z-10 h-4 w-4 shrink-0 fill-white/40 transition group-hover:scale-110" />
                  <span className="relative z-10 truncate leading-tight group-hover:font-black">
                    {crop.nameBn}
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
 
          {/* Bottom Accent */}
          <div className="relative mt-12 h-1 overflow-hidden rounded-full bg-gradient-to-r from-transparent via-emerald-400 to-transparent opacity-40" />
        </div>
      </Container>
    </section>
  );
}