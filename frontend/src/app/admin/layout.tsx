import Link from "next/link";
import { LayoutDashboard, Package, Sprout } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-slate-100">
      <aside className="hidden w-64 shrink-0 flex-col border-r border-slate-200 bg-emerald-950 text-white md:flex">
        <div className="border-b border-white/10 p-6">
          <div className="flex items-center gap-2">
            <Sprout className="h-8 w-8 text-emerald-300" />
            <div>
              <p className="font-bold">MIMPEX</p>
              <p className="text-xs text-white/60">Enterprise Admin</p>
            </div>
          </div>
        </div>
        <nav className="flex flex-1 flex-col gap-1 p-4">
          <Link
            href="/admin/dashboard"
            className="flex items-center gap-3 rounded-xl bg-white/10 px-4 py-3 text-sm font-medium transition hover:bg-white/15"
          >
            <LayoutDashboard className="h-5 w-5" />
            Dashboard
          </Link>
          <Link href="/" className="mt-auto rounded-xl px-4 py-3 text-sm text-white/70 hover:bg-white/10">
            ← Public website
          </Link>
        </nav>
      </aside>
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-14 items-center justify-between border-b border-slate-200 bg-white px-4 md:px-8">
          <h1 className="text-sm font-semibold text-slate-800 md:hidden">Mimpex Admin</h1>
          <Link href="/" className="text-xs font-medium text-emerald-700 hover:underline md:ml-auto">
            View live site
          </Link>
        </header>
        <div className="flex-1 overflow-auto p-4 md:p-8">{children}</div>
      </div>
    </div>
  );
}
