"use client";

import Link from "next/link";
import { Facebook, Linkedin, Mail, MapPin, Phone, Youtube } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/layout/Logo";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

export function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-slate-200 bg-mimpex-green-dark text-white">
      <Container className="grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <Logo light />
          <p className="mt-4 text-sm leading-relaxed text-white/75">{t.footer.tagline}</p>
          <div className="mt-5 flex gap-3">
            {[Facebook, Linkedin, Youtube].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 transition hover:bg-mimpex-red"
                aria-label="Social"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-bold uppercase tracking-wider text-mimpex-red">Quick Links</h4>
          <ul className="mt-4 space-y-2 text-sm text-white/80">
            {[
              { href: "/", label: t.nav.home },
              { href: "/about", label: t.nav.about },
              { href: "/products", label: t.nav.products },
              { href: "/contact", label: t.nav.contact },
            ].map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-bold uppercase tracking-wider text-mimpex-red">Contact</h4>
          <ul className="mt-4 space-y-3 text-sm text-white/80">
            <li className="flex gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-mimpex-red" />
              House 12, Road 5, Dhanmondi, Dhaka 1205
            </li>
            <li className="flex gap-2">
              <Phone className="h-4 w-4 shrink-0 text-mimpex-red" />
              +880 1234-567890
            </li>
            <li className="flex gap-2">
              <Mail className="h-4 w-4 shrink-0 text-mimpex-red" />
              info@mimpexbd.com
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-bold uppercase tracking-wider text-mimpex-red">AI Services</h4>
          <p className="mt-4 text-sm leading-relaxed text-white/75">
            ImageBot crop diagnostics and 24/7 virtual PGR sales assistant — integrated on this platform.
          </p>
          <Link href="/#imagebot" className="mt-4 inline-block text-sm font-semibold text-white underline-offset-4 hover:underline">
            Open ImageBot →
          </Link>
        </div>
      </Container>

      <div className="border-t border-white/10 py-5 text-center text-xs text-white/60">
        © {year} Mimpex Agrochemicals Ltd. · {t.footer.rights}
      </div>
    </footer>
  );
}
