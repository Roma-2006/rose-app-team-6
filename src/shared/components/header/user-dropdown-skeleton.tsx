const UserDropdownSkeleton = () => {
  return (
    <div className="flex items-center gap-2 h-9 px-3 rounded-md animate-pulse">
      <div className="size-6 rounded-full bg-bg-soft" />
      <div className="h-3.5 w-16 rounded bg-bg-soft" />
      <div className="size-4 rounded bg-bg-soft" />
    </div>
  );
};

export default UserDropdownSkeleton;
