import { getCategoriesAction } from '@/features/dashbord/actions/categories/get-categories.action';
import CategoryTable from '@/features/dashbord/components/category-table';
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
  const currentPage = parseInt(params.page || '1', 10);
  const searchKeyword = params.search || '';

  const initialData = await getCategoriesAction(currentPage, searchKeyword, 20);

  return (
    <section className="flex flex-col gap-4.5">
      <header className="w-full flex justify-between">
        <h2 className="text-2xl font-semibold text-text-plain">All Categories</h2>
        <Link href="/add-category">
          <Button
            buttonVariant="text"
            variant="primary"
            title="Add a new category"
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
