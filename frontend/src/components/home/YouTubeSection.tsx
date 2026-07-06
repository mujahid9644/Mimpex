"use client";
 
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
 
const YOUTUBE_VIDEOS = [
  {
    id: 1,
    title: "Obosheshe Shujon - মিমপেক্সের সাথে শুজন",
    videoId: "GGwEa15lxLg",
    youtubeLink: "https://youtu.be/GGwEa15lxLg?si=-9wt5PayUBKh5_m1",
  },
  {
    id: 2,
    title: "Viral Babu | ভাইরাল বাবু || Akhom",
    videoId: "h7azGmDHGus",
    youtubeLink: "https://youtu.be/h7azGmDHGus?si=Mn65djzycFzpb73s",
  },
  {
    id: 3,
    title: "Khamari || খামারি || Afran Nisho",
    videoId: "xJuowRXFEpw",
    youtubeLink: "https://youtu.be/xJuowRXFEpw?si=j9_LHGcCg29mWybQ",
  },
];
 
const CHANNEL_URL = "https://www.youtube.com/@mimpexagrochemicals";
 
export function YouTubeSection() {
  return (
    <section className="bg-white py-16 md:py-24">
      <Container>
        {/* Header Section */}
        <div className="text-center">
          <h2 className="mt-3 text-4xl font-black leading-tight md:text-6xl">
            <span className="text-cyan-500">মিমপেক্স</span>{" "}
            <span className="text-slate-800">পরিবেশিত নাটক</span>
          </h2>
          <div className="mx-auto mt-4 h-1.5 w-32 bg-red-600"></div>
          
          <p className="mx-auto mt-8 max-w-3xl text-base leading-8 text-slate-700 md:text-lg">
            বাংলাদেশের কৃষকদের কৃষি বিষয়ক উন্নত ও সম্পসারের লক্ষ্যে{" "}
            <span className="font-bold text-red-600">মিমপেক্সা</span> বিভিন্ন ফসলের সময়া ও সমাধানের উপর নাটক পরিবেশনের মাধ্যমে
            কৃষকদের বিনোদনের পাশাপাশি কৃষি জ্ঞান সংক্ষারের লক্ষ্যে কাজ করে যাচ্ছে
          </p>
        </div>
 
        {/* Video Grid */}
        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {YOUTUBE_VIDEOS.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              {/* YouTube Embed */}
              <div className="relative h-0 pb-[56.25%] overflow-hidden bg-black">
                <iframe
                  className="absolute inset-0 h-full w-full"
                  src={`https://www.youtube.com/embed/${video.videoId}?rel=0`}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>
 
              {/* Video Info */}
              <div className="bg-white px-4 py-3">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                  Mimpex Agrochemicals Ltd.
                </p>
                <h3 className="mt-2 line-clamp-2 text-sm font-bold text-emerald-950">
                  {video.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
 
        {/* YouTube Channel Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-20 overflow-hidden rounded-3xl bg-gradient-to-br from-red-50 via-white to-red-50 px-6 py-16 md:px-16 shadow-xl"
        >
          <div className="flex flex-col items-center justify-center gap-8">

 
            <div className="text-center">
              <p className="text-xl font-bold text-slate-800 md:text-2xl">
                আমাদের সম্পূর্ণ চ্যানেল অনুসরণ করুন
              </p>
              <p className="mt-2 text-slate-600">
                মিমপেক্স পরিবেশিত কৃষি নাটক এবং শিক্ষামূলক ভিডিও সিরিজ
              </p>
            </div>
 
            <a
              href="https://www.youtube.com/@MimpexAgrochemicalsLtd"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 rounded-full bg-red-600 px-8 py-3 font-bold text-white shadow-lg transition-all duration-300 hover:bg-red-700 hover:shadow-xl hover:scale-105"
            >
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M19.615 3.175c-1.431-.557-6.615-.885-6.615-.885s-5.184.328-6.615.885C3.864 3.869 3 6.256 3 10.8v2.4c0 4.544.864 6.931 3.385 7.625 1.431.557 6.615.885 6.615.885s5.184-.328 6.615-.885c2.521-.694 3.385-3.081 3.385-7.625v-2.4c0-4.544-.864-6.931-3.385-7.625zM9.6 15.9v-7.8l6.4 3.9-6.4 3.9z" />
              </svg>
              আমাদের চ্যানেল দেখুন
            </a>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}