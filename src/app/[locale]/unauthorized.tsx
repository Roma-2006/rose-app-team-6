import { useTranslations } from 'next-intl';
import { StatusScreen } from '@/shared/components/custom-ui/status-screen';
import Image from 'next/image';

export default function Unauthorized() {
  const t = useTranslations('dashboard.unauthorized');

  return (
    <StatusScreen
      icon={
        <Image
          src="/assets/images/lock-shield.png"
          alt="unauthorized"
          width={710}
          height={710}
          priority
        />
      }
      title={t('title')}
      description={t('description')}
      actionLabel={t('action')}
      actionHref="/overview"
    />
  );
}
