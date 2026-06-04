"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { UsersRound } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { DIRECTORS } from "@/data/company";

export default function BoardPage() {
  return (
    <section className="section-brand py-16 md:py-24">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-black uppercase tracking-[0.24em] text-red-400">Corporate Leadership</p>
          <h1 className="mt-3 text-4xl font-black text-green-100 md:text-6xl">পরিচালনা পর্ষদ</h1>
          <p className="mt-5 text-lg leading-8 text-green-200">
            কৃষি বিজ্ঞান, পণ্য মান, মাঠপর্যায়ের সহায়তা এবং জাতীয় বিতরণ ব্যবস্থাকে এগিয়ে নেওয়ার নেতৃত্ব।
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {DIRECTORS.map((director, index) => (
            <motion.article
              key={director.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              whileHover={{ y: -8 }}
              className="group rounded-lg border border-green-400/30 bg-white/10 p-8 text-center shadow-lg backdrop-blur transition hover:shadow-xl hover:bg-white/20"
            >
              <div className="mx-auto flex h-44 w-44 items-center justify-center rounded-full border-4 border-[#5ed91f] bg-white/20 p-2 shadow-inner">
                <div className="relative h-full w-full overflow-hidden rounded-full bg-white">
                  <Image src={director.image} alt={director.nameBn} fill className="object-cover p-1 transition group-hover:scale-105" />
                </div>
              </div>
              <UsersRound className="mx-auto mt-6 h-6 w-6 text-red-400" />
              <h2 className="mt-3 text-2xl font-black text-green-100">{director.nameBn}</h2>
              <p className="mt-1 font-bold text-red-300">{director.titleBn}</p>
              <p className="mt-4 text-sm leading-7 text-green-200">{director.focusBn}</p>
            </motion.article>
          ))}
        </div>
      </Container>
    </section>
  );
}
