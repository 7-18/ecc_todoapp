import { useEffect, useState } from "react";
import { getTasksImagesUserView, getTasksUserView } from "../services/httpClient";

export const useTasks = (user_id) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getAllTasks = async () => {
    try {
      const response = await getTasksUserView();
      setTasks(response.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

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
    getAllTasks();
  }, []);

  useEffect(() => {
    if (user_id) {
      getTasksByUserId();
    }
  }, [user_id]);

  return { tasks, loading, error };
};