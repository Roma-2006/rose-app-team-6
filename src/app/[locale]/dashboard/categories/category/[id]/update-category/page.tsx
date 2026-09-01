'use client';

import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
// 🛠️ FIX: Restored strict next/navigation pathing definitions to solve the (void 0) function crash
import { useRouter, useParams } from 'next/navigation';
import { Eye } from 'lucide-react';
import { useCategory } from '@/features/dashboard/hooks/use-category';
import { getCategoryByIdAction } from '@/features/dashboard/actions/get-category-by-id.action';
import CustomInput from '@/shared/components/custom-input';
import { useTranslations } from 'next-intl';
import { Button } from '@/shared/components/ui/button';

// Strong type structure configuration mapping raw server responses cleanly without any
interface ServerCategoryInfo {
  id?: string;
  title?: string;
  description?: string;
  image?: string;
}

interface ServerPayloadWrapper {
  category?: ServerCategoryInfo;
}

export default function UpdateCategoryPage() {
  //Translation
  const tDashboard = useTranslations('dashboard.categories');

  //Variables
  const params = useParams();
  const id: string = Array.isArray(params?.id) ? params.id[0] || '' : params?.id || '';

  //Navigation
  const router = useRouter();

  // States
  const [name, setName] = useState<string>('');
  const [displayName, setDisplayName] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string>('');
  const [localError, setLocalError] = useState<string | null>(null);

  //Hooks
  const { updateCategory, isUpdating } = useCategory();
  useEffect(() => {
    let isMounted = true;

    const loadCategory = async (): Promise<void> => {
      if (!id) return;
      try {
        setLocalError(null);
        const res = await getCategoryByIdAction(id);

        if (isMounted && res.success && res.data) {
          const wrappedData = res.data as ServerPayloadWrapper;
          const activeCategory = wrappedData?.category;

          const categoryTitle = activeCategory?.title || '';
          const categoryImage = activeCategory?.image || '';

          if (categoryTitle) {
            setName(categoryTitle);
            setDisplayName(categoryTitle);
          }
          if (categoryImage) {
            setImageUrl(categoryImage);
          }
        } else if (isMounted && !res.success) {
          setLocalError(res.message || 'Failed to fetch category data.');
        }
      } catch (err) {
        console.error('Error rendering fields:', err);
        if (isMounted) {
          setLocalError('An error occurred while loading category.');
        }
      }
    };

    loadCategory();

    return () => {
      isMounted = false;
    };
  }, [id]);

  // View category image handler
  const handleViewImage = (): void => {
    if (imageUrl) {
      window.open(imageUrl, '_blank', 'noopener,noreferrer');
    } else {
      alert('No image path available for this target category item.');
    }
  };

  const handleUpdate = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (isUpdating || !id) return;

    try {
      setLocalError(null);
      await updateCategory({
        id,
        data: { title: name },
      });

      router.refresh();
      router.push(`/dashboard/categories/category/${id}`);
    } catch (error: unknown) {
      console.error(error);
      if (error instanceof Error) {
        setLocalError(error.message);
      } else {
        setLocalError('Failed to update.');
      }
    }
  };

  return (
    <main className="p-6 md:p-8 max-w-3xl mx-auto w-full flex flex-col min-h-[calc(100vh-120px)] md:min-h-0">
      <h1 className="md:text-xl  text-lg font-bold text-text-default mb-6">
        {tDashboard('update-category')}
        {displayName ? `: ${displayName}` : ''}
      </h1>

      <form onSubmit={handleUpdate} className="flex-1 flex flex-col p-4 md:p-8 space-y-5 ">
        {localError && (
          <div className="p-4 md:text-sm text-xs font-semibold text-text-danger bg-bg-danger border border-border-danger  rounded-xl">
            {localError}
          </div>
        )}

        <div>
          <CustomInput
            variant="default"
            id="category-name"
            placeholder={displayName || 'Loading name...'}
            label={tDashboard('name')}
            value={name}
            disabled={isUpdating}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
            className="w-full placeholder: md:text-lg text-xs"
          />
        </div>

        <div className="flex border border-border-muted rounded-lg justify-start p-2  md:border-none  md:justify-end">
          <button
            type="button"
            onClick={handleViewImage}
            disabled={!imageUrl}
            className="text-xs text-text-info  md:p-2 md:border  md:border-border-muted md:rounded-xl font-medium inline-flex items-center gap-1 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Eye size={13} /> {tDashboard('view-category-image')}
          </button>
        </div>

        <Button
          type="submit"
          buttonVariant="text"
          variant="primary"
          disabled={isUpdating || !name}
          title="dashboard.categories.update-category"
          className="w-full  md:h-13 h-11 mt-auto md:mt-17 "
        />
      </form>
    </main>
  );
}
