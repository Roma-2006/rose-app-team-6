import { LocaleLayoutProps } from '@/shared/lib/types/locale-layout-props';
import { getTranslations } from 'next-intl/server';

export default async function LoginPage({ params }: LocaleLayoutProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  return (
    <>
      <div>
        {/* <h1 className="text-3xl font-bold">{t('login-page')}</h1> */}
        <div className="space-y-6">
          <div className="h-8 w-40 rounded bg-bg-muted" />

          <div className="h-12 rounded bg-bg-muted" />

          <div className="h-12 rounded bg-bg-muted" />

          <div className="h-10 rounded bg-bg-muted" />
        </div>
      </div>
    </>
  );
}
