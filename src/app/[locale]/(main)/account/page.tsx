'use client';

import AccountSidebar from '@/features/user/components/account-sidebar';
import ChangePasswordView from '@/features/user/components/change-pass';
import ProfileView from '@/features/user/components/profile-view';
import React, { useState } from 'react';

interface AccountPageProps {
  searchParams: Promise<{ tab?: string }>;
}
export default async function AccountPage({ searchParams }: AccountPageProps) {
  const { tab } = await searchParams;
  const activeTab = tab === 'password' ? 'password' : 'profile';

  return (
    <div className="w-full max-h-150    px-20 ">
      <h6 className="text-5xl font-bold text-text-plain">Account Settings</h6>
      <div className="flex flex-col md:flex-row gap-12 items-start ">
        {/* تمرير التبويب النشط فقط دون الحاجة لدالة تغيير الحالة */}
        <AccountSidebar activeTab={activeTab} />

        {/* منطقة الـ Main وعرض المكونات بناءً على الخادم */}
        <main className="flex-1 w-full p-8 min-h-[500px]">
          {activeTab === 'profile' && <ProfileView />}
          {activeTab === 'password' && <ChangePasswordView />}
        </main>
      </div>
    </div>
  );
}
