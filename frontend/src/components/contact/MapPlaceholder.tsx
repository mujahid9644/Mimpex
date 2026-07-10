"use client";

import { MapPin } from "lucide-react";

import { useLanguage } from "@/lib/i18n/LanguageProvider";

export function MapPlaceholder() {
  const { t } = useLanguage();

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-card">
      <div className="relative flex h-64 flex-col items-center justify-center md:h-72">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#E8F5EE_0%,#F4F6F5_50%,#E8F5EE_100%)]" />
        <div className="relative text-center">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-md">
            <MapPin className="h-7 w-7 text-mimpex-red" />
          </span>
          <p className="mt-4 font-bold text-mimpex-green-dark">{t.contact.map}</p>
          <p className="mt-1 px-6 text-sm text-slate-500">ধানমন্ডি, ঢাকা — Google Maps এম্বেড</p>
        </div>
      </div>
    </div>
  );
}
