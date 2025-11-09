/* eslint-disable @typescript-eslint/no-unsafe-assignment */
export const SamplesSkeletonLoader = () => {
  const skeletonCount = 8; // Number of skeleton items to display

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {[...Array(skeletonCount)].map((_, index) => (
        <div
          key={index}
          className="rounded-lg p-4 bg-grey-800 hover:translate-y-[-4px] transition-transform"
        >
          {/* NFT Image Skeleton */}
          <div className="relative h-[15rem] mb-4 bg-grey-700 rounded-lg animate-pulse"></div>

          {/* NFT Title Skeleton */}
          <div className="space-y-2 mb-3">
            <div className="h-6 bg-grey-700 rounded w-3/4 mx-auto animate-pulse"></div>
            <div className="h-5 bg-grey-700 rounded w-1/2 mx-auto animate-pulse"></div>
          </div>

          {/* Price Skeleton */}
          <div className="flex justify-center items-center gap-2 mb-4">
            <div className="h-5 bg-grey-700 rounded w-10 animate-pulse"></div>
            <div className="h-6 bg-grey-700 rounded w-16 animate-pulse"></div>
          </div>

          {/* Button Skeleton */}
          <div className="h-9 bg-grey-700 rounded-md animate-pulse"></div>
        </div>
      ))}
    </div>
  );
};
