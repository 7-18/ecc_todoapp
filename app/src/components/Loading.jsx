import { BookOpenCheck } from "lucide-react";

export const Loading = () => {
  return (
    <div className="flex items-center justify-center h-full">
      <svg
        className="animate-spin h-8 w-8 text-black"
        fill="none"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <BookOpenCheck className="h-6 w-6" />
        <path
          className="opacity-75"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A8 8 0 0012 20v-4a4 4 0 00-4-4V7.709L6.709 9.29z"
          fill="currentColor"
        ></path>
      </svg>
    </div>
  );
};
