import { MimpexProductDetails } from "@/components/products/MimpexProductDetails";
import { getCatalogProductBySlug } from "@/data/mimpex-catalog";

export default function OfficialProductDetailsPage({ params }: { params: { slug: string } }) {
  return <MimpexProductDetails product={getCatalogProductBySlug(params.slug)} />;
}
