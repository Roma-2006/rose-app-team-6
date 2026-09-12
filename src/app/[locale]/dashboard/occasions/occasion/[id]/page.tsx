import { getOccasionsAction } from '@/features/dashboard/actions/occasions/get-all-occasions.action';
import OccasionTable from '@/features/dashboard/components/occasions/occasion-table';
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

export default async function OccasionsPage({ searchParams }: PageProps) {
  //Translation
  const tDashboard = await getTranslations('dashboard.Occasions');

  //Variables
  const params = await searchParams;
  const parsedPage = parseInt(params.page || '1', 10);
  const currentPage = isNaN(parsedPage) || parsedPage < 1 ? 1 : parsedPage;
  const searchKeyword = params.search || '';
  const initialData = await getOccasionsAction(currentPage, searchKeyword, 12);

  return (
    <section className=" flex flex-col w-full  md:p-0 gap-4.5 max-h-screen ">
      <header className="w-full flex justify-between">
        <h2 className=" text-xl  md:text-2xl pt-1 font-semibold text-text-plain">
          {tDashboard('all-occasions')}
        </h2>
        <Link href="/dashboard/occasions/ocassion/[id]/add-occasion">
          <Button
            buttonVariant="text"
            variant="primary"
            title="dashboard.occasions.add-new-occasion"
            leftIcon={<Plus />}
            responsiveIconOnly
            className="h-11"
          />
        </Link>
      </header>

      <main className="w-full ">
        <OccasionTable
          initialOccasions={initialData.occasions || []}
          initialTotalPages={initialData.totalPages || 1}
          currentPage={currentPage}
          currentSearch={searchKeyword}
        />
      </main>
    </section>
  );
}
