import { useAuthStore } from "../hooks/useAuthStore";
import { useTasks } from "../hooks/useTasks";

export const ImagePage = () => {
  const { user } = useAuthStore();
  const { tasks, error } = useTasks(user.id);

  return (
    <div className={`flex flex-col ${tasks.length > 15 ? "" : "h-screen"}`}>
      <section className="container mx-auto py-4 px-8">
        <h3 className="text-3xl font-semibold text-gray-800">Images</h3>
        {error && <div className="text-red-500">Error: {error.message}</div>}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {tasks.length > 0 && tasks.map((task) => (
            <div key={task.id} className="relative">
              <img
                // src={`data:image/png;base64,${task.image}`}
                src={task.image}
                alt={task.task_creator_first_name}
                className="object-cover w-full h-48 rounded-md"
                loading="lazy"
              />
              <div className="absolute bottom-0 left-0 right-0 p-2 bg-gray-900 bg-opacity-50 text-white">
                <h4 className="text-sm font-semibold">{task.task_creator_first_name + " " + task.task_creator_last_name}</h4>
                <p className="text-xs">{task.title}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}