"use client";

import { useEffect, useState } from "react";
import { Megaphone, Pin } from "lucide-react";

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

export function NewsBoard() {
  const { t, locale } = useLanguage();
  const [items, setItems] = useState<NewsItem[]>(FALLBACK);

  useEffect(() => {
    fetchNews()
      .then(setItems)
      .catch(() => setItems(FALLBACK));
  }, []);

  return (
    <section className="bg-slate-100/80 py-20 md:py-28">
      <Container>
        <SectionHeading
          eyebrow="Updates"
          title={t.home.newsTitle}
          description={
            locale === "bn"
              ? "কোম্পানির সর্বশেষ ঘোষণা ও নোটিশ"
              : "Latest corporate announcements and notices"
          }
        />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {items.slice(0, 6).map((item) => (
            <article
              key={item.id}
              className="card-pro relative"
            >
              {item.is_pinned && (
                <span className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-mimpex-red/10 px-2 py-0.5 text-[10px] font-bold uppercase text-mimpex-red">
                  <Pin className="h-3 w-3" />
                  Pinned
                </span>
              )}
              <Megaphone className="h-5 w-5 text-mimpex-green" />
              <h3 className="mt-3 pr-16 font-bold text-mimpex-green-dark">
                {locale === "bn" && item.title_bn ? item.title_bn : item.title_en}
              </h3>
              <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-slate-600">
                {locale === "bn" && item.body_bn ? item.body_bn : item.body_en}
              </p>
              <time className="mt-4 block text-xs font-medium text-slate-400">
                {new Date(item.published_at).toLocaleDateString(locale === "bn" ? "bn-BD" : "en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </time>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
