<<<<<<< HEAD
import { authOptions } from '@/auth';
import { getProductById } from '@/features/dashboard/api/product-details.api';
import AddReviewForm from '@/features/dashboard/components/products/add-review-form';
import OverallReview from '@/features/dashboard/components/products/overall-review';
=======
import { getProductById } from '@/features/dashboard/apis/product-details.api';
>>>>>>> 67f74cc5b2f63372fd222ce4d502de39038e4758
import ProductGallery from '@/features/dashboard/components/products/product-gallery';
import ProductInfo from '@/features/dashboard/components/products/product-info';
import RelatedProductsSection from '@/features/dashboard/components/products/related-products-section';
import ReviewList from '@/features/dashboard/components/products/review-list';
import { ProductOccasion } from '@/features/dashboard/types/products';
import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';

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
      <RelatedProductsSection
        product={{
          ...product,
          _count: {
            reviews: product._count?.reviews ?? 0,
            cartItems: product._count?.cartItems ?? 0,
            wishlistItems: product._count?.wishlistItems ?? 0,
            orderItems: 0,
          },
          occasions: (product.occasions ?? []) as ProductOccasion[],
        }}
      />
    </div>
  );
}
