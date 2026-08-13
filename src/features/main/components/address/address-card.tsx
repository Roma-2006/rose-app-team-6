import { MapPin, Phone, Pencil, Trash2 } from 'lucide-react';
import { Address } from '../../types/address-model.d';
import { Button } from '@/shared/components/ui/button';

interface Props {
  address: Address;
  onEdit: () => void;
  onDelete: () => void;
}

export function AddressCard({ address, onEdit, onDelete }: Props) {
  return (
    <div className="relative  max-w-4xl rounded-2xl border border-border-soft pt-6 transition-all hover:border-border-primary hover:shadow-lg pr-9 mr-5 pb-5 pl-4 mt-8 overflow-visible ">
      {/* Floating Title */}
      <span className="absolute -top-3 left-6 bg-bg-plain px-2 text-text-primary font-bold text-lg">
        {address.title}
      </span>

      <div className="flex w-full items-start justify-between gap-4">
        <div className="min-w-0 flex-1 space-y-4">
          <div className="flex items-center gap-3">
            <div className="bg-bg-success p-2 rounded-full text-text-inverse">
              <MapPin size={20} />
            </div>
            <span className="text-2xl font-bold text-text-plain">{address.city}</span>
          </div>

          {/* Address Pill */}

          <div className="w-fit max-w-[80%] break-words rounded-2xl bg-bg-muted px-5 py-2 text-sm font-medium text-text-plain">
            {address.street}
          </div>
        </div>

        <div className="flex items-center gap-2 text-text-muted font-medium pr-8">
          <Phone size={20} />
          <span dir="ltr">+{address.phone}</span>
        </div>
      </div>

      {/* buttons */}
      <div className="absolute right-0 top-1/2 z-30 flex -translate-y-1/2 translate-x-1/2 flex-col gap-2">
        {/* edit */}
        <Button
          type="button"
          buttonVariant="icon"
          variant="outline"
          onClick={onEdit}
          iconOnly={<Pencil size={20} />}
          className="h-10 w-10 rounded-full border-border-soft bg-bg-plain text-text-muted shadow-sm hover:bg-bg-subtle"
        />
        {/* delete */}
        <Button
          type="button"
          buttonVariant="icon"
          variant="destructive"
          onClick={onDelete}
          iconOnly={<Trash2 size={20} />}
          className="h-10 w-10 rounded-full shadow-sm"
        />
      </div>
    </div>
  );
}
