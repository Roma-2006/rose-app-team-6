import { NextRequest, NextResponse } from 'next/server';
import { getAdminStatistics } from '@/features/dashboard/apis/statistics.api';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    const revenuePeriod = searchParams.get('revenuePeriod') ?? 'monthly';
    const lowStockThreshold = searchParams.get('lowStockThreshold') ?? '20';
    const topProductsLimit = searchParams.get('topProductsLimit') ?? '5';
    const lowStockLimit = searchParams.get('lowStockLimit') ?? '20';

    const statistics = await getAdminStatistics({
      revenuePeriod: revenuePeriod as 'monthly' | 'week',
      lowStockThreshold: Number(lowStockThreshold),
      topProductsLimit: Number(topProductsLimit),
      lowStockLimit: Number(lowStockLimit),
    });

    return NextResponse.json({
      status: true,
      payload: statistics,
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: false,
        message: error instanceof Error ? error.message : 'Failed to fetch admin statistics',
      },
      { status: 500 }
    );
  }
}
