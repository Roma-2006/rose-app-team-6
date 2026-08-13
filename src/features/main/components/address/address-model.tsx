'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Trash2 } from 'lucide-react';

import { useAddresses } from '../../hooks/use-addresses';
import { AddressFormValues } from '../../schemas/address.schema';
import { Address } from '../../types/address-model';

import { AddressForm } from './address-form';
import { AddressList } from './address-book-list';
import { AddressMap } from './address-map';

import { AlertDialog } from '@/shared/components/ui/alert-dialog';
import Modal from '@/shared/components/custom-ui/modal';
import ClearConfirmation from '@/shared/components/custom-ui/clear-confirmation';
import { AddressProgress } from './address-progress';

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

  const { addresses, isLoading, createAddress, updateAddress, deleteAddress } = useAddresses();

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
    setIsDeleteOpen(false);
    setDeletingId(null);
  };

  const handleDeleteConfirm = async () => {
    if (!deletingId) return;

    await deleteAddress(deletingId);

    handleDeleteClose();
  };

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

  const handleMapBack = () => {
    setView('form');
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
              onAdd={handleAdd}
              onEdit={handleEdit}
              onDelete={handleDeleteOpen}
            />
          )}

          <div className="min-h-0 flex-1">
            {view === 'form' && (
              <>
                <AddressForm
                  mode={selectedAddress ? 'edit' : 'add'}
                  initialData={selectedAddress}
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
          setIsDeleteOpen(open);

          if (!open) {
            setDeletingId(null);
          }
        }}
      >
        <Modal>
          <ClearConfirmation
            icon={<Trash2 className="text-destructive" size={32} />}
            title={t('deleteAddressTitle')}
            cancelButtonTitle={t('cancel')}
            confirmButtonTitle={t('delete')}
            onClick={handleDeleteConfirm}
          />
        </Modal>
      </AlertDialog>
    </>
  );
}
