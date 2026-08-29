'use client';

import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
// 🛠️ FIX: Restored strict next/navigation pathing definitions to solve the (void 0) function crash
import { useRouter, useParams } from 'next/navigation';
import { Eye } from 'lucide-react';
import { useCategory } from '@/features/dashboard/hooks/use-category';
import { getCategoryByIdAction } from '@/features/dashboard/actions/get-category-by-id.action';

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
  const params = useParams();

  // Safe extraction logic clearing TypeScript ts(2345) string array errors
  const id: string = Array.isArray(params?.id) ? params.id[0] || '' : params?.id || '';

  const router = useRouter();
  const { updateCategory, isUpdating } = useCategory();

  // Core component state primitives
  const [name, setName] = useState<string>('');
  const [displayName, setDisplayName] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string>('');
  const [localError, setLocalError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadCategory = async (): Promise<void> => {
      if (!id) return;
      try {
        setLocalError(null);
        const res = await getCategoryByIdAction(id);

        if (isMounted && res.success && res.data) {
          // Unpack nested payload.category structure securely
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

  // View active category image handler opening target paths safely in new browser tabs
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
      router.push('/dashboard/category/[id]');
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
    <main className="p-8 max-w-3xl mx-auto w-full">
      {/* 2. Header Title */}
      <h1 className="text-xl font-bold text-gray-900 mb-6">
        Update Category{displayName ? `: ${displayName}` : ''}
      </h1>

      <form
        onSubmit={handleUpdate}
        className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm space-y-5"
      >
        {localError && (
          <div className="p-4 text-xs font-semibold text-[#A32A38] bg-red-50 border border-red-100 rounded-xl">
            {localError}
          </div>
        )}

        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-2">Name *</label>
          <input
            type="text"
            required
            placeholder={displayName || 'Loading name...'}
            value={name}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
            className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-[#A32A38] bg-gray-50/20"
          />
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleViewImage}
            disabled={!imageUrl}
            className="text-xs text-blue-500 hover:text-blue-600 font-medium inline-flex items-center gap-1 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Eye size={13} /> View category image
          </button>
        </div>

        <button
          type="submit"
          disabled={isUpdating || !name}
          className="w-full bg-[#A32A38] hover:bg-[#8A222E] text-white font-semibold text-sm py-3 rounded-xl transition-colors shadow-sm disabled:opacity-40 cursor-pointer"
        >
          {isUpdating ? 'Updating...' : 'Update Category'}
        </button>
      </form>
    </main>
  );
}
