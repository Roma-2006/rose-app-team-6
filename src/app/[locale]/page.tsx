import LanguageSwitcher from '@/shared/components/language-switcher';
import { ThemeToggle } from '@/shared/components/theme';
import CustomInput from '@/shared/components/custom-input';
import { getTranslations } from 'next-intl/server';

import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
  InputGroupText,
} from '@/shared/components/ui/input-group';

import { User } from 'lucide-react';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function Home({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  const isRtl = locale === 'ar';

  return (
    <main className="bg-plain min-h-screen flex flex-col items-center justify-center p-6 text-center">
      <div className="bg-plain p-8 rounded-2xl shadow-sm border border-slate-100 max-w-md w-full flex flex-col items-center">
        {/* Language & Theme Switcher */}
        <div className="mb-6 w-full flex justify-end gap-2">
          <LanguageSwitcher />
          <ThemeToggle />
        </div>

        {/* Input Group */}
        <div className="space-y-2 w-full mb-6">
          <label className={`block text-sm font-medium text-foreground `}>
            {t('input-component.label')}
          </label>
          <InputGroup>
            <InputGroupAddon align="inline-start">
              <InputGroupText>
                <User className="size-4" />
              </InputGroupText>
            </InputGroupAddon>
            <InputGroupInput type="text" placeholder={t('input-component.placeholder')} />
          </InputGroup>
        </div>

        <h1 className="text-3xl font-extrabold text-slate-900 mb-2 tracking-tight">{t('title')}</h1>
        <p className="text-3xl font-extrabold text-slate-900 mb-2 tracking-tight">
          {t('nice-to-have-you-here')}
        </p>
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-full text-sm font-medium text-slate-700">
          <span>Active Locale:</span>
          <span className="uppercase text-indigo-600 font-bold">{locale}</span>
        </div>
      </div>

      <CustomInput
        className=" w-full max-w-md mt-4"
        variant="phone"
        // disabled={true}
        // error={true}
        isRtl={isRtl}
        label={t('custom-input.phone.label')}
        placeholder={t('custom-input.phone.placeholder')}
      />
    </main>
  );
}
