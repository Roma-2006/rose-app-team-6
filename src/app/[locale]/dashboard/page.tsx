export default function Page() {
  return (
    <>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="flex min-h-[300px] items-center justify-center rounded-xl bg-blue-100">
          <span className="text-xl font-semibold">Task 1</span>
        </div>

        <div className="flex min-h-[300px] items-center justify-center rounded-xl bg-green-100">
          <span className="text-xl font-semibold">Task 2</span>
        </div>

        <div className="flex min-h-[381px]   w-[276px]  items-center justify-center rounded-xl bg-purple-100">
          <span className="text-xl font-semibold">Task 3</span>
        </div>

        <div className="flex min-h-[381px]   w-[796px] items-center justify-center rounded-xl bg-yellow-100">
          <span className="text-xl font-semibold">Task 4</span>
        </div>

        <div className="flex min-h-[300px] items-center justify-center rounded-xl bg-pink-100">
          <span className="text-xl font-semibold">Task 5</span>
        </div>

        <div className="flex min-h-[300px] items-center justify-center rounded-xl bg-orange-100">
          <span className="text-xl font-semibold">Task 6</span>
        </div>
      </div>
    </>
  );
}
