import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu';
import { useMarkNotificationAsRead } from './../hooks/use-notification';
import { Button } from '@/shared/components/ui/button';
import { EllipsisVerticalIcon, Check, Trash2 } from 'lucide-react';

interface NotificationMenuProps {
  isRead: boolean;
  setIsRead: (isRead: boolean) => void;
  notificationId: string;
}

const NotificationMenu = ({ isRead, setIsRead, notificationId }: NotificationMenuProps) => {
  // mutation
  const { mutate: markAsRead, isPending } = useMarkNotificationAsRead();

  // function

  const handleMarkAsRead = () => {
    if (isRead || isPending) return;

    markAsRead(
      { notificationId, body: { isRead: true } },
      {
        onSuccess: () => setIsRead(true),
      }
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="ghost"
            buttonVariant="icon"
            iconOnly={<EllipsisVerticalIcon />}
            size="icon-sm"
          />
        }
      >
        <DropdownMenuContent className="w-51.25 text-start" align="start">
          <DropdownMenuGroup>
            <DropdownMenuItem
              className={` ${isRead ? 'text-text-plain cursor-not-allowed' : 'text-text-muted cursor-pointer'}`}
              onClick={() => handleMarkAsRead()}
            >
              <Check className="mr-2 h-4.5 w-4.5" />
              Mark as read
            </DropdownMenuItem>
            <DropdownMenuItem className="text-text-plain " onClick={() => handleMarkAsRead()}>
              <Trash2 className="mr-2 h-4.5 w-4.5 text-text-danger" />
              Mark as read
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenuTrigger>
    </DropdownMenu>
  );
};
export default NotificationMenu;
