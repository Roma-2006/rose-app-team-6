import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu';
import { useMarkNotificationAsRead } from './../hooks/use-notification';
import { Button } from '@/shared/components/ui/button';
import { EllipsisVerticalIcon, Check, Trash2 } from 'lucide-react';
import { cn } from '@/shared/lib/utils/tailwind-cn';
import type { MouseEvent } from 'react';

interface NotificationMenuProps {
  isRead: boolean;
  setIsRead: (isRead: boolean) => void;
  notificationId: string;
}

const NotificationMenu = ({ isRead, setIsRead, notificationId }: NotificationMenuProps) => {
  const { mutate: markAsRead, isPending } = useMarkNotificationAsRead();

  const handleMarkAsRead = () => {
    if (isRead || isPending) return;

    markAsRead({ notificationId, body: { isRead: true } }, { onSuccess: () => setIsRead(true) });
  };

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger
        render={
          <Button
            variant="ghost"
            buttonVariant="icon"
            iconOnly={<EllipsisVerticalIcon className="text-text-soft w-5 h-5" />}
            size="icon-sm"
            onClick={(e?: MouseEvent<HTMLButtonElement>) => {
              e?.preventDefault();
              e?.stopPropagation();
            }}
          />
        }
      />
      <DropdownMenuContent className="w-51.25 text-end bg-bg-plain" align="start">
        <DropdownMenuGroup>
          <DropdownMenuItem
            className={cn(
              'gap-2.5 font-medium text-sm',
              isRead ? 'text-text-muted cursor-not-allowed' : 'text-text-plain cursor-pointer'
            )}
            onClick={(e) => {
              e.stopPropagation();
              handleMarkAsRead();
            }}
          >
            <Check className="mr-2 h-4.5 w-4.5" />
            Mark as read
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-text-plain gap-2.5 font-medium text-sm"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <Trash2 className="mr-2 h-4.5 w-4.5 text-text-danger" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationMenu;
