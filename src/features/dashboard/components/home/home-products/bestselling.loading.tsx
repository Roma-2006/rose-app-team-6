import { ProductCardSkeleton } from './productcard-skelton';

export default function BestSellingSectionLoading() {
  return (
    <section className="py-20 mx-20 lg:mx-20">
      <div className="flex flex-col lg:flex-row justify-center items-center gap-9">
        <div className="size-lf-stretch inline-flex flex-col justify-start items-start gap-2.5">
          <div className="self-stretch h-8 justify-center bg-bg-soft rounded-md w-40" />
          <div className="self-stretch flex-1 flex flex-col justify-start items-start gap-2">
            <div className="self-stretch justify-center">
              <div className="h-8 bg-bg-soft rounded-md w-64" />
            </div>
            <div className="self-stretch justify-center bg-bg-soft rounded-md h-10 w-80 mt-4" />
          </div>
          <div className="mt-16 w-40 h-10 bg-bg-soft rounded-lg" />
        </div>

        <div className="relative flex-1 lg:max-w-[950px] w-full">
          <div className="flex gap-6 overflow-x-auto hide-scrollbar snap-x snap-mandatory px-2">
            {[...Array(4)].map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
