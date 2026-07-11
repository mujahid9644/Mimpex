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

import { Logo } from "./Logo";
import { MobileAccordion } from "./MobileAccordion";

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

  const handleBackdropClick = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      if (event.target === event.currentTarget) {
        onClose();
      }
    },
    [onClose]
  );

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
            className="fixed right-0 top-0 z-[70] flex h-screen w-[clamp(280px,92vw,380px)] flex-col overflow-hidden bg-white/95 shadow-[rgba(0,0,0,0.2)_-18px_0px_48px_-12px] backdrop-blur-xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 260, damping: 28 }}
            ref={drawerRef}
          >
            <div className="sticky top-0 z-20 border-b border-slate-200/80 bg-white/95 px-5 py-4 backdrop-blur-xl">
              <div className="flex items-center justify-between gap-4">
                {/* <div>
                  <h2 id="mobile-drawer-title" className="text-base font-semibold text-slate-900">
                    মেনু
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">দ্রুত নেভিগেশন ও প্রিমিয়াম অভিজ্ঞতা।</p>
                </div> */}
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close navigation"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              {/* <p className="mt-3 text-sm text-slate-500">সমৃদ্ধ খুঁজুন, দ্রুত নেভিগেট করুন, এবং বেস্ট সিলেকশন অনুসন্ধান করুন।</p> */}
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-5">
              <nav className="space-y-3" aria-label="Mobile navigation">
                {navItems.map((item) => (
                  <NavLinkItem key={item.href} href={item.href} label={item.label} icon={item.icon} onClick={onClose} />
                ))}

                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-1">
                  <MobileAccordion
                    label="পণ্যসমূহ"
                    description="প্রোডাক্ট ক্যাটাগরি দেখুন"
                    expanded={sectionOpen}
                    onToggle={handleToggleSection}
                  >
                    <div className="space-y-2">
                      <Link
                        href="/products"
                        onClick={onClose}
                        className="flex items-center gap-3 rounded-3xl bg-white px-4 py-3 text-sm font-semibold text-slate-900 transition hover:bg-emerald-50"
                      >
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
                          className="flex items-center gap-3 rounded-3xl px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-emerald-50 hover:text-slate-900"
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

            <div className="sticky bottom-0 z-20 border-t border-slate-200/80 bg-white/95 px-5 py-4 pb-[calc(env(safe-area-inset-bottom,1rem)+1rem)]">
              <div className="space-y-3">
                <Link
                  href="/imagebot"
                  onClick={onClose}
                  className="flex items-center justify-center rounded-3xl bg-emerald-700 px-4 py-4 text-base font-semibold text-white shadow-lg shadow-emerald-700/20 transition hover:-translate-y-0.5 hover:bg-emerald-600"
                >
                  <Sparkles className="mr-2 h-5 w-5" />
                  কৃষি সমাধান
                </Link>
                {/* <div className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-600">
                  <p className="font-semibold text-slate-900">উন্নত নেভিগেশন</p>
                  <p className="mt-2 leading-6">এখানে দ্রুত ক্লিক করুন এবং খুলুন আপনার পছন্দের পণ্য বিভাগ।</p>
                </div> */}
              </div>
            </div>
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  );
}
