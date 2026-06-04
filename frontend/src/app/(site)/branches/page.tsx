import type { ComponentType } from "react";
import { Building2, Mail, MapPin, Phone, User } from "lucide-react";

import { BRANCH_OFFICES, type BranchOffice } from "@/data/company";

function BranchCard({ office }: { office: BranchOffice }) {
  return (
    <article className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 shadow-xl shadow-black/20 backdrop-blur-md transition-all duration-300 hover:border-emerald-500/50 hover:shadow-emerald-900/20 group">
      {office.heritageImage && (
        <img
          src={office.heritageImage}
          alt={office.heritageAlt ?? ""}
          className="absolute inset-0 h-full w-full rounded-2xl object-cover opacity-15 brightness-[0.3] contrast-125 mix-blend-luminosity pointer-events-none"
        />
      )}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-emerald-950/45 via-transparent to-black/45" />

      <div className="relative z-10">
        <span className="inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-emerald-100">
          <Building2 className="h-3.5 w-3.5 text-emerald-300" />
          {office.districtBn} · {office.districtEn}
        </span>

        <h2 className="mt-5 text-xl font-bold text-emerald-400 transition-colors group-hover:text-emerald-300">
          {office.regionBn}
          <span className="mt-1 block text-base font-semibold text-white/80">{office.regionEn}</span>
        </h2>

        <div className="mt-6 space-y-4 text-sm leading-6 text-white/80">
          <InfoRow icon={MapPin} accent="text-red-400" text={office.addressBn} />
          <InfoRow icon={User} accent="text-emerald-300" text={`${office.managerBn} · ${office.managerEn}`} />
          <InfoRow icon={Phone} accent="text-red-400" text={office.phone} />
          <InfoRow icon={Mail} accent="text-emerald-300" text={office.email ?? "info@mimpexbd.com"} href={`mailto:${office.email ?? "info@mimpexbd.com"}`} />
        </div>

        <p className="mt-6 border-t border-white/10 pt-4 text-sm font-semibold leading-7 text-emerald-50/85">{office.coverageBn}</p>
      </div>
    </article>
  );
}

function InfoRow({
  icon: Icon,
  accent,
  text,
  href,
}: {
  icon: ComponentType<{ className?: string }>;
  accent: string;
  text: string;
  href?: string;
}) {
  const content = (
    <>
      <Icon className={`mt-0.5 h-5 w-5 shrink-0 ${accent}`} />
      <span>{text}</span>
    </>
  );

  if (href) {
    return (
      <a href={href} className="flex gap-3 transition hover:text-white">
        {content}
      </a>
    );
  }

  return <p className="flex gap-3">{content}</p>;
}

export default function BranchesPage() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#042419] via-[#021810] to-[#063022] px-6 py-16 text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.18),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(220,38,38,0.13),transparent_32%)]" />
      <div className="relative mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-sm font-black uppercase tracking-[0.24em] text-emerald-300">Nationwide Agro Network</p>
          <h1 className="mt-3 text-4xl font-black text-white md:text-6xl">শাখা অফিস</h1>
          <p className="mt-5 text-lg leading-8 text-emerald-50/80">
            মিমপেক্সের আঞ্চলিক শাখাগুলো স্থানীয় কৃষি ঐতিহ্য, মাঠ পর্যায়ের অভিজ্ঞতা এবং দ্রুত পণ্য সরবরাহকে একসাথে যুক্ত করে কৃষকের পাশে কাজ করে।
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {BRANCH_OFFICES.map((office) => (
            <BranchCard key={office.id} office={office} />
          ))}
        </div>
      </div>
    </section>
  );
}
