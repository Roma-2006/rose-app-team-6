import { Suspense } from 'react';

import { getAdminStatistics } from '../../apis/statistics.api';
import { StatsGrid } from './stat-card';
import { CategoriesList } from './categories-list';
import { TopSellingProducts } from './top-selling-products';
import { LowStockProducts } from './low-stock-products';
import { DashboardOverviewSkeleton } from '../skeleton/dashboard-overview-skeleton';
import { formatNumber } from '../../utils/formatters';
import { OrdersStatusChart } from './orders-status-chart';
import { RevenueChartContainer } from './revenue-chart-container';

const currencyFormatter = new Intl.NumberFormat('en-EG', {
  maximumFractionDigits: 0,
});

function formatRevenue(value: number, currency: string) {
  return `${currencyFormatter.format(value)} ${currency}`;
}

async function DashboardOverviewData() {
  // Query
  const data = await getAdminStatistics({
    lowStockThreshold: 20,
    topProductsLimit: 5,
    lowStockLimit: 20,
  });

  // Variables
  const values = {
    products: formatNumber(data.summary.totalProducts),
    orders: formatNumber(data.summary.totalOrders),
    categories: formatNumber(data.summary.totalCategories),
    revenue: formatRevenue(data.summary.totalRevenue, data.summary.currency),
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <StatsGrid values={values} />
        </div>
        <div className="lg:col-span-7">
          <CategoriesList categories={data.categories} />
        </div>
      </div>

      {/* charts  */}
      <div className="w-full p-4 sm:p-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="w-full lg:col-span-3 flex items-center justify-center ">
            <OrdersStatusChart data={data.orderStatus} />
          </div>

          <div className="w-full lg:col-span-9 flex items-center justify-center ">
            <RevenueChartContainer initialData={data.revenue.points} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2">
        <TopSellingProducts products={data.topSellingProducts} />
        <LowStockProducts products={data.lowStockProducts} />
      </div>
    </div>
  );
}

export function DashboardOverview() {
  return (
    <div className="min-h-screen bg-bg-subtle p-4 pb-24 md:p-6 lg:pb-6">
      <div className="w-full space-y-6">
        <Suspense fallback={<DashboardOverviewSkeleton />}>
          <DashboardOverviewData />
        </Suspense>
      </div>
    </div>
  );
}
