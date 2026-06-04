"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { CheckCircle2, Phone, ShoppingCart } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { getCatalogProduct } from "@/data/mimpex-catalog";

export default function CheckoutPage() {
  const params = useParams<{ id: string }>();
  const product = getCatalogProduct(params.id) ?? getCatalogProduct("ethiplus-396-sl");

  if (!product) return null;

  return (
    <section className="bg-slate-50 py-16 md:py-24">
      <Container>
        <div className="mx-auto grid max-w-5xl gap-8 rounded-lg border border-slate-200 bg-white p-6 shadow-xl md:grid-cols-[0.9fr_1.1fr]">
          <div className="relative aspect-square rounded-lg bg-emerald-50">
            <Image src={product.image} alt={product.nameBn} fill className="object-contain p-8" />
          </div>
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-red-50 px-3 py-1 text-sm font-black text-red-700">
              <ShoppingCart className="h-4 w-4" />
              Dynamic Dealer Checkout
            </p>
            <h1 className="mt-5 text-4xl font-black text-emerald-950">{product.nameBn}</h1>
            <p className="mt-4 text-lg leading-8 text-slate-600">{product.efficacyBn}</p>
            <div className="mt-6 space-y-3 text-sm font-bold text-slate-700">
              <p className="flex gap-2">
                <CheckCircle2 className="h-5 w-5 text-emerald-700" />
                মূল উপাদান: {product.mainIngredientBn}
              </p>
              <p className="flex gap-2">
                <CheckCircle2 className="h-5 w-5 text-emerald-700" />
                প্রয়োগ মাত্রা: {product.dosageBn}
              </p>
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <Link href="/contact" className="rounded-md bg-red-700 px-5 py-3 text-center font-black text-white hover:bg-red-800">
                অর্ডার অনুরোধ পাঠান
              </Link>
              <a
                href="tel:+8801234567890"
                className="inline-flex items-center justify-center gap-2 rounded-md border border-emerald-700 px-5 py-3 font-black text-emerald-800 hover:bg-emerald-50"
              >
                <Phone className="h-4 w-4" />
                কল করুন
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
