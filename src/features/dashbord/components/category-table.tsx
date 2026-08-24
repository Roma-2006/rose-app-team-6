'use client';

import React, { useState, useEffect, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { SquarePen, Trash2 } from 'lucide-react';
import { CategoryTableProps } from '../types/categories';
import { useCategory } from '../hooks/use-category';
import CustomInput from '@/shared/components/custom-input';
import { Link } from '@/i18n/navigation';
import PaginationControls from './pagination';

export default function CategoryTable({
  initialCategories,
  initialTotalPages,
  currentPage,
  currentSearch,
}: CategoryTableProps) {
  const router = useRouter();
  const [search, setSearch] = useState(currentSearch);
  const [isPending, startTransition] = useTransition();

  const { deleteCategory, isDeleting } = useCategory();

  // دالة موحدة لتعديل البارامترات وتحديث مسار المتصفح الفعلي
  const handleParamChange = (newPage: number, newSearch: string) => {
    if (newPage < 1 || newPage > initialTotalPages) return;

    startTransition(() => {
      const params = new URLSearchParams();
      params.set('page', newPage.toString());

      if (newSearch.trim()) {
        params.set('search', newSearch.trim().substring(0, 200));
      }

      router.push(`?${params.toString()}`, { scroll: false });
    });
  };

  // آلية الـ Debounce لتأخير طلبات الفلترة أثناء كتابة نص البحث
  useEffect(() => {
    if (search === currentSearch) return;

    const delayDebounceFn = setTimeout(() => {
      handleParamChange(1, search);
    }, 400);

    return () => clearTimeout(delayDebounceFn);
  }, [search]);

  const handleDeleteClick = async (id: string) => {
    if (
      !window.confirm(
        'Are you sure you want to delete this category? This action cannot be undone.'
      )
    )
      return;

    try {
      // 🛠️ قراءة الـ token من الـ localStorage لضمان التمرير الأمن وتفادي خطأ No Token Provided
      const token = localStorage.getItem('token') || localStorage.getItem('accessToken') || '';

      if (!token) {
        alert('Your session has expired. Please log in again.');
        return;
      }

      // تمرير الـ id والـ token سوياً للـ mutation كمخرجات مدمجة
      await deleteCategory({ id, token });
      alert('Category deleted successfully!');
      router.refresh();
    } catch (err: unknown) {
      console.error('Delete operation failed:', err);
    }
  };

  return (
    <>
      {/* 1. شريط البحث والتحكم */}
      <div className="relative w-full">
        <CustomInput
          variant="search"
          value={search}
          label=""
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* 2. جدول البيانات البنيوي المتجاوب */}
      <div className=" w-full mt-4.5  ">
        <table className="w-full text-left ">
          <thead>
            <tr className="border-b border-border-subtle text-text-plain text-sm font-semibold">
              <th className="px-6 py-1 text-left w-[20%]">Name</th>
              <th className="px-6 py-1 text-left w-[20%]">Products</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100  text-sm">
            {initialCategories.length === 0 ? (
              <tr>
                <td colSpan={3} className="text-center py-12 text-text-soft font-medium">
                  No categories found matching filters.
                </td>
              </tr>
            ) : (
              initialCategories.map((category, index) => {
                const rowKey = category.id ? `${category.id}-${index}` : `row-${index}`;

                return (
                  <tr
                    key={rowKey}
                    className={`hover:bg-bg-danger-faint transition-colors ${
                      index === 1 ? '' : ''
                    }`}
                  >
                    <td className="px-6 py-1 font-medium text-text-default whitespace-nowrap">
                      {category.title}
                    </td>
                    <td className="px-6 py-1 text-text-muted whitespace-nowrap">
                      {category.productsCount ?? 0} products
                    </td>
                    <td className="px-6 py-1 text-right space-x-2 whitespace-nowrap">
                      <Link
                        href={`/admin/categories/edit/${category.id}`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-bg-info-fade text-text-info  rounded-md text-xs font-medium transition-colors"
                      >
                        <SquarePen size={12} /> Edit
                      </Link>

                      <button
                        onClick={() => handleDeleteClick(category.id)}
                        disabled={isDeleting}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-bg-danger-fade text-text-danger  disabled:opacity-40 rounded-md text-xs font-medium transition-colors"
                      >
                        <Trash2 size={12} />
                        {isDeleting ? 'Deleting...' : 'Delete'}
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* 3. استدعاء مكون الترقيم المنفصل وتغذية أحداثه تلقائياً */}
      <PaginationControls
        currentPage={currentPage}
        totalPages={initialTotalPages}
        isPending={isPending}
        onPageChange={(targetPage) => handleParamChange(targetPage, search)}
      />
    </>
  );
}
