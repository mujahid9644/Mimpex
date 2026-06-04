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
    <section className="bg-white py-5 md:py-2">
      <Container>
        <SectionHeading
          eyebrow={t.home.featuresEyebrow}
          title={t.home.featuresTitle}
          description={t.home.featuresSubtitle}
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => {
            const Icon = ICONS[index % ICONS.length];
            return (
              <motion.article
                key={feature.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-b from-white via-emerald-50/40 to-slate-50 p-6 shadow-card"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-700/10 text-emerald-700">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-lg font-bold text-emerald-950 group-hover:text-emerald-700">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{feature.body}</p>
                <div className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-emerald-200/30 blur-2xl" />
              </motion.article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
