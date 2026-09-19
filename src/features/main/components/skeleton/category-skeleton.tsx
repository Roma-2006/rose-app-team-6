const CategoryItemSkeleton = () => {
  return (
    <div className="w-full h-9 rounded-lg overflow-hidden flex gap-2.5 bg-bg-muted animate-pulse shrink-0">
      <div className="w-9 h-9 bg-bg-soft" />
      <div className="self-center w-20 h-3 rounded bg-bg-soft" />
    </div>
  );
};
export default CategoryItemSkeleton;
