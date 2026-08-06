import { authOptions } from '@/auth';
import { getProductById } from '@/features/main/api/product-details.api';
import AddReviewForm from '@/features/main/components/products/add-review-form';
import OverallReview from '@/features/main/components/products/overall-review';
import ProductGallery from '@/features/main/components/products/product-gallery';
import ProductInfo from '@/features/main/components/products/product-info';
import RelatedProductsSection from '@/features/main/components/products/related-products-section';
import ReviewList from '@/features/main/components/products/review-list';
import { ProductOccasion } from '@/features/main/types/products';
import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';

interface ProductPageProps {
  params: Promise<{
    id: string;
    locale: string;
  }>;
}

export default async function ProductDetailsPage({ params }: ProductPageProps) {
  const { id: productId } = await params;

  const session = await getServerSession(authOptions);
  const isAuthenticated = !!session?.token;
  const data = await getProductById(productId);

  if (!data?.status || !data?.payload?.product) {
    notFound();
  }

  const product = data.payload.product;

  let galleryImages: string[] = [];

  try {
    galleryImages =
      typeof product.gallery === 'string' ? JSON.parse(product.gallery) : (product.gallery ?? []);
  } catch {
    galleryImages = [];
  }

  const allImages = [product.cover, ...galleryImages].filter((image): image is string =>
    Boolean(image)
  );

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-2 lg:gap-12">
        <ProductGallery images={allImages} title={product.title} />

        <ProductInfo product={product} />
      </div>

      <OverallReview
        product={{
          rating: product.rating,
          ratingsCount: product.ratings,
        }}
      />

      <section className="grid grid-cols-2 gap-6 border-y border-bg-muted py-5 lg:grid-cols-3">
        <ReviewList
          productId={productId}
          initialReviews={product.reviews ?? []}
          totalReviews={product.ratings ?? 0}
        />

        <AddReviewForm isAuthenticated={isAuthenticated} productId={productId} />
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
