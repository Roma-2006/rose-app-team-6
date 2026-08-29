import { getCategoriesAction } from '@/features/dashboard/actions/categories/get-all-categories.action';
import CategoryTable from '@/features/dashboard/components/categories/category-table';
import { Link } from '@/i18n/navigation';
import { Button } from '@/shared/components/ui/button';
import { Plus } from 'lucide-react';
import React from 'react';

interface PageProps {
  searchParams: Promise<{
    page?: string;
    search?: string;
  }>;
}

export default async function CategoriesPage({ searchParams }: PageProps) {
  // فك وعزل البارامترات مباشرة على السيرفر
  const params = await searchParams;
  const parsedPage = parseInt(params.page || '1', 10);
  const currentPage = isNaN(parsedPage) || parsedPage < 1 ? 1 : parsedPage;
  const searchKeyword = params.search || '';

  const initialData = await getCategoriesAction(currentPage, searchKeyword, 12);

  return (
    <section className="flex flex-col gap-4.5 max-h-screen ">
      <header className="w-full flex justify-between">
        <h2 className="text-2xl font-semibold text-text-plain">All Categories</h2>
        <Link href="/dashboard/category/add-category">
          <Button
            buttonVariant="text"
            variant="primary"
            title="button.submit"
            leftIcon={<Plus />}
          />
        </Link>
      </header>

      <main className=" ">
        <CategoryTable
          initialCategories={initialData.categories || []}
          initialTotalPages={initialData.totalPages || 1}
          currentPage={currentPage}
          currentSearch={searchKeyword}
        />
      </main>
    </section>
  );
}
