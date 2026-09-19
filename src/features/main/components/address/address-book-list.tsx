import { Button } from '@/shared/components/ui/button';
import { AddressSkeleton } from '../skeleton/address-skeleton';
import { AddressCard } from './address-card';
import { AddressEmpty } from './address-empty';
import { useTranslations } from 'next-intl';

import { Address } from '../../types/address-model';

interface AddressListProps {
  isLoading: boolean;
  isError?: boolean;
  addresses: Address[];
  onAdd: () => void;
  onEdit: (address: Address) => void;
  onDelete: (address: Address) => void;
  onRetry?: () => void;
}

export function AddressList({
  addresses,
  isLoading,
  isError,
  onAdd,
  onEdit,
  onDelete,
  onRetry,
}: AddressListProps) {
  const t = useTranslations('address');

  return (
    <div className="relative flex h-full min-h-0 w-full flex-col mt-8">
      <div className="flex items-center justify-between border-b border-border-muted pb-4">
        <h1 className="text-3xl font-bold text-text-plain">{t('modal.title')}</h1>
        <div className="flex items-center gap-3">
          <Button
            buttonVariant="text"
            variant="softPink"
            title={t('addAddress')}
            onClick={onAdd}
            className="px-4 py-3.5"
          />
        </div>
      </div>

      {isLoading ? (
        <AddressSkeleton />
      ) : isError ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-3 py-16 text-center">
          <p className="max-w-xs text-text-danger">{t('loadError')}</p>
          {onRetry && (
            <Button
              type="button"
              buttonVariant="text"
              variant="outline"
              title={t('retry')}
              onClick={onRetry}
            />
          )}
        </div>
      ) : addresses.length === 0 ? (
        <AddressEmpty onAdd={onAdd} />
      ) : (
        <div className="min-h-0 flex-1 space-y-8 overflow-y-auto overflow-x-hidden">
          {addresses.map((address) => (
            <AddressCard
              key={address.id}
              address={address}
              onEdit={() => onEdit(address)}
              onDelete={() => onDelete(address)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
