import { getStatistics } from '@/features/dashboard/apis/statistics';
import { OrdersStatusChart } from '@/features/dashboard/components/charts/orders-status-chart';
import { RevenueChartContainer } from '@/features/dashboard/components/charts/revenue-chart-container';

export default async function Page() {
  const statistics = await getStatistics('monthly');
  console.log('data', statistics);
  return (
    <div className="w-full p-4 sm:p-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="w-full lg:col-span-3 flex items-center justify-center ">
          <OrdersStatusChart data={statistics.payload.orderStatus} />
        </div>

        <div className="w-full lg:col-span-9 flex items-center justify-center ">
          <RevenueChartContainer initialData={statistics.payload.revenue.points} />
        </div>
      </div>
    </div>
  );
}
