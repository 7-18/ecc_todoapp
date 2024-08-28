import { useState } from "react";
import { Button } from "../components/Button";
import { ModalTask } from "../components/ModalTask";
import { useAuthStore } from "../hooks/useAuthStore";
import { useTasks } from "../hooks/useTasks";
import { uploadImage } from "../services/s3Images";
import { createTask, deleteTask } from "../services/httpClient";

export const TasksPage = () => {
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

      <section className="container mx-auto py-4 px-8">
        <div className="container px-4 md:px-6">
          <div className="mt-5 space-y-2">
            {tasks.map((task) => (
              <div key={task.id} className="flex items-center justify-between bg-white shadow-sm rounded-lg p-4">
                <div>
                  <h4 className="text-lg font-semibold">{task.title}</h4>
                  <p className="text-sm text-gray-500">{task.description}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <button
                    type="button"
                    className="text-xs text-gray-500"
                    onClick={() => handleDeleteTask(task.id)}
                  >
                    Delete
                  </button>
                  <button
                    type="button"
                    className="text-xs text-gray-500"
                    onClick={() => handleToggleTask(task.id)}
                  >
                    {task.completed ? "Mark as pending" : "Mark as completed"}
                  </button>
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