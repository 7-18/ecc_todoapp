import { useEffect, useState } from "react";
import { useAuthStore } from "../hooks/useAuthStore";
import { getTasksImagesUserView } from "../services/httpClient";
import { Alert } from "../components/Alert";
import { Link } from "react-router-dom";
import { ImageSkeleton } from "../components/ImageSkeleton";
import { Trash2 } from "lucide-react";
import { Button } from "../components/Button";
import { deleteImage } from "../services/s3Images";

export const ImagePage = () => {
  const { user } = useAuthStore();
  const user_id = user["custom:id"] || user.id;
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saveLoading, setSaveLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [defaultData, setDefaultData] = useState(null);

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

  const handleDeleteImage = async (filename) => {
    try {
      await deleteImage(filename);
      setDefaultData("Image deleted successfully");
      getTasksByUserId();
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div className={`flex flex-col ${tasks.length > 15 ? "" : "h-screen"}`}>
      <section className="container mx-auto py-4 px-8">
        <div className="container px-4 md:px-6 lg:py-4">
          <h3 className="text-gray-800 text-4xl font-bold">Images</h3>
          {error && <Alert type="error" message={error.message} />}
          {success && <Alert type="success" message={success} />}
          {defaultData && (
            <Alert type="default" message={defaultData.message} />
          )}
        </div>
        <div className="container px-4 md:px-6">
          {loading ? (
            <ImageSkeleton />
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {tasks.length > 0 ? (
                tasks.map((task, index) => (
                  <div
                    key={index}
                    className="flex flex-col-reverse items-center justify-center bg-gray-50 rounded-lg pt-4 shadow-lg mt-6 hover:scale-105 transition-transform duration-300 hover:shadow-xl"
                  >
                    <img
                      src={task.task_image}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://demofree.sirv.com/nope-not-here.jpg";
                      }}
                      alt={task.task_title}
                      className="object-fit w-full h-48"
                      loading="lazy"
                    />
                    <div className="flex justify-around pb-2 w-full">
                      <span className="text-gray-800 text-lg font-semibold capitalize">
                        {task.task_title}
                      </span>
                      <Button
                        onClick={() => handleDeleteImage(task.task_image)}
                        className="p-2 text-gray-500 rounded-full hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900  hover:text-red-500"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-gray-500 text-center text-3xl select-none">
                  No images found.
                  <Link to="/" className="ml-1 text-gray-500 hover:underline">
                    Add tasks!
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
