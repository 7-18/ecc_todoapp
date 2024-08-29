export const ImageSkeleton = () => {
  const skeletonItems = Array.from({ length: 8 }, (_, index) => index);

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {skeletonItems.map((item) => (
        <div
          key={item}
          className="flex flex-col items-center justify-center bg-gray-200 rounded-lg pb-4 shadow-md mt-6 animate-pulse"
        >
          <div className="w-full h-48 bg-gray-300"></div>
          <div className="mt-2 w-3/4 h-6 bg-gray-300 rounded"></div>
        </div>
      ))}
    </div>
  );
};
