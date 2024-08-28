import { useNavigate } from "react-router-dom";
import { Button } from "./Button";
import { Clipboard, BookImage, MessageSquareMore } from "lucide-react";

export const Features = () => {
  const navigate = useNavigate();

  const navigateTo = (path) => {
    navigate(path);
  };

  return (
    <main className="flex-1">
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 flex justify-center items-center">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Welcome to TodoApp
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
                Organize your tasks efficiently and boost your productivity.
              </p>
            </div>
            <div className="space-x-4">
              <Button
                className="inline-flex h-9 items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50"
                onClick={() => navigateTo("/sign-in")}
              >
                Get Started
              </Button>
              <Button
                variant="outline"
                className="inline-flex h-9 items-center justify-center rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50"
                onClick={() => navigateTo("/sign-up")}
              >
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 flex justify-center items-center">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Features
              </h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our todo app comes with powerful features to help you stay
                organized and productive.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
            <div className="flex flex-col items-center space-y-4">
              <Clipboard className="h-12 w-12" />
              <h3 className="text-xl font-bold">Task Management</h3>
              <p className="text-sm text-gray-500">
                Easily create, edit, and organize your tasks.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4">
              <BookImage className="h-12 w-12" />
              <h3 className="text-xl font-bold">Images</h3>
              <p className="text-sm text-gray-500">
                Attach images to your tasks.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4">
              <MessageSquareMore className="h-12 w-12" />
              <h3 className="text-xl font-bold">Comments</h3>
              <p className="text-sm text-gray-500">
                Collaborate adding comments to tasks.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
