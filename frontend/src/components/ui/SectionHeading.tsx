"use client";

import { cn } from "@/lib/cn";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  light,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
}) {
  return (
    <div className={cn("mb-10 md:mb-12", align === "center" && "text-center mx-auto max-w-2xl")}>
      {eyebrow && (
        <p
          className={cn(
            "mb-2 text-xs font-bold uppercase tracking-[0.2em]",
            light ? "text-mimpex-red" : "text-mimpex-green"
          )}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          "text-3xl font-bold tracking-tight md:text-4xl",
          light ? "text-white" : "text-mimpex-green-dark"
        )}
      >
        {title}
      </h2>
      {description && (
        <p className={cn("mt-3 text-base leading-relaxed md:text-lg", light ? "text-white/85" : "text-slate-600")}>
          {description}
        </p>
      )}
    </div>
  );
}
