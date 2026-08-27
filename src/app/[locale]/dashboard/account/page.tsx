import getUserProfile from '@/features/user/apis/get-user-profile.api';
import ChangePasswordView from '@/features/user/components/account-settings/change-pass';
import ProfileView from '@/features/user/components/account-settings/profile-view';
import { AccountPageProps } from '@/features/user/types/profile';
import { getTranslations } from 'next-intl/server';

export default async function DashboardAccountPage({ searchParams }: AccountPageProps) {
  // Translations
  const t = await getTranslations();
  const { tab } = await searchParams;
  const activeTab = tab === 'password' ? 'password' : 'profile';

  // Profile Data
  const user = await getUserProfile();

  return (
    <div className="w-full space-y-6 p-4 sm:p-6 md:p-8 pb-28 sm:pb-8">
      {/* Title */}
      <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
        {t('account-settings.title')}
      </h1>

      {/* Main Card Container Matching Design */}
      <div className="w-full rounded-2xl bg-white p-6 shadow-sm border border-gray-100 sm:p-8">
        <main className="w-full">
          {activeTab === 'profile' && <ProfileView user={user} />}
          {/* {activeTab === 'password' && <ChangePasswordView />} */}
        </main>
      </div>
    </div>
  );
}
