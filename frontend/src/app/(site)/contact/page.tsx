"use client";

import { Mail, MapPin, Phone } from "lucide-react";

import { ContactForm } from "@/components/contact/ContactForm";
import { MapPlaceholder } from "@/components/contact/MapPlaceholder";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

export default function ContactPage() {
  const { t, locale } = useLanguage();

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,#1f7a3a_0,#052e1e_42%,#02170f_100%)]">
      <PageHero
        title={t.contact.title}
        description={
          locale === "bn"
            ? "পণ্য, ডিলারশিপ ও অংশীদারিত্বের জন্য আমাদের কর্পোরেট টিমের সাথে যোগাযোগ করুন"
            : "Reach our corporate team for product inquiries and partnerships"
        }
      />
      <section className="py-16 md:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-5">
            <div className="space-y-6 lg:col-span-2">
              <div className="rounded-xl border border-white/15 bg-white/5 p-6 backdrop-blur-md">
                <h2 className="text-lg font-bold text-white">{t.contact.address}</h2>
                <ul className="mt-5 space-y-4 text-sm text-emerald-50/85">
                  <li className="flex gap-3">
                    <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-lime-300" />
                    House 12, Road 5, Dhanmondi, Dhaka 1205, Bangladesh
                  </li>
                  <li className="flex gap-3">
                    <Phone className="h-5 w-5 shrink-0 text-lime-300" />
                    +880 1234-567890
                  </li>
                  <li className="flex gap-3">
                    <Mail className="h-5 w-5 shrink-0 text-lime-300" />
                    info@mimpexbd.com
                  </li>
                </ul>
              </div>
              <MapPlaceholder />
            </div>
            <div className="lg:col-span-3">
              <ContactForm />
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
