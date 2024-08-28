import { useState } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const [newTask, setNewTask] = useState("");
  const navigate = useNavigate();

  const handleAddTask = (event) => {
    event.preventDefault();
    if (!newTask.trim()) return;
    setTasks([...tasks, { id: Date.now(), title: newTask, completed: false }]);
    setNewTask("");
  };

  const handleToggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="flex flex-col h-[80vh]">
      <section className="flex-1 py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <h3 className="text-gray-800 text-4xl font-bold">My Todo List</h3>
          <div className="mt-5 space-y-2">
            <form onSubmit={handleAddTask} className="flex items-center gap-2">
              <Input
                type="text"
                className="w-full px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-black shadow-sm rounded-lg"
                value={newTask}
                placeholder="Add a new task"
                onChange={(e) => setNewTask(e.target.value)}
              />
              <Button
                type="submit"
                className="inline-flex w-80 h-9 items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Task
              </Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};
