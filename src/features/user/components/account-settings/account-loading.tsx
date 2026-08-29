export default function AccountLoading() {
  return (
    <div className="w-full mt-15.5 animate-pulse">
      <div className="h-12 w-48 bg-bg-muted rounded mb-9" />
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
        <div className="w-full lg:w-[25%] h-64 bg-bg-muted rounded-xl" />
        <div className="w-full lg:flex-1 h-96 bg-bg-muted rounded-xl" />
      </div>
    </div>
  );
}
