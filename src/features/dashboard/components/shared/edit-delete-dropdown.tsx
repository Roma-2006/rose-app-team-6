import { Button } from '@/shared/components/ui/button';
import { EllipsisVertical, Trash, Pencil } from 'lucide-react';
import { useState } from 'react';
type EditDeleteDropdownProps = {
  handleDelete: () => void;
  handleEdit: () => void;
  isDeleting: boolean;
};
export default function EditDeleteDropdown({
  handleDelete,
  handleEdit,
  isDeleting,
}: EditDeleteDropdownProps) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative sm:hidden">
      <Button
        buttonVariant="icon"
        variant="outline"
        iconOnly={<EllipsisVertical size={18} />}
        onClick={() => setOpen(!open)}
      />
      {open && (
        <div className="flex flex-col absolute right-0 z-5 bg-bg-plain border border-border-muted rounded-tl-[20px] rounded-tr-[20px] pt-12 px-4 pb-4 gap-2.5">
          <Button
            buttonVariant="text"
            title="button.edit"
            leftIcon={<Pencil size={14} />}
            variant="ghostBlue"
            size="xs"
            onClick={handleEdit}
          />
          <Button
            buttonVariant="text"
            title="button.delete"
            leftIcon={<Trash size={16} />}
            variant="ghostDanger"
            size="xs"
            onClick={handleDelete}
            loading={isDeleting}
          />
        </div>
      )}
    </div>
  );
}
