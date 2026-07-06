"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarDays, Search, Leaf, ShieldAlert, Sparkles, Sprout, ArrowUpRight, PhoneCall } from "lucide-react";
import { Container } from "@/components/ui/Container";

// Unsplash Agriculture Images সহ ডাইনামিক কৃষি বার্তার ডাটাবেজ
const MOCK_AGRO_BLOGS = [
  {
    id: "blog-1",
    titleBn: "বোরো ধানে ব্যাকটেরিয়াল লিফ ব্লাইট বা পাতা ঝলসানো রোগ প্রতিরোধ",
    summaryBn: "চলতি মৌসুমে ধানের পাতা ঝলসানো রোগের প্রাদুর্ভাব দেখা দিতে পারে। পটাস সারের সঠিক ব্যবহার এবং আক্রান্ত জমিতে সুষম নাইট্রোজেন সার প্রয়োগের মাধ্যমে এই রোগ দমন করা সম্ভব। প্রাথমিক অবস্থায় কপার অক্সিক্লোরাইড ব্যবহার করুন।",
    tagBn: "রোগ ও পোকা",
    dateBn: "০৮ জুন, ২০২৬",
    image: "https://thfvnext.bing.com/th/id/OIP.DC6-_qDwAurrTEuwG8c5QwHaD4?w=310&h=180&c=7&r=0&o=7&cb=thfvnextfalcon2&dpr=1.5&pid=1.7&rm=3"
  },
  {
    id: "blog-2",
    titleBn: "উদ্ভিদ হরমোন বা PGR ব্যবহারের সঠিক নিয়ম ও সর্বোচ্চ ফলন নিশ্চিতকরণ",
    summaryBn: "প্ল্যান্ট গ্রোথ রেগুলেটর (PGR) ফসলের কোষ বিভাজন ও ফলন বৃদ্ধিতে সাহায্য করে। তবে অতিরিক্ত ব্যবহারে ফুল ঝরে যেতে পারে। মিরাকুলান বা এজাতীয় পিজিআর ব্যবহারের ক্ষেত্রে প্রতি লিটার পানিতে ১ মিলি ডোজ বজায় রাখুন।",
    tagBn: "PGR ও বৃদ্ধি",
    dateBn: "০৬ জুন, ২০২৬",
    image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "blog-3",
    titleBn: "গ্রীষ্মকালীন টমেটো চাষে মালচিং পেপারের ব্যবহার এবং আর্দ্রতা নিয়ন্ত্রণ",
    summaryBn: "তীব্র গরমে টমেটোর গোড়ার আর্দ্রতা ধরে রাখতে এবং আগাছা মুক্ত রাখতে মালচিং পেপার একটি বৈপ্লবিক সমাধান। এটি ব্যবহারের ফলে সেচের খরচ প্রায় ৪০% পর্যন্ত কমে আসে এবং ফলন দ্বিগুণ হয়।",
    tagBn: "ফসল সুরক্ষা",
    dateBn: "০১ জুন, ২০২৬",
    image: "https://tse2.mm.bing.net/th/id/OIP.V0MGMeLQDwEPrDtwCFoj-wHaEO?cb=thfvnextfalcon2&pid=ImgDet&w=178&h=101&c=7&dpr=1.5&o=7&rm=3"
  },
  {
    id: "blog-4",
    titleBn: "লেবু জাতীয় ফসলে ক্যাঙ্কার রোগ এবং এর জৈব প্রতিকার",
    summaryBn: "লেবুর পাতা, ডাল ও ফলের গায়ে খসখসে বাদামী দাগ পড়া এই রোগের প্রধান লক্ষণ। বর্ষাকালে বাতাসের মাধ্যমে এটি ছড়ায়। আক্রান্ত অংশ কেটে পুড়িয়ে ফেলুন এবং স্ট্রেপ্টোমাইসিন সালফেট স্প্রে করুন।",
    tagBn: "রোগ ও পোকা",
    dateBn: "২৮ মে, ২০২৬",
    image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "blog-5",
    titleBn: "ফসলের রোগ প্রতিরোধ ক্ষমতা বাড়াতে জিংক ও সালফারের গুরুত্ব",
    summaryBn: "মাটিতে জিংক এবং সালফারের অভাব হলে গাছ খাটো হয়ে যায় এবং পাতা তামাটে রঙ ধারণ করে। বিঘাপ্রতি সঠিক অনুপাতে দস্তা ও জিপসাম সার প্রয়োগ করলে গাছের রোগ প্রতিরোধ ক্ষমতা বহুগুণ বৃদ্ধি পায়।",
    tagBn: "PGR ও বৃদ্ধি",
    dateBn: "২৪ মে, ২০২৬",
    image: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=600&auto=format&fit=crop"
  }
];

const CATEGORIES = [
  { id: "all", label: "সব বার্তা", icon: Leaf },
  { id: "রোগ ও পোকা", label: "রোগ ও পোকা", icon: ShieldAlert },
  { id: "PGR ও বৃদ্ধি", label: "PGR ও বৃদ্ধি", icon: Sparkles },
  { id: "ফসল সুরক্ষা", label: "ফসল সুরক্ষা", icon: Sprout },
];

export default function BlogsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  // ফিল্টারিং লজিক
  const filteredBlogs = MOCK_AGRO_BLOGS.filter((blog) => {
    const matchesSearch = blog.titleBn.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          blog.summaryBn.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "all" || blog.tagBn === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredBlog = MOCK_AGRO_BLOGS[0];
  const regularBlogs = filteredBlogs.filter(b => b.id !== featuredBlog?.id);

  return (
    <section className="min-h-screen bg-[radial-gradient(circle_at_top_left,#0b4834_0,#052e1e_42%,#02170f_100%)] py-16 md:py-10 text-white overflow-hidden relative">
      {/* গ্লোয়িং ইফেক্ট */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-lime-500/5 rounded-full blur-[120px] pointer-events-none" />

      <Container className="max-w-7xl px-4 md:px-8 relative z-10">
        
        {/* ================= HERO HEADER (Fixed Gap & Layout) ================= */}
        <div className="border-b border-white/10 pb-10">
          <div className="grid md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-8 space-y-4">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-lime-400/10 px-4 py-1.5 text-xs font-black uppercase tracking-[0.2em] text-lime-300 border border-lime-400/20">
                <Sprout className="h-4 w-4" /> Agro Advisory Center
              </span>
              <h1 className="text-4xl font-black text-white md:text-6xl tracking-tight">
                কৃষি <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-emerald-400">বার্তা</span>
              </h1>
              <p className="text-base md:text-lg leading-relaxed text-emerald-50/70 max-w-2xl font-medium">
                আধুনিক চাষাবাদ, মৌসুমি রোগ-পোকা সতর্কতা, পিজিআর (PGR) সঠিক ব্যবহার এবং মাঠ পর্যায়ের ফসল সুরক্ষা নির্দেশিকা।
              </p>
            </div>

            {/* সার্চ বার এখন এলাইন্ড এবং দেখতে চমৎকার */}
            <div className="md:col-span-4 w-full md:max-w-md md:justify-self-end">
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-emerald-300/40 group-focus-within:text-lime-400 transition-colors" />
                <input
                  type="text"
                  placeholder="কী খুঁজতে চান? এখানে লিখুন..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-white/5 py-3.5 pl-12 pr-5 text-sm text-white placeholder-emerald-100/30 outline-none backdrop-blur-md transition-all focus:border-lime-400/40 focus:bg-white/10 focus:ring-4 focus:ring-lime-400/10"
                />
              </div>
            </div>
          </div>
        </div>

        {/* ================= CATEGORY FILTERS ================= */}
        <div className="mt-10 flex flex-wrap gap-3">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-black border transition-all duration-300 ${
                  isActive
                    ? "bg-lime-400 text-emerald-950 border-lime-400 shadow-md scale-102"
                    : "bg-white/5 text-emerald-100/80 border-white/10 hover:bg-white/10 hover:border-white/20"
                }`}
              >
                <Icon className={`h-4 w-4 ${isActive ? "text-emerald-950" : "text-lime-400"}`} />
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* ================= FEATURED BLOG ================= */}
        {activeCategory === "all" && searchQuery === "" && featuredBlog && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-12"
          >
            <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-transparent p-6 md:p-8 grid md:grid-cols-12 gap-8 items-center hover:border-lime-400/30 transition-all duration-500 shadow-xl">
              <div className="relative h-64 md:h-80 w-full overflow-hidden rounded-2xl bg-emerald-950 md:col-span-5">
                <img 
                  src={featuredBlog.image} 
                  alt={featuredBlog.titleBn} 
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute left-4 top-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 px-3.5 py-1 text-xs font-black text-white shadow-md">
                  বিশেষ বার্তা 
                </span>
              </div>
              <div className="flex flex-col justify-center md:col-span-7 space-y-4">
                <div className="flex items-center gap-3 text-xs font-bold text-lime-300">
                  <span className="rounded-lg bg-lime-400/10 px-2.5 py-1 border border-lime-400/20 font-black">{featuredBlog.tagBn}</span>
                  <div className="flex items-center gap-1 opacity-70">
                    <CalendarDays className="h-3.5 w-3.5" />
                    <span>{featuredBlog.dateBn}</span>
                  </div>
                </div>
                <h2 className="text-2xl md:text-3xl font-black leading-tight text-white group-hover:text-lime-300 transition-colors">
                  {featuredBlog.titleBn}
                </h2>
                <p className="text-sm md:text-base leading-relaxed text-emerald-100/70 font-medium">
                  {featuredBlog.summaryBn}
                </p>
                <div className="pt-2">
                  <span className="inline-flex items-center gap-2 font-black text-sm text-lime-400 group-hover:text-white transition-colors">
                    বিস্তারিত পড়ুন <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* ================= BLOGS GRID ================= */}
        <div className="mt-12">
          {filteredBlogs.length === 0 ? (
            <div className="text-center py-16 bg-white/5 rounded-2xl border border-white/10">
              <p className="text-base text-emerald-100/50 font-bold">দুঃখিত, কোনো কৃষি বার্তা পাওয়া যায়নি।</p>
            </div>
          ) : (
            <motion.div layout className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <AnimatePresence>
                {(activeCategory === "all" && searchQuery === "" ? regularBlogs : filteredBlogs).map((blog) => (
                  <motion.article 
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    key={blog.id} 
                    className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-md transition-all duration-300 hover:-translate-y-1.5 hover:border-lime-400/20 hover:bg-white/10"
                  >
                    <div className="relative h-48 w-full overflow-hidden bg-emerald-950">
                      <img 
                        src={blog.image} 
                        alt={blog.titleBn} 
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      <span className="absolute left-4 top-4 rounded-lg bg-lime-500 px-3 py-1 text-xs font-black text-emerald-950 shadow-sm">
                        {blog.tagBn}
                      </span>
                    </div>

                    <div className="flex flex-1 flex-col p-6 justify-between space-y-4">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-xs font-bold text-lime-300/80">
                          <div className="flex items-center gap-1">
                            <CalendarDays className="h-3.5 w-3.5" />
                            <span>{blog.dateBn}</span>
                          </div>
                          <span className="opacity-60">৩ মিনিট পড়া</span>
                        </div>
                        <h2 className="text-lg font-black leading-snug text-white group-hover:text-lime-300 transition-colors line-clamp-2">
                          {blog.titleBn}
                        </h2>
                        <p className="text-xs md:text-sm leading-relaxed text-emerald-50/70 line-clamp-3 font-medium">
                          {blog.summaryBn}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                        <span className="text-xs font-black text-lime-400 group-hover:underline inline-flex items-center gap-1">
                          পড়ুন <ArrowUpRight className="h-3.5 w-3.5" />
                        </span>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>

        {/* ================= CTA SECTION ================= */}
        <div className="mt-20 rounded-2xl border border-white/10 bg-gradient-to-r from-emerald-900 to-teal-950 p-8 text-center max-w-4xl mx-auto">
          <h3 className="text-xl md:text-2xl font-black text-white">ফসলের রোগ নিয়ে চিন্তিত?</h3>
          <p className="mt-2 text-sm text-emerald-100/70 max-w-xl mx-auto font-medium">
            আপনার ফসলের যেকোনো সমস্যা বা মিমপেক্স প্রডাক্টের সঠিক ডোজ জানতে আমাদের এগ্রো এক্সপার্ট টিমের সাথে সরাসরি ফোনে পরামর্শ করুন।
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a href="tel:+8801799392013" className="flex items-center gap-2 rounded-xl bg-lime-400 text-emerald-950 px-5 py-2.5 font-black text-sm shadow-md hover:bg-lime-300 transition-all">
              <PhoneCall className="w-4 h-4" /> এক্সপার্ট কল সেন্টার
            </a>
          </div>
        </div>

      </Container>
    </section>
  );
}