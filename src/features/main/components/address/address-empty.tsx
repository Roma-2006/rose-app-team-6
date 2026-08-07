import { Button } from '@/shared/components/ui/button';
import { MapPin } from 'lucide-react';
import { useTranslations } from 'next-intl';

export function AddressEmpty({ onAdd }: { onAdd: () => void }) {
  const t = useTranslations('address');

  return (
    <div className="flex flex-col items-center justify-center py-16 text-center sm:py-20">
      <div className="mb-4 rounded-full bg-bg-muted p-6 text-text-muted">
        <MapPin size={48} aria-hidden="true" />
      </div>

      <p className="mb-2 max-w-xs text-xl font-medium text-text-soft">{t('empty')}</p>

      <Button
        buttonVariant="text"
        variant="ghost"
        title={t('addAddress')}
        onClick={onAdd}
        className="text-lg font-bold text-text-danger hover:underline"
      />
    </div>
  );
}
