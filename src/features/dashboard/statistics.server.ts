import { getServerSession } from 'next-auth/next';
import { getAdminStatistics, GetAdminStatisticsParams } from './statistics.api';
import { authOptions } from '@/auth';

export async function getAdminStatisticsServer(params: GetAdminStatisticsParams = {}) {
  const session = await getServerSession(authOptions);

  console.log('SESSION:', session);
  console.log('TOKEN:', session?.token);

  const token = session?.token;

  if (!token) {
    throw new Error('Authentication required');
  }

  return getAdminStatistics(token, params);
}
