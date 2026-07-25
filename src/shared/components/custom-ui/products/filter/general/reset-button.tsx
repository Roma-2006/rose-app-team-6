'use client';

import { Button } from '@/shared/components/ui/button';
import { X } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

interface ResetButtonProps {
  paramKeys: string | string[];
}

const ResetButton = ({ paramKeys }: ResetButtonProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const keys = Array.isArray(paramKeys) ? paramKeys : [paramKeys];
  const isVisible = keys.some((key) => searchParams.has(key));

  if (!isVisible) return null;

  const handleReset = () => {
    const params = new URLSearchParams(searchParams.toString());
    keys.forEach((key) => params.delete(key));
    params.set('page', '1');
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <Button
      variant="ghost"
      buttonVariant="text"
      leftIcon={<X className="size-3.75 text-text-danger" />}
      title="products.filter.resetButton"
      className="w-fit text-text-danger gap-1 font-normal text-sm"
      onClick={handleReset}
    />
  );
};
export default ResetButton;
