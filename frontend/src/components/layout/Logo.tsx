import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { MIMPEX_ASSETS } from "@/lib/assets";

export function Logo({ light }: { light?: boolean }) {
  return (
    <Link href="/" className="group flex shrink-0 items-center gap-2">
      <Image
        src={MIMPEX_ASSETS.logo}
        alt="Mimpex Agrochemicals Ltd."
        width={140}
        height={48}
        className="h-9 w-auto max-w-[140px] object-contain object-left sm:h-10"
        priority
      />
      <span className={cn("hidden leading-tight xl:block", light && "text-white")}>
        <span className={cn("text-[10px] font-semibold uppercase tracking-wider", light ? "text-white/70" : "text-slate-500")}>
          Agrochemicals Ltd.
        </span>
      </span>
    </Link>
  );
}
