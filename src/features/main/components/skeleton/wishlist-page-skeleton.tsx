import { Skeleton } from '@/shared/components/ui/skeleton';
import WishlistItemSkeleton from './wishlist-item-skeleton';
import { FolderHeart } from 'lucide-react';

export default function WishlistPageSkeleton() {
  return (
    <>
      <div className="flex flex-wrap gap-2 justify-between items-center">
        <div className="flex items-end gap-3.75">
          <FolderHeart size={60} />
          <Skeleton className="h-12 w-48 rounded-md" />
          <Skeleton className="h-5 w-20 rounded-md" />
        </div>

        <Skeleton className="h-10 w-32 rounded-md" />
      </div>
      <WishlistItemSkeleton />
    </>
  );
}
