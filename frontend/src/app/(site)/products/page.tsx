import { Suspense } from "react";
import { ProductsPageClient } from "@/components/products/ProductsPageClient";
import { Container } from "@/components/ui/Container";
import { Sprout } from "lucide-react";

function ProductsLoading() {
  return (
    <Container>
      <div className="flex items-center justify-center min-h-[400px]">
        <Sprout className="w-8 h-8 animate-spin text-mimpex-green" />
      </div>
    </Container>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<ProductsLoading />}>
      <ProductsPageClient />
    </Suspense>
  );
}
