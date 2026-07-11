"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, Search, X } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";

import { CATALOG_CATEGORIES } from "@/data/mimpex-catalog";
import { MIMPEX_ASSETS } from "@/lib/assets";
import { cn } from "@/lib/cn";
import { MobileDrawer } from "./MobileDrawer";

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

  const productCategories = useMemo(
    () => CATALOG_CATEGORIES.filter((category) => category.id !== "all"),
    []
  );

  const handleToggleDrawer = useCallback(() => {
    setOpen((value) => !value);
  }, []);

  const closeDrawer = useCallback(() => setOpen(false), []);

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
            onClick={handleToggleDrawer}
            aria-expanded={open}
            aria-label={open ? "Close navigation" : "Open navigation"}
            className="ml-auto flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/95 text-emerald-800 shadow-sm ring-1 ring-slate-200 transition hover:bg-white lg:hidden"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <MobileDrawer open={open} onClose={closeDrawer} categories={productCategories} />
    </header>
  );
}
