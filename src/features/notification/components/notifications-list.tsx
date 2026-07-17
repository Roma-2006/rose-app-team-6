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
import NotificationItemList from './notification-item-list';
import { Bell, BrushCleaning, CheckCheck } from 'lucide-react';

// types
import type { Notification } from '../types/notification';
import { Button } from '@/shared/components/ui/button';

const NotificationsList = ({ notifications }: { notifications: Notification[] }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={<Button variant="ghost" buttonVariant="icon" iconOnly={<Bell />} size="icon-sm" />}
      >
        <DropdownMenuContent className="w-51.25 text-start" align="start">
          <DropdownMenuGroup>
            <DropdownMenuLabel className="text-text-plain text-sm font-semibold">
              Notifications
            </DropdownMenuLabel>
            {notifications.length === 0 ? (
              <div></div>
            ) : (
              notifications.map((notification) => (
                <DropdownMenuItem
                  key={notification.id}
                  className={`text-text-muted cursor-pointer`}
                >
                  <NotificationItemList notification={notification} />
                </DropdownMenuItem>
              ))
            )}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenuTrigger>
    </DropdownMenu>
  );
};
export default NotificationsList;
