import { MimpexProductDetails } from "@/components/products/MimpexProductDetails";
import { getCatalogProduct } from "@/data/mimpex-catalog";

export default function ProductDetailsPage({ params }: { params: { id: string } }) {
  return <MimpexProductDetails product={getCatalogProduct(params.id)} />;
}
