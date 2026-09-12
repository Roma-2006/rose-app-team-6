import { getCategoriesAction } from '@/features/dashboard/actions/categories/get-all-categories.action';
import CategoryTable from '@/features/dashboard/components/categories/category-table';
import { Link } from '@/i18n/navigation';
import { Button } from '@/shared/components/ui/button';
import { Plus } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import React from 'react';

interface PageProps {
  searchParams: Promise<{
    page?: string;
    search?: string;
  }>;
}

export default async function CategoriesPage({ searchParams }: PageProps) {
  //Translation
  const tDashboard = await getTranslations('dashboard.categories');

  //Variables
  const params = await searchParams;
  const parsedPage = parseInt(params.page || '1', 10);
  const currentPage = isNaN(parsedPage) || parsedPage < 1 ? 1 : parsedPage;
  const searchKeyword = params.search || '';
  const initialData = await getCategoriesAction(currentPage, searchKeyword, 12);

  return (
    <section className=" flex flex-col w-full  md:p-0 gap-4.5 max-h-screen ">
      <header className="w-full flex justify-between">
        <h2 className=" text-xl  md:text-2xl pt-1 font-semibold text-text-plain">
          {tDashboard('all-categories')}
        </h2>
        <Link href="/dashboard/categories/category/[id]/add-category">
          <Button
            buttonVariant="text"
            variant="primary"
            title="dashboard.categories.add-new-category"
            leftIcon={<Plus />}
            responsiveIconOnly
            className="h-11"
          />
        </Link>
      </header>

      <main className="w-full ">
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
