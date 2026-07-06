"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Newspaper, Users, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

import { Container } from "@/components/ui/Container";
import { AGRO_BLOGS } from "@/data/company";

export function AboutStrip() {
  return (
    <section className="section-brand bg-gradient-to-b from-emerald-950 to-emerald-900 py-12 md:py-16">
      <Container>
        {/* ================= ABOUT COMPANY ================= */}
        <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <motion.div initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-300">আমাদের সম্পর্কে</p>
            <h2 className="mt-2 text-3xl font-black tracking-tight text-white md:text-5xl">মাঠে কৃষকের সাথে মিমপেক্স</h2>
            <p className="mt-4 text-base leading-7 text-emerald-100">
              দীর্ঘ এক যুগেরও বেশি সময় ধরে মিমপেক্স কৃষকের হাতে হাত রেখে কৃষি বালাই ব্যবস্থাপনার উপর কাজ করে যাচ্ছে। গুণগত মানসম্পন্ন নতুন কৃষি পণ্য কৃষকের হাতে তুলে দিয়ে কৃষি সেবায় দেশের উন্নয়নে অবদান রাখাই আমাদের উদ্দেশ্য।
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {/* Mission Card with Image */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="group relative overflow-hidden rounded-2xl border border-emerald-200 bg-white shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <div className="relative h-28 w-full overflow-hidden bg-gradient-to-br from-emerald-200 to-emerald-100">
                  <Image 
                    src="https://thf.bing.com/th/id/OIP.BvJ9H4_Y2Ztf_VFFJgvrLAHaE8?w=254&h=180&c=7&r=0&o=7&cb=thfc1falcon&dpr=1.5&pid=1.7&rm=3"
                    alt="কৃষি উদ্দেশ্য"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </div>
                <div className="p-4">
                  <p className="text-sm font-black text-emerald-700">আমাদের উদ্দেশ্য</p>
                  <p className="mt-1 text-xs leading-5 text-slate-700">নতুন বালাইনাশক ও পিজিআর পণ্য কৃষকের কাছে পৌঁছে কৃষিতে সেবা নিশ্চিত করা।</p>
                </div>
              </motion.div>

              {/* Vision Card with Image */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="group relative overflow-hidden rounded-2xl border border-red-200 bg-white shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <div className="relative h-28 w-full overflow-hidden bg-gradient-to-br from-red-200 to-red-100">
                  <Image 
                    src="https://thf.bing.com/th/id/OIP.8vW1m5gXGYdx5-zngvRY3QHaEK?w=270&h=180&c=7&r=0&o=7&cb=thfc1falcon&dpr=1.5&pid=1.7&rm=3"
                    alt="কৃষি দৃষ্টিভঙ্গি"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </div>
                <div className="p-4">
                  <p className="text-sm font-black text-red-700">আমাদের দৃষ্টিভঙ্গি</p>
                  <p className="mt-1 text-xs leading-5 text-slate-700">কৃষকের উপযুক্ত মুনাফা, পারিবারিক উন্নয়ন এবং সামাজিক অগ্রগতিতে ভূমিকা রাখা.</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Main Field Image Banner */}
          <motion.div 
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative min-h-[350px] overflow-hidden rounded-3xl border-4 border-emerald-300 shadow-2xl bg-emerald-800"
          >
            <Image 
              src="https://thf.bing.com/th/id/OIP.TIemFsx0EgjRzIhsNxGT5QHaE6?w=255&h=180&c=7&r=0&o=7&cb=thfc1falcon&dpr=1.5&pid=1.7&rm=3"
              alt="কৃষি ক্ষেত"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/40 via-transparent to-transparent" />
          </motion.div>
        </div>

        {/* ================= MANAGEMENT / MD KINGS VIBE CARD ================= */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <SectionTitle icon={Users} eyebrow="Leadership" title="ব্যবস্থাপনা পরিচালক" />
          
          <div className="mt-8 max-w-4xl mx-auto">
            <div className="group relative overflow-hidden rounded-3xl border border-amber-500/30 bg-gradient-to-br from-amber-500/10 via-emerald-950/50 to-transparent p-6 md:p-8 grid md:grid-cols-12 gap-6 items-center hover:border-amber-500/50 transition-all duration-300 shadow-xl">
              
              <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-64 h-64 bg-amber-500/10 rounded-full blur-[70px] pointer-events-none" />
              
              {/* MD Profile Image */}
              <div className="relative h-56 w-56 mx-auto overflow-hidden rounded-full md:col-span-4 bg-gradient-to-b from-amber-400 to-emerald-900 p-[3px] shadow-lg">
                <div className="w-full h-full rounded-full overflow-hidden bg-emerald-950 relative">
                  <Image 
                    src="https://mimpexbd.com/wp-content/uploads/2025/05/Images_2.jpg"
                    alt="এম. সাইদুজ্জামান" 
                    fill 
                    className="object-cover object-[center_15%] transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 224px, 224px" 
                  />
                </div>
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 px-3 py-0.5 text-[9px] font-black uppercase tracking-widest text-emerald-950 shadow-md border border-amber-300/30">
                  MIMPEX MD
                </div>
              </div>

              {/* MD Details & Teams */}
              <div className="flex flex-col justify-center md:col-span-8 space-y-4 relative z-10">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-md border border-amber-400/20">
                    ব্যবস্থাপনা পরিচালক
                  </span>
                  <h3 className="text-2xl md:text-3xl font-black text-white mt-2 tracking-tight">এম. সাইদুজ্জামান</h3>
                </div>

                <p className="text-sm leading-relaxed text-emerald-100/90 font-medium border-l-2 border-amber-400/40 pl-3 italic">
                  "কৃষকের হাতে গুণগত মানসম্পন্ন নতুন কৃষি পণ্য পৌঁছে দিয়ে মাঠ পর্যায়ের সেবা, ডিলার নেটওয়ার্ক এবং ফসল সুরক্ষায় নেতৃত্ব দিচ্ছেন।"
                </p>

                <div className="pt-3 grid gap-3 sm:grid-cols-2 border-t border-white/5">
                  <div className="space-y-0.5">
                    <h4 className="text-xs font-black text-emerald-300 flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" /> Corporate Operations
                    </h4>
                    <p className="text-[11px] text-emerald-100/70 leading-relaxed">
                      স্টক, উৎপাদন পরিকল্পনা, মান নিয়ন্ত্রণ এবং সময়মতো মাঠ পর্যায়ের সরবরাহ নিশ্চিত করে।
                    </p>
                  </div>
                  <div className="space-y-0.5">
                    <h4 className="text-xs font-black text-emerald-300 flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" /> AgroScience Support
                    </h4>
                    <p className="text-[11px] text-emerald-100/70 leading-relaxed">
                      রোগ-পোকা নির্ণয়, ডোজ নির্দেশনা এবং কৃষকের বাস্তব সমস্যার দ্রুত সমাধান দেয়।
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ================= AGRO BLOG SECTION ================= */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <SectionTitle icon={Newspaper} eyebrow="Agro News" title="কৃষি বার্তা" />
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {AGRO_BLOGS.map((blog, index) => (
              <motion.article 
                key={blog.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                className="group flex flex-col justify-between overflow-hidden rounded-2xl bg-white shadow-lg border border-slate-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
              >
                {/* Image Header with Badge */}
                <div className="relative h-44 w-full overflow-hidden bg-emerald-800">
                  <img 
                    src={blog.image} 
                    alt={blog.titleBn} 
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-emerald-600 px-3 py-1 text-xs font-black text-white shadow-md">
                    {blog.tagBn}
                  </span>
                </div>

                {/* Content details with Reduced Padding */}
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
                    <span>📅</span>
                    <span>{blog.dateBn}</span>
                  </div>
                  
                  <h3 className="mt-2 text-base font-black text-slate-900 line-clamp-2 leading-snug group-hover:text-emerald-700 transition-colors">
                    {blog.titleBn}
                  </h3>
                  
                  <p className="mt-1.5 flex-1 text-xs leading-relaxed text-slate-600 line-clamp-3">
                    {blog.summaryBn}
                  </p>
                  
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <Link 
                      href={`/blogs#${blog.id}`}
                      className="inline-flex items-center gap-1.5 text-xs font-black text-emerald-700 group-hover:text-emerald-600 group-hover:gap-2 transition-all"
                    >
                      বিস্তারিত পড়ুন
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

function SectionTitle({ icon: Icon, eyebrow, title }: { icon: React.ComponentType<{ className?: string }>; eyebrow: string; title: string }) {
  return (
    <div>
      <p className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-emerald-300">
        <Icon className="h-4 w-4" />
        {eyebrow}
      </p>
      <h2 className="mt-2 text-3xl font-black text-white md:text-5xl">{title}</h2>
    </div>
  );
}