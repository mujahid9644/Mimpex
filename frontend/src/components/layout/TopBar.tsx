"use client";

import { Mail, Phone } from "lucide-react";

export function TopBar() {
  return (
    <div className="hidden border-b border-emerald-900/20 bg-emerald-950 text-white md:block">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 text-xs lg:px-8">
        <p className="truncate text-white/75">কৃষি ও কৃষকের কল্যাণে · Mimpex Agrochemicals Ltd.</p>
        <div className="flex shrink-0 items-center gap-6">
          <a href="tel:+8801234567890" className="flex items-center gap-1.5 transition hover:text-red-300">
            <Phone className="h-3.5 w-3.5" />
            +880 1234-567890
          </a>
          <a href="mailto:info@mimpexbd.com" className="flex items-center gap-1.5 transition hover:text-red-300">
            <Mail className="h-3.5 w-3.5" />
            info@mimpexbd.com
          </a>
        </div>
      </div>
    </div>
  );
}
