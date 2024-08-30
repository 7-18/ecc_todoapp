import { useEffect, useState } from "react";
import { Button } from "../components/Button";
import { Plus } from "lucide-react";
import { ModalTask } from "../components/ModalTask";
import { uploadImage } from "../services/s3Images";
import {
  createTask,
  deleteTask,
  deleteAllTasks,
  updateTaskStatus,
  getTasksImagesUserView,
  createComment,
  deleteComment,
} from "../services/httpClient";
import { TaskByUserList } from "../components/TaskByUserList";
import { TaskSkeleton } from "../components/TaskSkeleton";
import { Alert } from "../components/Alert";
import { Loading } from "../components/Loading";
import { useSelector } from "react-redux";

export const Home = () => {
  const { user } = useSelector((state) => state.auth);
  const user_id = user["custom:id"] || user.id;
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saveLoading, setSaveLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [defaultData, setDefaultData] = useState(null);
  const [isModalOpenSave, setIsModalOpenSave] = useState(false);
  const [imageName, setImageName] = useState("No file selected");
  const [formValues, setFormValues] = useState({
    title: "",
    description: "",
    priority: 1,
    image: "",
    user_id: user_id,
    statusTask: "pending",
    status: true,
  });

  useEffect(() => {
    if (!isModalOpenSave) {
      setFormValues({
        title: "",
        description: "",
        priority: 1,
        image: "",
        user_id: user_id,
        statusTask: "pending",
        status: true,
      });
      setImageName("No file selected");
    }
  }, [isModalOpenSave]);

  const getTasksByUserId = async () => {
    try {
      const response = await getTasksImagesUserView(user_id);
      setTasks(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user_id) {
      getTasksByUserId();
    }
  }, [user_id]);

  const statusLabels = ["pending", "in progress", "completed"];

  const handleAddTask = async (event) => {
    event.preventDefault();
    setSaveLoading(true);
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
            user_id: user_id,
            statusTask: formValues.statusTask,
            status: true,
          });
          getTasksByUserId();
          setSuccess({ message: "Task added successfully" });
        }
      } catch (error) {
        console.error("Error uploading image: ", error);
      }

      setSaveLoading(false);
      setIsModalOpenSave(false);
    }
  };

  if (saveLoading) {
    return <Loading />;
  }

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
      getTasksByUserId();
      console.log("Task deleted");
      setDefaultData({ message: "Task deleted successfully" });
    } catch (error) {
      console.error("Error deleting task: ", error);
    }
  };

  const handleDeleteAllTasks = async () => {
    try {
      await deleteAllTasks(user_id);
      getTasksByUserId();
      console.log("All tasks deleted");
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

  const handleToggleTask = async (id, status) => {
    try {
      const updatedTask = { statusTask: status };
      await updateTaskStatus(id, updatedTask);
      getTasksByUserId();
      console.log("Task status updated");
      setSuccess({ message: "Task status updated successfully" });
    } catch (error) {
      console.error("Error updating task status: ", error);
    }
  };

  const handleAddComment = async (id, comment) => {
    try {
      await createComment({
        text: comment,
        task_id: id,
        user_id: user_id,
      });
      const response = await getTasksByUserId();
      setTasks(response.data);
      setSuccess({ message: "Comment added successfully" });
      console.log("Comment added");
    } catch (error) {
      console.error("Error adding comment: ", error);
    }
  };

  const handleDeleteComment = async (id) => {
    try {
      await deleteComment(id);
      const response = await getTasksByUserId();
      setTasks(response.data);
      setDefaultData({ message: "Comment deleted successfully" });
      console.log("Comment deleted");
    } catch (error) {
      console.error("Error deleting comment: ", error);
    }
  };

  return (
    <div className={`flex flex-col ${tasks.length > 15 ? "" : "h-screen"}`}>
      <section className="container mx-auto py-4 px-8">
        {error && <Alert type="error" message={error.message} />}
        {success && <Alert type="success" message={success.message} />}
        {defaultData && <Alert type="default" message={defaultData.message} />}
        <div className="container px-4 md:px-6">
          <h3 className="text-gray-800 text-4xl font-bold">My Todo List</h3>
          <div className="mt-5 space-y-2">
            <Button
              type="button"
              className="inline-flex w-80 h-9 items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950"
              onClick={() => setIsModalOpenSave(true)}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Task
            </Button>
          </div>
        </div>
      </section>
      <section className="py-4 px-8">
        <div className="px-4 md:px-6">
          {loading ? (
            <TaskSkeleton />
          ) : (
            <div>
              {tasks.length > 0 ? (
                <TaskByUserList
                  tasks={tasks}
                  statusLabels={statusLabels}
                  handleToggleTask={handleToggleTask}
                  handleDeleteTask={handleDeleteTask}
                  handleAddComment={handleAddComment}
                  handleDeleteComment={handleDeleteComment}
                />
              ) : (
                <h4 className="text-gray-500 text-center text-3xl select-none">
                  No tasks found. Add one!
                </h4>
              )}
            </div>
          )}
        </div>
      </section>
      {isModalOpenSave && (
        <ModalTask
          handleInputChange={handleInputChange}
          handleAddTask={handleAddTask}
          setIsModalOpen={setIsModalOpenSave}
          handleFileChange={handleFileChange}
          imageName={imageName}
        />
      )}
    </div>
  );
};
