import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth';

export async function getAuthToken(): Promise<string> {
  const session = await getServerSession(authOptions);

  if (!session?.token) {
    throw new Error('Authentication required');
  }

  return session.token;
}
