import 'server-only';

import { getServerSession } from 'next-auth/next';
import { getAdminStatistics, GetAdminStatisticsParams } from '../apis/statistics.api';
import { authOptions } from '@/auth';

export async function getAdminStatisticsServer(params: GetAdminStatisticsParams = {}) {
  const session = await getServerSession(authOptions);

  if (!session?.token) {
    throw new Error('Authentication required');
  }

  return getAdminStatistics(params);
}
