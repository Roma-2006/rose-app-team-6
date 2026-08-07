'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useAddresses } from '../../hooks/use-addresses';

import { AddressForm } from './address-form';
import { AddressDeleteConfirmation } from './address-delete-confirmation';
import { Address } from '../../types/address.types';

import { Dialog, DialogContent } from '@/shared/components/ui/dialog';
import { AddressList } from './address-list';

interface AddressBookModalProps {
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}
interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onClose: () => void;
  onConfirm: () => void;
  isMutating?: boolean;
}

type AddressView = 'list' | 'add' | 'edit';

export function AddressBookModal({
  isOpen: controlledIsOpen,
  onOpenChange,
}: AddressBookModalProps) {
  const t = useTranslations('address');
  const { addresses, isLoading, deleteAddress, isMutating } = useAddresses();

  const [internalIsOpen, setInternalIsOpen] = useState(true);
  const [view, setView] = useState<AddressView>('list');
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const isOpen = controlledIsOpen ?? internalIsOpen;

  const resetState = () => {
    setView('list');
    setSelectedAddress(null);
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

  const renderContent = () => {
    if (view === 'add') {
      return <AddressForm mode="add" initialData={null} onBack={() => setView('list')} />;
    }

    if (view === 'edit' && selectedAddress) {
      return (
        <AddressForm
          mode="edit"
          initialData={selectedAddress}
          onBack={() => {
            setView('list');
            setSelectedAddress(null);
          }}
        />
      );
    }

    return (
      <AddressList
        addresses={addresses}
        isLoading={isLoading}
        onAdd={() => setView('add')}
        onEdit={(address) => {
          setSelectedAddress(address);
          setView('edit');
        }}
        onDelete={handleDeleteOpen}
      />
    );
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        <DialogContent
          showCloseButton={false}
          className="flex h-[650px] w-[calc(100vw-32px)] max-w-[850px] flex-col gap-6 overflow-hidden rounded-2xl border border-border-soft bg-bg-plain p-6 ring-1 ring-border-soft sm:max-w-[850px]"
        >
          {renderContent()}
        </DialogContent>
      </Dialog>
      {/* 
      <Dialog
        open={isDeleteOpen}
        onOpenChange={(open) => {
          if (!open) {
            handleDeleteClose();
          } else {
            setIsDeleteOpen(true);
          }
        }}
      >
      <DialogContent
  showCloseButton={false}
  className="!w-xl !max-w-4xl rounded-4xl border border-border-soft bg-bg-plain p-8 shadow-xl ring-1 ring-border-soft"
> <AddressDeleteConfirmation
            onClose={handleDeleteClose}
            onConfirm={handleDeleteConfirm}
            isMutating={isMutating}
          />
        </DialogContent>
      </Dialog> */}
      <AddressDeleteConfirmation
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        onClose={handleDeleteClose}
        onConfirm={handleDeleteConfirm}
        isMutating={isMutating}
      />
    </>
  );
}
