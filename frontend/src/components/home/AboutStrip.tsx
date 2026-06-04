"use client";
 
import Image from "next/image";
import { Newspaper, Users } from "lucide-react";
import { motion } from "framer-motion";
 
import { Container } from "@/components/ui/Container";
import { AGRO_BLOGS, DIRECTORS } from "@/data/company";
 
export function AboutStrip() {
  return (
    <section className="section-brand bg-gradient-to-b from-emerald-950 to-emerald-900 py-20 md:py-24">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <motion.div initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-300">আমাদের সম্পর্কে</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-white md:text-5xl">মাঠে কৃষকের সাথে মিমপেক্স</h2>
            <p className="mt-5 text-lg leading-8 text-emerald-100">
              দীর্ঘ এক যুগেরও বেশি সময় ধরে মিমপেক্স কৃষকের হাতে হাত রেখে কৃষি বালাই ব্যবস্থাপনার উপর কাজ করে যাচ্ছে। গুণগত মানসম্পন্ন নতুন কৃষি পণ্য কৃষকের হাতে তুলে দিয়ে কৃষি সেবায় দেশের উন্নয়নে অবদান রাখাই আমাদের উদ্দেশ্য।
            </p>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {/* Mission Card with Image */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="group relative overflow-hidden rounded-2xl border border-emerald-200 bg-white shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <div className="relative h-32 w-full overflow-hidden bg-gradient-to-br from-emerald-200 to-emerald-100">
                  <Image 
                    src="https://thf.bing.com/th/id/OIP.BvJ9H4_Y2Ztf_VFFJgvrLAHaE8?w=254&h=180&c=7&r=0&o=7&cb=thfc1falcon&dpr=1.5&pid=1.7&rm=3"
                    alt="কৃষি উদ্দেশ্য"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </div>
                <div className="p-5">
                  <p className="text-sm font-black text-emerald-700"> আমাদের উদ্দেশ্য</p>
                  <p className="mt-2 text-sm leading-6 text-slate-700">নতুন বালাইনাশক ও পিজিআর পণ্য কৃষকের কাছে পৌঁছে কৃষিতে সেবা নিশ্চিত করা।</p>
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
                <div className="relative h-32 w-full overflow-hidden bg-gradient-to-br from-red-200 to-red-100">
                  <Image 
                    src="https://thf.bing.com/th/id/OIP.8vW1m5gXGYdx5-zngvRY3QHaEK?w=270&h=180&c=7&r=0&o=7&cb=thfc1falcon&dpr=1.5&pid=1.7&rm=3"
                    alt="কৃষি দৃষ্টিভঙ্গি"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                    sizes="(max-width: 640px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </div>
                <div className="p-5">
                  <p className="text-sm font-black text-red-700"> আমাদের দৃষ্টিভঙ্গি</p>
                  <p className="mt-2 text-sm leading-6 text-slate-700">কৃষকের উপযুক্ত মুনাফা, পারিবারিক উন্নয়ন এবং সামাজিক অগ্রগতিতে ভূমিকা রাখা।</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
 
          {/* Main Field Image Banner */}
          <motion.div 
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative min-h-[400px] overflow-hidden rounded-3xl border-4 border-emerald-300 shadow-2xl bg-emerald-800"
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
 
        {/* Directors Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <SectionTitle icon={Users} eyebrow="Board" title="পরিচালনা পর্ষদ" />
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {DIRECTORS.map((director, index) => (
              <motion.article 
                key={director.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group overflow-hidden rounded-2xl border border-emerald-200 bg-white shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="relative h-40 overflow-hidden bg-gradient-to-br from-emerald-100 to-emerald-50">
                  <Image 
                    src={director.image} 
                    alt={director.nameBn} 
                    fill 
                    className="object-contain p-4 group-hover:scale-110 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, 33vw" 
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-black text-emerald-950">{director.nameBn}</h3>
                  <p className="text-sm font-bold text-red-600">{director.titleBn}</p>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{director.focusBn}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.div>
 
        {/* Agro Blog Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <SectionTitle icon={Newspaper} eyebrow="Agro News" title="কৃষি বার্তা" />
          <div className="mt-8 space-y-4">
            {AGRO_BLOGS.map((blog, index) => (
              <motion.article 
                key={blog.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="group overflow-hidden rounded-xl border border-emerald-200 bg-gradient-to-r from-emerald-50 to-green-50 p-5 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex flex-wrap items-center gap-2 text-xs font-black text-emerald-800">
                  <span className="rounded-full bg-emerald-200 px-3 py-1 font-bold">{blog.tagBn}</span>
                  <span className="text-emerald-700">📅 {blog.dateBn}</span>
                </div>
                <h3 className="mt-3 text-lg font-black text-emerald-950 group-hover:text-emerald-700 transition-colors">{blog.titleBn}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{blog.summaryBn}</p>
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
      <h2 className="mt-3 text-4xl font-black text-white md:text-6xl">{title}</h2>
    </div>
  );
}