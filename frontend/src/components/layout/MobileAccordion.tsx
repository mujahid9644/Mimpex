"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { useId } from "react";

import { cn } from "@/lib/cn";

interface MobileAccordionProps {
  label: string;
  description?: string;
  expanded: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

export function MobileAccordion({ label, description, expanded, onToggle, children }: MobileAccordionProps) {
  const id = useId();

  return (
    <div className="space-y-1">
      <button
        type="button"
        id={`accordion-toggle-${id}`}
        aria-controls={`accordion-panel-${id}`}
        aria-expanded={expanded}
        onClick={onToggle}
        className="group flex w-full items-center justify-between rounded-3xl border border-slate-200/80 bg-slate-50 px-4 py-4 text-left transition hover:border-emerald-300 hover:bg-white/95 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
      >
        <div>
          <p className="text-base font-semibold text-slate-900">{label}</p>
          {description ? <p className="mt-1 text-sm text-slate-600">{description}</p> : null}
        </div>
        <ChevronRight className={cn("h-5 w-5 shrink-0 text-emerald-700 transition-transform duration-300", expanded && "rotate-90")} />
      </button>

      <AnimatePresence initial={false}>
        {expanded ? (
          <motion.div
            key="content"
            id={`accordion-panel-${id}`}
            role="region"
            aria-labelledby={`accordion-toggle-${id}`}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.25, 0.8, 0.25, 1] }}
            className="overflow-hidden"
          >
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.22 }}
              className="space-y-2 pt-3"
            >
              {children}
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
