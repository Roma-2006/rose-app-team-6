'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Trash2, X } from 'lucide-react';

import { useAddresses } from '../../hooks/use-addresses';
import { AddressFormValues } from '../../schemas/address.schema';
import { Address } from '../../types/address-model';

import { AddressForm, AddressFormInitialData } from './address-form';
import { AddressList } from './address-book-list';
import { AddressMap } from './address-map';

import { AlertDialog } from '@/shared/components/ui/alert-dialog';
import Modal from '@/shared/components/custom-ui/modal';
import ClearConfirmation from '@/shared/components/custom-ui/clear-confirmation';
import { AddressProgress } from './address-progress';
import { Button } from '@/shared/components/ui/button';

interface AddressBookModalProps {
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

type AddressView = 'list' | 'form' | 'map';

export function AddressBookModal({
  isOpen: controlledIsOpen,
  onOpenChange,
}: AddressBookModalProps) {
  const t = useTranslations('address');

  const {
    addresses,
    isLoading,
    isError,
    refetch,
    createAddress,
    updateAddress,
    deleteAddress,
    isCreating,
    isUpdating,
    isDeleting,
  } = useAddresses();

  const isSavingAddress = isCreating || isUpdating;

  const isMutating = isSavingAddress || isDeleting;

  const [internalIsOpen, setInternalIsOpen] = useState(false);

  const [view, setView] = useState<AddressView>('list');

  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);

  const [formData, setFormData] = useState<AddressFormValues | null>(null);

  const [deletingId, setDeletingId] = useState<string | null>(null);

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const isOpen = controlledIsOpen ?? internalIsOpen;

  const resetState = () => {
    setView('list');
    setSelectedAddress(null);
    setFormData(null);
    setDeletingId(null);
    setIsDeleteOpen(false);
  };

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen && isMutating) return;

    if (onOpenChange) {
      onOpenChange(nextOpen);
    } else {
      setInternalIsOpen(nextOpen);
    }

    if (!nextOpen) {
      resetState();
    }
  };

  const handleDeleteOpen = (address: Address) => {
    setDeletingId(address.id);
    setIsDeleteOpen(true);
  };

  const handleDeleteClose = () => {
    if (isDeleting) return;

    setIsDeleteOpen(false);
    setDeletingId(null);
  };

  const handleDeleteConfirm = async () => {
    if (!deletingId) return;

    try {
      await deleteAddress(deletingId);
      handleDeleteClose();
    } catch {
      // Error toast is already shown by useAddresses
    }
  };

  const formInitialData: AddressFormInitialData | null = formData
    ? {
        title: formData.title,
        city: formData.city,
        street: formData.street,
        phone: formData.phone,
        latitude: selectedAddress?.latitude ?? formData.latitude,
        longitude: selectedAddress?.longitude ?? formData.longitude,
      }
    : selectedAddress
      ? {
          title: selectedAddress.title,
          city: selectedAddress.city,
          street: selectedAddress.street,
          phone: selectedAddress.phone,
          latitude: selectedAddress.latitude,
          longitude: selectedAddress.longitude,
        }
      : null;

  const handleAdd = () => {
    setSelectedAddress(null);
    setFormData(null);
    setView('form');
  };

  const handleEdit = (address: Address) => {
    setSelectedAddress(address);
    setFormData(null);
    setView('form');
  };

  const handleFormContinue = (data: AddressFormValues) => {
    setFormData(data);
    setView('map');
  };

  const handleMapConfirm = async (position: { lat: number; lng: number }) => {
    if (!formData) return;

    const payload = {
      ...formData,
      latitude: position.lat,
      longitude: position.lng,
      isPrimary: selectedAddress?.isPrimary ?? false,
    };
    try {
      if (selectedAddress) {
        await updateAddress({
          id: selectedAddress.id,
          data: payload,
        });
      } else {
        await createAddress(payload);
      }

      setFormData(null);
      setSelectedAddress(null);
      setView('list');
    } catch {}
  };

  return (
    <>
      <AlertDialog open={isOpen} onOpenChange={handleOpenChange}>
        <Modal className="flex h-160 w-full !max-w-4xl flex-col gap-6 overflow-hidden rounded-2xl border border-border-soft bg-bg-plain p-6 ring-1 ring-border-soft">
          <Button
            type="button"
            buttonVariant="icon"
            variant="ghost"
            onClick={() => handleOpenChange(false)}
            disabled={isMutating}
            className="absolute right-4 top-4 z-20 text-text-muted hover:text-text-plain"
            aria-label="Close"
            iconOnly={<X size={20} />}
          />

          {(view === 'form' || view === 'map') && (
            <>
              <h2 className="shrink-0 text-2xl font-bold text-text-plain">
                {selectedAddress ? t('editTitle') : t('add.title')}
              </h2>

              <div className="shrink-0">
                <AddressProgress step={view === 'form' ? 1 : 2} />
              </div>
            </>
          )}

          {view === 'list' && (
            <AddressList
              addresses={addresses}
              isLoading={isLoading}
              isError={isError}
              onAdd={handleAdd}
              onEdit={handleEdit}
              onDelete={handleDeleteOpen}
              onRetry={refetch}
            />
          )}

          <div className="min-h-0 flex-1">
            {view === 'form' && (
              <>
                <AddressForm
                  mode={selectedAddress ? 'edit' : 'add'}
                  initialData={formInitialData}
                  onBack={() => {
                    setFormData(null);
                    setSelectedAddress(null);
                    setView('list');
                  }}
                  onContinue={handleFormContinue}
                />
              </>
            )}

            {view === 'map' && (
              <AddressMap
                mode={selectedAddress ? 'edit' : 'add'}
                initialPosition={
                  selectedAddress
                    ? {
                        lat: Number(selectedAddress.latitude),
                        lng: Number(selectedAddress.longitude),
                      }
                    : undefined
                }
                isSubmitting={isSavingAddress}
                onBack={() => {
                  setView('form');
                }}
                onConfirm={handleMapConfirm}
              />
            )}
          </div>
        </Modal>
      </AlertDialog>

      <AlertDialog
        open={isDeleteOpen}
        onOpenChange={(open) => {
          if (!open && isDeleting) return;

          setIsDeleteOpen(open);

          if (!open) {
            setDeletingId(null);
          }
        }}
      >
        <Modal>
          <ClearConfirmation
            icon={<Trash2 className="text-destructive" size={32} />}
            title={t('deleteConfirm')}
            cancelButtonTitle={t('cancel')}
            confirmButtonTitle={t('confirmDelete')}
            onClick={handleDeleteConfirm}
          />
        </Modal>
      </AlertDialog>
    </>
  );
}
