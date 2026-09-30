export const NotificationItemSkeleton = () => {
  return (
    <div className="w-full h-25 top-px p-4 gap-1.5 flex flex-col max-h-25 overflow-hidden border-b-2 border-border-soft bg-bg-plain animate-pulse">
      <div className="flex justify-between items-center">
        <div className="h-4 w-32 rounded bg-bg-soft" />
        <div className="h-4 w-4 rounded bg-bg-soft" />
      </div>

      <div className="h-3.5 w-full rounded bg-bg-soft" />
      <div className="h-3.5 w-2/3 rounded bg-bg-soft" />
    </div>
  );
};

const NotificationListSkeleton = ({ count = 4 }: { count?: number }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <NotificationItemSkeleton key={i} />
      ))}
    </>
  );
};

export default NotificationListSkeleton;
