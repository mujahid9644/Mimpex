"use client";

import { useEffect, useState } from "react";
import { Megaphone, Pin, Quote, UserCheck, MapPin, Calendar } from "lucide-react";
import { motion } from "framer-motion";

import { fetchNews, type NewsItem } from "@/lib/api";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

const FALLBACK: NewsItem[] = [
  {
    id: 0,
    title_en: "AI ImageBot Now Live",
    title_bn: "AI ImageBot চালু",
    body_en: "Upload crop photos for instant Mimpex product recommendations.",
    body_bn: "ফসলের ছবি আপলোড করে তাৎক্ষণিক পণ্য পরামর্শ পান।",
    is_pinned: true,
    published_at: new Date().toISOString(),
  },
];

const DISTRIBUTORS = [
  {
    id: 1,
    name: "মোঃ আব্দুর রহমান",
    company: "রহমান ট্রেডার্স",
    location: "রংপুর",
    quote: "ধান, আম ও সবজিতে মিমপেক্সের বালাইনাশক ব্যবস্থা শতভাগ কার্যকরী। তাই কৃষকের আস্থার শতভাগ প্রতিফলন উৎপাদনে থাকায় কৃষক যেমন খুশি তেমনি আমরাও মিমপেক্স এর পরিবেশক হয়ে খুশি।"
  },
  {
    id: 2,
    name: "আলহাজ্ব মোস্তাফিজুর রহমান",
    company: "মা এন্টারপ্রাইজ",
    location: "বগুড়া",
    quote: "মিমপেক্সের পিজিআর এবং সার ব্যবহার করে আমাদের এলাকার কৃষকরা আলুর বাম্পার ফলন পেয়েছেন। গুণগত মান সেরা হওয়ায় ডিলার হিসেবে বাজারে আমাদের সুনাম দিন দিন বাড়ছে।"
  }
];

export function NewsBoard() {
  const { t, locale } = useLanguage();
  const [items, setItems] = useState<NewsItem[]>(FALLBACK);

  useEffect(() => {
    fetchNews()
      .then(setItems)
      .catch(() => setItems(FALLBACK));
  }, []);

  return (
    // Section color fixed to deep premium green with text-white context
    <section className="bg-[#023b24] py-12 md:py-16 text-white overflow-hidden">
      <Container>
        
        {/* ================= UPDATES & NEWS BOARD ================= */}
        {/* Headline Fix: Forcing direct text colors down into the SectionHeading children */}
        <div className="[&_h2]:text-white [&_p]:text-emerald-100/70 [&_span]:text-lime-400">
          <SectionHeading
            eyebrow={locale === "bn" ? "আপডেটস" : "Updates"}
            title={t.home.newsTitle}
            description={
              locale === "bn"
                ? "কোম্পানির সর্বশেষ ঘোষণা ও নোটিশ"
                : "Latest corporate announcements and notices"
            }
          />
        </div>
        
        {/* Improved News Cards with solid contrast border & background */}
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.slice(0, 6).map((item, index) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
              // Cards upgraded with solid bg-emerald-950/80 and distinct high-contrast border
              className="group relative overflow-hidden rounded-2xl border border-emerald-800/60 bg-emerald-950/80 p-5 shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:shadow-xl hover:border-lime-500/50 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between min-h-[180px]"
            >
              <div>
                <div className="flex items-center justify-between border-b border-emerald-900/50 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="rounded-lg bg-emerald-900 p-2 text-lime-400 group-hover:bg-lime-500 group-hover:text-emerald-950 transition-colors duration-300">
                      <Megaphone className="h-4 w-4" />
                    </div>
                    <span className="text-xs font-bold text-emerald-300/80 flex items-center gap-1">
                      <Calendar className="h-3 w-3 text-lime-400" />
                      {new Date(item.published_at).toLocaleDateString(locale === "bn" ? "bn-BD" : "en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  
                  {item.is_pinned && (
                    <span className="inline-flex items-center gap-1 rounded-md bg-red-950/80 border border-red-500/40 px-2 py-0.5 text-[10px] font-black uppercase text-red-400 tracking-wider">
                      <Pin className="h-2.5 w-2.5 text-red-400" />
                      পিন করা
                    </span>
                  )}
                </div>

                <h3 className="mt-3 font-black text-white text-base md:text-lg leading-snug group-hover:text-lime-300 transition-colors duration-200">
                  {locale === "bn" && item.title_bn ? item.title_bn : item.title_en}
                </h3>
                
                <p className="mt-2 line-clamp-3 text-xs md:text-sm leading-relaxed text-emerald-100/80 font-medium">
                  {locale === "bn" && item.body_bn ? item.body_bn : item.body_en}
                </p>
              </div>
            </motion.article>
          ))}
        </div>

        {/* ================= DISTRIBUTOR TESTIMONIALS SECTION ================= */}
        <div className="mt-16 border-t border-emerald-900/60 pt-12">
          {/* Headline Fix: Distributor Section Heading visibility wrapper */}
          <div className="[&_h2]:text-white [&_p]:text-emerald-100/70 [&_span]:text-amber-400">
            <SectionHeading
              eyebrow={locale === "bn" ? "আমাদের পার্টনার" : "Our Partners"}
              title={locale === "bn" ? "পরিবেশকদের মন্তব্য" : "Distributor Testimonials"}
              description={
                locale === "bn"
                  ? "মিমপেক্স পরিবারের গর্বিত পরিবেশকদের বাস্তব অভিজ্ঞতা"
                  : "Real experiences from proud distributors of the Mimpex family"
              }
            />
          </div>

          {/* Improved Distributor Testimonial Cards */}
          <div className="mt-8 grid gap-6 md:grid-cols-2 max-w-5xl mx-auto">
            {DISTRIBUTORS.map((distributor) => (
              <motion.div
                key={distributor.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                // Improved backgrounds and glowy borders to pop out on image_bf8a8a.jpg layout
                className="relative overflow-hidden rounded-2xl border border-emerald-800/60 bg-emerald-950/80 p-5 md:p-6 shadow-[0_10px_30px_rgba(0,0,0,0.4)] hover:shadow-2xl hover:border-amber-400/50 hover:-translate-y-1 transition-all duration-300"
              >
                <Quote className="absolute -right-2 -bottom-2 h-20 w-20 text-amber-400/5 pointer-events-none transform rotate-12" />

                <div className="inline-flex rounded-xl bg-amber-400/10 p-2 text-amber-400 mb-3">
                  <Quote className="h-4 w-4 transform scale-x-[-1]" />
                </div>

                <p className="text-sm leading-relaxed text-emerald-50/90 font-medium italic relative z-10">
                  "{distributor.quote}"
                </p>

                <div className="mt-4 flex items-center gap-3 border-t border-emerald-900/50 pt-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-tr from-amber-400 to-amber-600 text-emerald-950 font-black shadow-md">
                    <UserCheck className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-white tracking-tight">
                      {distributor.name}
                    </h4>
                    <p className="flex items-center gap-1 text-[11px] font-bold mt-0.5">
                      <span className="font-black text-lime-400">{distributor.company}</span>
                      <span className="text-emerald-800">|</span>
                      <span className="inline-flex items-center gap-0.5 text-emerald-300/70">
                        <MapPin className="h-2.5 w-2.5 text-red-400" /> {distributor.location}
                      </span>
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </Container>
    </section>
  );
}