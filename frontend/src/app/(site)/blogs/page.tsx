import { CalendarDays, Newspaper } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { AGRO_BLOGS } from "@/data/company";

export default function BlogsPage() {
  return (
    <section className="min-h-screen bg-[radial-gradient(circle_at_top_left,#1f7a3a_0,#052e1e_42%,#02170f_100%)] py-16 md:py-24">
      <Container>
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm font-black uppercase tracking-[0.24em] text-lime-300">Agro Advisory</p>
            <h1 className="mt-3 text-4xl font-black text-white md:text-6xl">কৃষি বার্তা</h1>
            <p className="mt-5 text-lg leading-8 text-emerald-50/85">
              মৌসুমি রোগ-পোকা সতর্কতা, পিজিআর ব্যবহার এবং ফসল সুরক্ষা নির্দেশনা।
            </p>
          </div>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {AGRO_BLOGS.map((blog) => (
            <article key={blog.id} className="rounded-lg border border-white/15 bg-white/5 p-6 backdrop-blur-md">
              <div className="flex items-center justify-between gap-3">
                <span className="rounded-full bg-lime-500/20 border border-lime-300/30 px-3 py-1 text-xs font-black text-lime-300">{blog.tagBn}</span>
                <span className="flex items-center gap-1 text-xs font-bold text-emerald-50/70">
                  <CalendarDays className="h-4 w-4" />
                  {blog.dateBn}
                </span>
              </div>
              <Newspaper className="mt-6 h-8 w-8 text-lime-300" />
              <h2 className="mt-4 text-xl font-black leading-snug text-white">{blog.titleBn}</h2>
              <p className="mt-4 text-sm leading-7 text-emerald-50/85">{blog.summaryBn}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
