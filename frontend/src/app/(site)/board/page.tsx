"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/ui/Container";

// Board members data
const DIRECTORS = [
  {
    id: 1,
    name: "নীলুফার ইয়াসমীন",
    title: "চেয়ারম্যান",
    focus: "সংস্থার নেতৃত্ব এবং কৌশলগত দিকনির্দেশনা প্রদান করেন।",
    image: "https://mimpexbd.com/wp-content/uploads/2025/05/Images_3.jpg",
  },
  {
    id: 2,
    name: "এম সাইদুজ্জামান",
    title: "ব্যবস্থাপনা পরিচালক",
    focus: "দৈনন্দিন কার্যক্রম এবং অপারেশনাল দক্ষতা নিশ্চিত করেন।",
    image: "https://mimpexbd.com/wp-content/uploads/2025/05/Images_2.jpg",
  },
  {
    id: 3,
    name: "সাদমান সাকিফ জামান",
    title: "পরিচালক",
    focus: "পণ্য উন্নয়ন এবং গুণমান নিয়ন্ত্রণ তদারকি করেন।",
    image: "https://mimpexbd.com/wp-content/uploads/2025/05/Images_6.jpg",
  },
  {
    id: 4,
    name: "আদনান আদিব জামান",
    title: "পরিচালক",
    focus: "বিক্রয় এবং বাজার সম্প্রসারণ কৌশল পরিচালনা করেন।",
    image: "https://mimpexbd.com/wp-content/uploads/2025/05/Images_1.jpg",
  },
];

export default function BoardPage() {
  return (
    // Changed background to match the original nav-bar/brand theme (#0b1c15 / #07140f or slate-950)
    <section className="relative overflow-hidden py-10 md:py-10 bg-[#095739]">
      {/* Subtle Background Glows */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-20 left-1/4 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 h-96 w-96 rounded-full bg-green-500/5 blur-3xl" />
      </div>

      <Container>
        {/* Header */}
        <motion.div 
          className="mx-auto max-w-4xl text-center mb-20"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 text-white">
            পরিচালনা পর্ষদ
          </h1>
          <p className="text-base md:text-lg leading-relaxed text-emerald-100/60 max-w-2xl mx-auto font-light">
            কৃষি বিজ্ঞান, পণ্য মান, মাঠপর্যায়ের সহায়তা এবং জাতীয় বিতরণ ব্যবস্থাকে এগিয়ে নেওয়ার নেতৃত্ব।
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {DIRECTORS.map((director, index) => (
            <DirectorCard key={director.id} director={director} index={index} />
          ))}
        </div>
      </Container>
    </section>
  );
}

function DirectorCard({ director, index }: { director: (typeof DIRECTORS)[0]; index: number }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className="w-full h-[430px] cursor-pointer"
      style={{ perspective: "1200px" }}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="relative w-full h-full transition-all duration-500"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        {/* FRONT SIDE */}
        <div 
          className="absolute inset-0 w-full h-full rounded-2xl bg-[#0e221a] border border-emerald-900/40 p-6 flex flex-col items-center justify-center shadow-xl backface-hidden"
          style={{ backfaceVisibility: "hidden" }}
        >
          {/* Circular Image Section */}
          <div className="relative mb-6">
            <div className="w-44 h-44 rounded-full p-[3px] bg-gradient-to-tr from-emerald-500 via-transparent to-green-400">
              <div className="w-full h-full rounded-full overflow-hidden relative bg-emerald-950">
                <Image
                  src={director.image}
                  alt={director.name}
                  fill
                  className="object-cover object-top"
                  sizes="176px"
                />
              </div>
            </div>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-emerald-500 text-white text-[10px] uppercase font-bold px-3 py-0.5 rounded-full shadow-md tracking-wider">
              MIMPEX
            </div>
          </div>

          {/* Text Info */}
          <div className="text-center mt-2">
            <h2 className="text-xl font-bold text-white tracking-wide">
              {director.name}
            </h2>
            <p className="mt-1 text-xs font-semibold text-emerald-400 uppercase tracking-widest">
              {director.title}
            </p>
          </div>
          
          <div className="mt-6 text-emerald-500/40 text-xs font-medium animate-pulse">
            বিস্তারিত দেখতে ক্লিক করুন ↺
          </div>
        </div>

        {/* BACK SIDE */}
        <div 
          className="absolute inset-0 w-full h-full rounded-2xl bg-gradient-to-b from-[#0e221a] to-[#07140f] border border-emerald-500/30 p-8 flex flex-col items-center justify-center shadow-2xl backface-hidden"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-400 mb-2">
              💼
            </div>
            <h3 className="text-lg font-bold text-white">{director.name}</h3>
            <p className="text-xs font-medium text-emerald-400 uppercase bg-emerald-500/10 px-3 py-1 rounded-md inline-block">
              {director.title}
            </p>
            <div className="w-12 h-[2px] bg-emerald-500/30 mx-auto my-2" />
            <p className="text-sm leading-relaxed text-emerald-100/80 font-normal">
              {director.focus}
            </p>
          </div>

          <div className="absolute bottom-6 text-emerald-500/40 text-xs">
            ফিরতে আবার ক্লিক করুন ↺
          </div>
        </div>
      </motion.div>
    </div>
  );
}