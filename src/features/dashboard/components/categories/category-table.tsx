'use client';

import React, { useState, useEffect, useTransition, useCallback } from 'react';
import { SquarePen, Trash2 } from 'lucide-react';
import { CategoryTableProps } from '../../types/categories/categories';
import { useCategory } from '../../hooks/use-category';
import CustomInput from '@/shared/components/custom-input';
import { useRouter, Link } from '@/i18n/navigation';
import PaginationControls from './pagination';
import { signOut, useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { Button } from '@/shared/components/ui/button';

export default function CategoryTable({
  initialCategories,
  initialTotalPages,
  currentPage,
  currentSearch,
}: CategoryTableProps) {
  //Translation
  const tDashboard = useTranslations('dashboard.categories');

  const router = useRouter();
  const { data: session } = useSession();

  const [search, setSearch] = useState(currentSearch);
  const [isPending, startTransition] = useTransition();

  //Custom Hooks
  const { deleteCategory, isDeleting } = useCategory();

  const handleParamChange = useCallback(
    (newPage: number, newSearch: string) => {
      if (newPage < 1 || newPage > initialTotalPages) return;

      startTransition(() => {
        const params = new URLSearchParams();
        params.set('page', newPage.toString());

        if (newSearch.trim()) {
          params.set('search', newSearch.trim().substring(0, 200));
        }

        router.push(`?${params.toString()}`, { scroll: false });
      });
    },
    [initialTotalPages, router]
  );

  useEffect(() => {
    if (search === currentSearch) return;

    const delayDebounceFn = setTimeout(() => {
      handleParamChange(1, search);
    }, 400);

    return () => clearTimeout(delayDebounceFn);
  }, [search, currentSearch, handleParamChange]);

  const handleDeleteClick = async (id: string): Promise<void> => {
    if (!id) return;
    try {
      await deleteCategory(id);

      startTransition(() => {
        router.refresh();
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);

      const isSessionError =
        /expired|unauthorized|token|session/i.test(msg) ||
        msg.includes('expired') ||
        msg.includes('login again');

      if (isSessionError) {
        const currentPath = window.location.pathname + window.location.search;
        const loginUrl = `/login?callbackUrl=${encodeURIComponent(currentPath)}`;

        try {
          await signOut({ redirect: false });
          router.push(loginUrl);
        } catch (signOutErr) {
          window.location.assign(`/en${loginUrl}`);
        }
      } else {
        alert(msg);
      }
    }
  };

  return (
    <>
      <div className="relative w-full">
        <CustomInput
          variant="search"
          value={search}
          label=""
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className=" w-full mt-4.5  ">
        <table className="w-full text-left ">
          <thead>
            <tr className="border-b border-border-subtle text-text-plain text-sm font-semibold">
              <th className="px-6 py-1 text-left w-[20%]">{tDashboard('name')}</th>
              <th className="px-6 py-1 text-left w-[20%]">{tDashboard('products')}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100  text-sm">
            {initialCategories.length === 0 ? (
              <tr>
                <td colSpan={3} className="text-center py-12 text-text-soft font-medium">
                  {tDashboard('categories-not-found')}
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
                      {category.productsCount ?? 0}
                      {tDashboard('num-products')}
                    </td>
                    <td className="px-6 py-1 text-right space-x-2 whitespace-nowrap">
                      <Link
                        href={`/dashboard/category/${category.id}/update-category`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-bg-info-fade text-text-info  rounded-md text-xs font-medium transition-colors"
                      >
                        <SquarePen size={12} /> {tDashboard('edit')}
                      </Link>

                      <Button
                        buttonVariant="text"
                        variant="ghost"
                        size="xs"
                        onClick={() => handleDeleteClick(category.id)}
                        disabled={isDeleting}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-bg-danger-fade text-text-danger  disabled:opacity-40 rounded-md text-xs font-medium transition-colors"
                        leftIcon={<Trash2 size={12} />}
                      />
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
