"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  BookOpen,
  ChevronRight,
  MapPin,
  Newspaper,
  Package,
  Sparkles,
  Users,
  X,
  type LucideIcon,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState, type PointerEvent } from "react";
import { usePathname } from "next/navigation";

import { Logo } from "./Logo";
import { MobileAccordion } from "./MobileAccordion";
import { cn } from "@/lib/cn";

interface Category {
  id: string;
  labelBn: string;
}

interface DrawerItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

interface MobileDrawerProps {
  open: boolean;
  onClose: () => void;
  categories: Category[];
}

const navItems: DrawerItem[] = [
  { href: "/about", label: "আমাদের সম্পর্কে", icon: BookOpen },
  { href: "/board", label: "পরিচালনা পর্ষদ", icon: Users },
  { href: "/branches", label: "শাখা অফিস", icon: MapPin },
  { href: "/blogs", label: "কৃষি বার্তা", icon: Newspaper },
];

function NavLinkItem({ href, label, icon: Icon, onClick }: { href: string; label: string; icon: LucideIcon; onClick?: () => void }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="group flex items-center gap-3 rounded-3xl px-4 py-4 text-base font-semibold text-slate-900 transition hover:bg-emerald-50 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2"
    >
      <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700 transition group-hover:bg-emerald-200">
        <Icon className="h-5 w-5" />
      </span>
      <span>{label}</span>
    </Link>
  );
}

export function MobileDrawer({ open, onClose, categories }: MobileDrawerProps) {
  const drawerRef = useRef<HTMLDivElement | null>(null);
  const lastFocusedElement = useRef<HTMLElement | null>(null);
  const [sectionOpen, setSectionOpen] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const infoRef = useRef<HTMLDivElement | null>(null);

  const handleToggleSection = useCallback(() => {
    setSectionOpen((value) => !value);
  }, []);

  const categoryItems = useMemo(() => categories, [categories]);

  useEffect(() => {
    if (!open) {
      return;
    }

    lastFocusedElement.current = document.activeElement as HTMLElement | null;
    const bodyOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusable = drawerRef.current?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusable?.[0];
    const lastElement = focusable?.[focusable.length - 1];

    firstElement?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab" || !focusable?.length) {
        return;
      }

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement?.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown, true);

    return () => {
      document.body.style.overflow = bodyOverflow;
      lastFocusedElement.current?.focus();
      document.removeEventListener("keydown", handleKeyDown, true);
    };
  }, [open, onClose]);

  const handleBackdropClick = useCallback((event: PointerEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  }, [onClose]);

  const pathname = usePathname();

  return (
    <AnimatePresence>
        {open ? (
          <>
            <motion.div
              key="drawer-backdrop"
              className="fixed inset-0 z-[60] bg-slate-950/40 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onPointerDown={handleBackdropClick}
            />
            <motion.aside
              key="mobile-drawer"
              role="dialog"
              aria-modal="true"
              aria-labelledby="mobile-drawer-title"
              className="fixed right-0 top-0 z-[70] flex h-screen w-[clamp(280px,92vw,380px)] flex-col overflow-hidden bg-white/95 shadow-lg backdrop-blur-xl"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3 }}
              style={{ borderTopLeftRadius: 24, borderBottomLeftRadius: 24 }}
              ref={drawerRef}
            >
              {/* Sticky header + CTA card */}
              <div className="sticky top-0 z-20 border-b border-slate-200/80 bg-white/95 px-5 py-4 backdrop-blur-xl">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <Link href="/" onClick={onClose} className="flex items-center gap-3">
                      <Logo />
                    </Link>
                  </div>
                  <button
                    type="button"
                    onClick={onClose}
                    aria-label="Close navigation"
                    className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* AgriDoc CTA card near the top */}
                <div className="mt-4 rounded-[20px] bg-gradient-to-r from-emerald-50 to-white/60 p-4 shadow-sm">
                  <div className="flex items-start gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                      <Sparkles className="h-6 w-6" />
                    </div>
                    <div className="min-w-0">
                      {/* <p className="text-sm font-bold text-slate-900">🚀 AgriDoc AI</p>
                      <p className="mt-1 text-xs text-slate-600">ছবি আপলোড করে রোগ শনাক্ত করুন এবং Mimpex পরামর্শ পান।</p> */}
                      <div className="mt-3 flex items-center gap-3">
                        <a
                          href="/imagebot"
                          onClick={onClose}
                          className="inline-flex items-center justify-center rounded-full bg-emerald-700 px-3 py-2 text-sm font-semibold text-white shadow transition hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                          aria-label="Open AgriDoc"
                        >
                          AgriDoc🩺
                        </a>
                        <button
                          type="button"
                          onClick={() => setShowInfo(true)}
                          className="inline-flex items-center justify-center rounded-md px-2.5 py-1.5 text-sm font-medium text-emerald-700 hover:bg-emerald-50"
                        >
                          এটি কী?
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* AgriDoc info modal inside drawer */}
                <AnimatePresence>
                  {showInfo ? (
                    <motion.div
                      key="agri-info"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.22 }}
                      className="absolute inset-0 z-40 flex items-center justify-center p-6"
                      onPointerDown={(e) => {
                        if (e.target === e.currentTarget) setShowInfo(false);
                      }}
                    >
                      <motion.div
                        ref={infoRef}
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="agri-info-title"
                        initial={{ y: 20, scale: 0.98 }}
                        animate={{ y: 0, scale: 1 }}
                        exit={{ y: 10, scale: 0.98 }}
                        transition={{ duration: 0.26 }}
                        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-lg"
                        onPointerDown={(e) => e.stopPropagation()}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h3 id="agri-info-title" className="text-lg font-semibold text-slate-900">🌿 AgriDoc AI</h3>
                            <p className="mt-2 text-sm text-slate-700">AgriDoc AI হলো Mimpex-এর স্মার্ট কৃষি সহকারী। ফসলের ছবি আপলোড করলে এটি AI-এর মাধ্যমে রোগ শনাক্ত করে এবং Mimpex-এর উপযুক্ত কীটনাশক, ছত্রাকনাশক বা অন্যান্য সমাধানের পরামর্শ দেয়।</p>
                          </div>
                          <button onClick={() => setShowInfo(false)} aria-label="Close info" className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-slate-100 text-slate-700">
                            <X className="h-4 w-4" />
                          </button>
                        </div>

                        <div className="mt-4 space-y-2 text-sm text-slate-700">
                          <p className="font-semibold">Features:</p>
                          <ul className="ml-4 list-disc">
                            <li>📷 ছবি বিশ্লেষণ</li>
                            <li>🌿 রোগ শনাক্তকরণ</li>
                            <li>💊 উপযুক্ত Mimpex পণ্য সুপারিশ</li>
                            <li>⚡ দ্রুত ফলাফল</li>
                          </ul>
                        </div>
                      </motion.div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>

              {/* Main nav content */}
              <div className="flex-1 overflow-y-auto px-5 py-6">
                <nav className="space-y-5" aria-label="Mobile navigation">
                  {navItems.map((item) => {
                    const Icon = item.icon as any;
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={onClose}
                        className={cn(
                          "group flex items-center gap-3 rounded-2xl px-4 py-3 text-base font-semibold transition focus:outline-none focus:ring-2 focus:ring-emerald-400",
                          isActive ? "bg-emerald-50 text-emerald-800" : "text-slate-900 hover:bg-emerald-50"
                        )}
                        style={{ minHeight: 48 }}
                      >
                        <span className={cn("flex h-10 w-10 items-center justify-center rounded-2xl transition", isActive ? "bg-emerald-200 text-emerald-800" : "bg-emerald-100 text-emerald-700")}>
                          <Icon className="h-5 w-5" />
                        </span>
                        <span className="truncate">{item.label}</span>
                      </Link>
                    );
                  })}

                  <div className="rounded-2xl border border-slate-100 bg-white p-1">
                    <MobileAccordion label="পণ্যসমূহ" description="প্রোডাক্ট ক্যাটাগরি দেখুন" expanded={sectionOpen} onToggle={handleToggleSection}>
                      <div className="space-y-3">
                        <Link href="/products" onClick={onClose} className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-slate-900 transition hover:bg-emerald-50" style={{ minHeight: 48 }}>
                          <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
                            <Package className="h-4 w-4" />
                          </span>
                          <span>সকল পণ্য</span>
                        </Link>
                        {categoryItems.map((category) => (
                          <Link
                            key={category.id}
                            href={`/products?category=${category.id}`}
                            onClick={onClose}
                            className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-emerald-50"
                            style={{ minHeight: 48 }}
                          >
                            <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-slate-100 text-slate-500">
                              <ChevronRight className="h-4 w-4" />
                            </span>
                            <span>{category.labelBn}</span>
                          </Link>
                        ))}
                      </div>
                    </MobileAccordion>
                  </div>
                </nav>
              </div>
            </motion.aside>
          </>
        ) : null}
      </AnimatePresence>
    );
  }
