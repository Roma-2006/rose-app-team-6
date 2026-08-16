const AddressListSkeleton = () => {
  return (
    <div className="flex flex-col gap-3">
      {[1, 2, 3].map((i) => (
        <div key={i} className="w-full h-22.75 rounded-2xl bg-bg-plain animate-pulse" />
      ))}
    </div>
  );
};

export default AddressListSkeleton;
