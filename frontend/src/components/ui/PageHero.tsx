"use client";

import { motion } from "framer-motion";

import { Container } from "./Container";

export function PageHero({ title, description }: { title: string; description?: string }) {
  return (
    <section className="relative overflow-hidden bg-emerald-800 py-14 md:py-18">
      <div className="absolute inset-0 bg-hero-pattern opacity-30" />
      <Container className="relative">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl">{title}</h1>
          {description && <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/90 md:text-lg">{description}</p>}
        </motion.div>
      </Container>
    </section>
  );
}
