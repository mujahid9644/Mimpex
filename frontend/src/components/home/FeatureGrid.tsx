"use client";

import { motion } from "framer-motion";
import { CheckCircle2, FlaskConical, MapPinned, Sparkles } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

const ICONS = [CheckCircle2, FlaskConical, MapPinned, Sparkles];

export function FeatureGrid() {
  const { t } = useLanguage();
  const features = t.home.features;

  return (
    // Section background optimized for deep signature dark agricultural green
    <section className="bg-[#023b24] py-10 md:py-14 overflow-hidden text-white">
      <Container>
        
        {/* ================= HEADLINE COLOR FIX ================= */}
        {/* Target children components and force high-contrast white & lime into SectionHeading */}
        <div className="[&_h2]:text-white [&_p]:text-emerald-100/70 [&_span]:text-lime-400">
          <SectionHeading
            eyebrow={t.home.featuresEyebrow}
            title={t.home.featuresTitle}
            description={t.home.featuresSubtitle}
          />
        </div>
        
        {/* ================= IMPROVED SOLID CARDS GRID ================= */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => {
            const Icon = ICONS[index % ICONS.length];
            return (
              <motion.article
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  delay: index * 0.08, 
                  duration: 0.6, 
                  ease: [0.215, 0.610, 0.355, 1.000] 
                }}
                // Upgraded card base opacity and border contrast to stand out cleanly
                className="group relative overflow-hidden rounded-3xl border border-emerald-800/60 bg-emerald-950/80 p-7 shadow-[0_12px_40px_rgba(0,0,0,0.4)] hover:shadow-2xl hover:border-lime-500/50 hover:-translate-y-2 transition-all duration-500 flex flex-col justify-between"
              >
                {/* Luxury Hover Top Border Effect */}
                <div className="absolute top-0 left-0 h-[3px] w-0 bg-gradient-to-r from-lime-400 via-emerald-400 to-teal-400 group-hover:w-full transition-all duration-500" />

                <div>
                  {/* Dynamic Glowing Icon Container */}
                  <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-900 to-emerald-800/50 text-lime-400 shadow-inner group-hover:from-lime-500 group-hover:to-emerald-500 group-hover:text-emerald-950 group-hover:scale-110 group-hover:shadow-[0_8px_20px_-6px_rgba(165,243,132,0.4)] transition-all duration-500">
                    <Icon className="h-6 w-6 transition-transform duration-500 group-hover:rotate-[10deg]" />
                  </div>
                  
                  {/* Title updated with robust clear layout */}
                  <h3 className="mt-6 text-xl font-black text-white tracking-tight leading-snug group-hover:text-lime-300 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  
                  {/* Description text with soft high-contrast tone */}
                  <p className="mt-3 text-sm font-medium leading-relaxed text-emerald-100/80 group-hover:text-emerald-50 transition-colors duration-300">
                    {feature.body}
                  </p>
                </div>

                {/* Micro UX Premium Indicator Link Line */}
                <div className="mt-6 flex items-center gap-1 text-xs font-black uppercase tracking-wider text-lime-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-500">
                  <span>আরও জানুন</span>
                  <span>→</span>
                </div>

                {/* Luxury Visual Blur Backdrops for subtle modern lighting */}
                <div className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-emerald-500/10 blur-3xl group-hover:bg-emerald-400/20 group-hover:scale-150 transition-all duration-700" />
                <div className="pointer-events-none absolute -left-10 -bottom-10 h-24 w-24 rounded-full bg-lime-500/5 blur-2xl group-hover:scale-125 transition-all duration-700" />
              </motion.article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}