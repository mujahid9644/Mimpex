import { redirect } from "next/navigation";

import type { ProductCategoryId } from "@/data/mimpex-catalog";

export default function ProductCategoryPage({ params }: { params: { category: ProductCategoryId } }) {
  redirect(`/products?category=${params.category}`);
}
