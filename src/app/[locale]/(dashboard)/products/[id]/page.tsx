import { authOptions } from '@/auth';
import { getProductById } from '@/features/dashboard/api/product-details.api';
import AddReviewForm from '@/features/dashboard/components/products/add-review-form';
import OverallReview from '@/features/dashboard/components/products/overall-review';
import ProductGallery from '@/features/dashboard/components/products/product-gallery';
import ProductInfo from '@/features/dashboard/components/products/product-info';
import ReviewList from '@/features/dashboard/components/products/review-list';
import { Star } from 'lucide-react';
import { getServerSession } from 'next-auth';

interface ProductPageProps {
  params: Promise<{
    id: string;
    locale: string;
  }>;
}

export default async function ProductDetailsPage({ params }: ProductPageProps) {
  const { id } = await params;
  const session = await getServerSession(authOptions);
  const isAuthenticated = !!session?.token;

  const data = await getProductById(id);
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
      <OverallReview
        product={{
          rating: product.rating,
          ratingsCount: product.ratings,
        }}
      />
      <section className="py-5 grid grid-cols-2 gap-6 lg:grid-cols-3 divide-y border-y border-bg-muted">
        <ReviewList productId={id} />
        <AddReviewForm isAuthenticated={isAuthenticated} productId={id} />
      </section>
    </div>
  );
}
