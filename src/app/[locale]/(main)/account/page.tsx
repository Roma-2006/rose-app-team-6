import getUserProfile from '@/features/user/apis/get-user-profile.api';
import AccountSidebar from '@/features/user/components/account-settings/account-sidebar';
import ChangePasswordView from '@/features/user/components/account-settings/change-pass';
import ProfileView from '@/features/user/components/account-settings/profile-view';
import { AccountPageProps } from '@/features/user/types/profile';
import { getTranslations } from 'next-intl/server';

export default async function AccountPage({ searchParams }: AccountPageProps) {
  //Translations
  const t = await getTranslations();
  const { tab } = await searchParams;
  const activeTab = tab === 'password' ? 'password' : 'profile';
  //Profile Data
  const user = await getUserProfile();
  return (
    <div className="w-full mt-15.5">
      <h6 className="text-5xl font-bold mb-9 text-text-plain">{t('account-settings.title')}</h6>
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 ">
        <AccountSidebar activeTab={activeTab} />
        <main className=" w-full lg:flex-1 min-w-0">
          {activeTab === 'profile' && <ProfileView user={user} />}
          {activeTab === 'password' && <ChangePasswordView />}
        </main>
      </div>
    </div>
  );
}
