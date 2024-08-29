export const TaskSkeleton = () => {
  const skeletonItems = Array.from({ length: 5 }, (_, index) => index);

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
      {skeletonItems.map((item) => (
        <div
          key={item}
          className="flex flex-col py-2 bg-white rounded-lg shadow-md animate-pulse"
        >
          <div className="flex items-center mt-2 px-4">
            <div className="w-16 h-8 bg-gray-300 rounded-md"></div>
            <div className="flex items-center gap-2 ml-auto">
              <span className="w-20 h-4 bg-gray-300 rounded-md"></span>
              <div className="h-8 w-8 rounded-full bg-gray-300 ml-auto"></div>
            </div>
          </div>
          <div className="h-36 bg-gray-300 rounded-md mt-2"></div>
          <div className="flex pt-2 items-center justify-between px-4">
            <h4 className="w-24 h-6 bg-gray-300 rounded-md"></h4>
            <div className="p-2 h-8 w-8 bg-gray-300 rounded-full"></div>
          </div>
        </div>
      ))}
    </div>
  );
};
