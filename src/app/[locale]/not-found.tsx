import { useTranslations } from 'next-intl';
import { StatusScreen } from '@/shared/components/custom-ui/status-screen';
import Image from 'next/image';

export default function NotFound() {
  const t = useTranslations('dashboard.notFound');

  return (
    <StatusScreen
      icon={
        <Image src="/assets/images/404.png" alt="Not_found" width={710} height={710} priority />
      }
      title={t('title')}
      description={t('description')}
    />
  );
}
