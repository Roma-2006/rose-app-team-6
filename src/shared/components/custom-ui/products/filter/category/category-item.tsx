'use client';

import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { cn } from '@/shared/lib/utils/tailwind-cn';
import { CategoryItemProps } from '@/shared/types/products/filter/category';

const CategoryItem = ({ category }: CategoryItemProps) => {
  // State
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Variables
  const isActive = searchParams.get('categoryId') === category.id;

  // Functions
  const handleClick = () => {
    const params = new URLSearchParams(searchParams.toString());

    if (isActive) {
      params.delete('categoryId');
    } else {
      params.set('categoryId', category.id);
    }

    params.delete('subCategoryId');
    params.set('page', '1');

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <button
      onClick={handleClick}
      aria-pressed={isActive}
      className={cn(
        'w-full h-9 font-medium text-sm text-text-plain relative rounded-lg overflow-hidden flex gap-2.5 transition-colors shrink-0 hover:bg-bg-soft align-baseline',
        isActive ? 'bg-bg-primary-fade' : 'bg-bg-muted'
      )}
    >
      <div
        className={cn('relative w-9 h-9 ', isActive ? 'bg-bg-primary-saturated' : 'bg-bg-default')}
      >
        {category.image && (
          <Image
            src={category.image}
            alt={category.title}
            fill
            sizes="16px"
            className="object-cover py-1.75 px-2.5"
          />
        )}
      </div>
      <span className=" px-2.5 self-center">{category.title}</span>
    </button>
  );
};
export default CategoryItem;
