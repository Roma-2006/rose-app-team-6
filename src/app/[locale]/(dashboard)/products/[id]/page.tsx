import { getProductById } from '@/features/dashboard/apis/product-details.api';
import ProductGallery from '@/features/dashboard/components/products/product-gallery';
import ProductInfo from '@/features/dashboard/components/products/product-info';
import { notFound } from 'next/navigation';

interface ProductPageProps {
  params: Promise<{
    id: string;
    locale: string;
  }>;
}

export default async function ProductDetailsPage({ params }: ProductPageProps) {
  const { id } = await params;

  const data = await getProductById(id);
  if (!data || !data.payload?.product) {
    notFound();
  }
  const product = data.payload.product;

  let galleryImages: string[] = [];
  try {
    galleryImages = product.gallery ? JSON.parse(product.gallery) : [];
  } catch {
    galleryImages = [];
  }

  const allImages = [product.cover, ...galleryImages].filter(Boolean);

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-12 items-start">
        <ProductGallery images={allImages} title={product.title} />
        <ProductInfo product={product} />
      </div>
    </div>
  );
}
