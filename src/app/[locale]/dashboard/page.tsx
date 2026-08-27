import { getStatistics } from '@/features/dashboard/api/statistics';
import { OrdersStatusChart } from '@/features/dashboard/components/charts/orders-status-chart';
import { RevenueChart } from '@/features/dashboard/components/charts/revenue-chart';
import { RevenueChartContainer } from '@/features/dashboard/components/charts/revenue-chart-container';

export default async function Page() {
  const statistics = await getStatistics('monthly');
  console.log('data', statistics);
  return (
    <div className="w-full p-4 sm:p-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="w-full lg:col-span-4 flex items-center justify-center rounded-2xl bg-white shadow-sm border border-gray-100">
          <OrdersStatusChart data={statistics.payload.orderStatus} />
        </div>

        <div className="w-full lg:col-span-8 flex items-center justify-center rounded-2xl bg-white shadow-sm border border-gray-100">
          <RevenueChartContainer initialData={statistics.payload.revenue.points} />
        </div>
      </div>
    </div>
  );
}
