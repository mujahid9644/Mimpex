"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Leaf, Layers } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { CROP_MATRIX, HOME_CATEGORY_LINKS } from "@/data/crops";
import { MIMPEX_ASSETS } from "@/lib/assets";

const CATEGORY_IMAGES = {
  insecticide: "https://thfvnext.bing.com/th/id/OIP.a1SM4P5_nBSJ2ONKxJHc3QHaE6?w=261&h=180&c=7&r=0&o=7&cb=thfvnextfalcon2&dpr=1.5&pid=1.7&rm=3",
  fungicide: "https://thfvnext.bing.com/th/id/OIP.2dPJKJSmHWC08Txue2SsbQHaE5?w=256&h=180&c=7&r=0&o=7&cb=thfvnextfalcon2&dpr=1.5&pid=1.7&rm=3",
  herbicide: "https://thfvnext.bing.com/th/id/OIP.h9Ns_602SQGUvsrY1rDM7gHaEy?w=311&h=200&c=7&r=0&o=7&cb=thfvnextfalcon2&dpr=1.5&pid=1.7&rm=3",
  pgr: "https://thfvnext.bing.com/th/id/OIP.YXgx4fU4NS3Ml2DUj1LXDwHaEs?w=265&h=180&c=7&r=0&o=7&cb=thfvnextfalcon2&dpr=1.5&pid=1.7&rm=3",
  aquaculture: "https://thfvnext.bing.com/th/id/OIP.6dgfj_3CCUiDlHforXT2swHaE8?w=263&h=180&c=7&r=0&o=7&cb=thfvnextfalcon2&dpr=1.5&pid=1.7&rm=3",
};

export function CropMatrix() {
  return (
    // Background color is updated to match the dark agricultural green from image_bf9c94.jpg
    <section className="bg-[#023b24] py-10 md:py-14 text-white">
      <Container>
        
        {/* ================= CATEGORY LINKS WITH RUNNING IMAGES ================= */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
          {HOME_CATEGORY_LINKS.map((category, index) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
              className={`${index === 4 ? "col-span-2 sm:col-span-1" : ""}`}
            >
              <Link
                href={category.href}
                // Border optimized for the deep dark background layout
                className="group relative flex min-h-24 md:min-h-28 flex-col overflow-hidden rounded-xl bg-slate-950 shadow-md border border-emerald-900/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <div className="absolute inset-0 overflow-hidden">
                  <img
                    src={CATEGORY_IMAGES[category.category as keyof typeof CATEGORY_IMAGES]}
                    alt=""
                    className="h-full w-full object-cover opacity-50 transition duration-500 group-hover:opacity-70 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />
                </div>

                <div className="relative z-10 flex flex-1 flex-col justify-between p-3.5">
                  <div className="flex items-center gap-1.5 text-emerald-300/90 text-[11px] font-bold uppercase tracking-wider">
                    <Layers className="h-3 w-3 text-emerald-400" />
                    <span>Category</span>
                  </div>
                  <div className="flex items-center justify-between gap-2 mt-4">
                    <span className="text-sm md:text-base font-black text-white tracking-tight leading-none">
                      {category.labelBn}
                    </span>
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 backdrop-blur-sm group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300">
                      <ArrowRight className="h-3.5 w-3.5" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* ================= CROP MATRIX GRID ================= */}
        {/* Container panel customized to stay premium inside the dark theme wrapper */}
        <div className="relative mt-12 overflow-hidden rounded-2xl border border-emerald-800/30 bg-gradient-to-br from-emerald-950/60 via-emerald-900/20 to-transparent px-5 py-10 shadow-2xl md:px-10 md:py-12">
          
          <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/4 opacity-5 lg:block">
            <Image src={MIMPEX_ASSETS.iconLeaf} alt="" fill className="object-contain object-right p-4 invert brightness-200" />
          </div>

          <div className="relative text-center max-w-3xl mx-auto">
            <motion.h2 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              // Switched from text-slate-900 to text-white for visual hierarchy
              className="text-2xl font-black tracking-tight text-white md:text-4xl"
            >
              ফসল ভিত্তিক ওষুধ নির্ধারণ ও প্রয়োগ 🌾
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 }}
              // Enhanced contrast text for readability on dark green setup
              className="mx-auto mt-3 text-xs md:text-sm leading-relaxed text-emerald-100/80 max-w-2xl"
            >
              সঠিক পদ্ধতিতে ফসলের সমস্যা নির্ধারণের মাধ্যমে অনাকাঙ্ক্ষিত ক্ষতি থেকে পরিত্রাণ পাওয়া সম্ভব। তাই মিমপেক্স নিয়ে এসেছে ফসল ভিত্তিক ওষুধ নির্ধারণ ও প্রয়োগের পাশাপাশি তড়িৎ সমাধান।
            </motion.p>
          </div>

          {/* Crop Buttons Grid - Preserving your original vibrant gradient style */}
          <div className="relative mt-8 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
            {CROP_MATRIX.map((crop, index) => (
              <motion.div
                key={crop.slug}
                initial={{ opacity: 0, scale: 0.93 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.02, duration: 0.3 }}
              >
                <Link
                  href={`/products?crop=${crop.slug}`}
                  className="group relative flex min-h-[52px] items-center justify-center gap-1.5 overflow-hidden rounded-xl bg-gradient-to-br from-lime-400 to-emerald-500 px-3 py-2 text-center text-xs md:text-sm font-bold text-white shadow-lg shadow-emerald-950/40 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-400/20 hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-lime-300/40"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/15 to-white/0 opacity-0 transition duration-300 group-hover:opacity-100" />
                  
                  <Leaf className="relative z-10 h-3.5 w-3.5 shrink-0 fill-white/30 text-white/90 transition group-hover:scale-110" />
                  <span className="relative z-10 truncate leading-tight tracking-tight group-hover:font-black">
                    {crop.nameBn}
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

      </Container>
    </section>
  );
}