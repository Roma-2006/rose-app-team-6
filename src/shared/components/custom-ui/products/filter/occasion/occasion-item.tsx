'use client';

import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { cn } from '@/shared/lib/utils/tailwind-cn';
import { OccasionItemProps } from '@/shared/types/products/filter/occasion';

const OccasionItem = ({ occasion }: OccasionItemProps) => {
  // State
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Variables
  const isActive = searchParams.get('occasionId') === occasion.id;

  // Functions
  const handleClick = () => {
    const params = new URLSearchParams(searchParams.toString());

    if (isActive) {
      params.delete('occasionId');
    } else {
      params.set('occasionId', occasion.id);
    }

    params.delete('suboccasionId');
    params.set('page', '1');

    router.replace(`${pathname}?${params.toString()}`, {
      scroll: false,
    });
  };

  return (
    <button
      onClick={handleClick}
      aria-pressed={isActive}
      className={cn(
        'group relative w-full aspect-video overflow-hidden rounded-xl',
        ' transition-all',
        isActive ? 'ring-2 ring-primary' : 'ring-transparent '
      )}
    >
      <Image
        src={occasion.image || ''}
        alt={occasion.title}
        fill
        sizes="(max-width:768px) 50vw, 200px"
        className="object-cover transition-transform duration-300 group-hover:scale-105 bg-bg-muted"
      />

      {/* Dark overlay */}
      {!isActive && <div className="absolute inset-0 bg-bg-overlay hover:bg-bg-elevated" />}

      {/* Title */}
      <span className="absolute inset-0 flex items-center justify-center text-white text-lg font-medium">
        {occasion.title}
      </span>
    </button>
  );
};

export default OccasionItem;
