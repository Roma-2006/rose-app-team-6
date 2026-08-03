import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth';
import UserDropdown from './user-dropdown';

export default async function UserDropdownServer() {
  const session = await getServerSession(authOptions);

  if (!session) return null;

  return <UserDropdown user={session.user} />;
}
