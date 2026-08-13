'use client';

import AccountHeader from '@/features/main/components/account-settings/account-header';
import AccountSidebar from '@/features/main/components/account-settings/account-sidebar';
import ChangePasswordView from '@/features/main/components/account-settings/change-pass';
import ProfileView from '@/features/main/components/account-settings/profile-view';
import React, { useState } from 'react';

export default function AccountPage() {
  // الـ State الرئيسي المسؤول عن معرفة التبويب النشط حالياً
  const [activeTab, setActiveTab] = useState<'profile' | 'password'>('profile');

  return (
    <div className="max-w-7xl flex flex-col gap-9  mx-auto px-20 py-12">
      <AccountHeader />

      <div className="flex flex-col md:flex-row gap-12 items-start">
        <AccountSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* منطقة الـ Main وعرض المكون ديناميكياً داخل نفس الصفحة */}
        <main className="flex-1 w-full   p-8   min-h-[500px]">
          {activeTab === 'profile' && <ProfileView />}
          {activeTab === 'password' && <ChangePasswordView />}
        </main>
      </div>
    </div>
  );
}
