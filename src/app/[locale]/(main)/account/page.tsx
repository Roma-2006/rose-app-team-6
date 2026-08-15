import AccountSidebar from '@/features/user/components/account-sidebar';
import ChangePasswordView from '@/features/user/components/change-pass';
import ProfileView from '@/features/user/components/profile-view';

interface AccountPageProps {
  searchParams: Promise<{ tab?: string }>;
}
export default async function AccountPage({ searchParams }: AccountPageProps) {
  const { tab } = await searchParams;
  const activeTab = tab === 'password' ? 'password' : 'profile';

  return (
    <div className="w-full max-h-150 mt-15.5     ">
      <h6 className="text-5xl font-bold mb-9 text-text-plain">Account Settings</h6>
      <div className="flex gap-12 items-start ">
        <AccountSidebar activeTab={activeTab} />

        <main className=" w-[75%]  ">
          {activeTab === 'profile' && <ProfileView />}
          {activeTab === 'password' && <ChangePasswordView />}
        </main>
      </div>
    </div>
  );
}
