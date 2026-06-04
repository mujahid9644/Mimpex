"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Building2, Eye, Milestone, Target, Users } from "lucide-react";

import { fetchAbout, type AboutData } from "@/lib/api";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

const FALLBACK: AboutData = {
  profile: {
    mission_en: "Empower farmers with trusted agrochemical innovation.",
    mission_bn: "বিশ্বস্ত এগ্রোকেমিক্যাল উদ্ভাবনে কৃষকের পাশে থাকা।",
    vision_en: "South Asia's most trusted crop science partner.",
    vision_bn: "দক্ষিণ এশিয়ার সবচেয়ে বিশ্বস্ত কৃষি বিজ্ঞান অংশীদার।",
    profile_en: "Mimpex Agrochemicals Ltd. manufactures crop protection and PGR solutions.",
    profile_bn: "মিমপেক্স এগ্রোকেমিক্যালস লিমিটেড ফসল সুরক্ষা ও প্ল্যান্ট গ্রোথ রেগুলেটর উৎপাদন ও বিপণন করে।",
  },
  directors: [
    {
      id: 1,
      name_en: "M. Saiduzzaman",
      name_bn: "এম. সাইদুজ্জামান",
      title_en: "Managing Director",
      title_bn: "ব্যবস্থাপনা পরিচালক",
      bio_en: "Leading Mimpex corporate strategy and nationwide distribution.",
      bio_bn: "মিমপেক্সের কৌশলগত পরিচালনা ও দেশব্যাপী বিতরণ নেটওয়ার্ক।",
    },
  ],
  milestones: [
    {
      id: 1,
      year: 2010,
      title_en: "National expansion",
      title_bn: "জাতীয় সম্প্রসারণ",
      description_en: "Dealer network growth across Bangladesh.",
      description_bn: "বাংলাদেশ জুড়ে ডিলার নেটওয়ার্ক সম্প্রসারণ।",
    },
  ],
};

export default function AboutPage() {
  const { t, locale } = useLanguage();
  const [data, setData] = useState<AboutData>(FALLBACK);

  useEffect(() => {
    fetchAbout()
      .then(setData)
      .catch(() => setData(FALLBACK));
  }, []);

  const p = data.profile;
  const pick = (en: string, bn: string) => (locale === "bn" && bn ? bn : en);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,#1f7a3a_0,#052e1e_42%,#02170f_100%)]">
      <PageHero title={t.about.title} description={pick(p.profile_en, p.profile_bn)} />
      <section className="py-16 md:py-24">
        <Container>
          <div className="grid gap-6 md:grid-cols-2">
            <InfoCard icon={Target} title={t.about.mission} text={pick(p.mission_en, p.mission_bn)} />
            <InfoCard icon={Eye} title={t.about.vision} text={pick(p.vision_en, p.vision_bn)} />
          </div>
          <article className="rounded-xl border border-white/15 bg-white/5 p-6 backdrop-blur-md mt-6">
            <Building2 className="h-8 w-8 text-lime-300" />
            <h3 className="mt-3 text-xl font-bold text-white">{t.about.profile}</h3>
            <p className="mt-3 leading-relaxed text-emerald-50/85">{pick(p.profile_en, p.profile_bn)}</p>
          </article>
        </Container>
      </section>

      <section className="border-t border-white/10 py-16 md:py-24">
        <Container>
          <SectionHeading title={t.about.board} align="left" />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {data.directors.map((d) => (
              <motion.article key={d.id} whileHover={{ y: -4 }} className="rounded-xl border border-white/15 bg-white/5 p-6 backdrop-blur-md">
                <Users className="h-8 w-8 text-lime-300" />
                <h3 className="mt-4 text-lg font-bold text-white">{pick(d.name_en, d.name_bn)}</h3>
                <p className="text-sm font-medium text-lime-300">{pick(d.title_en, d.title_bn)}</p>
                <p className="mt-2 text-sm leading-relaxed text-emerald-50/85">{pick(d.bio_en, d.bio_bn)}</p>
              </motion.article>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-24">
        <Container>
          <SectionHeading title={t.about.career} align="left" />
          <div className="relative ml-4 space-y-8 border-l-2 border-emerald-700/30 pl-8">
            {data.milestones.map((m) => (
              <div key={m.id} className="relative">
                <span className="absolute -left-[41px] flex h-8 w-8 items-center justify-center rounded-full bg-lime-500 text-xs font-bold text-emerald-950">
                  {m.year}
                </span>
                <Milestone className="mb-2 h-5 w-5 text-lime-300" />
                <h3 className="text-lg font-bold text-white">{pick(m.title_en, m.title_bn)}</h3>
                <p className="mt-1 text-sm text-emerald-50/85">{pick(m.description_en, m.description_bn)}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}

function InfoCard({
  icon: Icon,
  title,
  text,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  text: string;
}) {
  return (
    <article className="rounded-xl border border-white/15 bg-white/5 p-6 backdrop-blur-md">
      <Icon className="h-8 w-8 text-lime-300" />
      <h3 className="mt-3 text-xl font-bold text-white">{title}</h3>
      <p className="mt-2 leading-relaxed text-emerald-50/85">{text}</p>
    </article>
  );
}
