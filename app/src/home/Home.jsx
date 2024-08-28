import { useState } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { Plus, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { TaskStatusButton } from "../components/TaskStatusButton";
import { useAuthStore } from "../hooks/useAuthStore";
import { useTasks } from "../hooks/useTasks";
import { ModalTask } from "../components/ModalTask";
import { uploadImage } from "../services/s3Images";
import { createTask, deleteTask, deleteAllTasks } from "../services/httpClient";

export const Home = () => {
  const [newTask, setNewTask] = useState("");
  const { user } = useAuthStore();
  const { tasks, error } = useTasks(user.id);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageName, setImageName] = useState("No file selected");
  const [formValues, setFormValues] = useState({
    title: "",
    description: "",
    priority: 1,
    image: "",
    user_id: user.id,
    statusTask: "pending",
    status: true,
  });

  const navigate = useNavigate();
  const statusLabels = ["pending", "in progress", "completed"];

  const handleAddTask = async (event) => {
    event.preventDefault();
    if (!formValues.title.trim() || !formValues.description.trim()) return;
    if (formValues.image) {
      try {
        const uploadResponse = await uploadImage(formValues.image);
        const jsonResponse = JSON.parse(uploadResponse.body);

        if (uploadResponse.statusCode === 200) {
          await createTask({
            title: formValues.title.toLowerCase(),
            description: formValues.description.toLowerCase(),
            priority: formValues.priority,
            image: jsonResponse.imageUrl,
            user_id: user.id,
            statusTask: formValues.statusTask,
            status: true,
          });
        }
      } catch (error) {
        console.error("Error uploading image: ", error);
      }
      setIsModalOpen(false);
    };
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDeleteTask = async (id) => {
    try {
      await deleteTask(id);
      console.log('Task deleted');
    } catch (error) {
      console.error("Error deleting task: ", error);
    }
  };

  const handleDeleteAllTasks = async () => {
    try {
      await deleteAllTasks(user_id);
      console.log('All tasks deleted');
    } catch (error) {
      console.error("Error deleting all tasks: ", error);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64Image = reader.result.split(",")[1];
        setImageName(file.name);
        setFormValues({
          ...formValues,
          image: {
            base64: base64Image,
            name: file.name,
          },
        });
      };
      reader.onerror = (error) => {
        console.error("Error converting file to base64:", error);
      };
    }
  };


  const handleToggleTask = (id) => {
    // setNewTasks(
    //   tasks.map((task) =>
    //     task.id === id ? { ...task, completed: !task.completed } : task
    //   )
    // );

    console.log('Task status changed');
  };

  return (
    <div className={`flex flex-col ${tasks.length > 15 ? "" : "h-screen"}`}>
      <section className="container mx-auto py-4 px-8">
        <div className="container px-4 md:px-6">
          <h3 className="text-gray-800 text-4xl font-bold">My Todo List</h3>
          <div className="mt-5 space-y-2">
            <Button
              type="button"
              className="inline-flex w-80 h-9 items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950"
              onClick={() => setIsModalOpen(true)}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Task
            </Button>
          </div>
        </div>
      </section>
      {error && <p className="text-red-500 text-center">{error.message}</p>}
      <section className="py-4 px-8">
        <div className="px-4 md:px-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {tasks.length > 0 && tasks.map((task) => (
              <div
                key={task.task_id}
                className="flex flex-col py-2 bg-white rounded-lg shadow-md"
              >
                <div className="flex items-center mt-2 px-4">
                  <TaskStatusButton
                    task={task}
                    statusLabels={statusLabels}
                    onStatusChange={handleToggleTask}
                  />
                  <div className="flex items-center gap-2 ml-auto">
                    <span className="text-gray-500 text-sm ml-auto capitalize">
                      {task.task_creator_first_name}{" "}
                      {task.task_creator_last_name}
                    </span>
                    <img
                      src={task.task_creator_avatar}
                      alt={task.task_creator_first_name}
                      loading="lazy"
                      className="h-8 w-8 rounded-full ml-auto border-2 hover:scale-105 transition duration-300 cursor-pointer"
                    />
                  </div>
                </div>
                <img
                  src={task.task_image}
                  alt={task.task_title}
                  loading="lazy"
                  className="h-36 object-cover mt-2 hover:scale-105 transition-transform duration-300"
                />
                <div className="flex pt-2 items-center justify-between px-4">
                  <h4 className="text-gray-800 text-lg font-semibold">
                    {task.task_title}
                  </h4>
                  <Button
                    onClick={() => handleDeleteTask(task.task_id)}
                    className="p-1 text-gray-500 rounded-full hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900"
                  >
                    <Trash2 className="h-5 w-5 hover:text-red-500" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {isModalOpen && (
        <ModalTask handleInputChange={handleInputChange} handleAddTask={handleAddTask} setIsModalOpen={setIsModalOpen} handleFileChange={handleFileChange} imageName={imageName} />
      )}
    </div>
  );
}
