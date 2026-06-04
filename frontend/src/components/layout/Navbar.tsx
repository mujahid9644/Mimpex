"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, Search, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { CATALOG_CATEGORIES } from "@/data/mimpex-catalog";
import { MIMPEX_ASSETS } from "@/lib/assets";
import { cn } from "@/lib/cn";

const navItems = [
  { href: "/about", label: "আমাদের সম্পর্কে" },
  { href: "/board", label: "পরিচালনা পর্ষদ" },
  { href: "/branches", label: "শাখা অফিস" },
  { href: "/blogs", label: "কৃষি বার্তা" },
];

function underlineLink(active: boolean) {
  return cn(
    "group relative flex h-20 items-center whitespace-nowrap px-4 text-[17px] font-bold text-white/95 transition-colors xl:px-5 xl:text-[19px]",
    "after:absolute after:bottom-5 after:left-0 after:h-0.5 after:w-0 after:bg-white after:transition-all after:duration-300 after:ease-in-out after:content-[''] after:transform-gpu",
    "hover:text-white hover:after:w-full",
    active && "text-white after:w-full"
  );
}

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [productOpen, setProductOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
    setProductOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const productCategories = useMemo(() => CATALOG_CATEGORIES.filter((category) => category.id !== "all"), []);

  return (
    <header className="sticky top-0 z-50">
      <div className="border-b border-white/10 bg-gradient-to-r from-emerald-700/95 via-emerald-600/95 to-lime-600/90 shadow-[0_14px_40px_rgba(2,44,25,0.22)] backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-[1720px] items-center gap-4 px-4 sm:px-6 lg:h-[92px] lg:px-10 transform-gpu">
          <Link href="/" className="flex min-w-0 shrink-0 items-center">
            <Image
              src={MIMPEX_ASSETS.logo}
              alt="Mimpex Agrochemicals Ltd."
              width={320}
              height={96}
              priority
              className="h-14 w-auto object-contain drop-shadow-sm sm:h-16 lg:h-[74px]"
            />
          </Link>

          <nav className="ml-auto hidden h-full items-center lg:flex" aria-label="Primary navigation">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className={underlineLink(pathname === item.href)}>
                {item.label}
              </Link>
            ))}

            <div className="relative h-full" onMouseEnter={() => setProductOpen(true)} onMouseLeave={() => setProductOpen(false)}>
              <button
                type="button"
                onClick={() => setProductOpen((value) => !value)}
                className={cn(underlineLink(pathname === "/products"), "gap-2")}
                aria-expanded={productOpen}
              >
                পণ্য তালিকা
                <ChevronDown className={cn("h-5 w-5 transition", productOpen && "rotate-180")} />
              </button>
              <AnimatePresence>
                {productOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 top-full w-72 overflow-hidden rounded-b-xl bg-white/95 shadow-2xl ring-1 ring-emerald-900/10 backdrop-blur-md"
                  >
                    <Link href="/products" className="block bg-emerald-800 px-5 py-3 text-base font-bold text-white">
                      সকল পণ্য
                    </Link>
                    {productCategories.map((category) => (
                      <Link
                        key={category.id}
                        href={`/products?category=${category.id}`}
                        className="block border-b border-slate-100 px-5 py-3 text-[15px] font-semibold text-slate-700 transition hover:bg-emerald-50 hover:text-emerald-800"
                      >
                        {category.labelBn}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              href="/imagebot"
              className="ml-4 flex h-14 items-center rounded-md border border-white/20 bg-cyan-500/90 px-6 text-[18px] font-black text-white shadow-lg shadow-cyan-950/15 transition hover:-translate-y-0.5 hover:bg-cyan-500 xl:px-8 xl:text-[22px]"
            >
              কৃষি সমাধান
            </Link>
            <Link href="/products" aria-label="Search products" className="ml-4 flex h-12 w-12 items-center justify-center rounded-full text-white transition hover:bg-white/10">
              <Search className="h-7 w-7" strokeWidth={2} />
            </Link>
          </nav>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-label={open ? "Close navigation" : "Open navigation"}
            className="ml-auto flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-white/95 text-emerald-800 shadow-sm lg:hidden"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[55] bg-emerald-950/55 backdrop-blur-sm lg:hidden" onClick={() => setOpen(false)} />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 32, stiffness: 300 }}
              className="fixed right-0 top-0 z-[60] flex h-dvh w-[min(100vw-2rem,360px)] flex-col bg-white shadow-2xl lg:hidden"
            >
              <div className="flex h-20 items-center justify-between border-b border-slate-100 px-4">
                <Image src={MIMPEX_ASSETS.logo} alt="Mimpex" width={190} height={58} className="h-12 w-auto object-contain" />
                <button type="button" onClick={() => setOpen(false)} className="rounded-md border border-slate-200 p-2 text-slate-700">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <nav className="flex flex-1 flex-col overflow-y-auto p-4">
                {navItems.map((item) => (
                  <Link key={item.href} href={item.href} className="rounded-md px-4 py-3 text-base font-bold text-slate-800 hover:bg-emerald-50">
                    {item.label}
                  </Link>
                ))}
                <div className="my-3 rounded-lg border border-slate-200">
                  <Link href="/products" className="block rounded-t-lg bg-emerald-700 px-4 py-3 font-bold text-white">
                    পণ্য তালিকা
                  </Link>
                  {productCategories.map((category) => (
                    <Link key={category.id} href={`/products?category=${category.id}`} className="block border-t border-slate-100 px-4 py-3 text-sm font-semibold text-slate-700">
                      {category.labelBn}
                    </Link>
                  ))}
                </div>
                <Link href="/imagebot" className="mt-2 rounded-md bg-cyan-500 px-4 py-3 text-center text-lg font-bold text-white">
                  কৃষি সমাধান
                </Link>
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
